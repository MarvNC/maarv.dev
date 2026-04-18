# AGENTS.md

Guidance for coding agents working in this repository.

## Tooling

- Use Bun for package management and scripts.
- Install dependencies with `bun install`.
- Run commands with `bun run <script>`.

## Commits

Use commitlint format for commits.
Commit only your changes; other agents may also be making changes simultaneously.

## Common Commands

- `bun run dev` - start local dev server
- `bun run typecheck` - TypeScript checks
- `bun run build` - production build
- `bun run format` - format codebase

## Product Direction

- This site is a personal portfolio with an animated bento layout.
- Keep projects as the main focus; personal callout should stay minimal.
- Preserve mobile friendliness and reduced-motion accessibility.

## UI Notes

- Keep blue, soft, calm visual language unless user requests otherwise.
- Prefer subtle, elegant animations over aggressive or bouncy effects.
- Avoid hover-only critical interactions; mobile users must still access content.
- Check [impeccable.md](.impeccable.md) for mnore

## Design Context

**IMPORTANT:** When touching any UI, styling, layout, animation, or design-related code, you MUST read `.impeccable.md` in the project root before making changes. It contains the authoritative design context, brand personality, aesthetic direction, design principles, and design token reference for this project.

Summary of key principles (full details in `.impeccable.md`):

- Brand is **warm, playful, human** — not corporate, not a product page
- The "wow" comes from craft and detail, not flashy effects
- Projects are always the primary focus
- Light mode only; bento grid layout is the established pattern
- All motion must respect `prefers-reduced-motion`; no physics/spring simulations
