# StampNyaa
- GitHub: https://github.com/MarvNC/StampNyaa
- Status: active
- Last pushed: 2025-03-23T05:30:14Z
- Last updated: 2026-02-25T04:48:19Z
- Homepage: none
- Role: owner
- Repo type: app
- Primary language: TypeScript
- Language breakdown: TypeScript (53.6k), SCSS (14.9k), HTML (6.3k), JavaScript (5.6k), Shell (58)
- Suggested tags: electron, typescript, desktop-app, line-stickers, sticker-manager, cross-platform, discord, telegram
- Tier suggestion: feature
## One-liner
StampNyaa is a cross-platform Electron desktop app that downloads LINE sticker packs and lets users paste stickers into chat apps like Discord, WhatsApp, and Telegram. It includes local sticker management, favorites, and packaging workflows for Windows/macOS/Linux.
## Evidence
- `gh api repos/MarvNC/StampNyaa` reports description as a desktop app for LINE stickers, `archived: false`, `language: TypeScript`, and topics including `desktop-app`, `line-sticker`, `windows`, `macos`, `linux`.
- `gh api repos/MarvNC/StampNyaa/languages` shows TypeScript as dominant, with SCSS/HTML/JavaScript also present.
- `gh api repos/MarvNC/StampNyaa/git/trees/HEAD?recursive=1` shows Electron-oriented files like `forge.config.js`, `src/preload.js`, `src/index.ts`, and GitHub Actions build/release workflows.
- `gh api repos/MarvNC/StampNyaa/contents/package.json -H "Accept: application/vnd.github.raw+json"` confirms Electron Forge scripts (`start`, `make`, `publish`) and Electron dependencies.
- `gh api repos/MarvNC/StampNyaa/contents/readme.md -H "Accept: application/vnd.github.raw+json"` describes the app as cross-platform and focused on downloading/using LINE stickers outside LINE.
