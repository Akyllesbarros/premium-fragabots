import { ArrowUpRight } from "lucide-react";
import { Eyebrow, SectionTitle } from "./primitives";
import { ScrollReveal } from "./motion/kinetic";
import { WorldClassCard } from "./motion/WorldClassCard";


type Area = {
  n: string;
  title: string;
  desc: string;
  tag: string;
  items: string[];
  link: string;
};

const baseWa = "https://wa.me/5527988482268?text=Olá,%20vim%20pela%20landing%20page%20da%20Fraga%20e%20gostaria%20de%20saber%20mais%20sobre%20";

const featured: Area = {
  n: "01",
  title: "Planejamento tributário",
  desc: "Avaliamos se a empresa está no regime adequado e onde existem riscos, excessos ou oportunidades dentro da lei.",
  tag: "Decisão com clareza",
  items: ["Análise de regime", "Simulação de cenários", "Acompanhamento mensal"],
  link: baseWa + "Planejamento%20Tribut%C3%A1rio.",
};

const areas: Area[] = [
  {
    n: "02",
    title: "Rotina contábil",
    desc: "Apurações, guias, declarações e obrigações acessórias acompanhadas de perto, com prazos cumpridos e relatórios mensais.",
    tag: "Sem atraso",
    items: ["Apuração de impostos", "Obrigações acessórias", "Relatórios mensais"],
    link: baseWa + "Rotina%20Cont%C3%A1bil.",
  },
  {
    n: "03",
    title: "Departamento pessoal",
    desc: "Folha, admissões, desligamentos, eSocial e rotinas trabalhistas conduzidas por uma equipe dedicada.",
    tag: "Folha em dia",
    items: ["Folha de pagamento", "eSocial", "Admissões e rescisões"],
    link: baseWa + "Departamento%20Pessoal.",
  },
  {
    n: "04",
    title: "BPO financeiro",
    desc: "Contas a pagar e a receber, conciliação bancária e fluxo de caixa organizados para a empresa decidir com dados reais.",
    tag: "Caixa organizado",
    items: ["Contas a pagar", "Conciliação bancária", "Fluxo de caixa"],
    link: baseWa + "BPO%20Financeiro.",
  },
  {
    n: "05",
    title: "Abertura e regularização",
    desc: "Abertura de CNPJ, troca de regime, regularização fiscal e tudo o que prepara a empresa para operar sem pendências.",
    tag: "Estrutura desde o início",
    items: ["Abertura de CNPJ", "Alterações contratuais", "Regularização"],
    link: baseWa + "Abertura%20e%20Regulariza%C3%A7%C3%A3o.",
  },
  {
    n: "06",
    title: "Consultoria empresarial",
    desc: "Apoio na leitura de números, indicadores e decisões de investimento — para crescer com base no que os relatórios dizem.",
    tag: "Decidir com dado",
    items: ["Leitura de indicadores", "Cenários", "Reuniões periódicas"],
    link: baseWa + "Consultoria%20Empresarial.",
  },
];

