import { Eyebrow, Reveal } from "./primitives";
import { ArrowUpRight } from "lucide-react";

const insights = [
  {
    tag: "Marca",
    title: "Quando registrar uma marca?",
    desc: "O melhor momento para depositar marca é antes de ela virar um ativo conhecido — não depois.",
    read: "5 min",
  },
  {
    tag: "Contratos",
    title: "O risco dos contratos genéricos",
    desc: "Por que modelos copiados quebram justamente nos pontos críticos da operação.",
    read: "6 min",
  },
  {
    tag: "Prevenção",
    title: "Por que empresas em crescimento precisam de jurídico preventivo?",
    desc: "Escala amplifica decisões erradas. Estrutura jurídica é o que segura o crescimento.",
    read: "7 min",
  },
  {
    tag: "Riscos",
    title: "Como identificar riscos jurídicos invisíveis?",
    desc: "Um mapa básico das categorias de risco que normalmente passam batidas no dia a dia.",
    read: "5 min",
  },
];

export function Insights() {
  return (
    <section className="relative py-28 md:py-36">
      <div className="container-rdlf">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <Reveal>
              <Eyebrow>Insights</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display section-display text-bone mt-5">
                Insights jurídicos{" "}
                <span className="italic text-[color:var(--gold-light)]">estratégicos</span>.
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {insights.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.06}>
              <article className="group h-full flex flex-col rounded-2xl border border-white/8 bg-ink p-6 hover:border-[color:var(--gold)]/30 transition-colors">
                <div className="flex items-center justify-between text-[11px] tracking-wide text-bone/45">
                  <span className="uppercase tracking-[0.18em] text-[color:var(--gold-light)]/80">
                    {it.tag}
                  </span>
                  <span>{it.read} de leitura</span>
                </div>
                <h3 className="font-display text-xl text-bone mt-6 leading-snug flex-1">
                  {it.title}
                </h3>
                <p className="text-sm text-bone/55 mt-3 leading-relaxed">{it.desc}</p>
                <div className="mt-6 pt-5 border-t border-white/8">
                  <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.18em] uppercase text-bone/70 group-hover:text-[color:var(--gold-light)] transition-colors">
                    Em breve
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
