# words-hk-parse
- GitHub: https://github.com/MarvNC/words-hk-parse
- Status: active
- Last pushed: 2025-11-19T02:25:29Z
- Last updated: 2025-11-19T02:25:33Z
- Homepage: https://www.npmjs.com/package/words-hk-parse
- Role: owner
- Repo type: library
- Primary language: TypeScript
- Language breakdown: TypeScript (100%)
- Suggested tags: cantonese, dictionary, words.hk, jyutping, csv, parser, typescript, npm
- Tier suggestion: feature

## One-liner
`words-hk-parse` is a TypeScript npm library that downloads and parses Words.hk Cantonese dictionary CSV data into structured entries. It also includes Jyutping/text parsing utilities and test-backed parsing logic.

## Evidence
- `gh api repos/MarvNC/words-hk-parse` shows `archived: false`, `language: TypeScript`, push/update timestamps, npm homepage, and owner `MarvNC`.
- `gh api repos/MarvNC/words-hk-parse/languages` returns only `TypeScript` bytes (46,794), indicating a TypeScript-only codebase.
- `gh api repos/MarvNC/words-hk-parse/git/trees/master?recursive=1` shows library-style structure: `src/`, `tests/`, and CI workflows for test/publish.
- `README.md` states it is a standalone TypeScript library for downloading/parsing Words.hk data and documents exported functions (`downloadLatest`, `parseCsvFile`, `getLatestData`).
- `package.json` confirms npm packaging (`name: words-hk-parse`, version `1.0.11`, `exports`, `dist` files, Node engine >=18, parser-related keywords).
