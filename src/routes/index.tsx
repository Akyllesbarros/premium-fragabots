import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight, ArrowRight, MessageCircle, Menu, X,
} from "lucide-react";
import { waLink, trackConversion } from "@/lib/whatsapp";
import { PremiumButton } from "@/components/fraga/PremiumButton";
import { ScrollProgress } from "@/components/fraga/ScrollProgress";
import { VideoCard, VideoModal, useVideoModal, type VideoItem } from "@/components/fraga/VideoModal";
import fragaLogo from "@/assets/fraga-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Contabilidade em Vila Velha e para empresas no Brasil | Fraga Contabilidade" },
      { name: "description", content: "Conte com a Fraga Contabilidade para assessoria contábil, planejamento tributário, abertura de empresas, BPO financeiro e soluções estratégicas para o seu negócio." },
      { property: "og:title", content: "Fraga Contabilidade — Contabilidade estratégica desde 1974" },
      { property: "og:description", content: "+50 anos de experiência, +1.000 casos de sucesso. Fale com um especialista pelo WhatsApp." },
    ],
  }),
  component: LandingPage,
});

const MAIN_CTA = waLink("Olá, vim pela landing page da Fraga Contabilidade e gostaria de falar com um especialista.");
const FLOAT_CTA = waLink("Olá, vim pela landing page da Fraga Contabilidade e gostaria de atendimento.");

/* ============================================================
   PAGE
   ============================================================ */
