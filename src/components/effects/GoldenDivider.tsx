/**
 * Thin editorial gold divider used between sections.
 */
export function GoldenDivider({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`relative mx-auto my-4 h-px w-full max-w-3xl overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[color:var(--gold)]/50 to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--gold)] shadow-[0_0_18px_rgba(255,168,25,0.7)]" />
    </div>
  );
}
