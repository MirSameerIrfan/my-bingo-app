import type { BingoSquareData } from '../types';

interface BingoSquareProps {
  square: BingoSquareData;
  isWinning: boolean;
  onClick: () => void;
}

export function BingoSquare({ square, isWinning, onClick }: BingoSquareProps) {
  const baseClasses =
    'relative flex items-center justify-center p-2 text-center border-2 transition-all duration-200 select-none min-h-[60px] text-xs leading-tight font-mono';

  const stateClasses = square.isMarked
    ? isWinning
      ? 'bg-amber-warn/20 border-amber-warn text-amber-warn text-glow-md'
      : 'bg-terminal-green/10 border-terminal-glow text-terminal-bright text-glow-md'
    : 'bg-bg-dark border-terminal-green/40 text-terminal-green hover:border-terminal-green hover:bg-terminal-green/5 active:bg-terminal-green/15 text-glow';

  const freeSpaceClasses = square.isFreeSpace ? 'font-bold text-sm' : '';

  return (
    <button
      onClick={onClick}
      disabled={square.isFreeSpace}
      className={`${baseClasses} ${stateClasses} ${freeSpaceClasses}`}
      aria-pressed={square.isMarked}
      aria-label={square.isFreeSpace ? 'Free space' : square.text}
      style={{
        boxShadow: square.isMarked
          ? isWinning
            ? '0 0 12px var(--color-amber-warn), inset 0 0 8px var(--color-amber-warn)'
            : '0 0 12px var(--color-terminal-glow), inset 0 0 8px var(--color-terminal-green)'
          : 'none'
      }}
    >
      <span className="wrap-break-word hyphens-auto">{square.text}</span>
      {square.isMarked && !square.isFreeSpace && (
        <span className="absolute top-1 right-1 text-terminal-bright text-glow">[X]</span>
      )}
    </button>
  );
}