function LandingPage() {
  useEffect(() => {
    console.log("[FragaLandingPage]", "mounted");
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/40 overflow-x-hidden">
      <Header />
      <Hero />
      <Layer bg="bg-background text-foreground"><Manifesto /></Layer>
      <Layer bg="bg-secondary/40 text-foreground"><HistoryAuthority /></Layer>
      <Layer bg="bg-background text-foreground"><InteractiveDifferentials /></Layer>
      <Layer bg="bg-secondary/40 text-foreground"><NumberedServices /></Layer>
      <Layer bg="bg-background text-foreground"><WhatsAppJourney /></Layer>
      <Layer bg="bg-secondary/40 text-foreground"><StageSolutions /></Layer>
      <Layer bg="bg-background text-foreground"><VideoTestimonials /></Layer>
      <Layer bg="bg-secondary/40 text-foreground"><CommunityTrust /></Layer>
      <Layer bg="bg-background text-foreground"><Plans /></Layer>
      <Layer bg="bg-secondary/40 text-foreground"><Insights /></Layer>
      <Layer bg="bg-background text-foreground"><Faq /></Layer>
      <FinalCta />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function Layer({ bg, children }: { bg: string; children: React.ReactNode }) {
  return (
    <section className={`stack-section relative ${bg}`}>{children}</section>
  );
}

/* ============================================================
   Reveal hook & counter
   ============================================================ */
function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Counter({ to, suffix = "", duration = 1600 }: { to: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const { ref, visible } = useReveal<HTMLSpanElement>();
  useEffect(() => {
    if (!visible) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setVal(to); return; }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, to, duration]);
  return <span ref={ref}>{val.toLocaleString("pt-BR")}{suffix}</span>;
}

/* ============================================================
   HEADER
   ============================================================ */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const nav = [
    { href: "#inicio", label: "Início" },
    { href: "#sobre", label: "Sobre" },
    { href: "#solucoes", label: "Soluções" },
    { href: "#servicos", label: "Serviços" },
    { href: "#depoimentos", label: "Depoimentos" },
    { href: "#planos", label: "Planos" },
    { href: "#faq", label: "FAQ" },
  ];
  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-500">
      <div className={`mx-auto max-w-[1400px] px-4 lg:px-8 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
        <div className={`flex items-center justify-between rounded-full px-5 lg:px-6 py-2.5 transition-all duration-500 border ${
          scrolled
            ? "bg-card/90 backdrop-blur-xl border-border shadow-card"
            : "bg-card/70 backdrop-blur-md border-transparent"
        }`}>
          <FragaWordmark />
          <nav className="hidden xl:flex items-center gap-7">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={MAIN_CTA}
              target="_blank"
              rel="noopener"
              onClick={() => trackConversion("header_cta_click", "Header")}
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2 text-[13px] font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Falar com a Fraga
            </a>
            <button
              onClick={() => setOpen(v => !v)}
              className="xl:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground"
              aria-label="Abrir menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="xl:hidden mt-2 rounded-3xl bg-card/95 backdrop-blur-xl border border-border p-4 shadow-card animate-fade-in">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block py-2.5 text-foreground/80 hover:text-foreground border-b border-border last:border-0">
                {n.label}
              </a>
            ))}
            <a href={MAIN_CTA} target="_blank" rel="noopener" onClick={() => { setOpen(false); trackConversion("header_cta_click", "Header mobile"); }} className="mt-3 flex items-center justify-center gap-2 rounded-full bg-accent text-accent-foreground px-5 py-3 text-sm font-semibold">
              <MessageCircle className="w-4 h-4" /> Chamar no WhatsApp
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

function FragaWordmark() {
  return (
    <a href="#inicio" className="flex items-center gap-3 group">
      <img src={fragaLogo.url} alt="Fraga Contabilidade" className="h-7 w-auto" />
      <span className="hidden sm:block text-[9px] uppercase tracking-[0.28em] text-muted-foreground border-l border-border pl-3">
        Contabilidade<br/>desde 1974
      </span>
    </a>
  );
}

/* ============================================================
   HERO — full-bleed cinematic dark
   ============================================================ */
function Hero() {
  return (
    <section
      id="inicio"
      className="relative pt-28 pb-16 lg:pt-32 lg:pb-24 bg-background text-foreground"
    >
      <div aria-hidden className="absolute inset-x-0 top-0 h-[40vh] bg-gradient-to-b from-secondary/50 to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-[1400px] w-full px-6 lg:px-12">
        {/* Editorial top bar */}
        <div className="border-t border-border pt-5 mb-10 lg:mb-14 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
          <span>Fraga Contabilidade · Vila Velha — ES</span>
          <span className="font-mono normal-case tracking-normal text-muted-foreground/70">
            CRC-ES · em atividade desde 1974
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-semibold tracking-[-0.025em] leading-[1.04] text-[clamp(2.4rem,5.6vw,5rem)] max-w-[20ch] text-balance">
          Contabilidade para empresários que precisam de clareza antes de decidir.
        </h1>

        {/* Lede + meta column */}
        <div className="mt-10 lg:mt-12 grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="text-base lg:text-lg text-foreground/75 leading-[1.6] font-light max-w-[56ch]">
              A Fraga acompanha empresas em Vila Velha, no Espírito Santo e em todo o Brasil com rotinas contábeis, fiscais, tributárias e financeiras conduzidas por uma equipe com mais de 50 anos de experiência.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
              <a
                href={MAIN_CTA}
                target="_blank"
                rel="noopener"
                onClick={() => trackConversion("hero_cta_click", "Hero principal")}
                className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-5 py-2.5 font-semibold hover:bg-accent-glow transition-colors"
              >
                Falar com a Fraga pelo WhatsApp
                <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <a
                href="#servicos"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
              >
                Ver como trabalhamos
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        {/* Editorial footer ledger */}
        <div className="mt-16 lg:mt-24 pt-8 border-t border-border">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-8">
            {[
              { v: "50+", label: "anos de atuação" },
              { v: "1.000+", label: "empresas atendidas" },
              { v: "1974", label: "ano de fundação" },
              { v: "4,9 / 5", label: "avaliação Google" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col">
                <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground mb-2">{s.label}</div>
                <div className="font-display text-2xl lg:text-3xl font-semibold tracking-tight tabular-nums">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   MANIFESTO — marquee
   ============================================================ */
function Manifesto() {
  const lines = ["Impostos em ordem.", "Números claros.", "Decisões menos no escuro."];
  return (
    <div className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <div className="text-[10px] uppercase tracking-[0.28em] text-primary mb-5">— Manifesto</div>
            <h2 className="font-display font-semibold tracking-[-0.025em] leading-[1.08] text-[clamp(1.9rem,3.4vw,2.8rem)] text-balance">
              {lines[0]} {lines[1]} {lines[2]}
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-base lg:text-lg text-foreground/75 leading-[1.65] font-light max-w-[58ch]">
              Uma boa contabilidade não aparece só no fim do mês. Ela ajuda o empresário a enxergar riscos, organizar obrigações e entender o que os números estão dizendo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Marquee({ children, direction = "left", muted = false }: { children: React.ReactNode; direction?: "left" | "right"; muted?: boolean }) {
  const cls = direction === "left" ? "animate-marquee" : "animate-marquee-rev";
  return (
    <div className="overflow-hidden">
      <div className={`flex whitespace-nowrap ${cls} font-display font-black tracking-[-0.04em] text-[clamp(3rem,11vw,9rem)] leading-none ${muted ? "text-foreground/10" : "text-foreground"}`}>
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="px-6">{children}</span>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   HISTORY / AUTHORITY
   ============================================================ */
function HistoryAuthority() {
  const blocks = [
    { v: "1974", l: "ano de fundação" },
    { v: "+1.000", l: "empresas atendidas ao longo da história" },
    { v: "ES", l: "sede em Vila Velha" },
    { v: "BR", l: "atendemos empresas em todo o país" },
  ];
  const tags = ["Rotina contábil mensal", "Folha e DP", "Apuração tributária", "Abertura de CNPJ", "Regularização fiscal", "BPO financeiro"];
  return (
    <div id="sobre" className="py-24 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <div className="sticky top-32">
            <div className="text-xs uppercase tracking-[0.22em] text-primary font-semibold mb-5">— Nossa história</div>
            <h2 className="font-display text-4xl lg:text-6xl font-bold tracking-tight leading-[1.02] mb-8">
              Uma contabilidade construída{" "}
              de perto,
              cliente por cliente.
            </h2>
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-gradient-primary shadow-elegant max-w-sm">
              <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div className="flex items-center justify-between text-foreground">
                  <div className="font-display text-xl font-bold">Desde<br/>1974</div>
                  <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Fraga · ES</span>
                </div>
                <div className="text-foreground">
                  <div className="font-display text-6xl font-black tracking-tight">F</div>
                  <div className="text-[11px] uppercase tracking-[0.2em] opacity-70 mt-2">Vila Velha · ES</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pt-20">
          <p className="text-lg lg:text-xl text-foreground/75 leading-relaxed mb-10 max-w-xl">
            A Fraga nasceu da prática contábil feita de perto: acompanhando empresários, entendendo rotinas, corrigindo processos e construindo relações que atravessam anos. A tecnologia entrou para acelerar o trabalho, mas a base continua a mesma — clareza, responsabilidade e presença.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-10">
            {blocks.map(b => (
              <div key={b.l} className="rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-elegant transition-shadow">
                <div className="font-display text-4xl lg:text-5xl font-bold tracking-tight text-foreground">{b.v}</div>
                <div className="text-sm text-muted-foreground mt-2">{b.l}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map(t => (
              <span key={t} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium border border-border bg-background text-foreground/75">
                <span className="w-1 h-1 rounded-full bg-accent" /> {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   INTERACTIVE DIFFERENTIALS
   ============================================================ */
const DIFFERENTIALS = [
  { title: "Planejamento tributário", desc: "Avaliamos se a empresa está no regime adequado e onde existem riscos, excessos ou oportunidades dentro da lei.", media: "tributario" },
  { title: "Rotina contábil", desc: "Apurações, guias, declarações e obrigações acessórias acompanhadas de perto, com prazos cumpridos e relatórios mensais.", media: "rotina" },
  { title: "Departamento pessoal", desc: "Folha, admissões, desligamentos, eSocial e rotinas trabalhistas conduzidas por uma equipe dedicada.", media: "dp" },
  { title: "BPO financeiro", desc: "Contas a pagar e a receber, conciliação bancária e fluxo de caixa organizados para a empresa decidir com dados reais.", media: "bpo" },
  { title: "Abertura de empresas", desc: "Orientação para abrir o CNPJ com a atividade certa, o enquadramento adequado e os primeiros passos contábeis organizados.", media: "abertura" },
  { title: "Regularização fiscal", desc: "Diagnóstico das pendências e plano de ação para devolver previsibilidade antes que pequenos problemas cresçam.", media: "reg" },
] as const;

function InteractiveDifferentials() {
  const [active, setActive] = useState(0);
  const item = DIFFERENTIALS[active];
  return (
    <div className="py-24 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.22em] text-accent font-semibold mb-4">— O que a Fraga entrega</div>
            <h2 className="font-display text-4xl lg:text-6xl font-bold tracking-tight leading-[1.02]">
              Um time inteiro acompanhando a{" "}
              rotina{" "}da sua empresa.
            </h2>
          </div>
          <div className="text-sm text-muted-foreground max-w-xs">
            Clique em cada frente de trabalho para ver como ela funciona dentro da Fraga.
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10">
          {/* desktop: list */}
          <ul className="lg:col-span-7 space-y-2 hidden lg:block">
            {DIFFERENTIALS.map((d, i) => {
              const isActive = i === active;
              return (
                <li key={d.title}>
                  <button
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className={`group w-full text-left rounded-2xl border transition-all duration-500 px-6 py-5 flex items-center gap-5 ${
                      isActive
                        ? "border-accent/40 bg-card/[0.05] shadow-[inset_0_0_0_1px_oklch(0.78_0.16_78/0.2)]"
                        : "border-border hover:border-border hover:bg-card/[0.02]"
                    }`}
                  >
                    <span className={`font-display font-bold text-sm tabular-nums tracking-[0.1em] transition-colors ${isActive ? "text-accent" : "text-muted-foreground/80"}`}>
                      0{i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className={`font-display text-lg font-bold transition-colors ${isActive ? "text-foreground" : "text-foreground/80"}`}>{d.title}</div>
                      <div className={`text-sm leading-relaxed transition-colors ${isActive ? "text-foreground/70" : "text-muted-foreground"}`}>{d.desc}</div>
                    </div>
                    <ArrowUpRight strokeWidth={1.5} className={`w-5 h-5 transition-all ${isActive ? "text-accent translate-x-0 translate-y-0" : "text-foreground/30 -translate-x-1 translate-y-1"}`} />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* desktop: preview */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="sticky top-32 aspect-[4/5] rounded-[2rem] overflow-hidden border border-border bg-gradient-to-br from-secondary to-card shadow-elegant">
              <DifferentialPreview key={item.media} item={item} />
            </div>
          </div>

          {/* mobile: accordion */}
          <div className="lg:hidden space-y-3">
            {DIFFERENTIALS.map((d, i) => (
              <details key={d.title} className="group rounded-2xl border border-border bg-card/[0.03] p-5">
                <summary className="flex items-center gap-4 cursor-pointer list-none">
                  <span className="font-display text-sm font-bold tabular-nums text-muted-foreground group-open:text-accent transition-colors">
                    0{i + 1}
                  </span>
                  <span className="font-display font-bold flex-1">{d.title}</span>
                  <span className="text-muted-foreground text-xl leading-none font-light group-open:hidden">+</span>
                  <span className="text-muted-foreground text-xl leading-none font-light hidden group-open:block">−</span>
                </summary>
                <p className="mt-4 text-sm text-foreground/65 leading-relaxed">{d.desc}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DifferentialPreview({ item }: { item: (typeof DIFFERENTIALS)[number] }) {
  return (
    <div className="relative h-full w-full p-8 flex flex-col animate-fade-in">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      <div className="relative flex items-center justify-between text-muted-foreground/80 text-[10px] uppercase tracking-[0.25em] mb-8">
        <span>Diferencial Fraga</span>
        <span>0{DIFFERENTIALS.findIndex(d => d.media === item.media) + 1}</span>
      </div>
      <div className="relative flex-1 flex flex-col justify-center">
        <div className="font-display text-7xl font-black text-foreground leading-none mb-7 tabular-nums">
          0{DIFFERENTIALS.findIndex(d => d.media === item.media) + 1}
        </div>
        <h3 className="font-display text-3xl font-bold text-foreground tracking-tight mb-4">{item.title}</h3>
        <p className="text-foreground/65 text-base leading-relaxed">{item.desc}</p>
      </div>
      <div className="relative grid grid-cols-3 gap-2 mt-8">
        {[1,2,3].map(i => (
          <div key={i} className="h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full w-2/3 bg-gradient-accent" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   NUMBERED SERVICES (Padelix-style)
   ============================================================ */
const SERVICES = [
  { n: "01", title: "Abertura de Empresas", desc: "Orientação para abrir o CNPJ com enquadramento adequado, definição de atividade, regime tributário e primeiros passos contábeis organizados.", benefit: "Começar pagando o imposto certo, sem retrabalho lá na frente.", msg: "Olá, vim pela landing page e quero falar sobre abertura de empresa com a Fraga." },
  { n: "02", title: "Planejamento Tributário", desc: "Análise para entender se a empresa está no regime adequado e onde existem riscos, excessos ou oportunidades dentro da lei.", benefit: "Mais clareza sobre o que se paga e por quê.", msg: "Olá, vim pela landing page e quero falar sobre planejamento tributário com a Fraga." },
  { n: "03", title: "Assessoria Contábil", desc: "Rotina contábil, fiscal e gerencial organizada para que o empresário tenha clareza sobre obrigações e resultados.", benefit: "Obrigações em dia e relatórios que ajudam a decidir.", msg: "Olá, vim pela landing page e quero falar sobre assessoria contábil com a Fraga." },
  { n: "04", title: "Departamento Pessoal", desc: "Apoio nas rotinas trabalhistas, folha, admissões, desligamentos e obrigações relacionadas à equipe.", benefit: "A equipe administrada com método e prazos cumpridos.", msg: "Olá, vim pela landing page e quero falar sobre departamento pessoal com a Fraga." },
  { n: "05", title: "BPO Financeiro", desc: "Organização de contas, controles e informações financeiras para dar mais previsibilidade à gestão.", benefit: "Caixa sob controle e relatórios que mostram o real.", msg: "Olá, vim pela landing page e quero falar sobre BPO financeiro com a Fraga." },
  { n: "06", title: "Regularização Fiscal", desc: "Diagnóstico e condução de pendências fiscais para recuperar previsibilidade e evitar que problemas cresçam.", benefit: "Pendências resolvidas com um plano claro de ação.", msg: "Olá, vim pela landing page e quero falar sobre regularização fiscal com a Fraga." },
];

function NumberedServices() {
  const [active, setActive] = useState(0);
  const s = SERVICES[active];
  return (
    <div id="servicos" className="py-24 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-7">
            <div className="text-xs uppercase tracking-[0.22em] text-primary font-semibold mb-4">— Serviços</div>
            <h2 className="font-display text-4xl lg:text-6xl font-bold tracking-tight leading-[1.02]">
              O que a Fraga faz, na{" "}
              prática.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-6">
            <p className="text-foreground/65 text-lg leading-relaxed">
              Da abertura do CNPJ à rotina fiscal e financeira do mês a mês. Clique em cada serviço para entender como ele funciona dentro da Fraga.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          {/* desktop list */}
          <ul className="lg:col-span-7 hidden lg:block">
            {SERVICES.map((it, i) => {
              const isActive = i === active;
              return (
                <li key={it.n} className="border-t border-border last:border-b">
                  <button
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className="group w-full text-left py-7 flex items-center gap-8 transition-all"
                  >
                    <span className={`font-display text-2xl font-bold transition-colors ${isActive ? "text-primary" : "text-foreground/30 group-hover:text-foreground/50"}`}>{it.n}</span>
                    <span className={`font-display font-bold tracking-tight text-3xl lg:text-5xl transition-all ${isActive ? "text-foreground translate-x-2" : "text-foreground/40 group-hover:text-foreground/70"}`}>
                      {it.title}
                    </span>
                    <ArrowUpRight className={`ml-auto w-7 h-7 transition-all ${isActive ? "text-primary opacity-100" : "opacity-0 -translate-x-3"}`} />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* sticky preview */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="sticky top-32">
              <div key={s.n} className="rounded-[2rem] overflow-hidden border border-border bg-gradient-to-br from-[oklch(0.99_0.005_200)] to-[oklch(0.94_0.018_200)] shadow-elegant p-8 animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <div className="font-display text-5xl font-black text-foreground">{s.n}</div>
                  <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-foreground/45">
                    Serviço Fraga
                  </div>
                </div>
                <h3 className="font-display text-2xl font-bold mb-3 text-foreground">{s.title}</h3>
                <p className="text-sm text-foreground/65 leading-relaxed mb-5">{s.desc}</p>
                <div className="rounded-2xl border border-accent/30 bg-accent/10 p-4 mb-7">
                  <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-accent-foreground/80 mb-1">O que muda na prática</div>
                  <div className="text-sm font-semibold text-foreground">{s.benefit}</div>
                </div>
                <PremiumButton
                  href={waLink(s.msg)}
                  variant="primary"
                  icon={<MessageCircle className="w-4 h-4" />}
                  trailingIcon={<ArrowUpRight className="w-4 h-4" />}
                  trackLocation="service_whatsapp_click"
                  trackMessage={s.title}
                  className="w-full"
                >
                  Conversar sobre {s.title}
                </PremiumButton>
              </div>
            </div>
          </div>

          {/* mobile accordion */}
          <div className="lg:hidden space-y-3">
            {SERVICES.map(it => (
              <details key={it.n} className="group rounded-2xl border border-border bg-card p-5">
                <summary className="flex items-center gap-4 cursor-pointer list-none">
                  <span className="font-display text-xl font-bold text-primary">{it.n}</span>
                  <span className="font-display font-bold flex-1 text-foreground">{it.title}</span>
                  <span className="text-foreground/40 text-xl leading-none font-light group-open:hidden">+</span>
                  <span className="text-foreground/40 text-xl leading-none font-light hidden group-open:block">−</span>
                </summary>
                <div className="mt-4 space-y-3">
                  <p className="text-sm text-foreground/65 leading-relaxed">{it.desc}</p>
                  <div className="text-xs font-semibold text-primary">{it.benefit}</div>
                  <a
                    href={waLink(it.msg)}
                    target="_blank"
                    rel="noopener"
                    onClick={() => trackConversion("service_whatsapp_click", it.title)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
                  >
                    Conversar no WhatsApp <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   WHATSAPP JOURNEY — animated mockup
   ============================================================ */
function WhatsAppJourney() {
  const steps = [
    "Você chama no WhatsApp",
    "Conta o momento da empresa",
    "A equipe avalia o cenário",
    "Indicação do caminho mais adequado",
    "Início organizado, sem parar a operação",
  ];
  const cta = waLink("Olá, vim pela landing page e gostaria de entender como começar com a Fraga.");
  return (
    <div className="py-24 lg:py-36 relative overflow-hidden">
      <div aria-hidden className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full bg-[var(--primary)]/15 blur-[140px]" />
      <div className="relative mx-auto max-w-[1400px] px-4 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6">
          <div className="text-xs uppercase tracking-[0.22em] text-[var(--primary)] font-semibold mb-4">— Como começa</div>
          <h2 className="font-display text-4xl lg:text-6xl font-bold tracking-tight leading-[1.02] mb-7">
            Sem formulário. Sem espera.{" "}
            Conversa direta no WhatsApp.
          </h2>
          <p className="text-foreground/65 text-lg leading-relaxed mb-10 max-w-lg">
            A equipe entende o momento da empresa antes de indicar um plano. Seja para abrir, regularizar, organizar ou trocar de contador, o atendimento começa por uma conversa real.
          </p>
          <ol className="space-y-3 mb-10">
            {steps.map((s, i) => (
              <StepItem key={s} index={i} text={s} />
            ))}
          </ol>
          <PremiumButton
            href={cta}
            variant="gold"
            size="lg"
            icon={<MessageCircle className="w-5 h-5" />}
            trailingIcon={<ArrowUpRight className="w-4 h-4" />}
            trackLocation="whatsapp_journey_cta"
          >
            Começar pelo WhatsApp
          </PremiumButton>
        </div>

        <div className="lg:col-span-6">
          <WhatsAppMock />
        </div>
      </div>
    </div>
  );
}

function StepItem({ index, text }: { index: number; text: string }) {
  const { ref, visible } = useReveal<HTMLLIElement>(0.4);
  return (
    <li
      ref={ref}
      className={`flex items-center gap-4 transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted/60 text-xs font-bold text-accent">
        0{index + 1}
      </span>
      <span className="text-foreground/80 font-medium">{text}</span>
      <span aria-hidden className="ml-auto h-px w-8 bg-[var(--primary)]/60" />
    </li>
  );
}

type Msg = { from: "client" | "fraga"; text: string; t: string };
const CONVO: Msg[] = [
  { from: "client", text: "Olá, tenho uma empresa e queria entender se minha contabilidade está adequada.", t: "10:14" },
  { from: "fraga", text: "Claro. Podemos começar entendendo seu regime atual, faturamento, rotina fiscal e o que você espera melhorar.", t: "10:14" },
  { from: "client", text: "Também quero saber se vale trocar de contador.", t: "10:15" },
  { from: "fraga", text: "Avaliamos esse cenário com cuidado e orientamos os próximos passos para uma transição segura.", t: "10:15" },
];

function WhatsAppMock() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.3);
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    if (!visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(CONVO.length); return;
    }
    let cancelled = false;
    (async () => {
      for (let i = 0; i < CONVO.length; i++) {
        if (cancelled) return;
        setTyping(true);
        await new Promise(r => setTimeout(r, 900));
        if (cancelled) return;
        setTyping(false);
        setShown(i + 1);
        await new Promise(r => setTimeout(r, 600));
      }
    })();
    return () => { cancelled = true; };
  }, [visible]);

  return (
    <div ref={ref} className="relative max-w-md mx-auto">
      <div className="absolute -inset-4 bg-gradient-to-br from-[var(--primary)]/30 to-accent/20 rounded-[3rem] blur-2xl" />
      <div className="relative rounded-[2.2rem] border border-border bg-secondary overflow-hidden shadow-elegant">
        {/* header */}
        <div className="flex items-center gap-3 px-5 py-4 bg-secondary border-b border-border">
          <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center text-accent-foreground font-display font-black text-sm">F</div>
          <div className="flex-1">
            <div className="text-foreground font-semibold text-sm">Fraga Contabilidade</div>
            <div className="text-[11px] text-[var(--primary)] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-glow-pulse" />
              online agora
            </div>
          </div>
          <MessageCircle className="w-5 h-5 text-muted-foreground/80" />
        </div>
        {/* body */}
        <div className="p-5 space-y-3 min-h-[340px] bg-[#e9efe6]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)",
          backgroundSize: "16px 16px",
        }}>
          {CONVO.slice(0, shown).map((m, i) => (
            <div key={i} className={`flex ${m.from === "client" ? "justify-end" : "justify-start"} animate-wa-pop`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-snug ${
                m.from === "client"
                  ? "bg-whatsapp text-whatsapp-foreground rounded-br-sm"
                  : "bg-card/[0.07] text-foreground rounded-bl-sm border border-border"
              }`}>
                <div>{m.text}</div>
                <div className="text-[10px] opacity-60 text-right mt-1">{m.t}</div>
              </div>
            </div>
          ))}
          {typing && shown < CONVO.length && (
            <div className={`flex ${CONVO[shown].from === "client" ? "justify-end" : "justify-start"}`}>
              <div className={`rounded-2xl px-4 py-3 flex gap-1 ${CONVO[shown].from === "client" ? "bg-[var(--primary)]" : "bg-card/[0.07] border border-border"}`}>
                {[0,1,2].map(i => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-card inline-block" style={{ animation: "wa-typing 1.2s infinite", animationDelay: `${i*0.15}s` }} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   STAGE SOLUTIONS — vertical tabs
   ============================================================ */
const STAGES = [
  { key: "abrindo", label: "Vou abrir empresa e não sei o melhor enquadramento", title: "Abertura com o enquadramento certo desde o início", desc: "Avaliamos a atividade, o porte e a expectativa de faturamento para indicar a natureza jurídica e o regime tributário mais adequados ao seu caso.", benefit: "Começar pagando o imposto certo, sem retrabalho lá na frente.", msg: "Olá, vou abrir uma empresa e quero entender o melhor enquadramento. Vim pela landing page." },
  { key: "cresceu", label: "Minha empresa cresceu e a contabilidade ficou confusa", title: "Reorganização contábil para empresas em crescimento", desc: "Revisamos rotinas, controles e relatórios para que a operação continue acompanhando o ritmo do negócio.", benefit: "Estrutura adequada ao tamanho atual da empresa.", msg: "Olá, minha empresa cresceu e a contabilidade ficou confusa. Vim pela landing page." },
  { key: "trocar", label: "Quero trocar de contador sem dor de cabeça", title: "Transição contábil conduzida em paralelo à operação", desc: "Cuidamos do contato com o contador atual e da migração de informações sem que sua empresa precise parar para mudar.", benefit: "Mudança feita por etapas, sem perder histórico.", msg: "Olá, quero trocar de contador sem dor de cabeça. Vim pela landing page da Fraga." },
  { key: "financeiro", label: "Preciso organizar financeiro e rotina fiscal", title: "Rotina financeira e fiscal sob o mesmo método", desc: "Contas a pagar/receber, conciliações bancárias, apuração fiscal e relatórios mensais organizados em um único fluxo.", benefit: "Menos planilhas soltas, mais previsibilidade.", msg: "Olá, preciso organizar o financeiro e a rotina fiscal da minha empresa. Vim pela landing page." },
  { key: "impostos", label: "Tenho dúvidas se pago imposto corretamente", title: "Diagnóstico tributário sem promessas", desc: "Olhamos para o regime atual, a atividade e o histórico para apontar onde existem riscos, excessos ou oportunidades dentro da lei.", benefit: "Clareza sobre o que se paga e por que se paga.", msg: "Olá, tenho dúvidas se pago imposto corretamente. Vim pela landing page da Fraga." },
  { key: "estrategica", label: "Quero uma contabilidade mais próxima da gestão", title: "Contabilidade conectada às decisões do dia a dia", desc: "Conversas periódicas com os sócios, leitura dos números, alertas de risco e apoio para decisões de gestão.", benefit: "Um contador presente nas decisões, não só nas obrigações.", msg: "Olá, quero uma contabilidade mais próxima da gestão. Vim pela landing page da Fraga." },
];

function StageSolutions() {
  const [active, setActive] = useState(0);
  const st = STAGES[active];
  return (
    <div id="solucoes" className="py-24 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="text-xs uppercase tracking-[0.22em] text-primary font-semibold mb-4">— Em qual cenário você está?</div>
          <h2 className="font-display text-4xl lg:text-6xl font-bold tracking-tight leading-[1.02]">
            O atendimento começa pelo seu{" "}
            cenário real.
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-1">
              {STAGES.map((s, i) => (
                <button
                  key={s.key}
                  onClick={() => { setActive(i); trackConversion("solution_click", s.label); }}
                  className={`group flex items-center justify-between gap-3 text-left px-5 py-4 rounded-xl transition-all ${
                    i === active
                      ? "bg-foreground text-background"
                      : "hover:bg-foreground/5 text-foreground/75"
                  }`}
                >
                  <span className="font-display font-semibold text-base lg:text-lg">{s.label}</span>
                  <ArrowUpRight className={`w-5 h-5 transition-transform ${i === active ? "translate-x-0 translate-y-0" : "translate-x-1 -translate-y-1 opacity-50"}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div key={st.key} className="rounded-[2rem] border border-border bg-card overflow-hidden shadow-card p-8 lg:p-12 animate-fade-in">
              <div className="text-xs uppercase tracking-[0.22em] text-primary font-semibold mb-4">Como a Fraga atua</div>
              <h3 className="font-display text-3xl lg:text-4xl font-bold tracking-tight mb-5">{st.title}</h3>
              <p className="text-foreground/70 text-lg leading-relaxed mb-7">{st.desc}</p>
              <div className="rounded-2xl border-l-2 border-accent bg-accent/5 p-5 mb-8">
                <div className="text-[10px] uppercase tracking-[0.22em] font-bold text-accent-foreground/80 mb-1">O que muda na prática</div>
                <div className="font-display font-bold text-lg text-foreground">{st.benefit}</div>
              </div>
              <PremiumButton
                href={waLink(st.msg)}
                variant="primary"
                size="lg"
                icon={<MessageCircle className="w-5 h-5" />}
                trailingIcon={<ArrowUpRight className="w-4 h-4" />}
                trackLocation="solution_whatsapp_click"
                trackMessage={st.label}
              >
                Conversar sobre esse cenário
              </PremiumButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   VIDEO TESTIMONIALS
   ============================================================ */
const VIDEOS: VideoItem[] = [
  { id: "thermofibras", youtubeId: "BX6rpC1cSUg", title: "Thermofibras: confiança construída na prática", person: "Anderson Drummond", role: "Thermofibras" },
  { id: "quintao", youtubeId: "-J942kkVc-s", title: "Helvecio Quintão: uma parceria de 40 anos", person: "Helvecio Quintão", role: "Cliente de longa data" },
];

function VideoTestimonials() {
  const modal = useVideoModal();
  return (
    <div id="depoimentos" className="py-24 lg:py-36 relative">
      <div aria-hidden className="absolute top-1/3 -left-32 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[140px]" />
      <div className="relative mx-auto max-w-[1400px] px-4 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="text-xs uppercase tracking-[0.22em] text-accent font-semibold mb-4">— Quem trabalha com a Fraga conta</div>
          <h2 className="font-display text-4xl lg:text-6xl font-bold tracking-tight leading-[1.02] mb-5">
            Clientes falando em{" "}
            vídeo, na própria voz.
          </h2>
          <p className="text-foreground/65 text-lg max-w-2xl">
            Sem depoimentos escritos por terceiros: dois clientes contam, em vídeo, como é o trabalho com a Fraga.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          {VIDEOS.map(v => <VideoCard key={v.id} v={v} onPlay={modal.open} />)}
        </div>
      </div>
      <VideoModal video={modal.active} onClose={modal.close} />
    </div>
  );
}

/* ============================================================
   COMMUNITY TRUST
   ============================================================ */
function CommunityTrust() {
  const items = [
    { kicker: "Atendimento", title: "Atendimento por pessoas, não por robô", desc: "Quem responde no WhatsApp e nas reuniões faz parte da equipe técnica da Fraga." },
    { kicker: "Permanência", title: "Clientes que ficam por muitos anos", desc: "Boa parte da carteira está com a Fraga há mais de uma década, alguns desde a fundação." },
    { kicker: "Método", title: "Foco no que é obrigação contábil", desc: "Apuração, folha, obrigações acessórias e relatórios entregues no prazo, todo mês." },
  ];
  return (
    <div className="py-24 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-[0.22em] text-primary font-semibold mb-4">— Como trabalhamos</div>
          <h2 className="font-display text-4xl lg:text-6xl font-bold tracking-tight leading-[1.02]">
            O que sustenta a relação com{" "}
            cada cliente.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <RevealCard key={it.title} delay={i * 120}>
              <div className="relative h-full rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:border-foreground/30">
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="font-display text-sm font-bold tabular-nums text-primary">0{i + 1}</span>
                  <span className="h-px flex-1 bg-border" />
                  <span className="text-[10px] uppercase tracking-[0.22em] font-semibold text-foreground/45">{it.kicker}</span>
                </div>
                <h3 className="font-display text-xl font-bold mb-3 leading-tight">{it.title}</h3>
                <p className="text-sm text-foreground/65 leading-relaxed">{it.desc}</p>
              </div>
            </RevealCard>
          ))}
        </div>
      </div>
    </div>
  );
}

function RevealCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.2);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ============================================================
   PLANS
   ============================================================ */
