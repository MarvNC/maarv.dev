# AGENTS.md

Guidance for coding agents working in this repository.

## Tooling

- Use Bun for package management and scripts.
- Install dependencies with `bun install`.
- Run commands with `bun run <script>`.

## Common Commands

- `bun run dev` - start local dev server
- `bun run typecheck` - TypeScript checks
- `bun run build` - production build
- `bun run format` - format codebase

## Product Direction

- This site is a personal portfolio with an animated bento layout.
- Do not reintroduce physics-based card movement.
- Keep projects as the main focus; personal callout should stay minimal.
- Preserve mobile friendliness and reduced-motion accessibility.

## UI Notes

- Keep blue, soft, calm visual language unless user requests otherwise.
- Prefer subtle, elegant animations over aggressive or bouncy effects.
- Avoid hover-only critical interactions; mobile users must still access content.
