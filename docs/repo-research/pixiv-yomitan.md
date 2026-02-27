# pixiv-yomitan
- GitHub: https://github.com/MarvNC/pixiv-yomitan
- Status: active
- Last pushed: 2026-02-27T01:18:47Z
- Last updated: 2026-02-25T10:20:32Z
- Homepage: none
- Role: owner
- Repo type: dataset
- Primary language: TypeScript
- Language breakdown: TypeScript (97.1%), JavaScript (2.9%)
- Suggested tags: yomitan, japanese-dictionary, pixiv, dataset, bun, typescript, automation
- Tier suggestion: feature

## One-liner
Automated pipeline that converts Pixiv Encyclopedia dumps into large Yomitan dictionaries (full and light variants) and publishes fresh release artifacts daily. Built as a Bun + TypeScript data build project with reproducible export outputs.

## Evidence
- `gh api repos/MarvNC/pixiv-yomitan` reports `archived: false`, default branch `master`, and recent `pushed_at`/`updated_at` activity.
- `readme.md` states this is a conversion of Pixiv Encyclopedia for Yomitan, with daily automated releases and downloadable dictionary artifacts.
- `package.json` includes Bun build scripts (`buildPixiv`, `buildPixivLight`, `fetch-db`) and dependency on `yomichan-dict-builder`.
- `.github/workflows/build-release.yaml` runs on a daily cron, fetches DB data, builds both dictionary variants, and publishes a dated GitHub release.
- `src/index.ts` builds dictionary ZIP outputs and metadata/index links for release downloads.
- `src/scripts/fetchDatabase.ts` pulls latest `pixiv.db` from `MarvNC/pixiv-dump`; `prisma/schema.prisma` defines a SQLite-backed `PixivArticle` model.