const PLANS = [
  { name: "MEI", desc: "Para faturamento até R$ 81 mil/ano", ideal: "Para quem está começando e precisa manter o básico em ordem sem complicação.", features: ["Emissão de notas", "Guia DAS mensal", "Declaração anual", "Suporte por WhatsApp"], cta: "Saber se o MEI serve para mim", msg: "Olá, vim pela landing page e quero saber se o plano MEI da Fraga serve para o meu caso." },
  { name: "Essencial", desc: "Para empresas até R$ 100 mil/mês", ideal: "Para empresas que precisam de rotina contábil consistente e obrigações bem acompanhadas.", features: ["Contabilidade mensal", "Departamento pessoal", "Apuração de impostos", "Relatórios mensais"], cta: "Conversar sobre o Essencial", msg: "Olá, vim pela landing page e quero conversar sobre o plano Essencial da Fraga." },
  { name: "Plus", desc: "Para empresas até R$ 200 mil/mês", ideal: "Para negócios em crescimento que exigem mais organização, previsibilidade e suporte.", features: ["Tudo do Essencial", "Consultoria tributária", "Análise gerencial", "Atendimento prioritário"], cta: "Ver se o Plus encaixa", msg: "Olá, vim pela landing page e quero entender se o plano Plus faz sentido para minha empresa." },
  { name: "Premium", desc: "Para empresas até R$ 400 mil/mês", ideal: "Para empresas que precisam de uma contabilidade próxima da gestão e de decisões mais consultivas.", features: ["Tudo do Plus", "Planejamento tributário aprofundado", "Reuniões periódicas com a equipe", "Gestor de conta dedicado"], cta: "Conversar sobre o Premium", msg: "Olá, vim pela landing page e quero conversar sobre o plano Premium da Fraga.", featured: true },
];

