/**
 * scripts/prune_cspell.ts
 *
 * Vibe-coded script for removing unnecessary words from cspell.yaml created by Kimi K2.6.
 *
 * Usage:
 *   bun run scripts/prune_cspell.ts
 *
 * What it does:
 *   1. Reads cspell.yaml.
 *   2. Iterates over every word in the `words` list.
 *   3. For each word, temporarily removes it and runs `cspell .` at the project root.
 *   4. If cspell reports no errors, the word is considered unnecessary and is dropped.
 *   5. If cspell reports errors (non-zero exit), the word is needed and is restored.
 *   6. After processing all words, the final pruned list is written back to cspell.yaml.
 *
 * Strategy note:
 *   This is a greedy, single-pass algorithm. It removes words that can be proven unnecessary
 *   given the current state of the file, but it does not guarantee a globally minimal set.
 */

import { join } from "path"

// -------------------------------------------------------------------------------------------------
// Paths
// -------------------------------------------------------------------------------------------------

const scriptDir = import.meta.dir
const projectRoot = join(scriptDir, "..")
const cspellPath = join(projectRoot, "cspell.yaml")

// -------------------------------------------------------------------------------------------------
// Read original file (so we can restore it on interruption)
// -------------------------------------------------------------------------------------------------

const originalContent = await Bun.file(cspellPath).text()

// Safety: If the script is interrupted (Ctrl+C), restore the original cspell.yaml before exiting.
// We use code 130 because 128 + SIGINT(2) = 130, the standard Unix convention for
// "process killed by Ctrl+C".
let alreadyRestored = false
process.on("SIGINT", async () => {
    if (!alreadyRestored) {
        console.error("\nInterrupted! Restoring original cspell.yaml...")
        await Bun.write(cspellPath, originalContent)
        alreadyRestored = true
    }
    // 128 + SIGINT(2) = 130, the standard Unix convention for "killed by Ctrl+C".
    process.exit(130)
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
    process.exit(1)
}

if (wordsEnd === -1) {
    wordsEnd = allLines.length
}

const wordLines = allLines.slice(wordsStart, wordsEnd)

if (wordLines.length === 0) {
    console.log("No words to prune.")
    process.exit(0)
}

// -------------------------------------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------------------------------------

/** Reassemble the full file content given a (possibly reduced) word list. */
function buildContent(currentWordLines: string[]): string {
    return [
        ...allLines.slice(0, wordsStart),
        ...currentWordLines,
        ...allLines.slice(wordsEnd),
    ].join("\n")
}

/** Run `cspell .` from the project root and return the exit code. */
async function runCspell(): Promise<number> {
    try {
        const proc = Bun.spawn(["cspell", "."], {
            cwd: projectRoot,
            stdout: "ignore",
            stderr: "ignore",
        })
        return await proc.exited
    } catch (err) {
        console.error("Failed to spawn `cspell`. Is it installed and in PATH?", err)
        throw err
    }
}

/** Extract the bare word from a line like "  - foobar". */
function extractWord(line: string): string {
    // line.trim() -> "- foobar"; slice(2) -> "foobar"
    return line.trim().slice(2)
}

// -------------------------------------------------------------------------------------------------
// Greedy pruning loop
// -------------------------------------------------------------------------------------------------

const remaining = [...wordLines]
let removedCount = 0
let keptCount = 0

for (let i = 0; i < remaining.length; i++) {
    const candidateLine = remaining[i]
    const candidateWord = extractWord(candidateLine)

    // Build a temporary file that omits the candidate word
    const testSet = [...remaining]
    testSet.splice(i, 1)
    await Bun.write(cspellPath, buildContent(testSet))

    let exitCode: number
    try {
        exitCode = await runCspell()
    } catch {
        // Spawn failed → restore original and bail out
        await Bun.write(cspellPath, originalContent)
        process.exit(1)
    }

    if (exitCode === 0) {
        // cspell is happy without this word → permanently remove it
        console.log(`  ✓ removed: ${candidateWord}`)
        remaining.splice(i, 1)
        i-- // adjust index because we removed the current element
        removedCount++
    } else {
        // cspell failed → the word is still needed
        console.log(`  ✗ kept:    ${candidateWord}`)
        keptCount++
    }
}

// -------------------------------------------------------------------------------------------------
// Write final result
// -------------------------------------------------------------------------------------------------

await Bun.write(cspellPath, buildContent(remaining))
console.log(`\nDone. Kept ${keptCount} word(s), removed ${removedCount} word(s).`)
