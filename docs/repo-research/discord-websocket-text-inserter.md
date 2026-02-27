# discord-websocket-text-inserter
- GitHub: https://github.com/MarvNC/discord-websocket-text-inserter
- Status: active
- Last pushed: 2024-08-20T03:14:46Z
- Last updated: 2024-08-20T03:14:49Z
- Homepage: none
- Role: owner
- Repo type: userscript
- Primary language: JavaScript
- Language breakdown: JavaScript (100%)
- Suggested tags: discord, websocket, userscript, violentmonkey, automation
- Tier suggestion: list_item
## One-liner
A lightweight browser userscript that listens to a local websocket and posts incoming text into the currently open Discord channel. It is aimed at live text sharing workflows (e.g., VN/anime group reading) with built-in message rate limiting.
## Evidence
- `gh api repos/MarvNC/discord-websocket-text-inserter` shows `archived: false`, `language: JavaScript`, empty homepage, topics (`discord`, `textractor`, `userscript`, `websocket`), and latest `pushed_at`/`updated_at` timestamps.
- `gh api repos/MarvNC/discord-websocket-text-inserter/languages` reports only JavaScript (`4985` bytes).
- `gh api repos/MarvNC/discord-websocket-text-inserter/git/trees/main?recursive=1` shows a minimal repo with three files: `.prettierrc`, `discord-websocket-inserter.user.js`, and `readme.md`.
- The userscript header (`// ==UserScript==`) targets `https://discord.com/channels/*`, uses Violentmonkey/Tampermonkey GM APIs, and declares purpose: receive websocket text and send to Discord.
- README usage instructs installing the `.user.js`, connecting to local `127.0.0.1` websocket (default port `6677`), and notes Discord API/selfbot risk plus built-in rate limiting.
