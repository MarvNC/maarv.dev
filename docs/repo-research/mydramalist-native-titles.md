# mydramalist-native-titles
- GitHub: https://github.com/MarvNC/mydramalist-native-titles
- Status: active
- Last pushed: 2026-02-06
- Last updated: 2026-02-06
- Homepage: none
- Role: owner
- Repo type: userscript
- Primary language: JavaScript
- Language breakdown: JavaScript (100%)
- Suggested tags: userscript, tampermonkey, violentmonkey, mydramalist, browser-automation
- Tier suggestion: list_item

## One-liner
A focused browser userscript that augments MyDramaList by injecting native-language titles for dramas and staff pages, with a toggle to keep English titles visible. It is a lightweight utility project suitable as a supporting portfolio item.

## Evidence
- `gh api repos/MarvNC/mydramalist-native-titles` shows `archived: false`, `default_branch: master`, `language: JavaScript`, `homepage: null`, and owner `MarvNC`.
- `gh api repos/MarvNC/mydramalist-native-titles/languages` returns only `JavaScript` (`7602` bytes), indicating a single-language codebase.
- `gh api repos/MarvNC/mydramalist-native-titles/git/trees/master?recursive=1` lists a small tree with `mydramalist-native-titles.user.js`, `readme.md`, and screenshot assets under `images/`.
- `mydramalist-native-titles.user.js` userscript header includes `@match https://mydramalist.com/*`, GM_* grants, and description "Adds native titles to MyDramaList," confirming the repo is a userscript utility.
- `readme.md` primarily contains install instructions and screenshots, with no packaging/build config files present, reinforcing the lightweight single-script nature.
