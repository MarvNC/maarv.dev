# vndb-highlighter
- GitHub: https://github.com/MarvNC/vndb-highlighter
- Status: archived
- Last pushed: 2023-02-28T20:11:32Z
- Last updated: 2025-01-10T18:15:28Z
- Homepage: none
- Role: owner
- Repo type: userscript
- Primary language: JavaScript
- Language breakdown: JavaScript (100%)
- Suggested tags: userscript, vndb, tooltip, list-highlighting, violentmonkey
- Tier suggestion: list_item
## One-liner
An archived VNDB userscript that highlights known entries on staff/producer pages and adds cached tooltips for quick context. The README notes it has been superseded by a newer script in `MarvNC/vn-userscripts`.
## Evidence
- `gh api repos/MarvNC/vndb-highlighter` reports `archived: true`, `language: JavaScript`, topics `userscript` and `vndb`, and empty homepage.
- `gh api repos/MarvNC/vndb-highlighter/languages` returns only JavaScript bytes (`22760`), so the repo is effectively 100% JavaScript.
- `gh api repos/MarvNC/vndb-highlighter/git/trees/main?recursive=1` shows a minimal userscript layout: `vndb-list-highlighter.user.js`, `README.md`, and `LICENSE`.
- README content includes install instructions via raw `.user.js`, usage details for VNDB staff/producer highlighting and tooltips, and a top note saying it was replaced by another script.
