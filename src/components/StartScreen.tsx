import { useState, useEffect, useCallback } from 'react';

interface StartScreenProps {
  onStart: () => void;
}

type ModalType = null | 'help' | 'about' | 'info';

interface CommandHistory {
  command: string;
  timestamp: string;
}

const BOOT_MESSAGES = [
  'INITIALIZING SOCIAL_OPS SYSTEM...',
  'CHECKING RAM... 64K OK',
  'LOADING BIOS v2.1.0...',
  '[████████░░] 80%',
  'LOADING SOCIAL_PROTOCOL.SYS...',
  'LOADING BINGO_ENGINE.DRV...',
  'VIDEO: CRT-80 DETECTED',
  'KEYBOARD: 101-KEY READY',
  'NETWORK: SOCIAL_MESH ONLINE',
  'CALIBRATING INTERACTION MATRIX...',
  '[██████████] 100%',
  'MOUNTING CONVERSATION DRIVE...',
  'STARTING ENGAGEMENT SERVICES...',
  '> STATUS: ALL SYSTEMS OPERATIONAL',
  '',
];

const ASCII_TITLE = [
  '╔═══════════════════════════════════════════════╗',
  '║   ███████  ██████   ██████     ██████  ██████ ║',
  '║   ██      ██    ██ ██          ██  ██  ██  ██ ║',
  '║   ███████ ██    ██ ██          ██  ██  ██████ ║',
  '║        ██ ██    ██ ██          ██  ██  ██     ║',
  '║   ███████  ██████   ██████     ██████  ██     ║',
  '║                                               ║',
  '║      v2.1 - SOCIAL RECONNAISSANCE MODULE      ║',
  '╚═══════════════════════════════════════════════╝',
];

