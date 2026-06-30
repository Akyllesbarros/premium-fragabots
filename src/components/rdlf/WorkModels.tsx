import { Eyebrow, PremiumButton, Reveal, SectionTitle } from "./primitives";
import { ArrowUpRight, Check } from "lucide-react";

const models = [
  {
    name: "Diagnóstico Jurídico Estratégico",
    for: "Empresas que precisam enxergar o próprio mapa jurídico antes de decidir.",
    includes: [
      "Leitura completa de contratos críticos",
      "Análise societária e de marca",
      "Mapa de riscos priorizado",
      "Apresentação executiva",
    ],
    best: "Decisões pontuais de alto impacto.",
    featured: false,
  },
  {
    name: "Acompanhamento Preventivo Mensal",
    for: "Empresas em crescimento que precisam de jurídico como rotina.",
    includes: [
      "Hotline jurídica para decisões",
      "Revisões contratuais recorrentes",
      "Monitoramento de marca",
      "Atualizações estruturais contínuas",
    ],
    best: "Operação que cresce e não pode parar.",
    featured: true,
  },
  {
    name: "Projeto Jurídico Pontual",
    for: "Empresas com demanda jurídica delimitada e prazo definido.",
    includes: [
      "Escopo fechado",
      "Entrega estruturada",
      "Documentação revisada",
      "Repasse técnico final",
    ],
    best: "Registro de marca, contrato crítico, acordo de sócios.",
    featured: false,
  },
];

export function WorkModels() {
  return (
    <section className="relative py-28 md:py-36">
      <div className="container-rdlf">
        <div className="grid gap-10 lg:grid-cols-12 mb-14">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Modelos de trabalho</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <SectionTitle className="mt-5">
                Três formas de contratar a RDLF — escolhidas pelo{" "}
                <span className="italic text-[color:var(--gold-light)]">tipo de decisão</span>,
                não pelo tamanho da empresa.
              </SectionTitle>
            </Reveal>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3 items-stretch">
          {models.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.07}>
              <div
                className={`relative h-full rounded-2xl p-8 border flex flex-col ${
                  m.featured
                    ? "border-[color:var(--gold)]/40 bg-gradient-to-b from-ink-soft to-ink"
                    : "border-white/8 bg-ink-soft/40"
                }`}
              >
                {m.featured && (
                  <span className="absolute -top-3 left-8 text-[10px] tracking-[0.22em] uppercase bg-[color:var(--gold-light)] text-ink px-3 py-1.5 rounded-full">
                    Mais escolhido
                  </span>
                )}
                <h3 className="font-display text-2xl text-bone leading-tight">{m.name}</h3>
                <p className="text-sm text-bone/55 mt-3">{m.for}</p>

                <div className="hairline my-6" />

                <ul className="space-y-3 text-sm text-bone/80 flex-1">
                  {m.includes.map((it) => (
                    <li key={it} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-[color:var(--gold-light)] mt-0.5 flex-none" />
                      {it}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 pt-5 border-t border-white/10">
                  <div className="eyebrow mb-2">Indicado para</div>
                  <p className="text-sm text-bone/70">{m.best}</p>
                </div>

                <a href="#contato" className="mt-7">
                  <PremiumButton
                    variant={m.featured ? "primary" : "outline"}
                    className="w-full"
                  >
                    Conversar
                    <ArrowUpRight className="h-4 w-4" />
                  </PremiumButton>
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-xs text-bone/40">
          Valores definidos sob escopo. A RDLF não pratica honorários por tabela.
        </p>
      </div>
    </section>
  );
}
