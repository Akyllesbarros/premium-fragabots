import { Eyebrow, Reveal } from "./primitives";

const principles = ["Clareza", "Prevenção", "Estratégia", "Segurança", "Visão empresarial"];

export function AboutAuthority() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      <div className="container-rdlf grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 items-center">
        <Reveal>
          <div className="relative aspect-[4/5] w-full max-w-md rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-ink-soft via-ink to-[color:var(--petrol)]/30">
            <img
              src="/about-portrait.jpeg"
              alt="Retrato — Fraga"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 grain opacity-30 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-7 border-t border-white/10 bg-ink/80">
              <div className="font-display text-xl text-bone">Rodolfo Nascimento</div>
              <p className="mt-2 text-sm text-bone/70 leading-relaxed">
                Formado em Direito, com especialização em Propriedade Intelectual e MBA em Gestão e Negociação, atua na estruturação jurídica de negócios inovadores, proteção de ativos intelectuais e geração de valor na economia digital.
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow>Sobre</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-[clamp(2rem,4.4vw,4rem)] leading-[1.02] tracking-[-0.03em] text-bone mt-5">
              Jurídico empresarial pensado para quem decide{" "}
              <span className="italic text-[color:var(--gold-light)]">rápido</span> e cresce{" "}
              <span className="italic text-[color:var(--gold-light)]">com responsabilidade</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-bone/65 leading-relaxed text-[15px]">
              A Fraga é um hub jurídico estratégico voltado à gestão preventiva e
              estruturante de empresas em crescimento. Atua como camada técnica da
              tomada de decisão empresarial, não como serviço reativo a problemas.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-5 gap-3">
              {principles.map((p) => (
                <div
                  key={p}
                  className="rounded-xl border border-white/10 px-4 py-3 text-center text-sm text-bone/80"
                >
                  {p}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
