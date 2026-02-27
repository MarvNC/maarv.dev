# pixiv-yomitan

- GitHub: https://github.com/MarvNC/pixiv-yomitan
- Status: active (archived: false)
- Created at: 2024-02-10T08:57:33Z
- Last pushed: 2026-02-27T01:18:47Z
- Last updated: 2026-02-25T10:20:32Z
- Homepage: none
- Primary language: TypeScript
- Topics: dictionary, japanese, japanese-dictionary, pixiv, pixiv-encyclopedia, yomichan, yomitan, yomitan-dictionaries
- stargazers_count: 51
- forks_count: 0
- open_issues_count: 2
- Default branch: master
- License: none

## One-liner
Daily automated data product that converts Pixiv Encyclopedia dumps into production-ready Yomitan dictionaries, including both full and size-optimized builds for different learner device constraints.

## What It Does
- Converts the public Pixiv Encyclopedia corpus into Yomitan importable dictionary artifacts for Japanese lookup workflows.
- Processes a very large source set (README cites 630,000+ entries), positioning it as a high-coverage proper noun and pop culture reference dictionary.
- Publishes two output variants: a full `Pixiv` package and a lighter `PixivLight` package that removes heavier sections to reduce footprint.
- Runs continuous refreshes from upstream data dumps (`MarvNC/pixiv-dump`) and ships a new release every day.
- Produces ready-to-download release assets so end users can import directly into Yomitan without local build steps.

## Stack And Delivery
- Runtime and build tooling are Bun + TypeScript, selected in README for speed and memory efficiency on large dictionary builds.
- Dictionary generation is built on top of `yomichan-dict-builder` for Yomitan-compatible packaging.
- Delivery model is release-driven distribution on GitHub Releases, with latest artifacts exposed through the repo releases page.
- Automation is cron-like daily release generation (as described in README), supporting recurring dataset refreshes.
- Product includes environment-aware development mode support for smaller local test exports before full-scale builds.

## Portfolio Notes
- Strong example of data-to-product automation: recurring ingestion, transformation, packaging, and distribution in one reproducible pipeline.
- Demonstrates practical tradeoff design via dual deliverables (`Pixiv` vs `PixivLight`) to balance completeness against install size/performance.
- Useful showcase for language-learning ecosystem impact: high-coverage Japanese reference data integrated into a widely used lookup tool.
- Good signal for production ownership: active maintenance cadence, clear user distribution path, and measurable public adoption (stars/issues).
