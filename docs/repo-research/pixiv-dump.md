# pixiv-dump

- GitHub: https://github.com/MarvNC/pixiv-dump
- Status: active (`archived: false`)
- Created: 2024-02-08T08:19:16Z
- Last pushed: 2026-01-18T09:59:56Z
- Last updated: 2026-02-25T13:54:27Z
- Homepage: none
- Primary language: TypeScript
- Topics: crawler, database, dump, encyclopedia, japanese, pixiv, pixiv-crawler, pixiv-database, scraping
- Stars: 9
- Forks: 1
- Open issues: 1
- Default branch: master
- License: none

## One-liner
Automated Pixiv Encyclopedia dataset pipeline that publishes downloadable SQLite dumps for downstream products such as Japanese dictionary tooling.

## What It Does
- Collects and packages Pixiv Encyclopedia content into a structured local database format.
- Publishes database dumps through GitHub Releases for straightforward download and reuse.
- Exposes article-level fields (for example tag name, summary, reading, main text, counts, and related tags) suited to search and indexing workflows.
- Supports dictionary-oriented downstream usage, including the linked `pixiv-yomitan` project.
- Frames the repo as a maintained data product rather than an end-user web application.

## Stack And Delivery
- TypeScript is the primary implementation language for the scraping and data pipeline code.
- SQLite is the delivery artifact format, making the dataset easy to consume offline and script against.
- Prisma schema defines the dump structure and field contract for `PixivArticle` records.
- GitHub acts as the distribution channel via Releases and as the canonical source repository.
- Topic metadata emphasizes crawler/scraping/database positioning for discoverability.

## Portfolio Notes
- Strong portfolio angle for data engineering and automation: repeatable collection, normalization, and publish workflow.
- Useful proof of practical Japanese content handling and domain-focused dataset design.
- Complements app-facing repos by showing infrastructure and dataset production capability.
- For presentation, highlight concrete consumers (for example Yomitan dictionaries) to make impact legible.
