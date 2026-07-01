import { ArrowUpRight } from "lucide-react";
import { Eyebrow, Reveal } from "./primitives";
import { MagneticButton } from "./motion/kinetic";

const testimonials = [
  {
    name: "Anderson Drummond",
    company: "Thermofibras",
    description:
      "Depoimento sobre a parceria com a Fraga Contabilidade e a confiança construída ao longo do relacionamento.",
    videoId: "BX6rpC1cSUg",
    title: "Depoimento de Anderson Drummond - Thermofibras",
  },
  {
    name: "Helvecio Quintão",
    company: "São Geraldo Aviamento · Silva Quintão Tecidos e Aviamentos",
    description:
      "Uma relação de longa data que reforça a confiança, a proximidade e o acompanhamento contábil da Fraga.",
    videoId: "-J942kkVc-s",
    title: "Depoimento de Helvecio Quintão - São Geraldo Aviamento",
  },
];

export function VideoTestimonials() {
  return (
    <section id="depoimentos" className="relative py-28 md:py-36 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(255,168,25,0.08),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(31,111,120,0.45),transparent_60%)]"
      />
      <div className="absolute inset-0 -z-10 grain" />

      <div className="container-rdlf">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>Depoimentos</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-[clamp(2rem,4.4vw,4rem)] leading-[1.02] tracking-[-0.03em] text-bone mt-5">
              Confiança construída{" "}
              <span className="italic text-[color:var(--gold-light)]">na prática</span>,
              cliente por cliente.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 text-bone/70 text-base md:text-lg max-w-2xl leading-relaxed">
              Empresas que caminham com a Fraga mostram o valor de ter uma contabilidade próxima,
              clara e preparada para acompanhar cada fase do negócio — inclusive quem está começando.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.videoId} delay={0.1 + i * 0.1}>
              <article className="glass-card group h-full rounded-3xl p-5 md:p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--gold)]/40">
                <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40" style={{ aspectRatio: "16 / 9" }}>
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${t.videoId}`}
                    title={t.title}
                    loading="lazy"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>

                <div className="mt-6 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl text-bone leading-tight">
                      {t.name}
                    </h3>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-[color:var(--gold-light)]">
                      {t.company}
                    </p>
                  </div>
                  <span className="hidden md:block h-px w-12 mt-4 bg-gradient-to-r from-[color:var(--gold)]/60 to-transparent" />
                </div>

                <p className="mt-4 text-sm md:text-[15px] text-bone/70 leading-relaxed">
                  {t.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-16 flex flex-col items-center text-center gap-5">
            <p className="text-bone/75 text-base md:text-lg">
              Quer começar sua empresa com esse mesmo suporte?
            </p>
            <MagneticButton href="https://wa.me/5527988482268?text=Olá,%20quero%20abrir%20minha%20empresa%20com%20a%20Fraga%20Contabilidade.%20Pode%20me%20ajudar%20a%20entender%20o%20melhor%20caminho%3F">
              Quero começar com esse suporte
              <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
