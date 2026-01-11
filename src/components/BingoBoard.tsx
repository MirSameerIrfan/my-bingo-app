import type { BingoSquareData } from '../types';
import { BingoSquare } from './BingoSquare';

interface BingoBoardProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  onSquareClick: (squareId: number) => void;
}

export function BingoBoard({ board, winningSquareIds, onSquareClick }: BingoBoardProps) {
  return (
    <div
      className="grid grid-cols-5 gap-1 w-full max-w-md mx-auto aspect-square p-4 bg-bg-darker border-2 border-terminal-green/30 crt-screen"
      style={{
        boxShadow: '0 0 30px rgba(0, 255, 65, 0.2), inset 0 0 40px rgba(0, 255, 65, 0.05)'
      }}
    >
      {board.map((square) => (
        <BingoSquare
          key={square.id}
          square={square}
          isWinning={winningSquareIds.has(square.id)}
          onClick={() => onSquareClick(square.id)}
        />
      ))}
    </div>
  );
}
