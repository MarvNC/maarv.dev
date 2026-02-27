# maarv.dev

Interactive portfolio built with Next.js, Bun, Tailwind, and spring-style DOM physics.

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Bun runtime / package manager

## Development

Install dependencies:

```bash
bun install
```

Run local dev server:

```bash
bun run dev
```

Useful commands:

```bash
bun run typecheck
bun run lint
bun run build
bun run format
```

## Data

- Project metadata lives in `data/projects.json`.
- Live stars and update times are fetched from GitHub in `lib/github.ts` with ISR caching.

Optional environment variable for higher GitHub rate limits:

```bash
GITHUB_TOKEN=your_token_here
```
