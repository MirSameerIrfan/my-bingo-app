import type { BingoSquareData } from '../types';

interface BingoSquareProps {
  square: BingoSquareData;
  isWinning: boolean;
  onClick: () => void;
}

export function BingoSquare({ square, isWinning, onClick }: BingoSquareProps) {
  const baseClasses =
    'relative flex h-full w-full select-none items-center justify-center rounded-3xl px-3 py-2 text-center text-sm font-medium leading-relaxed transition-all duration-300 backdrop-blur';

  const stateClasses = square.isMarked
    ? isWinning
      ? 'bg-[rgba(255,232,204,0.8)] border border-[rgba(255,200,150,0.7)] text-[color:var(--color-text-primary)] shadow-[0_20px_40px_rgba(255,206,160,0.45)]'
      : 'bg-[rgba(255,210,232,0.7)] border border-[rgba(255,170,205,0.55)] text-[color:var(--color-accent-strong)] shadow-[0_16px_32px_rgba(255,195,220,0.35)]'
    : 'bg-white/75 border border-white/60 text-[color:var(--color-text-primary)] hover:border-[color:var(--color-accent)] hover:bg-white/90 shadow-[0_10px_20px_rgba(180,200,235,0.22)]';

  const freeSpaceClasses = square.isFreeSpace
    ? 'text-base font-semibold text-[color:var(--color-accent-strong)]'
    : '';

  return (
    <button
      onClick={onClick}
      disabled={square.isFreeSpace}
      className={`${baseClasses} ${stateClasses} ${freeSpaceClasses}`}
      aria-pressed={square.isMarked}
      aria-label={square.isFreeSpace ? 'Free cloud space' : square.text}
    >
      <span className="wrap-break-word hyphens-auto text-balance">
        {square.isFreeSpace ? 'Free Cloud' : square.text}
      </span>
      {square.isMarked && !square.isFreeSpace && (
        <span className="absolute bottom-2 text-[0.65rem] uppercase tracking-[0.18em] text-[color:var(--color-accent-strong)]">
          marked
        </span>
      )}
    </button>
  );
}
