# texthooker-websocket
- GitHub: https://github.com/MarvNC/texthooker-websocket
- Status: archived
- Last pushed: 2023-01-15T07:43:26Z
- Last updated: 2023-02-03T17:58:01Z
- Homepage: none
- Role: owner
- Repo type: userscript
- Primary language: JavaScript
- Language breakdown: JavaScript (100%)
- Suggested tags: userscript, websocket, textractor, texthooker, visual-novel
- Tier suggestion: list_item

## One-liner
Archived JavaScript userscript that injects websocket text into `texthooker.html` for Textractor workflows. The README marks it as replaced by `Renji-XD/texthooker-ui`, so it is mainly useful as legacy reference.

## Evidence
- `gh api repos/MarvNC/texthooker-websocket` reports `archived: true`, default branch `master`, primary language `JavaScript`, and timestamps for `pushed_at`/`updated_at`.
- `gh api repos/MarvNC/texthooker-websocket/languages` returns only `JavaScript` (9017 bytes), supporting the single-language breakdown.
- `gh api repos/MarvNC/texthooker-websocket/git/trees/master?recursive=1` shows a very small tree: `texthooker.user.js`, `readme.md`, and `images/*`.
- `texthooker.user.js` starts with a UserScript header (`// ==UserScript==`) and websocket usage (`new WebSocket('ws://localhost:6677/')`), confirming repo type and purpose.
- `readme.md` explicitly says it is "Replaced by the superior texthooker-ui," supporting archived/legacy positioning and lower tiering.
