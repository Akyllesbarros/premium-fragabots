import { ArrowUpRight, Check } from "lucide-react";
import { Eyebrow, Reveal } from "./primitives";
import { MagneticButton } from "./motion/kinetic";

type Plan = {
  name: string;
  description: string;
  highlighted?: boolean;
};

const plans: Plan[] = [
  { name: "MEI", description: "Ideal para quem fatura até R$ 81 mil por ano." },
  { name: "ESSENCIAL", description: "Para quem fatura até R$ 100 mil por mês." },
  { name: "PLUS", description: "Para quem fatura até R$ 200 mil por mês.", highlighted: true },
  { name: "PREMIUM", description: "Para quem fatura até R$ 400 mil por mês." },
];

export function PlansSection() {
  return (
    <section id="planos" className="relative py-28 md:py-36 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,168,25,0.10),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(31,111,120,0.45),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 select-none text-center font-display text-[22vw] leading-none tracking-[-0.05em] text-white/[0.025]"
      >
        planos
      </div>
      <div className="absolute inset-0 -z-10 grain" />

      <div className="container-rdlf">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>Planos</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-[clamp(2rem,4.4vw,4rem)] leading-[1.02] tracking-[-0.03em] text-bone mt-5">
              Escolha o plano{" "}
              <span className="italic text-[color:var(--gold-light)]">ideal</span> para
              sua empresa
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 text-bone/70 text-base md:text-lg max-w-2xl leading-relaxed">
              Encontre o plano que melhor se adapta ao seu faturamento e tenha uma
              contabilidade sem complicações.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={0.1 + i * 0.08}>
              <article
                className={[
                  "group relative h-full rounded-3xl p-7 md:p-8 transition-all duration-300 ease-out hover:-translate-y-1.5",
                  "glass-card",
                  plan.highlighted
                    ? "border-[color:var(--gold)]/50 shadow-[0_0_0_1px_rgba(255,168,25,0.15),0_20px_60px_-30px_rgba(255,168,25,0.45)] hover:border-[color:var(--gold)]/70"
                    : "hover:border-[color:var(--gold)]/30",
                ].join(" ")}
              >
                {plan.highlighted && (
                  <span
                    aria-hidden
                    className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--gold)] to-transparent"
                  />
                )}

                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--gold)]" />
                  <span className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--gold-light)]">
                    Plano
                  </span>
                </div>

                <h3 className="mt-5 font-display text-3xl md:text-4xl text-bone leading-none">
                  {plan.name}
                </h3>

                <div className="mt-5 h-px w-10 bg-gradient-to-r from-[color:var(--gold)]/60 to-transparent" />

                <p className="mt-5 text-[15px] text-bone/75 leading-relaxed">
                  {plan.description}
                </p>

                <div className="mt-8 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-bone/55">
                  <Check className="h-3.5 w-3.5 text-[color:var(--gold-light)]" />
                  Contabilidade completa
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.35}>
          <div className="mt-16 flex flex-col items-center text-center gap-4">
            <p className="font-display text-2xl md:text-3xl text-bone leading-tight">
              Não sabe qual plano escolher?
            </p>
            <p className="text-bone/70 text-base md:text-lg max-w-xl">
              Fale com a Fraga e receba uma orientação personalizada para entender o
              melhor caminho para sua empresa.
            </p>
            <MagneticButton
              href="https://wa.me/5527988482268?text=Olá,%20vim%20pela%20landing%20page%20da%20Fraga%20Contabilidade%20e%20gostaria%20de%20orientação%20sobre%20os%20planos."
              className="mt-2"
            >
              Falar com a Fraga
              <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}