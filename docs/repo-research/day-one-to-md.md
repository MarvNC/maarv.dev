# day-one-to-md
- GitHub: https://github.com/MarvNC/day-one-to-md
- Status: active (`archived: false`)
- Created: 2026-02-09T08:38:29Z
- Updated: 2026-02-09T08:51:53Z
- Last pushed: 2026-02-09T08:38:32Z
- Homepage: https://day-one-to-md.maarv.dev/
- Primary language: JavaScript
- Topics: none
- Stars: 0
- Forks: 0
- Open issues: 0
- Default branch: master
- License: none

## One-liner
Local, privacy-first web tool that converts Day One exports (`Journal.json` or `.zip`) into a single chronological Markdown file ready for backup, migration, or reuse.

## What It Does
- Accepts either a raw `Journal.json` file or a Day One `.zip` export that contains `Journal.json`.
- Parses entries in-browser and orders them oldest to newest using `creationDate` (with `modifiedDate` fallback).
- Generates one combined Markdown document with UTC timestamp headers (`# yyyy-mm-dd hh-mm-ss`).
- Separates entries with `---` to keep long journal exports readable and portable.
- Supports quick output workflows from the browser, including copy/download style export actions.

## Stack And Delivery
- Frontend-only JavaScript app delivered as a static Vite site.
- Local development is Bun-based (`bun install`, `bun run dev`) for fast setup and iteration.
- File conversion runs fully in the browser with no upload path or server-side processing.
- Hosted homepage is configured and publicly accessible at `https://day-one-to-md.maarv.dev/`.

## Portfolio Notes
- Strong utility project for demonstrating practical data portability and user-first privacy decisions.
- Clear product scope and low operational complexity make it easy to maintain as a long-lived personal tool.
- Good fit for a "small polished tools" portfolio section: focused UX, concrete use case, and immediate user value.
- Next growth lever would be broader import/export compatibility (for example, Obsidian or Notion-ready variants).