export function StartScreen({ onStart }: StartScreenProps) {
  const [bootComplete, setBootComplete] = useState(false);
  const [bootLine, setBootLine] = useState(0);
  const [modalOpen, setModalOpen] = useState<ModalType>(null);
  const [commandHistory, setCommandHistory] = useState<CommandHistory[]>([]);
  const [sessionId] = useState(() => {
    const hex = Math.floor(Math.random() * 0xFFFFFFFF).toString(16).toUpperCase().padStart(8, '0');
    return `SES-${hex}`;
  });

  // Boot sequence animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const delay = prefersReducedMotion ? 0 : 120;

    if (bootLine < BOOT_MESSAGES.length) {
      const timer = setTimeout(() => {
        setBootLine(bootLine + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else if (!bootComplete) {
      // Use setTimeout to avoid synchronous setState in effect
      const timer = setTimeout(() => {
        setBootComplete(true);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [bootLine, bootComplete]);

  const addCommandToHistory = useCallback((command: string) => {
    const now = new Date();
    const timestamp = now.toTimeString().slice(0, 8);
    setCommandHistory(prev => [
      ...prev.slice(-2), // Keep only last 2 (will show 3 total with new one)
      { command, timestamp }
    ]);
  }, []);

  const handleCommand = useCallback((cmd: string) => {
    addCommandToHistory(cmd);
    
    switch (cmd) {
      case 'START':
        onStart();
        break;
      case 'HELP':
        setModalOpen('help');
        break;
      case 'ABOUT':
        setModalOpen('about');
        break;
      case 'INFO':
        setModalOpen('info');
        break;
    }
  }, [onStart, addCommandToHistory]);

  // Keyboard event listener
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (modalOpen) {
        if (e.key === 'Escape') {
          setModalOpen(null);
        }
        return;
      }

      const key = e.key.toLowerCase();
      if (key === 's') handleCommand('START');
      else if (key === 'h') handleCommand('HELP');
      else if (key === 'a') handleCommand('ABOUT');
      else if (key === 'i') handleCommand('INFO');
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [modalOpen, handleCommand]);

  const getCurrentTime = () => {
    return new Date().toTimeString().slice(0, 8);
  };

  return (
    <div className="flex flex-col min-h-full bg-terminal-bg text-terminal-green font-mono p-4" style={{ fontFamily: 'var(--font-mono)' }}>
      {/* Terminal Window Chrome */}
      <div className="max-w-4xl mx-auto w-full border-2 border-terminal-green/30 rounded-sm">
        {/* Title Bar */}
        <div className="border-b-2 border-terminal-green/30 px-3 py-2 flex items-center gap-2 bg-terminal-bg">
          <div className="flex gap-1">
            <div className="w-3 h-3 border border-terminal-green/50"></div>
            <div className="w-3 h-3 border border-terminal-green/50"></div>
            <div className="w-3 h-3 border border-terminal-green/50"></div>
          </div>
          <div className="text-sm text-glow flex-1 text-center">
            ╔═ SOC_OPS.EXE - [READY] ═╗
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 min-h-[600px] relative">
          {/* ASCII Title */}
          {bootLine >= BOOT_MESSAGES.length && (
            <div className="mb-6 text-terminal-green text-glow">
              {ASCII_TITLE.map((line, i) => (
                <div key={i} className="leading-tight text-xs sm:text-sm whitespace-pre">
                  {line}
                </div>
              ))}
            </div>
          )}

          {/* Boot Messages */}
          <div className="space-y-1 mb-6 text-sm">
            {BOOT_MESSAGES.slice(0, bootLine).map((msg, i) => (
              <div key={i} className={msg.startsWith('[') ? 'text-amber-warn' : 'text-terminal-green text-glow'}>
                {msg}
              </div>
            ))}
          </div>

          {/* Command History */}
          {bootComplete && commandHistory.length > 0 && (
            <div className="mb-4 space-y-1 text-sm opacity-50">
              {commandHistory.map((cmd, i) => (
                <div key={i}>
                  &gt; PREVIOUS_CMD: {cmd.command} [{cmd.timestamp}]
                </div>
              ))}
            </div>
          )}

          {/* Main Menu */}
          {bootComplete && (
            <div className="space-y-4 text-glow">
              <div className="text-sm">
                &gt; MAIN_MENU: [S]TART | [H]ELP | [A]BOUT | [I]NFO
              </div>
              <div className="text-xs opacity-70">
                _ PRESS KEY OR CLICK COMMAND
              </div>
              
              {/* Clickable buttons */}
              <div className="flex gap-4 flex-wrap mt-4">
                <button
                  onClick={() => handleCommand('START')}
                  className="px-4 py-2 border border-terminal-green/50 hover:bg-terminal-green/10 active:bg-terminal-green/20 transition-colors text-sm"
                >
                  [S]TART
                </button>
                <button
                  onClick={() => handleCommand('HELP')}
                  className="px-4 py-2 border border-terminal-green/50 hover:bg-terminal-green/10 active:bg-terminal-green/20 transition-colors text-sm"
                >
                  [H]ELP
                </button>
                <button
                  onClick={() => handleCommand('ABOUT')}
                  className="px-4 py-2 border border-terminal-green/50 hover:bg-terminal-green/10 active:bg-terminal-green/20 transition-colors text-sm"
                >
                  [A]BOUT
                </button>
                <button
                  onClick={() => handleCommand('INFO')}
                  className="px-4 py-2 border border-terminal-green/50 hover:bg-terminal-green/10 active:bg-terminal-green/20 transition-colors text-sm"
                >
                  [I]NFO
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="border-t-2 border-terminal-green/30 px-3 py-1 flex justify-between text-xs bg-terminal-bg">
          <div className="text-glow">TIME: {getCurrentTime()}</div>
          <div className="text-glow">SESSION: {sessionId}</div>
          <div className="text-amber-warn">MEM: 24K/64K</div>
        </div>
      </div>

      {/* Terminal Window Modals */}
      {modalOpen && (
        <TerminalWindow
          type={modalOpen}
          onClose={() => setModalOpen(null)}
        />
      )}
    </div>
  );
}

// Terminal Window Component for Help, About, Info
interface TerminalWindowProps {
  type: 'help' | 'about' | 'info';
  onClose: () => void;
}

function TerminalWindow({ type, onClose }: TerminalWindowProps) {
  // Generate random values once on mount
  const [diagnostics] = useState(() => ({
    uptime: Math.floor(Math.random() * 1000),
    threads: Math.floor(Math.random() * 50),
    queue: Math.floor(Math.random() * 20),
  }));

  const titles = {
    help: 'HELP.TXT',
    about: 'ABOUT.SYS',
    info: 'SYSINFO.DAT',
  };

  const content = {
    help: (
      <div className="space-y-4">
        <div className="text-amber-warn text-glow">═══ GAME RULES ═══</div>
        <div className="space-y-2 text-sm">
          <div>&gt; OBJECTIVE:</div>
          <div className="pl-4">Complete 5 squares in a row (horizontal, vertical, or diagonal)</div>
          
          <div className="mt-3">&gt; HOW TO PLAY:</div>
          <div className="pl-4 space-y-1">
            <div>1. Read each square's question</div>
            <div>2. Find someone who matches the criteria</div>
            <div>3. Tap the square to mark it</div>
            <div>4. Continue until you get BINGO!</div>
          </div>
          
          <div className="mt-3">&gt; TIPS:</div>
          <div className="pl-4 space-y-1">
            <div>• Center square is FREE</div>
            <div>• Be social and talk to everyone</div>
            <div>• Multiple people can match one square</div>
            <div>• Have fun and make connections!</div>
          </div>
        </div>
      </div>
    ),
    about: (
      <div className="space-y-4">
        <div className="text-amber-warn text-glow">═══ SYSTEM INFORMATION ═══</div>
        <div className="space-y-2 text-sm">
          <div>&gt; SOFTWARE:</div>
          <div className="pl-4">SOC_OPS v2.1.0</div>
          <div className="pl-4">Social Reconnaissance Module</div>
          
          <div className="mt-3">&gt; COPYRIGHT:</div>
          <div className="pl-4">(C) 2026 SOCIAL OPERATIONS</div>
          <div className="pl-4">All Rights Reserved</div>
          
          <div className="mt-3">&gt; CREDITS:</div>
          <div className="pl-4">Designed for in-person social mixers</div>
          <div className="pl-4">Built with React + Tailwind CSS v4</div>
          
          <div className="mt-3">&gt; LICENSE:</div>
          <div className="pl-4">MIT License - Free to use and modify</div>
        </div>
      </div>
    ),
    info: (
      <div className="space-y-4">
        <div className="text-amber-warn text-glow">═══ SYSTEM DIAGNOSTICS ═══</div>
        <div className="space-y-2 text-sm font-mono">
          <div>&gt; SYSTEM_STATUS: OPERATIONAL</div>
          <div>&gt; CPU: SOCIAL_CORE_v2 @ 3.5 GHz</div>
          <div>&gt; MEMORY: 24K/64K (37% USED)</div>
          <div>&gt; VIDEO: CRT-80 TERMINAL MODE</div>
          <div>&gt; KEYBOARD: 101-KEY ENHANCED</div>
          <div>&gt; NETWORK: SOCIAL_MESH ACTIVE</div>
          <div>&gt; UPTIME: {diagnostics.uptime} SECONDS</div>
          <div>&gt; ACTIVE_PROTOCOLS: 7</div>
          <div>&gt; CONVERSATION_THREADS: {diagnostics.threads}</div>
          <div>&gt; INTERACTION_QUEUE: {diagnostics.queue} PENDING</div>
          <div className="mt-3 text-terminal-green-dark">
            &gt; ALL SYSTEMS NOMINAL
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-terminal-bg border-2 border-terminal-green/50 max-w-2xl w-full rounded-sm shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Window Title Bar */}
        <div className="border-b-2 border-terminal-green/30 px-3 py-2 flex items-center justify-between bg-terminal-bg">
          <div className="text-sm text-glow text-terminal-green">
            ╔═ {titles[type]} ═╗
          </div>
          <button
            onClick={onClose}
            className="text-amber-warn hover:text-terminal-green transition-colors text-sm px-2"
            aria-label="Close window"
          >
            [X]
          </button>
        </div>

        {/* Window Content */}
        <div className="p-6 text-terminal-green max-h-[60vh] overflow-y-auto">
          {content[type]}
        </div>

        {/* Window Footer */}
        <div className="border-t-2 border-terminal-green/30 px-3 py-2 text-xs text-terminal-green-dark bg-terminal-bg">
          PRESS ESC OR [X] TO CLOSE
        </div>
      </div>
    </div>
  );
}
