interface BingoModalProps {
  onDismiss: () => void;
}

export function BingoModal({ onDismiss }: BingoModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div
        className="bg-bg-dark border-4 border-terminal-bright p-8 max-w-md w-full text-center relative"
        style={{
          boxShadow: '0 0 40px var(--color-terminal-bright), 0 0 80px var(--color-terminal-glow), inset 0 0 40px rgba(0, 255, 65, 0.1)',
          animation: 'modalGlitch 0.5s ease-out, glowPulse 1.5s ease-in-out infinite'
        }}
      >
        {/* ASCII Art Banner */}
        <div className="text-terminal-bright font-mono text-xs mb-4 text-glow-lg leading-tight">
          ╔═══════════════════════════╗<br />
          ║  ███ MISSION COMPLETE ███ ║<br />
          ╚═══════════════════════════╝
        </div>

        <div className="text-6xl mb-4 text-terminal-bright text-glow-lg">
          ★ BINGO ★
        </div>

        <div className="text-terminal-green text-sm font-mono mb-6 text-glow">
          &gt; OBJECTIVE_ACHIEVED.LOG<br />
          &gt; STATUS: OPERATIONAL<br />
          &gt; CONTINUE_MISSION? [Y/N]
        </div>

        <button
          onClick={onDismiss}
          className="w-full bg-terminal-green/10 text-terminal-bright border-2 border-terminal-bright font-bold py-4 px-6 text-lg hover:bg-terminal-green/20 active:bg-terminal-green/30 transition-all text-glow-md font-mono"
          style={{
            boxShadow: '0 0 20px var(--color-terminal-green), inset 0 0 15px var(--color-terminal-green)'
          }}
        >
          [ CONTINUE_MISSION ]
        </button>

        {/* Glitch overlay effect */}
        <div
          className="absolute inset-0 pointer-events-none border-4 border-terminal-bright"
          style={{
            animation: 'glitchOverlay 3s linear infinite',
            opacity: 0.3
          }}
        />
      </div>

      <style>{`
        @keyframes modalGlitch {
          0% {
            transform: translate(0);
            opacity: 0;
          }
          10% {
            transform: translate(-5px, 5px);
            opacity: 0.5;
          }
          20% {
            transform: translate(5px, -5px);
            opacity: 0.8;
          }
          30% {
            transform: translate(-2px, 2px);
            opacity: 0.9;
          }
          100% {
            transform: translate(0);
            opacity: 1;
          }
        }
        
        @keyframes glowPulse {
          0%, 100% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.3);
          }
        }
        
        @keyframes glitchOverlay {
          0%, 90%, 100% {
            transform: translate(0);
          }
          91% {
            transform: translate(-2px, 0);
          }
          92% {
            transform: translate(2px, 0);
          }
          93% {
            transform: translate(0, -2px);
          }
          94% {
            transform: translate(0, 2px);
          }
        }
      `}</style>
    </div>
  );
}
