interface BingoModalProps {
  onDismiss: () => void;
}

export function BingoModal({ onDismiss }: BingoModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(244,247,255,0.78)] backdrop-blur-xl px-6 py-12">
      <div className="relative w-full max-w-xl overflow-hidden rounded-[var(--radius-xl)] bg-white/80 px-10 py-12 text-center shadow-[0_30px_60px_rgba(171,193,232,0.42)]">
        <div className="pointer-events-none absolute -top-16 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-white/70 blur-3xl" aria-hidden="true" />

        <div className="badge-soft mx-auto mb-6 w-max">Cloud chorus cheering</div>
        <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-display)] font-semibold tracking-tight text-[color:var(--color-accent-strong)]">
          Bingo in the clouds!
        </h2>
        <p className="mt-5 text-base leading-relaxed text-muted">
          You traced a dreamy pathway across the sky and gathered every story along the way. Take a celebratory breath, then float back for another round when you are ready.
        </p>

        <div className="mt-8 flex flex-col gap-3 md:flex-row md:justify-center">
          <button
            type="button"
            onClick={onDismiss}
            className="cloud-button w-full md:w-auto"
          >
            Play another round
          </button>
          <button
            type="button"
            onClick={onDismiss}
            className="cloud-pill px-6 py-3 text-sm font-semibold text-muted hover:text-[color:var(--color-text-primary)] transition-colors"
          >
            Close and keep chatting
          </button>
        </div>

        <div className="mt-10 grid gap-3 text-left text-sm leading-6 text-soft md:grid-cols-2">
          <div className="rounded-3xl bg-white/65 px-5 py-4 backdrop-blur">
            <p className="font-semibold text-[color:var(--color-text-primary)]">Keep the vibe going</p>
            <p className="mt-1">Reset for a fresh cloud arrangement or remix the questions to discover new highlights.</p>
          </div>
          <div className="rounded-3xl bg-white/65 px-5 py-4 backdrop-blur">
            <p className="font-semibold text-[color:var(--color-text-primary)]">Share a win</p>
            <p className="mt-1">Snap a photo of the board and celebrate the stories you unlocked together.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
