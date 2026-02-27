# canvas-attendance-sheets
- GitHub: https://github.com/MarvNC/canvas-attendance-sheets
- Status: active (archived: false)
- Created: 2024-10-03T22:47:55Z
- Last pushed: 2024-10-03T23:40:43Z
- Last updated: 2024-10-03T23:40:47Z
- Homepage: none
- Primary language: TypeScript
- Topics: none
- Stars: 0
- Forks: 0
- Open issues: 0
- Default branch: master
- License: none

## One-liner
Single-purpose Bun CLI that transforms a Canvas gradebook CSV into per-CRN attendance sheets, exporting each sheet as both Markdown and PDF.

## What It Does
- Accepts a Canvas gradebook export CSV as input from the command line (`bun run . <path to canvas csv>`).
- Parses the gradebook and groups records by course CRN so each section gets its own attendance artifact.
- Generates Markdown attendance sheets for each detected CRN to keep results editable and versionable.
- Converts generated Markdown sheets to PDF for print-friendly classroom use and easier distribution.
- Uses a simple local workflow (`/data` input, `/output` results) optimized for quick repeat runs by an instructor.

## Stack And Delivery
- Runtime and package tooling: Bun (`bun install`, `bun run`) with a TypeScript codebase.
- Data processing: CSV parsing pipeline tailored to Canvas gradebook export format.
- Document output: Markdown generation plus PDF rendering via `md-to-pdf`.
- Delivery model: local command-line utility (not a hosted service, package library, or web app).
- Repository posture: lightweight automation project with no releases, no homepage, and no external deployment surface.

## Portfolio Notes
- Strong example of practical workflow automation: turns repetitive academic admin work into a one-command process.
- Demonstrates end-to-end data transformation, from structured CSV ingestion to dual-format deliverables.
- Good curation fit as an operations/productivity utility that shows usefulness over UI complexity.
- Best presented as a personal tooling project for educators or course staff who work with Canvas exports.
