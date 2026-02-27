# name-ln
- GitHub: https://github.com/MarvNC/name-ln
- Status: active (`archived: false`)
- Created: 2024-10-17T06:17:24Z
- Last pushed: 2024-10-17T08:17:30Z
- Last updated: 2024-10-17T08:17:33Z
- Homepage: none
- Primary language: TypeScript
- Topics: none
- Stars: 1
- Forks: 0
- Open issues: 1
- Default branch: master
- License: none

## One-liner
`name-ln` is a light novel renaming utility that applies a strict naming scheme to files and folders so collections stay sortable, consistent, and metadata-rich.

## What It Does
- Renames light novel files and directories to a standardized format based on author, date, volume, title, publisher/label, retailer, and optional extras.
- Enforces a consistent filename structure designed for chronological sorting and machine readability.
- Supports batch processing for multiple files or multiple directories in one run.
- Preserves original title information while normalizing the rest of the naming pattern.
- Provides optional retailer and extra metadata flags to encode source/context directly into filenames.

## Stack And Delivery
- Core implementation is a TypeScript CLI (GitHub language report: 8440 bytes TypeScript, 1389 bytes AutoHotkey).
- Windows users get a small AutoHotkey-based GUI (`gui.exe`) with drag-and-drop input.
- CLI path is intended for all platforms through release binaries and command-line options.
- Distribution is release-driven, with downloadable executables linked from GitHub Releases.
- No public project homepage is configured; GitHub repository and releases act as the delivery surface.

## Portfolio Notes
- Strong niche utility: solves a concrete organizer pain point for light novel collectors with clear before/after value.
- Good example of productized automation: same core workflow exposed through both CLI and simple GUI.
- Shows practical metadata design thinking (human-readable plus machine-sortable naming).
- Small but focused public footprint (1 star, 0 forks), so best positioned as a craftsmanship/tooling case study rather than social-proof-heavy project.
