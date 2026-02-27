# yomichan-dict-reader
- GitHub: https://github.com/MarvNC/yomichan-dict-reader
- Status: active (archived: false)
- Created: 2022-10-20T22:02:29Z
- Updated: 2023-08-29T14:41:04Z
- Last pushed: 2023-03-07T18:41:55Z
- Homepage: none
- Primary language: JavaScript
- Topics: dictionary, dictionary-tools, japanese, japanese-dictionary, npm, yomichan
- Stars: 2
- Forks: 0
- Open issues: 0
- Default branch: master
- License: none

## One-liner
A focused Node.js library for loading Yomichan-format ZIP dictionaries and providing fast lookup helpers for Japanese terms, readings, definitions, and kanji data.

## What It Does
- Reads Yomichan ZIP dictionaries into memory with `readDictionary(...)` for query-time access.
- Supports term and reading lookups in both directions via methods like `getReadingsForTerm(...)` and `getTermsForReading(...)`.
- Returns structured definition objects (term, reading, tags, deinflectors, popularity, senses, sequence) using `getDefinitionsForTermReading(...)`.
- Exposes deinflection metadata for conjugated forms with `getDeinflectorsForTermReading(...)`.
- Handles kanji dictionaries through `readKanjiDictionary(...)` and `getKanjiInfo(...)`, including readings, meanings, and reference stats.
- Provides dictionary-wide helpers such as `getAllEntriesFromDict(...)`, `getAllTermsInDict(...)`, and `dictContains(...)`.

## Stack And Delivery
- Implemented as a JavaScript Node module and published as an npm package (`yomichan-dict-reader`).
- Consumed as a reusable library (CommonJS `require`) rather than a standalone app or service.
- Uses Yomichan-compatible ZIP files as its core input format, matching common Japanese study dictionary exports.
- API surface is synchronous-looking for lookups after async dictionary load, which fits tooling and script workflows.
- Repository is small and single-language, with lightweight test fixtures and example dictionaries in the test assets.

## Portfolio Notes
- Good portfolio fit as a niche developer tool: clear problem scope, practical utility, and domain-specific parsing.
- Demonstrates applied Japanese language tooling experience and familiarity with dictionary data models.
- Strongest evidence is the usable API breadth (term, reading, definitions, kanji, full-dictionary traversal) in a compact package.
- Activity is low since 2023, so position it as a stable utility project rather than an actively evolving product.
