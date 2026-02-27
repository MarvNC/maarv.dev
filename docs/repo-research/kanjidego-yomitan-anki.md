# kanjidego-yomitan-anki
- GitHub: https://github.com/MarvNC/kanjidego-yomitan-anki
- Status: active (archived: false)
- Created: 2024-03-04T05:24:49Z
- Last pushed: 2025-02-23T04:22:54Z
- Last updated: 2026-02-10T14:01:44Z
- Homepage: none
- Primary language: TypeScript
- Topics: anki, anki-cards, anki-deck, dictionary, japanese, japanese-dictionary, kanji, yomichan, yomitan, yomitan-dictionaries
- Stars: 18
- Forks: 1
- Open issues: 4
- Default branch: master
- License: none specified

## One-liner
Owner-built Japanese learning data pipeline that scrapes Kanji de Go term data and ships it as both a Yomitan importable dictionary and a ready-to-study Anki deck.

## What It Does
- Collects rare and uncommon kanji term data from the Kanji de Go ecosystem and related community sources.
- Produces a Yomitan-compatible dictionary package intended for direct import from release assets.
- Produces an Anki deck from the same source data so dictionary lookup and flashcard review stay aligned.
- Includes card-side usability features described in the README, such as copy-friendly text fields and optional hint images.
- Distributes build outputs through GitHub Releases, with AnkiWeb listed as an additional download channel.

## Stack And Delivery
- Core implementation is TypeScript, with supporting HTML/CSS/JavaScript assets for deck and dictionary presentation layers.
- Repository functions as a build-and-export project rather than a hosted web app, focused on artifact generation.
- README documents downstream compatibility expectations for modern Yomitan versions and known limits for older tooling.
- Delivery model is release-centric: users download prebuilt assets instead of running the pipeline locally.
- Default branch is `master`, and the project remains publicly maintained with issues enabled.

## Portfolio Notes
- Strong example of content engineering for language learning: one scraped dataset powers two end-user products.
- Demonstrates practical packaging discipline for community tools (Yomitan and Anki) with clear distribution paths.
- Useful showcase piece for data acquisition, normalization, and export automation in a niche but real user workflow.
- Good fit for a portfolio section on developer-owned educational tooling with measurable community adoption signals.