function Plans() {
  return (
    <div id="planos" className="py-24 lg:py-36 relative overflow-hidden">
      <div aria-hidden className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[160px]" />
      <div className="relative mx-auto max-w-[1400px] px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.22em] text-accent font-semibold mb-4">— Planos</div>
          <h2 className="font-display text-4xl lg:text-6xl font-bold tracking-tight leading-[1.02] mb-5">
            Quatro pontos de partida.{" "}
            Um atendimento por vez.
          </h2>
          <p className="text-foreground/65 text-lg">
            O plano é apenas o ponto de partida. Antes de indicar, a equipe entende o momento da sua empresa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:items-stretch">
          {PLANS.map((p) => {
            const isFeatured = !!p.featured;
            return (
              <RevealCard key={p.name} delay={0}>
                <div className={`relative h-full rounded-3xl p-7 flex flex-col transition-all hover:-translate-y-1 ${
                  isFeatured
                    ? "bg-gradient-to-br from-[oklch(0.78_0.16_78)] to-[oklch(0.86_0.15_85)] text-accent-foreground shadow-gold lg:scale-[1.04] lg:-my-2 border border-accent/50"
                    : "bg-muted/60 border border-border backdrop-blur"
                }`}>
                  {isFeatured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-accent text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-accent/40">
                      Mais consultivo
                    </div>
                  )}
                  <div className={`text-[11px] font-semibold uppercase tracking-[0.2em] mb-3 ${isFeatured ? "text-accent-foreground/80" : "text-accent"}`}>Plano</div>
                  <h3 className={`font-display text-3xl font-bold mb-2 ${isFeatured ? "text-accent-foreground" : "text-foreground"}`}>{p.name}</h3>
                  <p className={`text-sm mb-1 ${isFeatured ? "text-accent-foreground/85" : "text-foreground/85 font-medium"}`}>{p.desc}</p>
                  <p className={`text-xs mb-6 ${isFeatured ? "text-accent-foreground/65" : "text-muted-foreground"}`}>{p.ideal}</p>
                  <ul className="space-y-2.5 mb-7 flex-1">
                    {p.features.map(f => (
                      <li key={f} className={`flex items-start gap-2 text-sm ${isFeatured ? "text-accent-foreground/90" : "text-foreground/85"}`}>
                        <span aria-hidden className={`mt-2 h-px w-3 flex-shrink-0 ${isFeatured ? "bg-accent-foreground/60" : "bg-accent/70"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={waLink(p.msg)}
                    target="_blank"
                    rel="noopener"
                    onClick={() => trackConversion("plan_whatsapp_click", p.name)}
                    className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5 ${
                      isFeatured
                        ? "bg-foreground text-background hover:bg-primary"
                        : "bg-card text-foreground border border-border hover:bg-accent hover:text-accent-foreground hover:border-accent"
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" /> {p.cta}
                  </a>
                </div>
              </RevealCard>
            );
          })}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12">
          Não sabe qual escolher? <a href={MAIN_CTA} target="_blank" rel="noopener" className="text-accent font-semibold underline-offset-4 hover:underline">Chame a Fraga no WhatsApp</a> e conte o seu cenário — a indicação vem depois da conversa.
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   INSIGHTS
   ============================================================ */
const INSIGHTS = [
  { tag: "Tributos", title: "Como saber se minha empresa paga imposto corretamente?", desc: "Sinais práticos de que sua carga tributária pode estar fora do ideal — e o que fazer.", msg: "Olá, quero saber se minha empresa paga imposto corretamente. Pode me ajudar?" },
  { tag: "Gestão", title: "Quando vale a pena trocar de contador?", desc: "Os 5 indícios mais comuns de que está na hora de uma nova parceria contábil.", msg: "Olá, estou pensando em trocar de contador. Gostaria de conversar com a Fraga." },
  { tag: "Financeiro", title: "Por que BPO financeiro melhora a gestão?", desc: "Como terceirizar o financeiro libera tempo e devolve controle ao empresário.", msg: "Olá, quero entender melhor como funciona o BPO financeiro da Fraga." },
  { tag: "Tributário", title: "Como escolher o regime tributário ideal?", desc: "Simples, Lucro Presumido ou Lucro Real — qual faz mais sentido para o seu caso.", msg: "Olá, gostaria de orientação sobre qual regime tributário escolher." },
];

function Insights() {
  return (
    <div className="py-24 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.22em] text-primary font-semibold mb-4">— Dúvidas comuns que recebemos</div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight leading-[1.02]">
              Os temas que mais aparecem nas{" "}
              conversas com empresários.
            </h2>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {INSIGHTS.map((it, i) => (
            <a
              key={it.title}
              href={waLink(it.msg)}
              target="_blank"
              rel="noopener"
              onClick={() => trackConversion("insight_whatsapp_click", it.title)}
              className="group relative rounded-3xl border border-border bg-card p-8 hover:shadow-elegant transition-all hover:-translate-y-1 flex flex-col gap-4 overflow-hidden"
            >
              <div className="absolute top-6 right-6">
                <ArrowUpRight className="w-6 h-6 text-foreground/30 group-hover:text-primary group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] font-bold text-primary">
                  <span className="w-6 h-px bg-primary" /> {it.tag}
                </span>
                <span className="text-xs text-foreground/40">0{i + 1} / 0{INSIGHTS.length}</span>
              </div>
              <h3 className="font-display text-2xl lg:text-3xl font-bold tracking-tight leading-tight max-w-md">{it.title}</h3>
              <p className="text-sm text-foreground/65 leading-relaxed max-w-md">{it.desc}</p>
              <div className="mt-auto pt-4 text-xs font-semibold text-primary group-hover:text-primary-deep flex items-center gap-1.5">
                Tirar essa dúvida no WhatsApp <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   FAQ
   ============================================================ */
const FAQ = [
  { q: "A Fraga atende empresas fora de Vila Velha?", a: "Sim. Atendemos clientes em todo o Brasil, com processos 100% digitais e atendimento humano pelo WhatsApp." },
  { q: "Posso trocar de contador com a empresa funcionando?", a: "Sim. Cuidamos da transição com o contador atual sem parar sua operação. Em até 30 dias sua contabilidade já está rodando aqui." },
  { q: "Vocês atendem MEI?", a: "Sim. Temos plano específico para MEI, com emissão de notas, DAS e declaração anual organizados." },
  { q: "Vocês fazem planejamento tributário?", a: "Sim. Analisamos sua operação para identificar oportunidades legais de redução tributária, sempre dentro da legislação." },
  { q: "Como funciona a abertura de empresa?", a: "Você fala com a gente, definimos juntos a natureza jurídica e o regime tributário, cuidamos da burocracia e te entregamos a empresa pronta para operar." },
  { q: "Preciso ir presencialmente?", a: "Não. Tudo pode ser resolvido pelo WhatsApp, e-mail e videochamada. Atendimento presencial em Vila Velha/ES se preferir." },
  { q: "Como escolher o plano ideal?", a: "Fale com um especialista pelo WhatsApp. Em poucos minutos indicamos o plano que mais se encaixa no seu momento." },
  { q: "O atendimento pode começar pelo WhatsApp?", a: "Sim, e recomendamos. É o canal mais ágil para entender o seu cenário e indicar a melhor solução." },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div id="faq" className="py-24 lg:py-36">
      <div className="mx-auto max-w-5xl px-4 lg:px-8 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="sticky top-32">
            <div className="text-xs uppercase tracking-[0.22em] text-accent font-semibold mb-4">— FAQ</div>
            <h2 className="font-display text-3xl lg:text-5xl font-bold tracking-tight leading-[1.02] mb-6">
              Perguntas{" "}
              frequentes
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Não encontrou o que procurava? Fale com um especialista no WhatsApp.
            </p>
          </div>
        </div>
        <div className="lg:col-span-8">
          <ul className="divide-y divide-border border-y border-border">
            {FAQ.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full text-left py-5 flex items-center gap-6 group"
                  >
                    <span className="font-display font-bold text-lg lg:text-xl text-foreground flex-1 group-hover:text-accent transition-colors">{f.q}</span>
                    <span className={`flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-all ${isOpen ? "bg-accent text-accent-foreground border-accent rotate-180" : ""}`}>
                      <span className="text-lg leading-none font-light">+</span>
                    </span>
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] duration-500 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-6 pr-14">
                        <p className="text-foreground/70 text-base leading-relaxed mb-4">{f.a}</p>
                        <a
                          href={waLink(`Olá, tenho uma dúvida: ${f.q}`)}
                          target="_blank"
                          rel="noopener"
                          onClick={() => trackConversion("faq_whatsapp_click", f.q)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent"
                        >
                          Tirar essa dúvida no WhatsApp <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   FINAL CTA
   ============================================================ */
function FinalCta() {
  return (
    <section className="stack-section relative overflow-hidden bg-secondary text-foreground">
      <div className="relative mx-auto max-w-5xl px-4 lg:px-8 py-28 lg:py-40 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[11px] font-medium text-foreground/70 mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Atendimento direto · sem formulário
        </div>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.0] mb-8 text-foreground">
          Quer entender se a Fraga{" "}
          encaixa{" "}
          com a sua empresa?
        </h2>
        <p className="text-foreground/65 text-lg max-w-2xl mx-auto mb-12">
          Conte o seu cenário no WhatsApp. A equipe responde com orientação real antes de qualquer proposta.
        </p>
        <PremiumButton
          href={waLink("Olá, quero falar com um especialista da Fraga Contabilidade.")}
          variant="gold"
          size="lg"
          icon={<MessageCircle className="w-5 h-5" />}
          trailingIcon={<ArrowUpRight className="w-4 h-4" />}
          trackLocation="final_cta_click"
        >
          Chamar a Fraga no WhatsApp
        </PremiumButton>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <span><span className="text-[10px] uppercase tracking-[0.22em] text-accent/80 mr-2">Tel.</span> (27) 98848-2268</span>
          <span className="text-foreground/30">·</span>
          <span><span className="text-[10px] uppercase tracking-[0.22em] text-accent/80 mr-2">Sede</span> Vila Velha · ES</span>
          <span className="text-foreground/30">·</span>
          <span><span className="text-[10px] uppercase tracking-[0.22em] text-accent/80 mr-2">Resposta</span> rápida no WhatsApp</span>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer className="bg-foreground text-background/80 pt-20 pb-28 border-t border-border">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 mb-14">
          <div className="lg:col-span-5">
            <FragaWordmark />
            <p className="mt-6 text-sm leading-relaxed max-w-sm text-muted-foreground">
              Contabilidade em Vila Velha, Espírito Santo, atendendo empresas em todo o Brasil desde 1974. Rotinas contábeis, fiscais, trabalhistas e financeiras conduzidas por uma equipe técnica dedicada.
            </p>
          </div>
          <div className="lg:col-span-3">
            <div className="text-[11px] uppercase tracking-[0.22em] text-background/55 mb-4 font-semibold">Contato</div>
            <ul className="space-y-3 text-sm">
              <li><span className="text-[10px] uppercase tracking-[0.22em] text-background/55 mr-2">Tel.</span>(27) 98848-2268</li>
              <li><span className="text-[10px] uppercase tracking-[0.22em] text-background/55 mr-2">WhatsApp</span>(27) 98848-2268</li>
              <li><span className="text-[10px] uppercase tracking-[0.22em] text-background/55 mr-2">E-mail</span>contato@fragacontabilidade.com.br</li>
              <li><span className="text-[10px] uppercase tracking-[0.22em] text-background/55 mr-2">Sede</span>Vila Velha · Espírito Santo</li>
            </ul>
          </div>
          <div className="lg:col-span-4">
            <div className="text-[11px] uppercase tracking-[0.22em] text-background/55 mb-4 font-semibold">Navegar</div>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              <li><a href="#inicio" className="hover:text-background">Início</a></li>
              <li><a href="#sobre" className="hover:text-background">Sobre</a></li>
              <li><a href="#servicos" className="hover:text-background">Serviços</a></li>
              <li><a href="#solucoes" className="hover:text-background">Soluções</a></li>
              <li><a href="#depoimentos" className="hover:text-background">Depoimentos</a></li>
              <li><a href="#planos" className="hover:text-background">Planos</a></li>
              <li><a href="#faq" className="hover:text-background">FAQ</a></li>
              <li><a href={MAIN_CTA} target="_blank" rel="noopener" className="hover:text-background">WhatsApp</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-background/15 flex flex-col sm:flex-row justify-between gap-4 text-xs text-background/55">
          <div>© {new Date().getFullYear()} Fraga Contabilidade. Todos os direitos reservados.</div>
          <div>CNPJ · Vila Velha/ES · Atendimento em todo o Brasil</div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   FLOATING WHATSAPP
   ============================================================ */
function FloatingWhatsApp() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const fn = () => setHidden(window.scrollY < 400);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <>
      {/* desktop */}
      <a
        href={FLOAT_CTA}
        target="_blank"
        rel="noopener"
        onClick={() => trackConversion("floating_whatsapp_click", "Floating desktop")}
        aria-label="Fale com a Fraga no WhatsApp"
        className={`hidden sm:inline-flex fixed bottom-6 right-6 z-40 items-center gap-3 rounded-full pl-5 pr-6 py-3 bg-whatsapp text-whatsapp-foreground font-semibold text-sm shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)] hover:opacity-90 transition-all ${hidden ? "translate-y-24 opacity-0" : "translate-y-0 opacity-100"}`}
      >
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-card/15">
          <span className="absolute inset-0 rounded-full bg-card/30 animate-glow-pulse" />
          <MessageCircle className="relative w-4 h-4" />
        </span>
        Fale com a Fraga
      </a>
      {/* mobile sticky */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-gradient-to-t from-[oklch(0.13_0.025_220)] via-[oklch(0.13_0.025_220/0.9)] to-transparent">
        <a
          href={FLOAT_CTA}
          target="_blank"
          rel="noopener"
          onClick={() => trackConversion("floating_whatsapp_click", "Floating mobile")}
          className="flex items-center justify-center gap-2 w-full rounded-full bg-whatsapp text-whatsapp-foreground py-3.5 font-semibold text-sm shadow-elegant"
        >
          <MessageCircle className="w-4 h-4" /> Falar no WhatsApp
        </a>
      </div>
      <div className="sm:hidden h-20" aria-hidden />
    </>
  );
}