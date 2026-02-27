# pixiv-dump
- GitHub: https://github.com/MarvNC/pixiv-dump
- Status: active
- Last pushed: 2026-01-18T09:59:56Z
- Last updated: 2026-02-25T13:54:27Z
- Homepage: none
- Role: owner
- Repo type: dataset
- Primary language: TypeScript
- Language breakdown: TypeScript (97.9%), JavaScript (2.1%)
- Suggested tags: pixiv, web-scraping, sqlite, prisma, typescript, github-actions, japanese-dataset
- Tier suggestion: feature

## One-liner
An automated pipeline that scrapes Pixiv Encyclopedia and publishes periodic SQLite database dumps for downstream use (for example dictionary generation). It is best presented as a data project with crawler automation rather than a user-facing app.

## Evidence
- `gh api repos/MarvNC/pixiv-dump` reports `archived: false`, `default_branch: "master"`, topics including `crawler`, `dump`, `pixiv`, and timestamps for `pushed_at`/`updated_at`.
- `gh api repos/MarvNC/pixiv-dump/languages` returns TypeScript (23001 bytes) and JavaScript (484 bytes), making TypeScript dominant.
- `gh api repos/MarvNC/pixiv-dump/git/trees/HEAD?recursive=1` is not truncated and shows scraper code in `src/scrape/*`, Prisma schema/migrations in `prisma/*`, and CI workflows in `.github/workflows/*`.
- `readme.md` states this repo contains Pixiv Encyclopedia dumps and points users to Releases for downloads.
- `prisma/schema.prisma` and `src/index.ts` show a SQLite-backed data model (`file:../db/pixiv.db`) plus automated scraping flow.
- `.github/workflows/continuousScrape.yaml` schedules scraping every 6 hours and creates releases containing `db/pixiv.db`.
