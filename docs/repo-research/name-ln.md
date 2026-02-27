# name-ln
- GitHub: https://github.com/MarvNC/name-ln
- Status: active
- Last pushed: 2024-10-17T08:17:30Z
- Last updated: 2024-10-17T08:17:33Z
- Homepage: none
- Role: owner
- Repo type: tool
- Primary language: TypeScript
- Language breakdown: TypeScript (8440, ~85.9%), AutoHotkey (1389, ~14.1%)
- Suggested tags: deno, cli, epub, light-novel, file-renaming, metadata, typescript, autohotkey
- Tier suggestion: list_item

## One-liner
`name-ln` is a Deno-based CLI (with a small Windows GUI companion) that renames light novel EPUB files and folders to a standardized naming scheme for cleaner sorting and collection management.

## Evidence
- `gh api repos/MarvNC/name-ln` shows `archived: false`, `language: TypeScript`, no homepage, and owner `MarvNC`.
- `gh api repos/MarvNC/name-ln/languages` reports TypeScript and AutoHotkey, matching CLI + GUI split.
- `gh api repos/MarvNC/name-ln/git/trees/master?recursive=1` includes `src/main.ts`, `src/processEpubFiles.ts`, `src/gui.ahk`, and CI workflows.
- `readme.md` states this is a Light Novel Naming Scheme utility with CLI usage and a Windows `gui.exe` workflow.
- `package.json` description and `src/main.ts` confirm a command-line renaming tool that processes file/directory inputs with optional metadata flags.
