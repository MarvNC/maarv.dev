# yomichan-dict-reader
- GitHub: https://github.com/MarvNC/yomichan-dict-reader
- Status: active
- Last pushed: 2023-03-07T18:41:55Z
- Last updated: 2023-08-29T14:41:04Z
- Homepage: none
- Role: owner
- Repo type: library
- Primary language: JavaScript
- Language breakdown: JavaScript (100%)
- Suggested tags: japanese, dictionary, yomichan, nodejs, npm-package, parser
- Tier suggestion: list_item

## One-liner
A small Node.js library that reads Yomichan-format ZIP dictionaries and exposes lookup helpers for terms, readings, definitions, and kanji metadata. It is published to npm and appears stable but low-activity.

## Evidence
- `gh api repos/MarvNC/yomichan-dict-reader` reports `archived: false`, `language: JavaScript`, `topics` including `dictionary`/`japanese`/`yomichan`, `pushed_at: 2023-03-07T18:41:55Z`, and `updated_at: 2023-08-29T14:41:04Z`.
- `gh api repos/MarvNC/yomichan-dict-reader/languages` returns only JavaScript bytes (`9187`), so language use is effectively JavaScript-only.
- `gh api repos/MarvNC/yomichan-dict-reader/git/trees/master?recursive=1` shows package-oriented files (`package.json`, `package-lock.json`, `yomichan.js`, `test/test.js`) and bundled dictionary fixtures in `test/*.zip`.
- `package.json` sets `name: yomichan-dict-reader`, `main: yomichan.js`, `description: Reads Japanese dictionaries in a .zip format compatible with Yomichan.`, and `scripts.test: node ./test/test.js`, which supports classifying it as a reusable library/tooling package.
- `readme.md` documents API calls like `readDictionary`, `getReadingsForTerm`, `getDefinitionsForTermReading`, and `readKanjiDictionary`, confirming the repository is a dictionary reader/parsing library rather than an app or website.
