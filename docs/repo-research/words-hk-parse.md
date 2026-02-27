# words-hk-parse
- GitHub: https://github.com/MarvNC/words-hk-parse
- Status: active (archived: false)
- Created: 2025-11-18T22:34:01Z
- Updated: 2025-11-19T02:25:33Z
- Last pushed: 2025-11-19T02:25:29Z
- Homepage: https://www.npmjs.com/package/words-hk-parse
- Primary language: TypeScript
- Topics: cantonese, cantonese-language, dictionary, wordshk
- Stargazers: 0
- Forks: 0
- Open issues: 0
- Default branch: master
- License: none listed

## One-liner
`words-hk-parse` is a TypeScript npm library that downloads the latest Words.hk Cantonese dictionary CSV data and parses it into strongly typed, application-ready entries.

## What It Does
- Downloads current Words.hk CSV snapshots and saves them locally for repeatable data ingestion.
- Parses dictionary rows into structured entries with headwords, readings, tags, senses, and multilingual explanation fields.
- Provides an all-in-one workflow (`getLatestData`) that fetches and parses in a single call.
- Includes Cantonese reading utilities that align Hanzi text with Jyutping token sequences.
- Exposes text helpers such as Hanzi, Jyutping, and punctuation detection for downstream parsing pipelines.

## Stack And Delivery
- TypeScript-first library design with exported types for dictionary entities and language payloads.
- Distributed as an npm package (`words-hk-parse`) with Node.js 18+ runtime expectations.
- Built with modern TS tooling (tsup) and tested with Bun-based test suites.
- API is organized around small composable functions (`downloadLatest`, `parseCsvFile`, `getLatestData`, parsing utilities).
- Source and release model fit data-tooling reuse in scripts, ETL jobs, and language-learning apps.

## Portfolio Notes
- Strong niche alignment: practical Cantonese language-data infrastructure, not a generic parsing demo.
- Clear product value from README: turns raw Words.hk exports into typed JSON ready for search, indexing, or app features.
- Good feature framing for portfolio: ingestion + normalization + phonetic parsing in one package.
- Candidate showcase angle: multilingual lexicographic data modeling and utility-driven API design for developer ergonomics.
