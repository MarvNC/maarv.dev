# yomitan-dict-stats
- GitHub: https://github.com/MarvNC/yomitan-dict-stats
- Status: active
- Last pushed: 2024-05-12T01:44:44Z
- Last updated: 2026-02-14T16:39:05Z
- Homepage: none
- Role: owner
- Repo type: tool
- Primary language: JavaScript
- Language breakdown: JavaScript (89.2%), Shell (10.8%)
- Suggested tags: yomitan, yomichan, dictionary, dictionary-stats, japanese, chinese, language-learning, markdown-tooling
- Tier suggestion: feature

## One-liner
Lightweight utility repository for generating and maintaining Yomitan dictionary statistics tables. It uses a browser-console JavaScript extractor plus a small shell sorter, with the README serving as the published stats catalog.

## Evidence
- `gh api repos/MarvNC/yomitan-dict-stats` shows `archived: false`, owner `MarvNC`, `pushed_at` `2024-05-12T01:44:44Z`, `updated_at` `2026-02-14T16:39:05Z`, and empty homepage.
- `gh api repos/MarvNC/yomitan-dict-stats/languages` reports JavaScript (2501 bytes) and Shell (304 bytes), making JavaScript the primary language.
- `gh api repos/MarvNC/yomitan-dict-stats/git/trees/HEAD?recursive=1` shows a compact tooling-oriented tree: `generateStats.js`, `sort_table.sh`, `types.d.ts`, and `readme.md`.
- `gh api -H "Accept: application/vnd.github.raw+json" repos/MarvNC/yomitan-dict-stats/contents/generateStats.js` shows IndexedDB extraction from Yomitan's `dict` database and Markdown table output generation.
- `gh api -H "Accept: application/vnd.github.raw+json" repos/MarvNC/yomitan-dict-stats/readme` describes the project as dictionary stats for Yomichan/Yomitan and usage via browser console script execution.
