/**
 * Vibe-coded script for removing unnecessary words from cspell.yaml.
 *
 * Usage:
 *   mise exec -- deno run --allow-read --allow-write --allow-run scripts/prune_cspell.ts
 *
 * `cspell` is installed via mise's npm backend and needs `node` on PATH, so run the
 * script through `mise exec` (node is declared in mise.toml). Running it with a bare
 * `deno run` will fail the pre-flight check if `node` is not otherwise on PATH.
 *
 * What it does:
 *   1. Reads cspell.yaml.
 *   2. Verifies the current config passes `cspell .`.
 *   3. Temporarily removes the whole custom `words` list.
 *   4. Runs cspell once in unknown-words-only mode.
 *   5. Keeps only configured words that appear in the unknown-word output.
 *   6. Writes the pruned list and validates it with `cspell .`.
 */

import { dirname, join } from "jsr:@std/path@1.1.5"

// -------------------------------------------------------------------------------------------------
// Paths
// -------------------------------------------------------------------------------------------------

const scriptDir = dirname(import.meta.filename!)
const projectRoot = join(scriptDir, "..")
const cspellPath = join(projectRoot, "cspell.yaml")

// -------------------------------------------------------------------------------------------------
// Read original file (so we can restore it on interruption)
// -------------------------------------------------------------------------------------------------

const originalContent = await Deno.readTextFile(cspellPath)

// Safety: If the script is interrupted (Ctrl+C), restore the original cspell.yaml before exiting.
// We use code 130 because 128 + SIGINT(2) = 130, the standard Unix convention for
// "process killed by Ctrl+C".
let alreadyRestored = false
Deno.addSignalListener("SIGINT", async () => {
    if (!alreadyRestored) {
        console.error("\nInterrupted! Restoring original cspell.yaml...")
        await Deno.writeTextFile(cspellPath, originalContent)
        alreadyRestored = true
    }
    // 128 + SIGINT(2) = 130, the standard Unix convention for "killed by Ctrl+C".
    Deno.exit(130)
})

// -------------------------------------------------------------------------------------------------
// Parse the YAML to locate the `words:` block
// -------------------------------------------------------------------------------------------------

const allLines = originalContent.split("\n")

let wordsStart = -1 // index in allLines *after* the "words:" header
let wordsEnd = -1 // index in allLines of the first line after the block

for (let i = 0; i < allLines.length; i++) {
    const line = allLines[i]
    if (wordsStart === -1) {
        if (line.startsWith("words:")) {
            wordsStart = i + 1
        }
    } else {
        // We expect list items like "  - foobar"
        if (!line.startsWith("  - ")) {
            wordsEnd = i
            break
        }
    }
}

if (wordsStart === -1) {
    console.error("Error: could not find a `words:` section in cspell.yaml.")
    Deno.exit(1)
}

if (wordsEnd === -1) {
    wordsEnd = allLines.length
}

const wordLines = allLines.slice(wordsStart, wordsEnd)

if (wordLines.length === 0) {
    console.log("No words to prune.")
    Deno.exit(0)
}

// -------------------------------------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------------------------------------

const green = (text: string) => `\x1b[32m${text}\x1b[0m`
const red = (text: string) => `\x1b[31m${text}\x1b[0m`

/** Reassemble the full file content given a (possibly reduced) word list. */
function buildContent(currentWordLines: string[]): string {
    if (currentWordLines.length === 0) {
        return [
            ...allLines.slice(0, wordsStart - 1),
            `${allLines[wordsStart - 1].replace(/:.*/, "")}: []`,
            ...allLines.slice(wordsEnd),
        ].join("\n")
    }

    return [
        ...allLines.slice(0, wordsStart),
        ...currentWordLines,
        ...allLines.slice(wordsEnd),
    ].join("\n")
}

type CspellResult = {
    code: number
    stdout: string
    stderr: string
}

const textDecoder = new TextDecoder()

