# yomitan-dict-stats

- GitHub: https://github.com/MarvNC/yomitan-dict-stats
- Status: active (archived: false)
- Created: 2023-12-11T03:35:13Z
- Updated: 2026-02-14T16:39:05Z
- Pushed: 2024-05-12T01:44:44Z
- Homepage: none
- Default branch: master
- Primary language: JavaScript
- Topics: chinese, chinese-dictionary, dictionary, japanese, japanese-dictionary, japanese-language, japanese-learning, yomichan, yomitan, yomitan-dictionaries
- Stars: 21
- Forks: 1
- Open issues: 1
- License: none specified

## One-liner
Compact data tooling project that generates and curates large Yomichan/Yomitan dictionary statistics tables for Japanese, Cantonese, and Mandarin learning ecosystems.

## What It Does
- Publishes a large catalog of dictionary coverage data so learners can compare dictionaries by entry count and metadata.
- Organizes stats by language and dictionary type (frequency, bilingual, monolingual, grammar, kanji, and hanzi) to support practical selection decisions.
- Uses a browser-console workflow to run `generateStats.js` from the Yomitan options page against installed dictionary data.
- Produces markdown-first outputs so the repository README doubles as a browsable, shareable stats reference.
- Documents caveats about counting methodology (for example, variant-heavy dictionaries being overcounted), which improves interpretation quality.

## Stack And Delivery
- JavaScript-first utility code with a lightweight shell helper (`sort_table.sh`) for table ordering and maintenance.
- Data collection approach is client-side and local to the user setup (via Yomitan environment), not a hosted backend service.
- Delivery format is repository-native documentation: generated markdown tables committed directly to README.
- Repo is intentionally small and tooling-focused, optimized for repeatable refreshes of stats snapshots.

## Portfolio Notes
- Strong example of niche developer tooling that creates high utility for a language-learning community with minimal infrastructure.
- Demonstrates pragmatic product thinking: clear output format, reproducible generation path, and explicit methodology caveats.
- Useful proof point for data-wrangling + documentation craftsmanship, especially where the README itself is the product surface.
- Candidate positioning: feature-level portfolio item for educational tooling, open data workflows, and ecosystem curation.
