# better-bookwalker
- GitHub: https://github.com/MarvNC/better-bookwalker
- Status: active (archived: false)
- Created: 2020-11-16T00:29:34Z
- Last updated: 2025-09-02T07:53:35Z
- Last pushed: 2025-05-29T19:11:31Z
- Homepage: none
- Primary language: TypeScript
- Topics: bookwalker, charts, userscript
- Stars: 5
- Forks: 0
- Open issues: 5
- Default branch: main
- License: MIT License (MIT)

## One-liner
Bookwalker enhancement userscript that adds a cleaner series view and release-date charting, delivered as an installable `.user.js` script for Violentmonkey users.

## What It Does
- Enhances Bookwalker series pages (JP and global) with richer series information.
- Adds release-date charts to help readers visualize publishing cadence over time.
- Runs automatically when users visit supported series pages after script install.
- Focuses on end-user UX upgrades without requiring a browser extension store install.

## Stack And Delivery
- Built as a TypeScript userscript project with React and Vite.
- Uses `vite-plugin-monkey` to bundle and package userscript output.
- Distributed through GitHub Releases as `better-bookwalker.user.js` for direct install.
- Intended for Violentmonkey (primary tested manager), with browser-side execution on target pages.
- Uses `pnpm dev` for local development and `pnpm build` for production builds.

## Portfolio Notes
- Strong example of shipping a practical browser-side product outside extension marketplaces.
- Demonstrates product thinking: data visualization and information architecture for a niche reader workflow.
- Shows sustained maintenance history (multi-year repo activity and active issue tracker).
- Good showcase piece for frontend plus tooling depth in TypeScript, React, and Vite-based distribution.
