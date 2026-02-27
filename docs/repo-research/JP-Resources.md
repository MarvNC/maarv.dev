# JP-Resources
- GitHub: https://github.com/MarvNC/JP-Resources
- Status: active (`archived: false`)
- Created: 2022-07-10T17:16:43Z
- Updated: 2026-02-17T16:01:47Z
- Last pushed: 2025-06-01T09:31:22Z
- Homepage: none
- Primary language: Python
- Topics: anki, anki-addon, anki-flashcards, japanese, japanese-language, japanese-learning, japanese-study, yomichan
- Stars: 132
- Forks: 5
- Open issues: 2
- Default branch: main
- License: MIT License

## One-liner
A high-value Japanese learning toolkit repo that combines practical Anki and Yomichan workflow guides with reusable frequency datasets and Python backfill scripts.

## What It Does
- Curates core Japanese learning resources, including recommended dictionaries and related community tools.
- Documents a frequency-sorting workflow for mined Anki cards using a configurable Yomichan `freq` handlebar.
- Provides command-line backfilling guidance and scripts for adding frequency values to existing cards at scale.
- Includes a dedicated stylized-frequency backfill flow for JP Mining Note (`FrequenciesStylized`) with configurable dictionary ordering.
- Shares card-template utilities such as NSFW blur toggles, sentence highlighting automation, and text-replacement patterns.

## Stack And Delivery
- Python scripts power card-frequency backfill automation (`backfill.py`, `backfill-stylized.py`).
- Large plain-text frequency assets are shipped directly in-repo for immediate local use.
- Delivery is documentation-first via Markdown playbooks and copy-paste template/code snippets.
- Integrates with end-user tools rather than a hosted service (Anki, AnkiConnect, Yomichan).
- Distribution model is GitHub clone/download with no deployment pipeline or runtime service.

## Portfolio Notes
- Strong example of community-focused developer enablement: clear workflows, pragmatic defaults, and advanced customization paths.
- Demonstrates product thinking for real learner pain points (queue prioritization, backfill migration, review ergonomics).
- Useful as a "docs plus tooling" portfolio piece that blends maintainable scripts, domain datasets, and hands-on UX guidance.
