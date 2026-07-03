import { ArrowUpRight } from "lucide-react";
import { Eyebrow, SectionTitle } from "../rdlf/primitives";
import { ScrollReveal } from "../rdlf/motion/kinetic";
import { WorldClassCard } from "../rdlf/motion/WorldClassCard";
import { ShinyButton } from "../rdlf/ShinyButton";


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
  title: "Análise inicial e orientação tributária",
  desc: "Entendemos sua atividade, expectativa de faturamento e modelo de operação para indicar o melhor tipo de empresa e o regime tributário mais adequado antes de abrir o CNPJ.",
  tag: "Começar do jeito certo",
  items: ["Definição do tipo de empresa", "Simples Nacional, Presumido ou Real", "Simulação de cenários"],
  link: baseWa + "abertura%20de%20empresa%20com%20orienta%C3%A7%C3%A3o%20tribut%C3%A1ria.",
};

const areas: Area[] = [
  {
    n: "02",
    title: "Abertura do CNPJ",
    desc: "Acompanhamos o processo de formalização — natureza jurídica, CNAEs, contrato social e inscrições — para sua empresa começar dentro das exigências legais.",
    tag: "Formalização segura",
    items: ["Registro na junta", "Inscrições municipais e estaduais", "Certificado digital"],
    link: baseWa + "abertura%20de%20CNPJ.",
  },
  {
    n: "03",
    title: "Escolha do regime tributário",
    desc: "Orientamos sobre Simples Nacional, Lucro Presumido ou Lucro Real conforme a sua atividade e faturamento previsto, evitando decisões que podem custar caro depois.",
    tag: "Impostos previsíveis",
    items: ["Análise da atividade", "Comparativo de regimes", "Recomendação técnica"],
    link: baseWa + "escolha%20do%20regime%20tribut%C3%A1rio.",
  },
  {
    n: "04",
    title: "Organização contábil inicial",
    desc: "Estruturamos os primeiros passos da rotina fiscal, contábil e financeira para que sua empresa opere organizada desde o primeiro mês.",
    tag: "Rotina desde o dia 1",
    items: ["Emissão de notas", "Apuração de impostos", "Obrigações acessórias"],
    link: baseWa + "organiza%C3%A7%C3%A3o%20cont%C3%A1bil%20inicial.",
  },
  {
    n: "05",
    title: "Departamento pessoal desde a admissão",
    desc: "Se sua empresa já nasce com funcionários, cuidamos de admissões, folha, eSocial e demais rotinas trabalhistas para começar em conformidade.",
    tag: "Folha em dia",
    items: ["Admissões", "Folha e eSocial", "Rotinas trabalhistas"],
    link: baseWa + "departamento%20pessoal%20na%20abertura.",
  },
  {
    n: "06",
    title: "Suporte após a abertura",
    desc: "Depois que o CNPJ está ativo, seguimos acompanhando sua empresa para manter tudo em ordem e apoiar as próximas decisões contábeis e tributárias.",
    tag: "Continuidade",
    items: ["Rotina mensal", "Consultoria contábil", "WhatsApp direto"],
    link: baseWa + "suporte%20cont%C3%A1bil%20cont%C3%ADnuo.",
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
              <Eyebrow>Processo de abertura</Eyebrow>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <SectionTitle className="mt-5">
                Da ideia ao{" "}
                <span className="italic text-[color:var(--gold-light)]">CNPJ</span>: a Fraga
                acompanha cada etapa.
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

        <ScrollReveal delay={0.15}>
          <div className="mt-20 flex flex-wrap items-center justify-center gap-5">
            <ShinyButton href="https://wa.me/5527988482268?text=Olá,%20quero%20come%C3%A7ar%20minha%20abertura%20de%20empresa%20com%20a%20Fraga.">
              Começar minha abertura
              <ArrowUpRight className="h-4 w-4" />
            </ShinyButton>
            <ShinyButton href="#planos" variant="secondary">
              Descobrir melhor caminho
              <ArrowUpRight className="h-4 w-4" />
            </ShinyButton>
          </div>
        </ScrollReveal>
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
          Começar minha abertura
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

