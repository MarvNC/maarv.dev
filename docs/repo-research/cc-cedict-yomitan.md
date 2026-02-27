# cc-cedict-yomitan
- GitHub: https://github.com/MarvNC/cc-cedict-yomitan
- Status: active (archived: false)
- Created: 2023-12-19T07:26:48Z
- Last pushed: 2026-02-27T02:41:58Z
- Last updated: 2026-02-22T08:55:11Z
- Homepage: none
- Primary language: TypeScript
- Topics: cantonese, cantonese-dictionary, cc-cedict, cedict, chinese, chinese-dictionary, chinese-language, chinese-study, yomichan, yomitan, yomitan-dictionaries
- Stars: 32
- Forks: 1
- Open issues: 3
- Default branch: master
- License: MIT License

## One-liner
Automated data pipeline that rebuilds and ships CC-CEDICT and CC-Canto as ready-to-import Yomitan dictionaries, giving Chinese learners continuously refreshed Mandarin and Cantonese lookup data.

## What It Does
- Packages multiple dictionary variants for different lookup flows: CC-CEDICT (Pinyin), CC-CEDICT Hanzi, CC-CEDICT Canto (Jyutping), and CC-Canto.
- Pulls upstream CC-CEDICT and CC-Canto source dumps, then transforms and normalizes entries into Yomitan-compatible release artifacts.
- Publishes latest downloadable dictionary ZIPs through GitHub Releases, so links can stay stable for end users.
- Targets practical study workflows inside the Yomitan browser extension, including both Mandarin-first and Cantonese-first reading support.
- Runs as an always-current dataset product rather than a one-off export, with daily refresh intent stated in the project README.

## Stack And Delivery
- Built in TypeScript with a script-driven build pipeline and repository tooling centered on Bun execution.
- Uses `yomichan-dict-builder` in the generation flow to produce extension-ready dictionary packages.
- Delivers artifacts through GitHub Releases for simple distribution and versioned historical snapshots.
- Repository metadata signals active maintenance: recent push/update activity, open issues enabled, and non-archived status.
- Source of truth is upstream lexical data projects (CC-CEDICT and CC-Canto), with this repo focused on transformation and packaging.

## Portfolio Notes
- Strong portfolio fit for data engineering plus developer tooling: automated ingest, transform, and publish loop with user-facing outputs.
- Demonstrates ownership of a niche but real user problem (Chinese dictionary quality/access in Yomitan) with sustained maintenance.
- Credibility signals are visible and measurable (stars, topics, active timestamps, release-oriented delivery model).
- Good companion piece to broader language-learning or dictionary tooling work because it bridges raw open data to polished consumable assets.
