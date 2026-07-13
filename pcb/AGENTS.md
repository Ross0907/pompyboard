# AGENTS.md

## Task Completion Requirements

`mise verify` must pass before considering tasks completed.

## Documentation

For a given component, links to its documentations and other related information can be found in `docs/components/*.md`.
Its front matter defines available documentations and the markdown body may contain other useful information.
PDF documentations are saved as `docs/components/*.pdf`.
If a PDF file that's defined in the front matter was not be found in the file system, run `bun run gen-docs` to download them.
If a PDF file is still not found, ask for the user to provide one.

## Dependencies

Use Exact version. e.g. "x.y.z" instead of "^x.y.z".