export function PracticeAreas() {
  return (
    <section id="servicos" className="relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_right,#041F1F),#050706))]" />

      <div className="container-rdlf">
        <div className="grid gap-10 lg:grid-cols-12 mb-16">
          <div className="lg:col-span-8 lg:col-start-3">
            <ScrollReveal>
              <Eyebrow>Áreas de atuação</Eyebrow>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <SectionTitle className="mt-5">
                Seis frentes integradas — uma única{" "}
                <span className="italic text-[color:var(--gold-light)]">contabilidade</span>.
              </SectionTitle>
            </ScrollReveal>
          </div>
        </div>

        {/* Editorial asymmetric layout */}
        <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
          {/* Featured — large editorial card */}
          <ScrollReveal direction="left" className="lg:col-span-7 lg:row-span-2">
            <FeaturedCard area={featured} />
          </ScrollReveal>

          {/* Tall card right of featured */}
          <ScrollReveal direction="right" delay={0.1} className="lg:col-span-5">
            <CompactCard area={areas[0]} accent />
          </ScrollReveal>

          {/* Horizontal card */}
          <ScrollReveal direction="right" delay={0.18} className="lg:col-span-5">
            <CompactCard area={areas[1]} />
          </ScrollReveal>

          {/* Bottom row — offset, asymmetric */}
          <ScrollReveal direction="up" delay={0.05} className="lg:col-span-4 lg:col-start-1">
            <CompactCard area={areas[2]} />
          </ScrollReveal>
          <ScrollReveal
            direction="up"
            delay={0.15}
            className="lg:col-span-5 lg:col-start-5 lg:translate-y-6"
          >
            <CompactCard area={areas[3]} accent />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.25} className="lg:col-span-3 lg:col-start-10">
            <ListCard area={areas[4]} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ area }: { area: Area }) {
  return (
    <WorldClassCard radius="rounded-3xl" intensity="medium" className="h-full">
      <article className="group relative h-full overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-br from-ink-soft to-ink p-10 md:p-14 transition-all duration-500 hover:border-[color:var(--gold)]/30">
      {/* monogram bg */}
      <div className="pointer-events-none absolute -right-10 -bottom-16 font-display italic text-[18rem] leading-none text-white/[0.025] select-none">
        IP
      </div>
      <div className="relative">
        <div className="flex items-start justify-between">
          <span className="font-display text-7xl text-[color:var(--gold-light)]/40 group-hover:text-[color:var(--gold-light)] transition-colors">
            {area.n}
          </span>
          <span className="text-[10px] tracking-[0.22em] uppercase text-bone/55 border border-[color:var(--gold)]/30 rounded-full px-3 py-1.5">
            {area.tag}
          </span>
        </div>
        <h3 className="font-display text-4xl md:text-5xl text-bone mt-10 leading-[1.05]">
          {area.title}
        </h3>
        <p className="text-base text-bone/65 mt-5 max-w-md leading-relaxed">{area.desc}</p>
        <ul className="mt-10 flex flex-wrap gap-3">
          {area.items.map((it) => (
            <li
              key={it}
              className="text-[12px] tracking-wide text-bone/75 border border-white/10 rounded-full px-3.5 py-1.5 backdrop-blur"
            >
              {it}
            </li>
          ))}
        </ul>
        <a
          href={area.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-flex items-center gap-2 text-[12px] tracking-[0.18em] uppercase text-[color:var(--gold-light)]"
        >
          Avaliar proteção
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </div>
      </article>
    </WorldClassCard>
  );
}


function CompactCard({ area, accent = false }: { area: Area; accent?: boolean }) {
  return (
    <WorldClassCard radius="rounded-2xl" intensity="soft" className="h-full">
    <article
      className={`group relative h-full overflow-hidden rounded-2xl border p-8 md:p-10 transition-all duration-500 ${
        accent
          ? "bg-[color:var(--petrol)]/30 border-[color:var(--gold)]/20 hover:border-[color:var(--gold)]/50"
          : "bg-ink-soft/60 border-white/8 hover:border-white/20"
      }`}
    >
      <div className="flex items-start justify-between">
        <span className="font-display text-4xl text-[color:var(--gold-light)]/55">{area.n}</span>
        <span className="text-[10px] tracking-[0.2em] uppercase text-bone/45">{area.tag}</span>
      </div>
      <h3 className="font-display text-2xl md:text-3xl text-bone mt-6 leading-tight">
        {area.title}
      </h3>
      <p className="text-sm text-bone/60 mt-3 leading-relaxed">{area.desc}</p>
      <ul className="mt-6 space-y-2 text-sm text-bone/70">
        {area.items.map((it) => (
          <li key={it} className="flex items-start gap-3">
            <span className="mt-2 h-1 w-1 rounded-full bg-[color:var(--gold)] flex-none" />
            {it}
          </li>
        ))}
      </ul>
      <a
        href={area.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-bone/70 group-hover:text-[color:var(--gold-light)] transition-colors"
      >
        Ver aplicação
        <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </article>
    </WorldClassCard>
  );
}

function ListCard({ area }: { area: Area }) {
  return (
    <WorldClassCard radius="rounded-2xl" intensity="soft" className="h-full">
    <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/8 bg-ink-soft/40 p-8 transition-all hover:border-[color:var(--gold)]/30">
      <div>
        <span className="font-display text-3xl text-[color:var(--gold-light)]/55">{area.n}</span>
        <h3 className="font-display text-xl text-bone mt-4">{area.title}</h3>
        <p className="text-xs text-bone/55 mt-3 leading-relaxed">{area.desc}</p>
      </div>
      <div>
        <span className="text-[10px] tracking-[0.2em] uppercase text-bone/45 border-t border-white/10 pt-4 block">
          {area.tag}
        </span>
        <a
          href={area.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-bone/70 group-hover:text-[color:var(--gold-light)] transition-colors"
        >
          Ver aplicação
          <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </article>
    </WorldClassCard>
  );
}

