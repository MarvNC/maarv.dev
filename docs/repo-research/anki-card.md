# anki-card
- GitHub: https://github.com/MarvNC/anki-card
- Status: active
- Last pushed: 2025-05-18T05:25:55Z
- Last updated: 2026-01-30T21:21:49Z
- Homepage: none
- Role: owner
- Repo type: tool
- Primary language: HTML
- Language breakdown: HTML (62.8%), CSS (37.2%)
- Suggested tags: anki, chinese-learning, flashcards, card-template, yomitan, pleco, html-css-js
- Tier suggestion: list_item

## One-liner
Anki card template pack for Chinese study with custom front/back HTML and CSS, tuned for Yomitan dictionary output and Pleco integration. It focuses on practical review UX (dual script display, glossary control, sentence/ruby toggle, media lightbox) rather than a deployable web app.

## Evidence
- `gh api repos/MarvNC/anki-card` shows owner `MarvNC`, `archived: false`, `homepage: null`, `language: HTML`, and the reported `pushed_at`/`updated_at` values.
- `gh api repos/MarvNC/anki-card/languages` reports only HTML and CSS bytes, consistent with a static template-style repository.
- `gh api repos/MarvNC/anki-card/git/trees/main?recursive=1` shows a compact structure centered on `zh/front.html`, `zh/back.html`, `zh/styling.css`, and `zh/readme.md`.
- `gh api repos/MarvNC/anki-card/contents/zh/readme.md -H "Accept: application/vnd.github.raw+json"` documents Anki-focused features (dual script display, glossary reordering, Pleco click actions, ruby toggle, night mode).
- `zh/front.html` and `zh/back.html` use Anki field placeholders (for example `{{Expression}}`, `{{Glossary}}`, `{{Sentence}}`) and client-side scripts for card behavior, indicating a card-template tool rather than a standalone website/app.
