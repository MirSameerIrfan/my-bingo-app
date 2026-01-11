import { useState, useEffect, useMemo } from 'react';

interface StartScreenProps {
  onStart: () => void;
}

type Panel = 'main' | 'help' | 'about';

const HELP_POINTS = [
  'Find a person who matches each prompt and tap the square to mark it.',
  'You can collect matches in any order—aim for a five-in-a-row.',
  'The centre square is a free space to get the conversation flowing.',
  'Need a second theme? Reset the board for a fresh shuffle anytime.',
];

const ABOUT_POINTS = [
  'Soc Ops is a social icebreaker designed for mixers and offsites.',
  'Each board is unique thanks to gentle shuffling and a free space.',
  'Built with love, TypeScript, and a sky full of soft pastel clouds.',
];

export function StartScreen({ onStart }: StartScreenProps) {
  const [panel, setPanel] = useState<Panel>('main');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (panel === 'main') {
        if (key === 'enter' || key === ' ') {
          event.preventDefault();
          onStart();
        }
        if (key === 'h') {
          setPanel('help');
        }
        if (key === 'a') {
          setPanel('about');
        }
      } else if (key === 'escape' || key === 'enter' || key === ' ') {
        setPanel('main');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [panel, onStart]);

  const clouds = useMemo(() => (
    [
      { style: { top: '12%', left: '5%', width: '320px', height: '180px' } },
      { style: { bottom: '18%', left: '12%', width: '420px', height: '220px' }, variant: 'blush' as const },
      { style: { top: '10%', right: '8%', width: '360px', height: '200px' }, variant: 'highlight' as const },
      { style: { bottom: '8%', right: '5%', width: '520px', height: '260px' } },
    ]
  ), []);

  return (
    <div className="sky-stage">
      <div className="cloud-layer" aria-hidden="true">
        {clouds.map((cloud, index) => (
          <div
            key={index}
            className="cloud-blob"
            data-variant={cloud.variant}
            style={{
              ...cloud.style,
              animationDelay: `${index * 1.3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex min-h-full items-center justify-center px-6 py-16">
        <div className="w-full max-w-4xl">
          <div className="cloud-card p-10 md:p-14 shadow-xl">
            <div className="badge-soft mb-6 w-max">Soft Pastel Clouds Edition</div>

            {panel === 'main' && (
              <div className="space-y-8">
                <div className="space-y-3">
                  <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-display)] font-semibold tracking-tight">
                    Soc Ops Bingo
                  </h1>
                  <p className="max-w-2xl text-lg leading-relaxed text-muted">
                    Float into an easygoing mixer. Explore warm, conversational prompts, collect joyful stories, and chase a row of delightful wins across a dreamy pastel sky.
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <button type="button" className="cloud-button w-full sm:w-auto" onClick={onStart}>
                    Start the adventure
                  </button>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="cloud-pill px-4 py-3 text-sm font-semibold text-muted hover:text-[color:var(--color-text-primary)] transition-colors"
                      onClick={() => setPanel('help')}
                    >
                      How it works
                    </button>
                    <button
                      type="button"
                      className="cloud-pill px-4 py-3 text-sm font-semibold text-muted hover:text-[color:var(--color-text-primary)] transition-colors"
                      onClick={() => setPanel('about')}
                    >
                      About Soc Ops
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 text-soft md:grid-cols-2">
                  <div className="rounded-3xl bg-white/50 p-5 backdrop-blur">
                    <h2 className="font-semibold font-[family-name:var(--font-display)] text-base text-[color:var(--color-accent-strong)] mb-2">
                      Quick hitters
                    </h2>
                    <ul className="space-y-1.5 text-sm leading-6">
                      <li>Mix and mingle with gentle, encouraging prompts.</li>
                      <li>Every board is reshuffled for a brand-new cloudscape.</li>
                      <li>Tap squares or use Enter to float through a session.</li>
                    </ul>
                  </div>
                  <div className="rounded-3xl bg-white/50 p-5 backdrop-blur">
                    <h2 className="font-semibold font-[family-name:var(--font-display)] text-base text-[color:var(--color-accent-strong)] mb-2">
                      Shortcuts
                    </h2>
                    <ul className="space-y-1.5 text-sm leading-6">
                      <li>Press Enter to start, H for help, A for about.</li>
                      <li>In the game, reset anytime for a new cloud pattern.</li>
                      <li>Escape closes overlays so you can drift back in.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {panel !== 'main' && (
              <div className="space-y-6">
                <button
                  type="button"
                  className="cloud-pill px-4 py-2 text-sm font-semibold text-muted hover:text-[color:var(--color-text-primary)] transition-colors"
                  onClick={() => setPanel('main')}
                >
                  ← Back to welcome
                </button>

                <div className="space-y-4">
                  <h2 className="text-3xl font-[family-name:var(--font-display)] font-semibold">
                    {panel === 'help' ? 'How to play' : 'About this experience'}
                  </h2>
                  <ul className="space-y-3 text-base leading-7 text-muted">
                    {(panel === 'help' ? HELP_POINTS : ABOUT_POINTS).map((point) => (
                      <li key={point}>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
