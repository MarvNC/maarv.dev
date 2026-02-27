# yomichan-dict-builder
- GitHub: https://github.com/MarvNC/yomichan-dict-builder
- Status: active
- Last pushed: 2025-08-17T21:05:16Z
- Last updated: 2026-02-16T20:04:00Z
- Homepage: https://www.npmjs.com/package/yomichan-dict-builder
- Role: owner
- Repo type: library
- Primary language: TypeScript
- Language breakdown: TypeScript (100%)
- Suggested tags: yomitan, yomichan, dictionary-builder, npm-library, typescript, jszip
- Tier suggestion: feature

## One-liner
TypeScript npm library for programmatically building Yomitan/Yomichan dictionary ZIPs, including index, term/kanji banks, metadata, tags, and bundled assets. It is an actively maintained core building block used by multiple downstream dictionary-generation projects.

## Evidence
- `gh api repos/MarvNC/yomichan-dict-builder` shows `archived: false`, `description: "Build Yomitan dictionaries with ease"`, `language: "TypeScript"`, npm homepage, and recent `updated_at`/`pushed_at` values.
- `gh api repos/MarvNC/yomichan-dict-builder/languages` returns only `TypeScript` bytes, supporting a TypeScript-first implementation.
- `gh api repos/MarvNC/yomichan-dict-builder/git/trees/master?recursive=1` shows a package-style layout with `src/`, `examples/`, `package.json`, and CI workflows (`test-build`, `prettier-check`, `npm-publish`).
- `readme.md` explicitly describes the project as a library for building Yomitan dictionaries and documents class-based APIs (`Dictionary`, `DictionaryIndex`, `TermEntry`, `KanjiEntry`).
- `package.json` confirms npm distribution (`name: yomichan-dict-builder`, `version: 2.10.0`) and build/publish scripts (`build`, `prepublish`).
- `src/index.ts` exports builder classes and implements dictionary assembly/export via JSZip, including bank chunking and ZIP file output.
