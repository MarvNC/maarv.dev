# is-cjk-hanzi
- GitHub: https://github.com/MarvNC/is-cjk-hanzi
- Status: active
- Last pushed: 2024-02-11T04:49:43Z
- Last updated: 2024-02-29T23:44:03Z
- Homepage: https://www.npmjs.com/package/is-cjk-hanzi
- Role: owner
- Repo type: library
- Primary language: TypeScript
- Language breakdown: TypeScript (75.8%), JavaScript (24.2%)
- Suggested tags: cjk, hanzi, kanji, unicode, text-processing, npm, typescript
- Tier suggestion: list_item
## One-liner
`is-cjk-hanzi` is a small npm utility library for detecting whether text contains CJK Hanzi/Kanji characters, including surrogate-pair-safe checks for single-character validation. It is geared toward text-processing use cases rather than a standalone app.
## Evidence
- `gh api repos/MarvNC/is-cjk-hanzi` shows `archived: false`, `language: TypeScript`, `homepage: https://www.npmjs.com/package/is-cjk-hanzi`, topics related to Chinese/Japanese/Korean text utilities, and the `pushed_at`/`updated_at` timestamps.
- `gh api repos/MarvNC/is-cjk-hanzi/languages` reports TypeScript `2091` bytes and JavaScript `669` bytes (about 75.8% / 24.2%).
- `gh api repos/MarvNC/is-cjk-hanzi/git/trees/master?recursive=1` shows a package-style code layout (`package.json`, `src/`, tests, TypeScript config), consistent with a reusable library.
- `gh api repos/MarvNC/is-cjk-hanzi/readme -H "Accept: application/vnd.github.raw"` explicitly describes CJK Hanzi/Kanji detection and documents exported functions `isCJKHanzi` and `isSingleCJKHanzi`.
- `gh api repos/MarvNC/is-cjk-hanzi/contents/package.json -H "Accept: application/vnd.github.raw"` confirms npm packaging (`name`, `version`, `main`), AVA tests, TypeScript build, and text-focused keywords.
