# day-one-to-md
- GitHub: https://github.com/MarvNC/day-one-to-md
- Status: active
- Last pushed: 2026-02-09T08:38:32Z
- Last updated: 2026-02-09T08:51:53Z
- Homepage: https://day-one-to-md.maarv.dev/
- Role: owner
- Repo type: tool
- Primary language: JavaScript
- Language breakdown: JavaScript (7023), CSS (3183), HTML (1877)
- Suggested tags: day-one, markdown, javascript, vite, bun, privacy-first, file-conversion
- Tier suggestion: feature

## One-liner
Browser-based Day One export converter that turns `Journal.json` or `.zip` archives into one chronologically sorted Markdown file. Processing is local-only in the client, with copy/download output actions for quick export.

## Evidence
- `gh api repos/MarvNC/day-one-to-md` shows `archived: false`, `default_branch: master`, homepage set, and recent `pushed_at`/`updated_at` timestamps.
- `gh api repos/MarvNC/day-one-to-md/languages` reports JavaScript, CSS, and HTML only, with JavaScript dominant by bytes.
- `gh api repos/MarvNC/day-one-to-md/git/trees/master?recursive=1` shows a small Vite-style structure: `index.html`, `src/main.js`, `src/style.css`, `package.json`, and `bun.lock`.
- `README.md` describes a local web app flow (`bun install`, `bun run dev`) and Day One input/output behavior.
- `package.json` confirms Vite dev/build scripts and `jszip` dependency, indicating a client-side file-processing utility.
- `src/main.js` implements drag-and-drop/file input, `.zip` + `Journal.json` parsing, chronological sorting, Markdown generation, and clipboard/download actions in-browser.
