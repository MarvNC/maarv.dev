# twitter-rss-discord-webhook
- GitHub: https://github.com/MarvNC/twitter-rss-discord-webhook
- Status: active
- Last pushed: 2023-11-11T21:08:10Z
- Last updated: 2026-01-15T13:50:40Z
- Homepage: none
- Role: owner
- Repo type: tool
- Primary language: JavaScript
- Language breakdown: JavaScript (100%)
- Suggested tags: discord, webhook, rss, nitter, twitter, deepl, automation, nodejs
- Tier suggestion: list_item

## One-liner
A Node.js automation script that polls Nitter RSS feeds and posts updates to Discord webhooks, with optional DeepL translation and fxtwitter link rewriting for richer embeds.

## Evidence
- `gh api repos/MarvNC/twitter-rss-discord-webhook` shows `archived: false`, `default_branch: master`, topics (`discord`, `nitter`, `twitter`, etc.), and owner `MarvNC`.
- `gh api repos/MarvNC/twitter-rss-discord-webhook/languages` returns only `JavaScript` (4114 bytes), supporting the primary language and breakdown.
- `gh api repos/MarvNC/twitter-rss-discord-webhook/git/trees/master?recursive=1` shows a small script-focused tree: `index.js`, `package.json`, `settings.example.json`, and `readme.md`.
- `readme.md` describes posting Twitter/Nitter RSS entries to Discord webhooks and optional translation with DeepL.
- `index.js` implements interval feed polling, Discord webhook posting via `axios`, RSS parsing via `rss-parser`, fxtwitter URL rewrite, and DeepL translation calls.
