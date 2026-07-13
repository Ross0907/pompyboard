import { createHash } from "node:crypto"
import { basename, join } from "node:path"
import { parse } from "yaml"
import { z } from "zod"

const componentsDir = join(import.meta.dir, "..", "docs", "components")
const downloadTimeoutMs = 15_000

const documentSchema = z.object({
    label: z.string().trim().min(1),
    url: z.url(),
    sha256: z
        .string()
        .regex(/^[a-f0-9]{64}$/, "must be a 64-character lowercase hex SHA-256 hash")
        .optional(),
})

const frontMatterSchema = z.object({
    documents: z.array(documentSchema).min(1),
})

type FrontMatter = z.infer<typeof frontMatterSchema>

type ComponentDoc = {
    component: string
    markdownFile: string
    frontMatter: FrontMatter
}

type ParsedComponent =
    { ok: true; doc: ComponentDoc } | { ok: false; markdownFile: string; errors: string[] }

function documentFilename(component: string, label: string) {
    return `${component} ${label}.pdf`
}

function sha256Hex(bytes: ArrayBuffer) {
    return createHash("sha256").update(Buffer.from(bytes)).digest("hex")
}

function isPdf(bytes: ArrayBuffer) {
    return Buffer.from(bytes, 0, 4).toString() === "%PDF"
}

async function fileExists(path: string) {
    return await Bun.file(path).exists()
}

function parseFrontMatter(markdown: string, markdownFile: string) {
    if (!markdown.startsWith("---\n")) {
        throw new Error(`${markdownFile}: missing front matter block`)
    }

    const end = markdown.indexOf("\n---", 4)
    if (end === -1) {
        throw new Error(`${markdownFile}: unterminated front matter block`)
    }

    return parse(markdown.slice(4, end))
}

async function readComponent(markdownFile: string): Promise<ParsedComponent> {
    const component = basename(markdownFile, ".md")

    try {
        const markdownPath = join(componentsDir, markdownFile)
        const markdown = await Bun.file(markdownPath).text()
        const parsed = parseFrontMatter(markdown, markdownFile)
        const result = frontMatterSchema.safeParse(parsed)

        if (!result.success) {
            return {
                ok: false,
                markdownFile,
                errors: result.error.issues.map((issue) => {
                    const path = issue.path.length > 0 ? issue.path.join(".") : "front matter"
                    return `${path}: ${issue.message}`
                }),
            }
        }

        return {
            ok: true,
            doc: {
                component,
                markdownFile,
                frontMatter: result.data,
            },
        }
    } catch (error) {
        return {
            ok: false,
            markdownFile,
            errors: [error instanceof Error ? error.message : String(error)],
        }
    }
}

async function readComponentDocs() {
    const glob = new Bun.Glob("*.md")
    const markdownFiles = Array.from(glob.scanSync({ cwd: componentsDir }))
        .filter((file) => file !== "README.md")
        .sort((a, b) => a.localeCompare(b))

    const parsed = await Promise.all(markdownFiles.map(readComponent))
    const failures = parsed.filter((item) => !item.ok)

    if (failures.length > 0) {
        console.error("Invalid component front matter:")
        for (const failure of failures) {
            if (failure.ok) continue
            console.error(`\n${failure.markdownFile}`)
            for (const error of failure.errors) {
                console.error(`  - ${error}`)
            }
        }
        throw new Error(`front matter validation failed in ${failures.length} file(s)`)
    }

    return parsed.flatMap((item) => (item.ok ? [item.doc] : []))
}

async function readOrDownloadDocument(component: string, label: string, url: string) {
    const filename = documentFilename(component, label)
    const targetPath = join(componentsDir, filename)

    if (await fileExists(targetPath)) {
        const file = Bun.file(targetPath)
        if (file.size > 0) {
            console.info(`skip ${filename}`)
            return await file.arrayBuffer()
        }
    }

    console.info(`download ${filename}`)
    const response = await fetch(url, {
        headers: {
            "user-agent":
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
            accept: "application/pdf,*/*;q=0.8",
        },
        signal: AbortSignal.timeout(downloadTimeoutMs),
    })
    if (!response.ok) {
        throw new Error(`${filename}: download failed with HTTP ${response.status}`)
    }

    const contentType = response.headers.get("content-type") ?? ""
    const bytes = await response.arrayBuffer()
    if (!isPdf(bytes)) {
        throw new Error(
            `${filename}: expected PDF response, got ${contentType || "unknown content type"}`,
        )
    }

    await Bun.write(targetPath, bytes)
    return bytes
}

async function verifyDocument(doc: ComponentDoc, document: FrontMatter["documents"][number]) {
    const filename = documentFilename(doc.component, document.label)

    const bytes = await readOrDownloadDocument(doc.component, document.label, document.url)
    const actualHash = sha256Hex(bytes)

    if (!document.sha256) {
        return { missingHash: `${doc.markdownFile} ${document.label}: ${actualHash}` }
    }

    if (document.sha256 !== actualHash) {
        return { hashMismatch: `${filename}: expected ${document.sha256}, got ${actualHash}` }
    }

    console.info(`hash ok ${filename}`)
    return {}
}

async function verifyDocuments(docs: ComponentDoc[]) {
    const missingHashes: string[] = []
    const hashMismatches: string[] = []

    const results = await Promise.all(
        docs.flatMap((doc) =>
            doc.frontMatter.documents.map((document) => verifyDocument(doc, document)),
        ),
    )

    for (const result of results) {
        if (result.missingHash) missingHashes.push(result.missingHash)
        if (result.hashMismatch) hashMismatches.push(result.hashMismatch)
    }

    if (missingHashes.length > 0 || hashMismatches.length > 0) {
        if (missingHashes.length > 0) {
            console.error("\nMissing front matter sha256 values:")
            for (const missingHash of missingHashes) {
                console.error(`  - ${missingHash}`)
            }
        }

        if (hashMismatches.length > 0) {
            console.error("\nSHA-256 mismatches:")
            for (const mismatch of hashMismatches) {
                console.error(`  - ${mismatch}`)
            }
        }

        throw new Error("document hash verification failed")
    }
}

async function writeComponentReadme(docs: ComponentDoc[]) {
    const lines = [
        "<!-- This file is generated by ../../scripts/docs.ts. Do not edit manually. -->",
        "",
        "# Component docs",
        "",
        ...docs.flatMap((doc) => [`## [${doc.component}](./${doc.markdownFile})`, ""]),
    ]

    await Bun.write(join(componentsDir, "README.md"), lines.join("\n"))
    console.info("updated docs/components/README.md")
}

async function main() {
    const docs = await readComponentDocs()
    await verifyDocuments(docs)
    await writeComponentReadme(docs)
}

main().catch((error) => {
    console.error(error instanceof Error ? error.message : error)
    process.exit(1)
})
