import { useState, useEffect } from 'react';

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const [lineIndex, setLineIndex] = useState(0);

  const bootSequence = [
    'SYSTEM v2.1 INITIALIZING...',
    'LOADING SOCIAL PROTOCOLS...',
    '> SOC_OPS.EXE',
    '',
    '╔═══════════════════════════════╗',
    '║      SOC OPS TERMINAL v2.1   ║',
    '║      SOCIAL BINGO SYSTEM     ║',
    '╚═══════════════════════════════╝',
  ];

  const instructions = [
    '> MISSION PARAMETERS:',
    '  [1] LOCATE TARGETS MATCHING CRITERIA',
    '  [2] EXECUTE TAP ON VERIFIED MATCH',
    '  [3] ACHIEVE 5-IN-ROW FOR VICTORY',
    '',
    '> STATUS: READY FOR DEPLOYMENT',
  ];

  useEffect(() => {
    if (lineIndex < bootSequence.length) {
      const timer = setTimeout(() => {
        setLineIndex(lineIndex + 1);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [lineIndex, bootSequence.length]);

  const showInstructions = lineIndex >= bootSequence.length;

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 bg-bg-darker relative overflow-hidden">
      {/* Scanlines overlay */}
      <div className="scanlines" />

      <div className="crt-screen bg-bg-dark border-2 border-terminal-green/30 p-8 max-w-md w-full relative z-10">
        {/* Boot sequence */}
        <div className="text-terminal-green font-mono text-sm space-y-1 mb-6">
          {bootSequence.slice(0, lineIndex).map((line, i) => (
            <div
              key={i}
              className="text-glow"
              style={{
                animationDelay: `${i * 150}ms`,
                opacity: 0,
                animation: 'fadeIn 0.3s ease-out forwards'
              }}
            >
              {line || '\u00A0'}
            </div>
          ))}
          {lineIndex < bootSequence.length && (
            <div className="cursor-blink" />
          )}
        </div>

        {/* Instructions with fade-in */}
        {showInstructions && (
          <div
            className="space-y-1 mb-8"
            style={{
              animation: 'fadeIn 0.5s ease-out'
            }}
          >
            {instructions.map((line, i) => (
              <div
                key={i}
                className="text-terminal-dim text-sm text-glow"
                style={{
                  animationDelay: `${i * 100}ms`,
                  opacity: 0,
                  animation: 'fadeIn 0.3s ease-out forwards'
                }}
              >
                {line || '\u00A0'}
              </div>
            ))}
          </div>
        )}

        {/* Start button */}
        {showInstructions && (
          <button
            onClick={onStart}
            className="w-full bg-terminal-green/10 text-terminal-bright border-2 border-terminal-green font-bold py-4 px-8 text-lg hover:bg-terminal-green/20 active:bg-terminal-green/30 transition-all text-glow-md"
            style={{
              animation: 'fadeIn 0.5s ease-out, glowPulse 2s ease-in-out infinite',
              animationDelay: '0.8s',
              opacity: 0,
              animationFillMode: 'forwards'
            }}
          >
            [ INITIATE MISSION ]
          </button>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
        
        @keyframes glowPulse {
          0%, 100% {
            box-shadow: 0 0 10px currentColor, inset 0 0 10px currentColor;
          }
          50% {
            box-shadow: 0 0 20px currentColor, inset 0 0 15px currentColor;
          }
        }
      `}</style>
    </div>
  );
}
