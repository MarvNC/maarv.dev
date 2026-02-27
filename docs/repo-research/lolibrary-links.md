# lolibrary-links
- GitHub: https://github.com/MarvNC/lolibrary-links
- Status: active
- Last pushed: 2026-02-16T11:50:37Z
- Last updated: 2026-02-16T11:50:41Z
- Homepage: none
- Role: owner
- Repo type: userscript
- Primary language: JavaScript
- Language breakdown: JavaScript (100%)
- Suggested tags: userscript, tampermonkey, lolibrary, annas-archive, nyaa, javascript, browser-enhancement
- Tier suggestion: list_item

## One-liner
Small browser userscript that augments lolibrary.moe entries with direct outbound links to Anna's Archive and related sources, improving click-through access to external archives/search results.

## Evidence
- `gh api repos/MarvNC/lolibrary-links` shows `archived: false`, owner `MarvNC`, default branch `main`, primary language `JavaScript`, and recent `pushed_at`/`updated_at` activity.
- `gh api repos/MarvNC/lolibrary-links/languages` returns only JavaScript bytes (`2797`), indicating a single-language codebase.
- `gh api repos/MarvNC/lolibrary-links/git/trees/main?recursive=1` lists just `.prettierrc`, `readme.md`, and `lolibrary-links.user.js`, consistent with a lightweight script repo.
- `readme.md` is minimal and primarily provides an install link to the raw `lolibrary-links.user.js` file.
- `lolibrary-links.user.js` contains userscript metadata (`// ==UserScript==`, `@match https://lolibrary.moe/*`) and DOM/`MutationObserver` logic that injects click handlers opening Anna's Archive and Nyaa links.
