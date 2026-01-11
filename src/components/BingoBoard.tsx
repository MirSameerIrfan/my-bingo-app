import type { BingoSquareData } from '../types';
import { BingoSquare } from './BingoSquare';

interface BingoBoardProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  onSquareClick: (squareId: number) => void;
}

export function BingoBoard({ board, winningSquareIds, onSquareClick }: BingoBoardProps) {
  return (
    <div className="relative aspect-square w-full">
      <div className="absolute inset-0 rounded-[var(--radius-xl)] bg-white/75 backdrop-blur-xl shadow-[0_28px_55px_rgba(172,192,230,0.38)] border border-white/60" />
      <div className="relative h-full rounded-[var(--radius-xl)] p-3 sm:p-4 md:p-5">
        <div className="grid h-full grid-cols-5 gap-2 sm:gap-3">
          {board.map((square) => (
            <BingoSquare
              key={square.id}
              square={square}
              isWinning={winningSquareIds.has(square.id)}
              onClick={() => onSquareClick(square.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
