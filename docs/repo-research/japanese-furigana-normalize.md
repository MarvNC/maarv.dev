# japanese-furigana-normalize
- GitHub: https://github.com/MarvNC/japanese-furigana-normalize
- Status: active
- Last pushed: 2024-07-07T04:30:49Z
- Last updated: 2025-05-09T20:58:36Z
- Homepage: https://www.npmjs.com/package/japanese-furigana-normalize
- Role: owner
- Repo type: library
- Primary language: TypeScript
- Language breakdown: TypeScript (94.5%), JavaScript (5.5%)
- Suggested tags: japanese, furigana, yomitan, text-processing, npm, typescript
- Tier suggestion: list_item
## One-liner
`japanese-furigana-normalize` is a small TypeScript npm library that normalizes Japanese readings so furigana aligns cleanly with mixed-script terms (kanji/kana), with a focus on Yomitan dictionary workflows.
## Evidence
- `gh api repos/MarvNC/japanese-furigana-normalize` shows `archived: false`, `language: TypeScript`, `default_branch: master`, topics (`japanese`, `kana`, `kanji`, `katakana`, `npm`, `tool`, `typescript`), and timestamps for `pushed_at`/`updated_at`.
- `gh api repos/MarvNC/japanese-furigana-normalize/languages` reports TypeScript 8393 bytes and JavaScript 484 bytes (about 94.5% / 5.5%).
- `gh api repos/MarvNC/japanese-furigana-normalize/git/trees/master?recursive=1` shows a package-style layout (`package.json`, `src/`, tests, and npm publish workflow), indicating a distributable code library rather than an app/site.
- `gh api repos/MarvNC/japanese-furigana-normalize/readme -H "Accept: application/vnd.github.raw"` describes the core function `normalizeReading(term, reading)` and explicitly frames the project as a furigana normalization utility for Yomitan dictionaries.
- `gh api repos/MarvNC/japanese-furigana-normalize/contents/.github/workflows/publish.yml -H "Accept: application/vnd.github.raw"` contains an npm publish pipeline (release-triggered + manual dispatch), supporting active-maintenance posture.
