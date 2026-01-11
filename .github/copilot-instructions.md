# Copilot Instructions: Soc Ops Bingo

## Development Checklist

Before committing code changes:

- [ ] `npm run lint` — No ESLint errors
- [ ] `npm run build` — TypeScript compiles cleanly
- [ ] `npm run test` — All Vitest tests pass

## Architecture

**Soc Ops** is a React 19 + TypeScript bingo game for social mixers. 24 randomized questions + 1 free space, win with 5-in-a-row.

**Core Pattern**: Pure game logic in [src/utils/bingoLogic.ts](src/utils/bingoLogic.ts) (no React), React state in [src/hooks/useBingoGame.ts](src/hooks/useBingoGame.ts), presentational components in [src/components/](src/components/).

**State Flow**: `useBingoGame` hook → `'start'|'playing'|'bingo'` → conditionally renders StartScreen or GameScreen → BingoBoard (5×5 grid) → BingoSquare cells

**Persistence**: LocalStorage saves game state with schema validation (key: `bingo-game-state`, version: 1). Always increment `STORAGE_VERSION` when changing schema.

## Developer Workflows

- `npm run dev` — Vite dev server (port 5173)
- `npm run build` — TypeScript check + build → auto-deploys to GitHub Pages on main push
- `npm run test` — Vitest (add `-- --watch` for continuous)
- `npm run lint` — ESLint flat config

**Tests**: Pure functions tested in [src/utils/bingoLogic.test.ts](src/utils/bingoLogic.test.ts). Setup in [src/test/setup.ts](src/test/setup.ts). Test user interactions, not implementation.

## Code Conventions

**TypeScript**: Strict mode, explicit types, avoid `any`. Export types with implementations.

**React**: Functional components only. Use `useMemo` for expensive calcs, `useCallback` for stable handlers. Immutable state updates:

```typescript
// ✓ Good
toggleSquare(board, id).map((sq) =>
  sq.id === id ? { ...sq, isMarked: !sq.isMarked } : sq
);
// ✗ Avoid
board[id].isMarked = true;
```

**Tailwind v4**: No config file. Use `@theme` in [src/index.css](src/index.css). Native opacity (`bg-black/50`), container queries (`@container`, `@md:`), utilities-first. See [.github/instructions/tailwind-4.instructions.md](.github/instructions/tailwind-4.instructions.md).

**Design**: Avoid generic AI aesthetics per [.github/instructions/frontend-design.instructions.md](.github/instructions/frontend-design.instructions.md)—commit to cohesive theme, dominant colors with sharp accents, high-impact animations.

## Design Guide: Soft Pastel Clouds

**Aesthetic**: Dreamy, uplifting sky with layered pastels, translucent glassmorphism, and soft motion that feels like drifting through clouds at golden hour.

**Color Palette** (declared in [src/index.css](src/index.css) `@theme`):

- `--color-sky-haze` / `--color-sky-zenith` — Background gradients from cool morning blue to airy noon.
- `--color-sky-dawn` / `--color-sky-twilight` — Warm sunrise and lilac twilight accents for highlights and badges.
- `--color-cloud-soft` / `--color-cloud-bright` — Base whites for cards, pills, and clouds.
- `--color-cloud-blush` — Pink tinted glow for floating blobs and celebratory states.
- `--color-accent` / `--color-accent-strong` — Primary pastel berry accent for CTA text and marked states.
- `--color-highlight` — Peach accent for winning feedback moments.

**Typography**: Use `var(--font-display)` (`Quicksand`) for headings and CTA copy, and `var(--font-body)` (`Work Sans`) everywhere else. Keep tone warm and encouraging; rely on font-weight hierarchy rather than artificial glows.

**Visual Effects**:

- `sky-stage`, `cloud-layer`, and `cloud-blob` create the animated atmospheric backdrop; adjust blob positions rather than removing them to keep depth.
- `cloud-card`, `cloud-pill`, `cloud-button`, and `badge-soft` deliver glassy surfaces with soft borders and shadows—reuse them for new panels or controls.
- Leverage pastel-friendly shadows (`--shadow-soft`, `--shadow-bright`) and subtle motion (`floatCloud` keyframes). Avoid harsh glows, scanlines, or glitch effects.

**Component Patterns**:

- **Start Screen**: Central `cloud-card` hero with CTA (`cloud-button`) plus helpful secondary pills. Copy should stay conversational and welcoming.
- **Game Screen**: Header card summarises the session; cloud backdrop remains visible. Reset actions use pill styling, not destructive buttons.
- **Bingo Board**: Layered glass effect (rounded board frame with backdrop blur). Squares mark state with pastel fills and the uppercase “marked” label—avoid returning to `[X]` glyphs.
- **Modal**: Generous white space, celebratory messaging, dual-action row (primary `cloud-button`, secondary `cloud-pill`).

**Accessibility**: Aim for 4.5:1 contrast on body copy against card surfaces; keep animations gentle and respect `prefers-reduced-motion` (pause non-essential effects). Ensure hover-only cues (e.g., square borders) also change color/weight for clear focus states.

## Key Integration Points

**Questions**: Edit [src/data/questions.ts](src/data/questions.ts) array (24 items, shuffled on board gen). `FREE_SPACE` constant for center square.

**Bingo Logic**: [src/utils/bingoLogic.ts](src/utils/bingoLogic.ts) checks 5 rows + 5 columns + 2 diagonals (O(12)). Fisher-Yates shuffle (O(n)). Memoized to prevent re-renders.

**Deployment**: [vite.config.ts](vite.config.ts) computes `base` from `VITE_REPO_NAME` env var for GitHub Pages.

## Common Tasks

**Add Question**: Edit [src/data/questions.ts](src/data/questions.ts), run `npm run test`

**Change Board Size**: Update `BOARD_SIZE`/`CENTER_INDEX` in [src/utils/bingoLogic.ts](src/utils/bingoLogic.ts), `grid-cols-5` in [src/components/BingoBoard.tsx](src/components/BingoBoard.tsx), update tests

**Debug**: Check `checkBingo()` in [src/utils/bingoLogic.ts](src/utils/bingoLogic.ts) or inspect `localStorage.getItem('bingo-game-state')`

**Types**: See [src/types/index.ts](src/types/index.ts): `BingoSquareData`, `BingoLine`, `GameState`