/** Run cspell from the project root and return its output. */
async function runCspell(args: string[]): Promise<CspellResult> {
    try {
        const { code, stdout, stderr } = await new Deno.Command("cspell", {
            args,
            cwd: projectRoot,
            stdout: "piped",
            stderr: "piped",
        }).output()

        return {
            code,
            stdout: textDecoder.decode(stdout),
            stderr: textDecoder.decode(stderr),
        }
    } catch (err) {
        console.error("Failed to spawn `cspell`. Is it installed and in PATH?", err)
        throw err
    }
}

function printCspellFailure(context: string, result: CspellResult): void {
    console.error(`${context} failed with exit code ${result.code}.`)
    const output = [result.stderr.trim(), result.stdout.trim()].filter(Boolean).join("\n")
    if (output) {
        console.error(output)
    }
}

/** Extract the bare word from a line like "  - foobar". */
function extractWord(line: string): string {
    // line.trim() -> "- foobar"; slice(2) -> "foobar"
    return line.trim().slice(2)
}

function normalizeWord(word: string): string {
    return word.toLocaleLowerCase("en-US")
}

function getComparableWords(word: string): string[] {
    const camelSplit = word
        .replace(/([\p{Ll}\p{Nd}])(\p{Lu})/gu, "$1 $2")
        .replace(/(\p{Lu}+)(\p{Lu}\p{Ll})/gu, "$1 $2")

    return [
        word,
        ...(camelSplit.match(/[\p{L}\p{N}]+/gu) ?? []),
        ...(camelSplit.match(/\p{L}{3,}/gu) ?? []),
    ]
}

function shouldKeepWord(
    word: string,
    unknownWords: Set<string>,
    normalizedUnknownWords: Set<string>,
): boolean {
    return getComparableWords(word).some(
        (part) => unknownWords.has(part) || normalizedUnknownWords.has(normalizeWord(part)),
    )
}

// -------------------------------------------------------------------------------------------------
// Output-driven pruning
// -------------------------------------------------------------------------------------------------

const checkArgs = ["lint", "--no-progress", "--no-summary", "."]
const collectArgs = [
    "lint",
    "--words-only",
    "--unique",
    "--no-progress",
    "--no-summary",
    "--no-exit-code",
    ".",
]

const baselineResult = await runCspell(checkArgs)
if (baselineResult.code !== 0) {
    printCspellFailure("Baseline cspell check", baselineResult)
    Deno.exit(1)
}

await Deno.writeTextFile(cspellPath, buildContent([]))

let collectResult: CspellResult
try {
    collectResult = await runCspell(collectArgs)
} catch {
    await Deno.writeTextFile(cspellPath, originalContent)
    Deno.exit(1)
}

if (collectResult.code !== 0) {
    printCspellFailure("Unknown-word collection", collectResult)
    await Deno.writeTextFile(cspellPath, originalContent)
    Deno.exit(1)
}

const unknownWords = new Set(
    collectResult.stdout
        .split(/\r?\n/)
        .map((word) => word.trim())
        .filter(Boolean),
)
const normalizedUnknownWords = new Set([...unknownWords].map(normalizeWord))

const remaining: string[] = []
let removedCount = 0

for (const line of wordLines) {
    const word = extractWord(line)
    if (shouldKeepWord(word, unknownWords, normalizedUnknownWords)) {
        console.log(`  ${green("✗ keep:")}    ${word}`)
        remaining.push(line)
    } else {
        console.log(`  ${red("✓ remove:")} ${word}`)
        removedCount++
    }
}

// -------------------------------------------------------------------------------------------------
// Write final result
// -------------------------------------------------------------------------------------------------

await Deno.writeTextFile(cspellPath, buildContent(remaining))

const finalResult = await runCspell(checkArgs)
if (finalResult.code !== 0) {
    printCspellFailure("Final cspell check", finalResult)
    console.error("Restoring original cspell.yaml because the pruned config did not validate.")
    await Deno.writeTextFile(cspellPath, originalContent)
    Deno.exit(1)
}

console.log(`\nDone. Kept ${remaining.length} word(s), removed ${removedCount} word(s).`)
