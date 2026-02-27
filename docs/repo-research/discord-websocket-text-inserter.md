# discord-websocket-text-inserter
- GitHub: https://github.com/MarvNC/discord-websocket-text-inserter
- Status: active (archived: false)
- created_at: 2023-12-30T22:53:32Z
- updated_at: 2024-08-20T03:14:49Z
- pushed_at: 2024-08-20T03:14:46Z
- homepage: none
- language: JavaScript
- topics: discord, textractor, userscript, websocket
- stargazers_count: 0
- forks_count: 0
- open_issues_count: 0
- default_branch: main
- license: none

## One-liner
A browser userscript that relays local websocket text into the currently open Discord channel to support real-time shared reading and watch-along workflows.

## What It Does
- Connects to a local websocket source and receives live text updates from external tools.
- Posts incoming text directly into the active Discord channel in the browser.
- Targets group VN reading and anime watch sessions where fast shared context matters.
- Provides configurable websocket port handling, with 6677 documented as the common default.
- Includes built-in pacing to reduce Discord message ratelimit risk during rapid text streams.

## Stack And Delivery
- Delivered as a single JavaScript userscript for Violentmonkey/Tampermonkey installation.
- Runs against `https://discord.com/channels/*`, using the logged-in browser session context.
- Integrates with websocket-producing tools such as `textractor_websocket` and `mpv_websocket`.
- Uses localhost-only websocket access (`127.0.0.1`) due to browser content security policy limits.
- Distribution is repo-hosted and installable via the raw `.user.js` URL from GitHub.

## Portfolio Notes
- Shows practical browser automation for a specific niche workflow, not a generic demo app.
- Demonstrates cross-tool glue work: desktop text extraction/video tooling to web chat delivery.
- Highlights awareness of operational constraints (Discord API/selfbot risk and ratelimit behavior).
- Best presented as a focused utility project that emphasizes execution speed and user workflow fit.
