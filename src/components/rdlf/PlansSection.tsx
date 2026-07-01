import { useState } from "react";
import { ArrowUpRight, Briefcase, MessageCircle } from "lucide-react";

type Plan = {
  n: string;
  name: string;
  faturamento: string;
  price: string;
  priceSuffix?: string;
  description: string;
  mudanca: string;
  waText: string;
};

const plans: Plan[] = [
  {
    n: "01",
    name: "MEI",
    faturamento: "Até R$ 81 mil por ano",
    price: "Sob consulta",
    description:
      "Plano ideal para o Microempreendedor Individual que quer manter as obrigações em dia com simplicidade e segurança, sem se preocupar com prazos ou burocracia.",
    mudanca: "Sua rotina de MEI organizada, sem susto com pendências ou multas.",
    waText: "MEI",
  },
  {
    n: "02",
    name: "ESSENCIAL",
    faturamento: "Até R$ 100 mil por mês",
    price: "Sob consulta",
    description:
      "Para pequenas empresas que precisam de uma contabilidade completa e próxima — apurações, obrigações, folha e suporte no dia a dia.",
    mudanca: "Uma contabilidade estruturada acompanhando o crescimento da empresa.",
    waText: "ESSENCIAL",
  },
  {
    n: "03",
    name: "PLUS",
    faturamento: "Até R$ 200 mil por mês",
    price: "Sob consulta",
    description:
      "Para empresas em expansão que já sentem a necessidade de análises tributárias mais profundas, relatórios estratégicos e um contador de confiança por perto.",
    mudanca: "Decisões tomadas com base em números claros e planejamento tributário ativo.",
    waText: "PLUS",
  },
  {
    n: "04",
    name: "PREMIUM",
    faturamento: "Até R$ 400 mil por mês",
    price: "Sob consulta",
    description:
      "Para empresas consolidadas que precisam de uma contabilidade consultiva, com acompanhamento próximo, indicadores e apoio estratégico contínuo.",
    mudanca: "Contabilidade estratégica de verdade, integrada às decisões da empresa.",
    waText: "PREMIUM",
  },
];

const waBase =
  "https://wa.me/5527988482268?text=Olá,%20vim%20pela%20landing%20page%20da%20Fraga%20e%20gostaria%20de%20saber%20mais%20sobre%20o%20plano%20";

export function PlansSection() {
  const [active, setActive] = useState(0);
  const current = plans[active];

  return (
    <section id="planos" className="relative py-28 md:py-36 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,168,25,0.10),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(31,111,120,0.45),transparent_60%)]"
      />
      <div className="absolute inset-0 -z-10 grain" />
      <div className="container-rdlf">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 items-start">
          {/* Left: header + list */}
          <div>
            <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-[color:var(--gold-light)]">
              <span className="h-px w-6 bg-[color:var(--gold-light)]/60" />
              Planos
            </span>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.4vw,4rem)] leading-[1.02] tracking-[-0.03em] text-bone">
              Escolha o plano{" "}
              <span className="italic text-[color:var(--gold-light)]">ideal</span> para
              sua <span className="italic text-[color:var(--gold-light)]">empresa</span>.
            </h2>

            <ul className="mt-14 divide-y divide-white/10 border-t border-white/10">
              {plans.map((p, i) => {
                const isActive = i === active;
                return (
                  <li key={p.name}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      className="group flex w-full items-center justify-between gap-6 py-6 md:py-7 text-left"
                    >
                      <div className="flex items-baseline gap-6 md:gap-10">
                        <span
                          className={`font-display text-lg tabular-nums transition-colors ${
                            isActive
                              ? "text-[color:var(--gold-light)]"
                              : "text-bone/40"
                          }`}
                        >
                          {p.n}
                        </span>
                        <span
                          className={`font-display text-3xl md:text-5xl leading-none tracking-[-0.02em] transition-colors ${
                            isActive
                              ? "text-bone"
                              : "text-bone/30 group-hover:text-bone/70"
                          }`}
                        >
                          {p.name}
                        </span>
                      </div>
                      <ArrowUpRight
                        className={`h-5 w-5 transition-all ${
                          isActive
                            ? "text-[color:var(--gold-light)] opacity-100 translate-x-0"
                            : "text-bone/40 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: intro + detail card */}
          <div className="lg:pt-4">
            <p className="text-bone/70 text-[15px] md:text-base leading-relaxed max-w-md">
              Do MEI à empresa consolidada, cada plano é pensado para o momento
              atual do seu negócio. Clique em cada plano para entender como ele
              se aplica à sua realidade.
            </p>

            <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[color:var(--ink-soft)] to-[color:var(--petrol)]/30 p-7 md:p-8 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)] backdrop-blur">
              <div className="flex items-start justify-between">
                <span className="font-display text-5xl md:text-6xl leading-none text-[color:var(--gold-light)]">
                  {current.n}
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--gold)]/20 text-[color:var(--gold-light)] border border-[color:var(--gold)]/40">
                  <Briefcase className="h-5 w-5" />
                </span>
              </div>

              <h3 className="mt-8 font-display text-2xl md:text-3xl text-bone">
                {current.name}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-[0.22em] text-bone/55">
                {current.faturamento}
              </p>

              <div className="mt-6 border-y border-white/10 py-5">
                <div className="text-[10px] uppercase tracking-[0.24em] text-bone/50">
                  Investimento
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-5xl md:text-6xl leading-none tracking-[-0.02em] text-[color:var(--gold-light)]">
                    {current.price}
                  </span>
                  {current.priceSuffix && (
                    <span className="text-xs uppercase tracking-[0.2em] text-bone/60">
                      {current.priceSuffix}
                    </span>
                  )}
                </div>
              </div>

              <p className="mt-5 text-[14px] md:text-[15px] text-bone/70 leading-relaxed">
                {current.description}
              </p>

              <div className="mt-6 rounded-xl border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/10 px-4 py-4">
                <div className="text-[10px] uppercase tracking-[0.22em] text-[color:var(--gold-light)]">
                  O que muda na prática
                </div>
                <p className="mt-2 text-sm text-bone/85 leading-relaxed">
                  {current.mudanca}
                </p>
              </div>

              <a
                href={waBase + current.waText}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--gold)] px-6 py-4 text-sm text-[color:var(--ink)] font-medium hover:bg-[color:var(--gold-light)] transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Conversar sobre plano {current.name}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}