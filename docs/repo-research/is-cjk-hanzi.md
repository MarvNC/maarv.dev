# is-cjk-hanzi
- GitHub: https://github.com/MarvNC/is-cjk-hanzi
- Status: active (not archived)
- Archived: false
- Created: 2024-02-11T04:41:46Z
- Updated: 2024-02-29T23:44:03Z
- Last pushed: 2024-02-11T04:49:43Z
- Homepage: https://www.npmjs.com/package/is-cjk-hanzi
- Primary language: TypeScript
- Topics: chinese, japanese, korean, language-utilities, npm, text-utility
- Stars: 3
- Forks: 0
- Open issues: 0
- Default branch: master
- License: none

## One-liner
`is-cjk-hanzi` is a focused npm library for CJK Hanzi/Kanji detection, including a surrogate-pair-safe single-character check for Unicode edge cases.

## What It Does
- Detects whether a string contains at least one CJK Hanzi/Kanji character via `isCJKHanzi`.
- Validates whether input is exactly one CJK Hanzi character via `isSingleCJKHanzi`.
- Handles supplementary-plane Hanzi that appear as surrogate pairs in JavaScript strings.
- Supports text-filtering and language-aware processing workflows where quick CJK checks are needed.

## Stack And Delivery
- Implemented in TypeScript and published as an npm package.
- Repository language is TypeScript, with some JavaScript support in delivery usage examples.
- Distributed as a lightweight utility module intended for direct import in Node.js tooling.
- Public GitHub repo with default branch `master` and npm homepage for package consumption.

## Portfolio Notes
- Strong example of solving a narrow but real Unicode correctness problem with clear API boundaries.
- Useful portfolio evidence for multilingual text-processing competency and edge-case awareness.
- Best positioned as a supporting utility in a broader language tooling, NLP, or input-validation project set.
