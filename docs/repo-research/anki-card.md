# anki-card
- GitHub: https://github.com/MarvNC/anki-card
- Status: active (archived: false)
- Created: 2025-04-03T23:36:17Z
- Updated: 2026-01-30T21:21:49Z
- Last pushed: 2025-05-18T05:25:55Z
- Homepage: none
- Primary language: HTML
- Topics: none
- Stars: 2
- Forks: 0
- Open issues: 0
- Default branch: main
- License: none

## One-liner
A Chinese-learning Anki card template repository that improves review usability with script-aware rendering, dictionary control, and quick lookup integrations instead of shipping a standalone app.

## What It Does
- Renders front and back cards with randomized simplified and traditional character display when used with CC-CEDICT data through Yomitan parsing.
- Lets users control glossary priority with regex-based ordering rules and per-card dictionary emphasis.
- Adds click-to-search behavior from card content into Pleco for fast lookup during review.
- Supports sentence display modes with a toggle between plain Hanzi and ruby-annotated text when `SentenceReading` is available.
- Improves study flow with expression highlighting, collapsed-first glossary display, and media lightbox expansion for images.

## Stack And Delivery
- Built as static Anki template assets (HTML and CSS) with client-side behavior embedded in card templates.
- Designed around Anki note fields such as `Expression`, `Glossary`, `Reading`, `Sentence`, `Media`, and related audio/source fields.
- Integrates with Yomitan plus CC-CEDICT dictionary formatting to enable dual-script and glossary features.
- Includes mobile-friendly study actions via Pleco deep-link style click interactions from expression and sentence text.
- Supports Anki night mode styling without requiring a separate deployment pipeline or hosted runtime.

## Portfolio Notes
- Good portfolio fit as a high-leverage learning tool artifact that demonstrates UX thinking inside strict template constraints.
- Shows practical product judgment: reducing review clutter, preserving fast lookup, and making multilingual content more readable.
- Demonstrates integration work across Anki templates, dictionary output conventions, and external app handoff.
- Best presented as a specialized productivity/tooling project rather than a general web application.
