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

## Key Integration Points

**Questions**: Edit [src/data/questions.ts](src/data/questions.ts) array (24 items, shuffled on board gen). `FREE_SPACE` constant for center square.

**Bingo Logic**: [src/utils/bingoLogic.ts](src/utils/bingoLogic.ts) checks 5 rows + 5 columns + 2 diagonals (O(12)). Fisher-Yates shuffle (O(n)). Memoized to prevent re-renders.

**Deployment**: [vite.config.ts](vite.config.ts) computes `base` from `VITE_REPO_NAME` env var for GitHub Pages.

## Common Tasks

**Add Question**: Edit [src/data/questions.ts](src/data/questions.ts), run `npm run test`

**Change Board Size**: Update `BOARD_SIZE`/`CENTER_INDEX` in [src/utils/bingoLogic.ts](src/utils/bingoLogic.ts), `grid-cols-5` in [src/components/BingoBoard.tsx](src/components/BingoBoard.tsx), update tests

**Debug**: Check `checkBingo()` in [src/utils/bingoLogic.ts](src/utils/bingoLogic.ts) or inspect `localStorage.getItem('bingo-game-state')`

**Types**: See [src/types/index.ts](src/types/index.ts): `BingoSquareData`, `BingoLine`, `GameState`
