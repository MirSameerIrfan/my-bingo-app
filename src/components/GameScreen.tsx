import type { BingoSquareData } from '../types';
import { BingoBoard } from './BingoBoard';

interface GameScreenProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  hasBingo: boolean;
  onSquareClick: (squareId: number) => void;
  onReset: () => void;
}

const GAME_CLOUDS = [
  { style: { top: '6%', left: '5%', width: '340px', height: '200px' } },
  { style: { top: '14%', right: '8%', width: '420px', height: '240px' }, variant: 'highlight' as const },
  { style: { bottom: '12%', left: '12%', width: '480px', height: '260px' }, variant: 'blush' as const },
  { style: { bottom: '6%', right: '4%', width: '520px', height: '240px' } },
];

export function GameScreen({
  board,
  winningSquareIds,
  hasBingo,
  onSquareClick,
  onReset,
}: GameScreenProps) {
  return (
    <div className="sky-stage">
      <div className="cloud-layer" aria-hidden="true">
        {GAME_CLOUDS.map((cloud, index) => (
          <div
            key={index}
            className="cloud-blob"
            data-variant={cloud.variant}
            style={{
              ...cloud.style,
              animationDelay: `${index * 1.1}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex min-h-full flex-col">
        <header className="px-6 pt-12 sm:pt-14">
          <div className="cloud-card w-full max-w-4xl mx-auto px-8 py-7 md:px-12 md:py-9">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-3">
                <div className="badge-soft w-max">Live game in progress</div>
                <div className="space-y-2">
                  <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-display)] font-semibold tracking-tight">
                    Chase five in a row
                  </h1>
                  <p className="text-sm leading-6 text-muted md:max-w-lg">
                    Float through the prompts, celebrate every match, and watch your bingo path paint across the board like drifting clouds.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onReset}
                className="cloud-pill px-6 py-3 text-sm font-semibold text-muted hover:text-[color:var(--color-text-primary)] transition-colors"
              >
                Reset board
              </button>
            </div>
          </div>
        </header>

        {hasBingo && (
          <div className="px-6 mt-6">
            <div className="mx-auto w-full max-w-3xl rounded-3xl bg-white/70 px-6 py-4 text-center text-base font-semibold text-[color:var(--color-accent-strong)] shadow-[0_20px_40px_rgba(200,210,255,0.35)] backdrop-blur">
              You traced a perfect line across the clouds — bingo achieved!
            </div>
          </div>
        )}

        <main className="flex flex-1 items-center justify-center px-6 pb-16 pt-10 md:pb-20">
          <div className="w-full max-w-4xl">
            <BingoBoard
              board={board}
              winningSquareIds={winningSquareIds}
              onSquareClick={onSquareClick}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
