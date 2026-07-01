const items = [
  "Abertura de empresa",
  "Abertura de CNPJ",
  "Escolha do regime tributário",
  "Simples Nacional",
  "Contador para abrir empresa",
  "Planejamento tributário inicial",
  "Abertura de empresa em Vila Velha",
  "Contabilidade para novos CNPJs",
];

export function TrustStrip() {
  // duplicate for seamless loop
  const loop = [...items, ...items];

  return (
    <section className="relative overflow-hidden border-y border-white/5 py-[18px]">
      <div className="pointer-events-none absolute inset-x-0 -top-32 h-64 bg-[radial-gradient(ellipse_at_center,rgba(7,53,52,0.55),transparent_68%)]" />
      <div className="relative z-10 group flex w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="marquee-track flex shrink-0 items-center gap-10 pr-10 group-hover:[animation-play-state:paused]">
          {loop.map((label, i) => (
            <div
              key={`${label}-${i}`}
              className="flex items-center gap-10 whitespace-nowrap text-[0.72rem] uppercase tracking-[0.15em] text-bone/55"
              style={{ fontWeight: 400 }}
            >
              <span>{label}</span>
              <span className="text-[0.6rem] text-[color:var(--gold)]">✦</span>
            </div>
          ))}
        </div>
        <div
          aria-hidden
          className="marquee-track flex shrink-0 items-center gap-10 pr-10 group-hover:[animation-play-state:paused]"
        >
          {loop.map((label, i) => (
            <div
              key={`b-${label}-${i}`}
              className="flex items-center gap-10 whitespace-nowrap text-[0.72rem] uppercase tracking-[0.15em] text-bone/55"
              style={{ fontWeight: 400 }}
            >
              <span>{label}</span>
              <span className="text-[0.6rem] text-[color:var(--gold)]">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
