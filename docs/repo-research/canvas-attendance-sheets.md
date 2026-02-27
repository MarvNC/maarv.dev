# canvas-attendance-sheets
- GitHub: https://github.com/MarvNC/canvas-attendance-sheets
- Status: active
- Last pushed: 2024-10-03T23:40:43Z
- Last updated: 2024-10-03T23:40:47Z
- Homepage: none
- Role: owner
- Repo type: tool
- Primary language: TypeScript
- Language breakdown: TypeScript (100%)
- Suggested tags: canvas, attendance, csv, markdown, pdf, bun, automation
- Tier suggestion: list_item
## One-liner
Small Bun-based CLI utility that converts Canvas gradebook CSV exports into CRN-specific attendance sheets, then renders both Markdown and PDF outputs. It is a focused automation script rather than a reusable package or web app.
## Evidence
- `gh api repos/MarvNC/canvas-attendance-sheets` reports `archived: false`, `default_branch: master`, and timestamps (`pushed_at`/`updated_at`) from 2024-10-03.
- `gh api repos/MarvNC/canvas-attendance-sheets/languages` returns only `TypeScript` bytes, indicating a single-language codebase.
- `gh api repos/MarvNC/canvas-attendance-sheets/git/trees/master?recursive=1` shows a compact script-style structure (`src/index.ts`, `data/`, `output/`, `package.json`).
- README states the workflow: export Canvas gradebook CSV, place it in `data`, run `bun run . <path>`, and receive generated files in `output`.
- `src/index.ts` parses gradebook CSV sections by `CRN`, writes `attendance-<CRN>.md`, then converts each Markdown file to PDF via `md-to-pdf`.
- `package.json` depends on `csv-parse` and `md-to-pdf` with Bun module entrypoint, reinforcing classification as a lightweight CLI automation tool.
