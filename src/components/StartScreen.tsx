import { useState, useEffect, useCallback, useMemo } from 'react';

interface StartScreenProps {
  onStart: () => void;
}

type AnimationPhase = 'powerOn' | 'boot' | 'logoReveal' | 'ready';

const BOOT_LINES = [
  'INITIALIZING SYSTEM...',
  'LOADING BIOS v2.1.0',
  'MEMORY CHECK... 64KB OK',
  'PHOSPHOR CALIBRATION... OK',
  'DISPLAY SYNC... 60Hz',
  'KEYBOARD CONTROLLER... OK',
  'SCANNING SOCIAL NETWORK...',
  '[████░░░░░░░] 40%',
  '[████████░░░] 80%',
  '[███████████] 100%',
  'INITIALIZING BINGO_CORE_v2.1',
  'SYSTEM READY.',
];

const ASCII_LOGO = [
  '╔══════════════════════════════════════╗',
  '║                                      ║',
  '║   ███████   ███████   ██████         ║',
  '║   ██        ██    ██  ██             ║',
  '║   ███████   ██    ██  ██             ║',
  '║        ██   ██    ██  ██             ║',
  '║   ███████   ███████   ██████         ║',
  '║                                      ║',
  '║   ███████   ██████    ███████        ║',
  '║   ██    ██  ██   ██   ██             ║',
  '║   ██    ██  ██████    ███████        ║',
  '║   ██    ██  ██        ██             ║',
  '║   ███████   ██        ███████        ║',
  '║                                      ║',
  '║      SOCIAL OPERATIONS TERMINAL      ║',
  '║           VERSION 2.1                ║',
  '║                                      ║',
  '╚══════════════════════════════════════╝',
];

export function StartScreen({ onStart }: StartScreenProps) {
  const [phase, setPhase] = useState<AnimationPhase>('powerOn');
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [logoLines, setLogoLines] = useState<string[]>([]);
  const [showReady, setShowReady] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const initialMatch = mediaQuery.matches;
    
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    
    // Set initial value in a microtask to avoid sync setState in effect
    Promise.resolve().then(() => setReducedMotion(initialMatch));
    
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Animation sequence
  useEffect(() => {
    const timeouts: number[] = [];
    
    if (reducedMotion) {
      // Skip to ready state immediately with simple fade
      const timeout = window.setTimeout(() => {
        setPhase('ready');
        setBootLines(BOOT_LINES);
        setLogoLines(ASCII_LOGO);
        setShowReady(true);
      }, 0);
      timeouts.push(timeout);
      return () => timeouts.forEach(clearTimeout);
    }

    // Power On sequence (800ms blur + scale + flash)
    timeouts.push(window.setTimeout(() => {
      setPhase('boot');
    }, 900));

    // Boot sequence - add lines progressively
    let lineDelay = 900; // Start after power on
    BOOT_LINES.forEach((line, index) => {
      timeouts.push(window.setTimeout(() => {
        setBootLines(prev => [...prev, line]);
      }, lineDelay));
      
      lineDelay += 200; // 200ms between lines
      
      // Add pauses
      if (index === 2) lineDelay += 400; // After memory check
      if (index === BOOT_LINES.length - 2) lineDelay += 600; // Before ready
    });

    // Logo reveal sequence
    const logoStartDelay = lineDelay + 300;
    timeouts.push(window.setTimeout(() => {
      setPhase('logoReveal');
    }, logoStartDelay));

    ASCII_LOGO.forEach((line, index) => {
      timeouts.push(window.setTimeout(() => {
        setLogoLines(prev => [...prev, line]);
      }, logoStartDelay + (index * 100)));
    });

    // Glitch effect when logo completes
    const glitchDelay = logoStartDelay + (ASCII_LOGO.length * 100);
    timeouts.push(window.setTimeout(() => {
      setShowGlitch(true);
      const glitchTimeout = window.setTimeout(() => setShowGlitch(false), 150);
      timeouts.push(glitchTimeout);
    }, glitchDelay));

    // Ready state
    timeouts.push(window.setTimeout(() => {
      setPhase('ready');
      setShowReady(true);
    }, glitchDelay + 200));

    return () => timeouts.forEach(clearTimeout);
  }, [reducedMotion]);

  // Keyboard shortcuts
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (phase === 'ready' && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onStart();
    }
  }, [phase, onStart]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const powerOnStyle = useMemo(() => {
    if (phase === 'powerOn' && !reducedMotion) {
      return {
        filter: 'blur(20px) brightness(1.5)',
        transform: 'scale(0.1)',
        opacity: 0,
      };
    }
    return {};
  }, [phase, reducedMotion]);

  const powerOnTransition = useMemo(() => {
    if (phase === 'powerOn' && !reducedMotion) {
      return 'filter 800ms ease-out, transform 800ms ease-out, opacity 800ms ease-out';
    }
    return undefined;
  }, [phase, reducedMotion]);

  return (
    <div className="crt-container relative flex flex-col items-center justify-center min-h-full bg-bg-darker overflow-hidden">
      {/* Radial gradient vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, var(--color-bg-dark) 0%, var(--color-bg-darker) 100%)'
        }}
      />
      
      {/* CRT pixel grid */}
      <div className="crt-pixel-grid" />
      
      {/* Dual scanlines */}
      <div className="crt-scanlines" />
      <div className="crt-scanlines-slow" />

      {/* Main content */}
      <div 
        className="relative z-20 w-full max-w-3xl px-8 font-mono text-terminal-green"
        style={phase !== 'powerOn' ? {} : {
          ...powerOnStyle,
          transition: powerOnTransition,
        }}
      >
        {/* Boot sequence */}
        {bootLines.length > 0 && (
          <div className="mb-8 space-y-1 text-sm">
            {bootLines.map((line, index) => (
              <div 
                key={index} 
                className={line.includes('[') ? 'text-terminal-amber' : ''}
              >
                {line.includes('WARNING') || line.includes('CRITICAL') 
                  ? <span className="text-terminal-amber">{line}</span>
                  : line}
              </div>
            ))}
          </div>
        )}

        {/* ASCII Logo */}
        {logoLines.length > 0 && (
          <div className={`mb-8 text-center text-xs sm:text-sm leading-tight ${showGlitch ? 'glitch-effect' : ''}`}>
            {logoLines.map((line, index) => (
              <div key={index} className="text-glow">{line}</div>
            ))}
          </div>
        )}

        {/* Ready message */}
        {showReady && (
          <div className="text-center space-y-6">
            <div className={`text-2xl text-glow-lg ${!reducedMotion ? 'flicker-effect' : ''}`}>
              &gt; SYSTEM READY &lt;
            </div>

            {/* Call to action button */}
            <button
              onClick={onStart}
              className="relative px-12 py-4 text-lg font-bold text-terminal-green border-2 border-terminal-green bg-bg-dark/50 hover:bg-bg-dark transition-colors glow-pulse"
              style={{
                boxShadow: `
                  inset 0 0 20px var(--color-terminal-glow),
                  0 0 40px var(--color-terminal-green),
                  0 0 80px rgba(0, 255, 65, 0.5)
                `
              }}
            >
              [ &gt;&gt;&gt; INITIATE MISSION &lt;&lt;&lt; ]
            </button>

            {/* Keyboard hint */}
            <div className="text-xs text-terminal-green-dim">
              PRESS [ENTER] OR [SPACE] TO BEGIN
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
