import type { BingoSquareData } from '../types';
import { BingoBoard } from './BingoBoard';

interface GameScreenProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  hasBingo: boolean;
  onSquareClick: (squareId: number) => void;
  onReset: () => void;
}

export function GameScreen({
  board,
  winningSquareIds,
  hasBingo,
  onSquareClick,
  onReset,
}: GameScreenProps) {
  return (
    <div className="flex flex-col min-h-full bg-bg-darker relative overflow-hidden">
      {/* Scanlines overlay */}
      <div className="scanlines" />

      {/* Terminal Window Frame */}
      <div className="border-b-2 border-terminal-green/30 bg-bg-dark relative z-10">
        {/* Title bar with terminal window controls */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-terminal-green/20">
          <div className="flex gap-2">
            <div className="w-3 h-3 border border-terminal-green/50 bg-terminal-green/10" />
            <div className="w-3 h-3 border border-terminal-green/50 bg-terminal-green/10" />
            <div className="w-3 h-3 border border-terminal-green/50 bg-terminal-green/10" />
          </div>
          <div className="text-terminal-green text-xs font-mono text-glow">
            SOC_OPS.EXE
          </div>
          <button
            onClick={onReset}
            className="text-terminal-green text-xs hover:text-terminal-bright border border-terminal-green/40 px-2 py-1 hover:border-terminal-green transition-all text-glow"
          >
            [EXIT]
          </button>
        </div>

        {/* Header */}
        <div className="px-4 py-3">
          <div className="text-terminal-bright text-lg font-bold text-glow-md mb-1">
            ╔═ SOC OPS MISSION ═╗
          </div>
          <div className="text-terminal-dim text-xs font-mono text-glow">
            &gt; EXECUTE_TAP_ON_MATCH.SYS
          </div>
        </div>
      </div>

      {/* Bingo indicator */}
      {hasBingo && (
        <div
          className="bg-amber-warn/20 border-y-2 border-amber-warn text-amber-warn text-center py-3 font-bold text-sm font-mono relative z-10"
          style={{
            textShadow: '0 0 12px currentColor, 0 0 24px currentColor',
            animation: 'glowFlicker 0.5s ease-in-out infinite'
          }}
        >
          *** MISSION SUCCESS: BINGO ACHIEVED ***
        </div>
      )}

      {/* Board */}
      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <BingoBoard
          board={board}
          winningSquareIds={winningSquareIds}
          onSquareClick={onSquareClick}
        />
      </div>

      <style>{`
        @keyframes glowFlicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
