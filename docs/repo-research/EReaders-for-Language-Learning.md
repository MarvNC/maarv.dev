# EReaders-for-Language-Learning
- GitHub: https://github.com/MarvNC/EReaders-for-Language-Learning
- Status: active
- Last pushed: 2026-01-10T01:26:00Z
- Last updated: 2026-01-14T01:13:55Z
- Homepage: https://ereaders.maarv.dev/
- Role: owner
- Repo type: website
- Primary language: Markdown
- Language breakdown: none reported by GitHub API (`{}`); repository appears docs-heavy (Markdown/YAML/JSON plus media assets)
- Suggested tags: ereader, language-learning, mkdocs, documentation, android, anki, yomitan
- Tier suggestion: feature

## One-liner
An MkDocs-powered documentation website for using Android e-readers in language learning workflows (dictionary lookups, Anki mining, and device reviews). It is content-first rather than application code.

## Evidence
- `gh api repos/MarvNC/EReaders-for-Language-Learning` shows `archived: false`, homepage `https://ereaders.maarv.dev/`, `pushed_at` 2026-01-10T01:26:00Z, and `updated_at` 2026-01-14T01:13:55Z.
- `readme.md` explicitly states: "This repository hosts the documentation for E-Readers for Language Learning, built with MkDocs."
- `mkdocs.yml` defines `site_name`, `site_url`, Material theme settings, and docs navigation, confirming static-site/docs usage.
- Tree data from `gh api .../git/trees/HEAD?recursive=1` is centered on `docs/`, review markdown pages, and large media assets (`docs/assets/*.mp4`, images), with no backend/app source layout.
- `gh api .../languages` returned `{}`, consistent with a documentation/media repository where GitHub language detection is not meaningful.
