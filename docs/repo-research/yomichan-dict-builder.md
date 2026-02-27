# yomichan-dict-builder
- GitHub: https://github.com/MarvNC/yomichan-dict-builder
- Status: active (archived: false)
- Created: 2023-12-19T02:43:16Z
- Updated: 2026-02-16T20:04:00Z
- Last pushed: 2025-08-17T21:05:16Z
- Homepage: https://www.npmjs.com/package/yomichan-dict-builder
- Default branch: master
- Primary language: TypeScript
- Topics: dictionary, dictionary-conversion, dictionary-tools, npm, npm-module, yomichan, yomitan, yomitan-dictionaries
- Stars: 42
- Forks: 3
- Open issues: 1
- License: MIT License (MIT)

## One-liner
TypeScript npm library that programmatically builds complete Yomitan and Yomichan dictionary ZIP packages, reducing schema and packaging friction for dictionary pipeline projects.

## What It Does
- Provides a `Dictionary` API to assemble dictionary index data, term entries, kanji entries, metadata banks, and tags before export.
- Supports structured and simple term definitions, including advanced payloads used for richer dictionary content.
- Handles term and kanji metadata flows such as frequency and pitch-accent records expected by Yomitan format consumers.
- Bundles local assets (images, audio, CSS, and other files) into the final dictionary ZIP for self-contained distribution.
- Exports ready-to-use dictionary archives and reports output stats, enabling automation in conversion and release scripts.

## Stack And Delivery
- Implemented in TypeScript and distributed as an npm module (`yomichan-dict-builder`) for direct use in JS and TS toolchains.
- Uses a class-based builder model (`Dictionary`, `DictionaryIndex`, `TermEntry`, `KanjiEntry`) that maps cleanly to dictionary schema components.
- Ships as a library dependency rather than a standalone app, making it easy to embed in ETL or content-generation pipelines.
- README includes installation and usage examples plus links to multiple downstream projects that use the package in production workflows.

## Portfolio Notes
- Strong example of productized developer tooling: it turns a niche, error-prone packaging process into a reusable API surface.
- Demonstrates practical ecosystem impact through documented adoption in several public Yomitan dictionary projects.
- Good feature-tier artifact for portfolio curation because it combines domain-specific data modeling with distributable library engineering.
