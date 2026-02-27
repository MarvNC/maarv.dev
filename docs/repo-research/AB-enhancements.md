# AB-enhancements
- GitHub: https://github.com/MarvNC/AB-enhancements
- Status: active
- Last pushed: 2025-06-23T21:31:15Z
- Last updated: 2025-06-23T21:31:20Z
- Homepage: none
- Role: owner
- Repo type: userscript
- Primary language: JavaScript
- Language breakdown: JavaScript (100%)
- Suggested tags: userscript, animebytes, automation, metadata-autofill, filtering
- Tier suggestion: feature
## One-liner
Collection of AnimeBytes-focused userscripts that automate upload metadata entry, improve release filtering, and add quality-of-life UI tweaks. Built for Violentmonkey/Tampermonkey-style execution in the browser.
## Evidence
- `gh api repos/MarvNC/AB-enhancements` shows `archived: false`, owner `MarvNC`, default branch `master`, primary language `JavaScript`, and push/update timestamps in June 2025.
- `gh api repos/MarvNC/AB-enhancements/languages` returns only JavaScript bytes, indicating a single-language scripting codebase.
- `gh api repos/MarvNC/AB-enhancements/git/trees/HEAD?recursive=1` lists multiple `*.user.js` files (`ab-printed-media-autofill.user.js`, `ab-releases-filtering.user.js`, etc.), matching userscript conventions.
- `readme.md` explicitly describes AnimeBytes enhancement scripts and recommends Violentmonkey.
- Userscript metadata block in `ab-printed-media-autofill.user.js` includes `// ==UserScript==`, `@match https://animebytes.tv/upload.php`, and Greasemonkey `@grant` directives.
