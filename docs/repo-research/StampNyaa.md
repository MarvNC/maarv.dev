# StampNyaa
- GitHub: https://github.com/MarvNC/StampNyaa
- Status: active (archived: false)
- Created: 2023-07-01T09:52:35Z
- Updated: 2026-02-25T04:48:19Z
- Last pushed: 2025-03-23T05:30:14Z
- Homepage: none
- Primary language: TypeScript
- Topics: desktop, desktop-app, discord, line, line-sticker, linux, macos, nyaa, pc, stamp, stickers, stickers-apps, telegram-stickers, windows
- Stars: 83
- Forks: 2
- Open issues: 19
- Default branch: master
- License: none

## One-liner
StampNyaa is a desktop utility that lets users download LINE sticker packs and quickly send those stickers in non-LINE chat apps.

## What It Does
- Downloads sticker packs from LINE Sticker Shop links for local use.
- Lets users send stickers into apps like Discord, WhatsApp, and Telegram through quick paste workflows.
- Provides a global hotkey and tray access so the picker can be opened from anywhere.
- Supports favorites and local pack organization for faster sticker lookup.
- Allows manual custom pack import by dropping PNG assets into the app sticker directory.
- Documents platform caveats, including macOS accessibility requirements and some animated sticker limitations.

## Stack And Delivery
- Primary implementation is TypeScript with desktop-focused web stack assets (SCSS, HTML, JavaScript) in an Electron app.
- Distributed as a cross-platform desktop product for Windows, macOS, and Linux.
- End users install from GitHub Releases; README points to release assets as the standard delivery path.
- Local development flow is Node.js-based with Yarn scripts (`yarn install`, `yarn start`, `yarn make`).

## Portfolio Notes
- Strong portfolio candidate for cross-platform desktop product work with practical consumer utility.
- Demonstrates full product thinking: acquisition flow (shop URL), daily-use UX (hotkey/tray), and content management (favorites/custom packs).
- Shows platform integration experience across clipboard/shortcut behaviors and OS-specific permission handling.
- Public adoption signals are meaningful for curation (`83` stars, `2` forks) while still small enough to discuss personal ownership impact.
