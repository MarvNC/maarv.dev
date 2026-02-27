# kanjidego-yomitan-anki
- GitHub: https://github.com/MarvNC/kanjidego-yomitan-anki
- Status: active
- Last pushed: 2025-02-23T04:22:54Z
- Last updated: 2026-02-10T14:01:44Z
- Homepage: none
- Role: owner
- Repo type: dataset
- Primary language: TypeScript
- Language breakdown: TypeScript 74.8%, HTML 19.9%, CSS 4.1%, JavaScript 1.2%
- Suggested tags: japanese, kanji, yomitan, anki, dictionary, scraper
- Tier suggestion: feature
## One-liner
Owner-maintained Japanese learning data project that scrapes Kanji de Go terms and packages them as both a Yomitan dictionary and an Anki deck. The repository combines source generation scripts with ready-to-use exported artifacts.
## Evidence
- `gh api repos/MarvNC/kanjidego-yomitan-anki` shows `archived: false`, default branch `master`, topics for `anki`, `dictionary`, `kanji`, and recent `updated_at`/`pushed_at` timestamps.
- `gh api repos/MarvNC/kanjidego-yomitan-anki/languages` reports TypeScript as primary (29,933 bytes), followed by HTML, CSS, and JavaScript.
- `gh api repos/MarvNC/kanjidego-yomitan-anki/git/trees/master?recursive=1` shows both source and data outputs, including `src/scrape/*`, `src/yomitan/*`, `src/anki/*`, and large exports `export/termData.json` and `export/ankiDeck.csv`.
- README states the repo is for Kanji de Go content "for Yomitan and as an Anki deck," with downloads via GitHub Releases and AnkiWeb.
- `package.json` scripts (`makeYomitan`, `makeAnki`) and dependencies (`yomichan-dict-builder`, `jsdom`, `sharp`) confirm a data-build pipeline rather than a deployed app.
