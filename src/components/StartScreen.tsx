import { useState, useEffect } from 'react';

interface StartScreenProps {
  onStart: () => void;
}

type Phase = 'boot' | 'ready' | 'help' | 'about';

const BOOT_MESSAGES = [
  'SYSTEM INIT...',
  'LOADING PROTOCOLS...',
  'CHECKING MATRIX...',
  'ESTABLISHING CONNECTION...',
  'READY.',
];

const HELP_TEXT = [
  '• Find people who match the prompts',
  '• Tap a square when you find a match',
  '• Get 5 in a row (horizontal, vertical, diagonal)',
  '• FREE SPACE in center is pre-marked',
  '• Press ESC or any key to return',
];

const ABOUT_TEXT = [
  'SOC OPS v1.0',
  'Social Operations Bingo System',
  'Build: 2026.01.11',
  '',
  'Press ESC or any key to return',
];

export function StartScreen({ onStart }: StartScreenProps) {
  const [phase, setPhase] = useState<Phase>('boot');
  const [bootLine, setBootLine] = useState(0);
  const [command, setCommand] = useState('');

  useEffect(() => {
    if (phase === 'boot') {
      if (bootLine < BOOT_MESSAGES.length) {
        const timer = setTimeout(() => {
          setBootLine(bootLine + 1);
        }, 100);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setPhase('ready');
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [phase, bootLine]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      if (phase === 'help' || phase === 'about') {
        if (key === 'escape' || key.length === 1) {
          setPhase('ready');
          setCommand('');
        }
        return;
      }

      if (phase === 'ready') {
        if (key === 's') {
          setCommand('S');
          setTimeout(() => {
            onStart();
          }, 300);
        } else if (key === 'h') {
          setCommand('H');
          setTimeout(() => {
            setPhase('help');
            setCommand('');
          }, 300);
        } else if (key === 'a') {
          setCommand('A');
          setTimeout(() => {
            setPhase('about');
            setCommand('');
          }, 300);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, onStart]);

  const handleCommandClick = (cmd: 'S' | 'H' | 'A') => {
    setCommand(cmd);
    setTimeout(() => {
      if (cmd === 'S') {
        onStart();
      } else if (cmd === 'H') {
        setPhase('help');
        setCommand('');
      } else if (cmd === 'A') {
        setPhase('about');
        setCommand('');
      }
    }, 300);
  };

  return (
    <div className="flex items-center justify-center min-h-full bg-black">
      <div className="crt-screen w-full max-w-3xl aspect-[4/3] flex items-center justify-center p-8">
        <div 
          className="w-full text-terminal-green font-[family-name:var(--font-terminal)] text-sm leading-relaxed"
          style={{ fontFamily: 'var(--font-terminal)' }}
        >
          {phase === 'boot' && (
            <div className="space-y-1">
              {BOOT_MESSAGES.slice(0, bootLine).map((msg, i) => (
                <div key={i} className="text-glow">
                  {msg}
                </div>
              ))}
            </div>
          )}

          {phase === 'ready' && (
            <div className="space-y-4">
              <div className="text-glow">
                &gt; ENTER_COMMAND:{' '}
                <button
                  onClick={() => handleCommandClick('S')}
                  className="hover:text-terminal-glow transition-colors cursor-pointer bg-transparent border-0 text-terminal-green font-[family-name:var(--font-terminal)]"
                  style={{ fontFamily: 'var(--font-terminal)' }}
                  aria-label="Start game"
                >
                  [S]
                </button>
                TART |{' '}
                <button
                  onClick={() => handleCommandClick('H')}
                  className="hover:text-terminal-glow transition-colors cursor-pointer bg-transparent border-0 text-terminal-green font-[family-name:var(--font-terminal)]"
                  style={{ fontFamily: 'var(--font-terminal)' }}
                  aria-label="Show help"
                >
                  [H]
                </button>
                ELP |{' '}
                <button
                  onClick={() => handleCommandClick('A')}
                  className="hover:text-terminal-glow transition-colors cursor-pointer bg-transparent border-0 text-terminal-green font-[family-name:var(--font-terminal)]"
                  style={{ fontFamily: 'var(--font-terminal)' }}
                  aria-label="Show about"
                >
                  [A]
                </button>
                BOUT
                {command && (
                  <span className="ml-2">{command}</span>
                )}
                {!command && (
                  <span className="cursor-blink ml-1">_</span>
                )}
              </div>
            </div>
          )}

          {phase === 'help' && (
            <div className="space-y-2">
              <div className="text-glow mb-4">&gt; HELP:</div>
              {HELP_TEXT.map((line, i) => (
                <div key={i} className="text-terminal-dim pl-4">
                  {line}
                </div>
              ))}
            </div>
          )}

          {phase === 'about' && (
            <div className="space-y-2">
              <div className="text-glow mb-4">&gt; ABOUT:</div>
              {ABOUT_TEXT.map((line, i) => (
                <div key={i} className="text-terminal-dim pl-4">
                  {line}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
