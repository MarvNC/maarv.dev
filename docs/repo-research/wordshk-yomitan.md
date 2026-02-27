# wordshk-yomitan
- GitHub: https://github.com/MarvNC/wordshk-yomitan
- Status: active (archived: false)
- Created: 2023-12-22T04:58:23Z
- Last pushed: 2026-02-27T02:10:17Z
- Last updated: 2026-01-17T04:33:04Z
- Homepage: none
- Primary language: JavaScript
- Topics: cantonese, cantonese-dictionary, cantonese-language, dictionary, wordshk, yomichan, yomitan, yomitan-dictionaries
- Stars: 21
- Forks: 0
- Open issues: 1
- Default branch: master
- License: MIT License

## One-liner
Automated dictionary build-and-release project that converts Words.hk Cantonese data into Yomitan-compatible term, hanzi, and frequency dictionaries, then publishes fresh downloadable artifacts on a daily cadence.

## What It Does
- Converts Words.hk source data into installable Yomitan dictionaries for Cantonese lookup workflows.
- Produces multiple output dictionaries (main term dictionary, hanzi dictionary, and frequency data) for different study and reading use cases.
- Packages and publishes versioned release assets so end users can import directly into Yomitan without local build steps.
- Keeps dictionary content current through scheduled automatic updates rather than manual release-only maintenance.
- Positions the dataset for practical browser-based reading support, with README screenshots showing real in-context lookup behavior.

## Stack And Delivery
- JavaScript-based repository with a purpose-built dictionary conversion pipeline.
- Uses `yomichan-dict-builder` as the core build toolchain for Yomitan format generation.
- Pulls upstream lexical data from Words.hk and transforms it into Yomitan-ready ZIP release artifacts.
- Delivers distribution through GitHub Releases, with latest and versioned downloads linked from README.
- Ships as a public MIT-licensed codebase, while dictionary data attribution and source data licensing are documented in README.

## Portfolio Notes
- Strong portfolio example of data-to-product delivery: raw linguistic data ingestion, transformation, packaging, and end-user distribution in one repo.
- Demonstrates maintainer reliability through automation and recency (active, recently pushed, low issue count).
- Good evidence of ecosystem alignment: clear integration target (Yomitan) plus topic tagging that improves discoverability.
- Useful to position under language tooling and data pipeline projects, especially for Cantonese NLP and learning-tool adjacent work.
