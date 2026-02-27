# nyaawords
- GitHub: https://github.com/MarvNC/nyaawords
- Status: active (archived: false)
- Created: 2025-05-18T21:14:12Z
- Updated: 2025-12-04T05:49:49Z
- Last pushed: 2025-12-04T05:49:45Z
- Homepage: https://nyaawords.app/
- Default branch: main
- Primary language: TypeScript
- Topics: none set
- Stars: 0
- Forks: 0
- Open issues: 1
- License: none

## One-liner
AI-powered multilingual dictionary app that uses Google Gemini to generate structured entries with pronunciation, then serves them in a fast Next.js interface for language learners.

## What It Does
- Looks up terms across English, Japanese, Chinese, Cantonese, and Korean with automatic source-language detection.
- Generates dictionary-style definitions using Gemini 2.5 Flash with optional web grounding for fresher results.
- Returns pronunciation support per language (Jyutping with tones, Pinyin, kana, and Revised Romanization).
- Validates AI output against schema rules to keep entries consistent and easier to trust.
- Supports language-learning workflows with planned Anki integration and flashcard-oriented output direction.

## Stack And Delivery
- Built as a Next.js 15 + TypeScript web app with Tailwind CSS and shadcn/ui components.
- Implements lookup through Next.js API routes backed by the Google Generative AI SDK.
- Uses AJV-based schema validation to enforce structured response shape.
- Caching strategy covers in-memory storage for development and Cloudflare KV for production targets.
- Ships with Bun-based scripts for local dev, build, linting, and formatting.

## Portfolio Notes
- Strong portfolio piece for applied AI product engineering because it combines prompting, validation, and practical UX in one app.
- Demonstrates multilingual product thinking beyond translation, including script-specific pronunciation conventions.
- Good evidence of production intent via deployed homepage and explicit Cloudflare deployment path.
- Position as a feature-level project that can be expanded with AnkiConnect and sentence tokenization milestones.
