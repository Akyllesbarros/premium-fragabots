import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "./primitives";
import { ScrollReveal, SplitTextReveal } from "./motion/kinetic";
import { WorldClassCard } from "./motion/WorldClassCard";


const featured = {
  tag: "Crescimento",
  title: "Empresa escalando sobre contratos frágeis",
  problem: "Operação crescendo rápido com contratos copiados de templates antigos.",
  intervention: "Modelagem contratual sobre o fluxo real de receita e responsabilidades.",
  gain: "Negociações previsíveis, renovações sem desgaste e disputas controláveis.",
  area: "Contratos Empresariais",
  metric: "fluxo de receita",
};

const secondary = [
  {
    tag: "Marca",
    title: "Marca forte sem registro",
    intervention: "Estratégia de classes, busca de anterioridade e depósito imediato.",
    area: "Propriedade Intelectual",
  },
  {
    tag: "Societário",
    title: "Sociedade sem responsabilidades claras",
    intervention: "Acordo de sócios com regras de governança e cenários de saída.",
    area: "Estruturação Jurídica",
  },
];

const tertiary = [
  {
    tag: "Operação",
    title: "Operação sem documentação interna",
    intervention: "Políticas internas mínimas e organização documental.",
    area: "Compliance",
  },
  {
    tag: "Conflito",
    title: "Conflito comercial antes da judicialização",
    intervention: "Notificação extrajudicial e composição estruturada.",
    area: "Resolução Extrajudicial",
  },
];

export function CaseSituations() {
  return (
    <section className="relative pt-8 pb-28 md:pt-12 md:pb-40 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,#041F1F),#050706))]" />
      <span className="pointer-events-none absolute -left-6 top-20 font-display italic text-[14vw] leading-none text-white/[0.022] select-none">
        cenas
      </span>

      <div className="container-rdlf">
        <div className="grid gap-10 lg:grid-cols-12 mb-16">
          <div className="lg:col-span-9">
            <ScrollReveal>
              <Eyebrow>Situações estratégicas · não são depoimentos</Eyebrow>
            </ScrollReveal>
            <h2 className="font-display text-[clamp(2rem,5vw,4.6rem)] leading-[0.98] tracking-[-0.03em] text-bone mt-5">
              <SplitTextReveal
                text="Cenas em que a estrutura jurídica muda o jogo."
                highlight={["estrutura", "muda"]}
              />
            </h2>
          </div>
        </div>

        {/* Editorial layout: 1 large horizontal + 2 offset + 2 bottom */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* FEATURED — large horizontal */}
          <ScrollReveal direction="left" className="lg:col-span-12">
            <WorldClassCard radius="rounded-3xl" intensity="medium">
            <article className="group relative grid md:grid-cols-[1.15fr_1fr] overflow-hidden rounded-3xl border border-white/10 bg-ink-soft/60">

              <div className="relative p-8 md:p-12 lg:p-16">
                <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[color:var(--gold)]/10 blur-3xl" />
                <div className="relative">
                  <span className="text-[10px] tracking-[0.22em] uppercase text-[color:var(--gold-light)] border border-[color:var(--gold)]/30 rounded-full px-3 py-1.5">
                    {featured.tag}
                  </span>
                  <h3 className="font-display text-3xl md:text-5xl text-bone mt-7 leading-[1.02]">
                    {featured.title}
                  </h3>
                  <p className="mt-6 max-w-lg text-bone/65 text-[15px] leading-relaxed">
                    {featured.problem}
                  </p>
                  <div className="hairline my-9" />
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field k="Intervenção" v={featured.intervention} accent />
                    <Field k="Ganho esperado" v={featured.gain} />
                  </div>
                  <div className="mt-10 flex items-center justify-between">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-bone/45">
                      Área · <span className="text-bone/80">{featured.area}</span>
                    </div>
                    <a
                      href="#contato"
                      className="inline-flex items-center gap-2 text-[12px] tracking-[0.18em] uppercase text-[color:var(--gold-light)]"
                    >
                      Conversar
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>
                  </div>
                </div>
              </div>
              {/* visual side — abstract */}
              <div className="relative hidden md:block border-l border-white/5 bg-[radial-gradient(ellipse_at_center,oklch(0.24_0.05_175/0.45),transparent_70%)]">
                <div className="absolute inset-0 grid place-items-center">
                  <div className="relative h-72 w-72">
                    <div className="absolute inset-0 rounded-full border border-white/10" />
                    <div className="absolute inset-4 rounded-full border border-[color:var(--gold)]/25 border-dashed" />
                    <div className="absolute inset-1/4 rounded-full bg-[color:var(--gold)]/10 blur-2xl" />
                    <div className="absolute inset-0 grid place-items-center">
                      <span className="font-display italic text-7xl text-bone/85">Fraga</span>
                    </div>
                  </div>
                </div>
                <span className="absolute right-6 bottom-6 text-[10px] uppercase tracking-[0.25em] text-bone/45">
                  {featured.metric}
                </span>
              </div>
            </article>
            </WorldClassCard>
          </ScrollReveal>


          {/* Secondary — offset */}
          {secondary.map((c, i) => (
            <ScrollReveal
              key={c.title}
              direction={i === 0 ? "right" : "left"}
              delay={0.1 + i * 0.08}
              className={`lg:col-span-6 ${i === 1 ? "lg:translate-y-8" : ""}`}
            >
              <MiniCase {...c} />
            </ScrollReveal>
          ))}

          {/* Tertiary */}
          {tertiary.map((c, i) => (
            <ScrollReveal
              key={c.title}
              direction="up"
              delay={0.1 + i * 0.08}
              className={`lg:col-span-6 ${i === 0 ? "lg:translate-y-4" : ""}`}
            >
              <MiniCase {...c} dense />
            </ScrollReveal>
          ))}
        </div>

        <p className="mt-10 text-xs text-bone/40">
          Situações ilustrativas. Não representam clientes reais nem depoimentos.
        </p>
      </div>
    </section>
  );
}

function MiniCase({
  tag,
  title,
  intervention,
  area,
  dense,
}: {
  tag: string;
  title: string;
  intervention: string;
  area: string;
  dense?: boolean;
}) {
  return (
    <WorldClassCard radius="rounded-2xl" intensity="soft" className="h-full">
    <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-ink-soft/50 p-8 md:p-10 transition-all hover:border-[color:var(--gold)]/40">
      <div className="absolute -top-16 -right-16 h-44 w-44 rounded-full bg-[color:var(--gold)]/8 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative flex items-start justify-between">
        <span className="text-[10px] tracking-[0.2em] uppercase text-[color:var(--gold-light)]">
          {tag}
        </span>
        <ArrowUpRight className="h-4 w-4 text-bone/30 group-hover:text-[color:var(--gold-light)] transition-colors" />
      </div>
      <h3 className={`relative font-display text-bone mt-6 leading-tight ${dense ? "text-xl" : "text-2xl md:text-3xl"}`}>
        {title}
      </h3>
      <div className="relative mt-5">
        <Field k="Intervenção" v={intervention} accent />
      </div>
      <div className="relative mt-7 pt-4 border-t border-white/10 text-[11px] uppercase tracking-[0.2em] text-bone/50">
        Área · <span className="text-bone/80">{area}</span>
      </div>
    </article>
    </WorldClassCard>

  );
}

function Field({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div>
      <div className="text-[10px] tracking-[0.22em] uppercase text-bone/45 mb-1.5">{k}</div>
      <p className={accent ? "text-bone text-[15px] leading-relaxed" : "text-bone/65 text-[14px] leading-relaxed"}>
        {v}
      </p>
    </div>
  );
}
