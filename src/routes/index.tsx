import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Award, ShieldCheck, TrendingUp, Users, Building2, Calculator,
  FileCheck, Wallet, Briefcase, Sparkles, ArrowRight, Check, X,
  MessageCircle, ChevronDown, Star, Quote, Menu, Zap, Target,
  HeartHandshake, BarChart3, Clock, MapPin,
} from "lucide-react";
import { waLink, trackConversion } from "@/lib/whatsapp";
import { PremiumButton } from "@/components/fraga/PremiumButton";
import { ScrollProgress } from "@/components/fraga/ScrollProgress";
import { VideoCard, VideoModal, useVideoModal, type VideoItem } from "@/components/fraga/VideoModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fraga Contabilidade — Contabilidade estratégica em Vila Velha/ES" },
      { name: "description", content: "Mais de 50 anos unindo tradição, tecnologia e visão consultiva. Planejamento tributário, BPO financeiro e contabilidade para empresas em todo o Brasil." },
      { property: "og:title", content: "Fraga Contabilidade — Contabilidade estratégica" },
      { property: "og:description", content: "+50 anos, +1000 casos de sucesso. Fale com um especialista pelo WhatsApp." },
    ],
  }),
  component: LandingPage,
});

const HERO_CTA = waLink("Olá, vim pela landing page da Fraga Contabilidade e gostaria de falar com um especialista.");

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Counter({ to, suffix = "", duration = 1800 }: { to: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const { ref, visible } = useReveal<HTMLSpanElement>();
  useEffect(() => {
    if (!visible) return;
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

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollProgress />
      <Header />
      <Hero />
      <Stack layer={2}><TrustBar /></Stack>
      <Stack layer={3}><Narrative /></Stack>
      <Stack layer={4}><Services /></Stack>
      <Stack layer={5}><VideoTestimonials /></Stack>
      <Stack layer={6}><Plans /></Stack>
      <Stack layer={7}><Process /></Stack>
      <Stack layer={8}><Testimonials /></Stack>
      <Stack layer={3}><Comparison /></Stack>
      <Stack layer={4}><Faq /></Stack>
      <Stack layer={5}><FinalCta /></Stack>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

function Stack({ layer, children }: { layer: number; children: React.ReactNode }) {
  return (
    <div className="stack-section" data-layer={layer}>
      {children}
    </div>
  );
}

/* ---------------- Header ---------------- */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const nav = [
    { href: "#solucoes", label: "Soluções" },
    { href: "#planos", label: "Planos" },
    { href: "#depoimentos", label: "Depoimentos" },
    { href: "#faq", label: "FAQ" },
  ];
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
      <div className={`mx-auto max-w-7xl px-4 lg:px-8 transition-all duration-500 ${scrolled ? "" : ""}`}>
        <div className={`glass rounded-2xl px-5 lg:px-7 py-3 flex items-center justify-between shadow-card transition-all duration-500 ${scrolled ? "shadow-elegant" : ""}`}>
          <Logo />
          <nav className="hidden lg:flex items-center gap-8">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-sm font-medium text-foreground/75 hover:text-primary transition-colors relative group">
                {n.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <PremiumButton
              href={HERO_CTA}
              size="md"
              icon={<MessageCircle className="w-4 h-4" />}
              className="hidden sm:inline-flex"
              trackLocation="header_cta_click"
              trackMessage="Header"
            >
              Falar com especialista
            </PremiumButton>
            <button onClick={() => setOpen((v) => !v)} className="lg:hidden p-2 rounded-lg text-foreground" aria-label="Menu">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
        {open && (
          <div className="lg:hidden mt-2 glass rounded-2xl p-4 animate-fade-up">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block py-2 text-foreground/80 hover:text-primary">{n.label}</a>
            ))}
            <a href={HERO_CTA} target="_blank" rel="noopener" className="mt-2 flex items-center justify-center gap-2 bg-gradient-primary text-primary-foreground px-5 py-3 rounded-xl text-sm font-semibold">
              <MessageCircle className="w-4 h-4" /> Falar com especialista
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2.5 group">
      <div className="relative">
        <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-elegant group-hover:shadow-glow transition-all">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary-foreground" fill="currentColor">
            <path d="M3 12 L12 3 L21 12 L18 12 L18 21 L13.5 21 L13.5 15 L10.5 15 L10.5 21 L6 21 L6 12 Z" opacity="0.9" />
          </svg>
        </div>
        <div className="absolute -inset-1 bg-primary-glow/30 rounded-xl blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="leading-none">
        <div className="text-lg font-bold tracking-tight text-foreground font-display">fraga</div>
        <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">contabilidade</div>
      </div>
    </a>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section className="relative pt-36 pb-24 lg:pt-44 lg:pb-32 bg-gradient-hero overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-50 animate-mesh pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-primary-glow/20 blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-accent/20 blur-3xl animate-glow-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-primary-deep mb-6 shadow-card">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            Contabilidade consultiva desde 1974
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] mb-6">
            Contabilidade estratégica para empresas que querem{" "}
            <span className="text-gradient-primary">crescer com segurança</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
            A Fraga Contabilidade une +50 anos de experiência, tecnologia e visão consultiva para ajudar sua empresa a organizar a gestão, reduzir riscos e tomar decisões melhores.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <PremiumButton
              href={HERO_CTA}
              size="lg"
              icon={<MessageCircle className="w-5 h-5" />}
              trailingIcon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
              trackLocation="hero_cta_click"
              trackMessage="Hero principal"
            >
              Falar com especialista agora
            </PremiumButton>
            <PremiumButton href="#solucoes" variant="secondary" size="lg">
              Ver soluções
            </PremiumButton>
          </div>
          <div className="grid grid-cols-3 gap-4 max-w-xl">
            {[
              { icon: Award, label: "+50 anos", sub: "de experiência" },
              { icon: TrendingUp, label: "+1.000", sub: "casos de sucesso" },
              { icon: MapPin, label: "Brasil", sub: "atendimento nacional" },
            ].map((s) => (
              <div key={s.label} className="glass rounded-xl p-3 lg:p-4 shadow-card">
                <s.icon className="w-5 h-5 text-accent mb-1.5" />
                <div className="text-sm lg:text-base font-bold text-foreground">{s.label}</div>
                <div className="text-[11px] lg:text-xs text-muted-foreground">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative h-[480px] lg:h-[560px] animate-fade-in" style={{ animationDelay: "0.2s" }}>
      {/* main dashboard card */}
      <div className="absolute inset-x-4 top-6 bottom-12 rounded-3xl bg-gradient-dark shadow-elegant overflow-hidden border border-white/10">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
        <div className="relative p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-accent" />
              <div className="text-white text-sm font-semibold">Painel Fraga</div>
            </div>
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white/30" />
              <span className="w-2 h-2 rounded-full bg-white/30" />
              <span className="w-2 h-2 rounded-full bg-accent" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { label: "Receita", v: "R$ 1,28M", sub: "+18,4%" },
              { label: "Impostos", v: "R$ 142k", sub: "−9,2%" },
            ].map((m) => (
              <div key={m.label} className="rounded-xl bg-white/5 border border-white/10 p-3">
                <div className="text-[10px] uppercase tracking-wider text-white/50">{m.label}</div>
                <div className="text-white font-bold text-lg mt-1">{m.v}</div>
                <div className="text-accent-glow text-[11px] font-medium">{m.sub} mês</div>
              </div>
            ))}
          </div>
          <div className="flex-1 rounded-xl bg-white/5 border border-white/10 p-4">
            <div className="text-[10px] uppercase tracking-wider text-white/50 mb-3">Fluxo trimestral</div>
            <div className="flex items-end gap-2 h-32">
              {[42, 58, 38, 70, 52, 84, 64, 90, 76].map((h, i) => (
                <div key={i} className="flex-1 rounded-t-md" style={{
                  height: `${h}%`,
                  background: i === 7 ? "var(--gradient-accent)" : "linear-gradient(180deg, oklch(0.72 0.13 188 / 0.9), oklch(0.52 0.11 195 / 0.4))",
                }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* floating cards */}
      <div className="absolute -top-2 right-2 glass rounded-2xl p-4 shadow-elegant animate-float w-48">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <div className="text-xs font-semibold text-foreground">Conformidade</div>
        </div>
        <div className="text-2xl font-bold text-gradient-primary">100%</div>
        <div className="text-[11px] text-muted-foreground">obrigações em dia</div>
      </div>

      <div className="absolute bottom-4 -left-2 glass rounded-2xl p-4 shadow-gold animate-float-slow w-56">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-accent" />
          <div className="text-xs font-semibold text-foreground">Economia tributária</div>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-foreground"><Counter to={32} />%</span>
          <span className="text-xs text-muted-foreground">média anual</span>
        </div>
      </div>

      <div className="absolute top-1/2 -right-3 glass rounded-2xl px-4 py-3 shadow-elegant animate-float w-44" style={{ animationDelay: "1.5s" }}>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gradient-accent flex items-center justify-center">
            <Star className="w-4 h-4 text-white fill-white" />
          </div>
          <div>
            <div className="text-sm font-bold">4,9/5,0</div>
            <div className="text-[10px] text-muted-foreground">avaliação clientes</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Trust Bar ---------------- */
function TrustBar() {
  const items = [
    { icon: Award, label: "+50 anos de experiência" },
    { icon: Users, label: "+1.000 casos de sucesso" },
    { icon: MapPin, label: "Atendimento nacional" },
    { icon: Calculator, label: "Especialistas tributários" },
    { icon: HeartHandshake, label: "Suporte consultivo" },
    { icon: Building2, label: "Empresas de todos os portes" },
  ];
  return (
    <section className="border-y border-border/60 bg-secondary/50 py-6 overflow-hidden">
      <div className="flex animate-marquee gap-12 whitespace-nowrap">
        {[...items, ...items, ...items].map((i, idx) => (
          <div key={idx} className="flex items-center gap-2.5 text-sm text-muted-foreground">
            <i.icon className="w-4 h-4 text-primary" />
            <span className="font-medium">{i.label}</span>
            <span className="text-border ml-6">•</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Narrative ---------------- */
function Narrative() {
  const items = [
    { icon: Target, title: "Diagnóstico contábil consultivo", desc: "Mapeamos a saúde fiscal do seu negócio antes de propor qualquer ajuste." },
    { icon: ShieldCheck, title: "Planejamento tributário seguro", desc: "Reduzimos a carga de impostos dentro da legalidade, sem aventuras." },
    { icon: FileCheck, title: "Rotinas fiscais organizadas", desc: "Processos claros, prazos cumpridos, zero surpresas no fim do mês." },
    { icon: BarChart3, title: "Visão estratégica sobre números", desc: "Relatórios que viram decisão — não só obrigação a entregar." },
    { icon: HeartHandshake, title: "Atendimento próximo e humano", desc: "Você fala com gente que entende seu negócio, não com bots." },
    { icon: Zap, title: "Tecnologia aplicada à gestão", desc: "Integrações, dashboards e automações que economizam seu tempo." },
  ];
  return (
    <section id="solucoes" className="py-24 lg:py-32 relative">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-4">
            <span className="w-8 h-px bg-primary" /> Diferencial Fraga
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Uma contabilidade que pensa como{" "}
            <span className="text-gradient-primary">parceira estratégica</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Mais do que entregar obrigações fiscais, ajudamos empresários a entender números, melhorar processos, reduzir riscos e tomar decisões com mais segurança.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <div key={it.title} className="group relative rounded-2xl bg-card p-7 border border-border shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-1 overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-primary-glow/0 group-hover:bg-primary-glow/20 blur-3xl transition-all duration-700" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-5 shadow-elegant group-hover:shadow-glow transition-all">
                  <it.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">{it.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-accent group-hover:w-full transition-all duration-500" style={{ animationDelay: `${i * 50}ms` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Services ---------------- */
function Services() {
  const services = [
    { icon: Briefcase, title: "Abertura de Empresas", desc: "Constituição rápida e segura, com escolha do regime tributário ideal desde o primeiro dia." },
    { icon: Calculator, title: "Planejamento Tributário", desc: "Análise profunda da operação para reduzir impostos com total respaldo legal." },
    { icon: FileCheck, title: "Assessoria Contábil", desc: "Rotinas mensais conduzidas com método, prazos cumpridos e relatórios que importam." },
    { icon: Users, title: "Departamento Pessoal", desc: "Folha, admissões, demissões e obrigações trabalhistas sem dor de cabeça." },
    { icon: Wallet, title: "BPO Financeiro", desc: "Contas a pagar e a receber, conciliações e fluxo de caixa nas mãos de especialistas." },
    { icon: ShieldCheck, title: "Regularização Fiscal", desc: "Empresas com pendências voltam à conformidade com plano de ação claro." },
  ];
  return (
    <section className="py-24 lg:py-32 bg-secondary/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-20 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-4">
            <span className="w-8 h-px bg-primary" /> Soluções <span className="w-8 h-px bg-primary" />
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Tudo o que sua empresa precisa, em <span className="text-gradient-primary">um único parceiro</span>
          </h2>
          <p className="text-muted-foreground text-lg">Soluções contábeis integradas para empresas que pensam grande.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => {
            const link = waLink(`Olá, tenho interesse em ${s.title} com a Fraga Contabilidade.`);
            return (
              <div key={s.title} className="group relative rounded-2xl bg-card p-7 border border-border shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-1 flex flex-col">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-elegant group-hover:scale-110 transition-transform">
                    <s.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Serviço</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{s.desc}</p>
                <a href={link} target="_blank" rel="noopener" onClick={() => trackConversion("service_whatsapp_click", s.title)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-deep transition-colors group/cta">
                  Conversar sobre este serviço
                  <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Plans ---------------- */
function Plans() {
  const plans = [
    { name: "MEI", desc: "Para faturamento até R$ 81 mil/ano", ideal: "Ideal para quem está começando", features: ["Emissão de notas", "Guia DAS mensal", "Declaração anual", "Suporte WhatsApp"] },
    { name: "Essencial", desc: "Para empresas até R$ 100 mil/mês", ideal: "Rotinas contábeis organizadas", features: ["Contabilidade completa", "Departamento pessoal", "Apuração de impostos", "Relatórios mensais"] },
    { name: "Plus", desc: "Para empresas até R$ 200 mil/mês", ideal: "Negócios em crescimento", features: ["Tudo do Essencial", "Consultoria tributária", "Análise gerencial", "Atendimento prioritário"] },
    { name: "Premium", desc: "Para empresas até R$ 400 mil/mês", ideal: "Acompanhamento estratégico", features: ["Tudo do Plus", "Planejamento tributário avançado", "Reuniões estratégicas mensais", "Gestor de conta dedicado"], featured: true },
  ];
  return (
    <section id="planos" className="py-24 lg:py-32 relative">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-4">
            <span className="w-8 h-px bg-primary" /> Planos <span className="w-8 h-px bg-primary" />
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Planos contábeis para cada <span className="text-gradient-primary">estágio do seu negócio</span>
          </h2>
          <p className="text-muted-foreground text-lg">Escolha o ponto de partida — a Fraga adapta o resto.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:items-stretch">
          {plans.map((p) => {
            const link = waLink(`Olá, tenho interesse no plano ${p.name} da Fraga Contabilidade. Pode me ajudar?`);
            const isFeatured = p.featured;
            return (
              <div key={p.name} className={`relative rounded-3xl p-7 flex flex-col transition-all duration-500 hover:-translate-y-1 ${
                isFeatured
                  ? "bg-gradient-dark text-white shadow-glow border border-accent/40 lg:scale-105 lg:-my-2"
                  : "bg-card border border-border shadow-card hover:shadow-elegant"
              }`}>
                {isFeatured && (
                  <>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-accent text-accent-foreground text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-gold">
                      Mais estratégico
                    </div>
                    <div className="absolute inset-0 bg-gradient-mesh opacity-20 rounded-3xl pointer-events-none" />
                  </>
                )}
                <div className="relative flex-1 flex flex-col">
                  <div className={`text-xs font-semibold uppercase tracking-wider mb-3 ${isFeatured ? "text-accent-glow" : "text-primary"}`}>Plano</div>
                  <h3 className={`text-2xl font-bold mb-2 ${isFeatured ? "text-white" : ""}`}>{p.name}</h3>
                  <p className={`text-sm mb-1 ${isFeatured ? "text-white/80" : "text-foreground/80 font-medium"}`}>{p.desc}</p>
                  <p className={`text-xs mb-6 ${isFeatured ? "text-white/60" : "text-muted-foreground"}`}>{p.ideal}</p>

                  <ul className="space-y-2.5 mb-7 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className={`flex items-start gap-2 text-sm ${isFeatured ? "text-white/90" : "text-foreground/80"}`}>
                        <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${isFeatured ? "bg-accent" : "bg-primary/10"}`}>
                          <Check className={`w-2.5 h-2.5 ${isFeatured ? "text-accent-foreground" : "text-primary"}`} strokeWidth={3} />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a href={link} target="_blank" rel="noopener" onClick={() => trackConversion("plan_whatsapp_click", p.name)} className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5 ${
                    isFeatured
                      ? "bg-gradient-accent text-accent-foreground shadow-gold hover:shadow-glow"
                      : "bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground"
                  }`}>
                    <MessageCircle className="w-4 h-4" />
                    Falar sobre plano {p.name}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10">
          Não sabe qual plano escolher? <a href={HERO_CTA} target="_blank" rel="noopener" className="text-primary font-semibold hover:underline">Fale com um especialista</a> e receba uma indicação personalizada.
        </p>
      </div>
    </section>
  );
}

/* ---------------- Process ---------------- */
function Process() {
  const steps = [
    { n: "01", title: "Você chama no WhatsApp", desc: "Sem formulário, sem espera. Atendimento humano direto." },
    { n: "02", title: "Entendemos seu momento", desc: "Uma conversa rápida para conhecer sua operação e desafios." },
    { n: "03", title: "Indicamos o melhor caminho", desc: "Plano ou solução sob medida para o seu estágio." },
    { n: "04", title: "Organizamos a transição", desc: "Cuidamos da migração sem ruído na sua rotina." },
    { n: "05", title: "Contabilidade estratégica", desc: "Você passa a contar com um parceiro que pensa junto." },
  ];
  const link = waLink("Olá, quero entender como funciona para começar com a Fraga Contabilidade.");
  return (
    <section className="py-24 lg:py-32 bg-gradient-dark text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30 animate-mesh pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent-glow mb-4">
            <span className="w-8 h-px bg-accent-glow" /> Processo <span className="w-8 h-px bg-accent-glow" />
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Como funciona para <span className="text-gradient-gold">começar com a Fraga</span>
          </h2>
          <p className="text-white/70 text-lg">Cinco passos simples, sem burocracia, sem formulários.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {steps.map((s, i) => (
            <div key={s.n} className="relative">
              <div className="glass-dark rounded-2xl p-6 h-full hover:bg-white/10 transition-all duration-500 hover:-translate-y-1">
                <div className="text-4xl font-bold text-gradient-gold mb-3 font-display">{s.n}</div>
                <h3 className="font-bold text-base mb-2 text-white">{s.title}</h3>
                <p className="text-sm text-white/65 leading-relaxed">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-accent/40" />
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
        <PremiumButton
            href={link}
            variant="gold"
            size="lg"
            icon={<MessageCircle className="w-5 h-5" />}
            trailingIcon={<ArrowRight className="w-4 h-4" />}
            trackLocation="process_cta_click"
          >
            Começar pelo WhatsApp
          </PremiumButton>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Video Testimonials ---------------- */
const VIDEOS: VideoItem[] = [
  {
    id: "thermofibras",
    youtubeId: "BX6rpC1cSUg",
    title: "Confiança e visão estratégica na Thermofibras",
    person: "Anderson Drummond",
    role: "Thermofibras",
  },
  {
    id: "quintao",
    youtubeId: "-J942kkVc-s",
    title: "40 anos de parceria com a Fraga Contabilidade",
    person: "Helvecio Quintão",
    role: "Cliente parceiro",
  },
];

function VideoTestimonials() {
  const modal = useVideoModal();
  const ctaLink = waLink("Olá, vi os depoimentos no site e quero conhecer melhor a Fraga Contabilidade.");
  return (
    <section id="depoimentos-video" className="relative py-24 lg:py-32 bg-gradient-dark text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-25 animate-mesh pointer-events-none" />
      <div className="absolute -top-20 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl pointer-events-none animate-glow-pulse" />
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-glow mb-4">
            <span className="w-8 h-px bg-accent-glow" /> Quem confia
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-5 leading-[1.05]">
            Histórias reais de quem cresce <span className="text-gradient-gold">ao lado da Fraga</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl">
            Empresários que contam, com as próprias palavras, o impacto de ter uma contabilidade consultiva no dia a dia da empresa.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          {VIDEOS.map((v) => (
            <VideoCard key={v.id} v={v} onPlay={modal.open} />
          ))}
        </div>
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <PremiumButton
            href={ctaLink}
            variant="gold"
            size="lg"
            icon={<MessageCircle className="w-5 h-5" />}
            trailingIcon={<ArrowRight className="w-4 h-4" />}
            trackLocation="video_section_cta_click"
            trackMessage="CTA pós depoimentos"
          >
            Quero esse mesmo nível de atenção
          </PremiumButton>
          <p className="text-sm text-white/60">Atendimento humano, pelo WhatsApp, com resposta rápida.</p>
        </div>
      </div>
      <VideoModal video={modal.active} onClose={modal.close} />
    </section>
  );
}

/* ---------------- Testimonials ---------------- */
function Testimonials() {
  const items = [
    { name: "Anderson Drummond", role: "Empresário", quote: "A parceria com a Fraga trouxe clareza e segurança para a tomada de decisão no nosso negócio. Recomendo de olhos fechados." },
    { name: "Helvecio Quintão", role: "Diretor", quote: "Atendimento próximo, equipe técnica preparada e visão estratégica. A Fraga vai muito além da contabilidade tradicional." },
    { name: "Thermofibras", role: "Indústria", quote: "Confiamos a contabilidade da Thermofibras à Fraga há anos. Processos organizados e resposta sempre rápida." },
    { name: "Silva Quintão", role: "Tecidos e Aviamentos", quote: "Uma contabilidade que entende o varejo e ajuda a planejar o futuro com base em números reais." },
  ];
  return (
    <section id="depoimentos" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-4">
            <span className="w-8 h-px bg-primary" /> Quem confia <span className="w-8 h-px bg-primary" />
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Empresas que já <span className="text-gradient-primary">crescem com a Fraga</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {items.map((t) => (
            <figure key={t.name} className="group relative rounded-2xl bg-card border border-border p-8 shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-1">
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="text-foreground/85 leading-relaxed mb-6 text-[15px]">"{t.quote}"</blockquote>
              <figcaption className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-elegant">
                  {t.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <div className="font-bold text-foreground text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Comparison ---------------- */
function Comparison() {
  const common = [
    "Atendimento reativo",
    "Pouca visão estratégica",
    "Comunicação confusa",
    "Falta de previsibilidade",
    "Foco apenas em obrigações",
  ];
  const fraga = [
    "Atendimento consultivo",
    "Visão tributária e gerencial",
    "Clareza nos processos",
    "Apoio para decisões empresariais",
    "+50 anos de experiência",
  ];
  return (
    <section className="py-24 lg:py-32 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-4">
            <span className="w-8 h-px bg-primary" /> Por que Fraga <span className="w-8 h-px bg-primary" />
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            A diferença está na <span className="text-gradient-primary">forma de trabalhar</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="rounded-2xl bg-card border border-border p-8 shadow-card">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Contabilidade comum</div>
            <h3 className="text-xl font-bold mb-6 text-foreground/70">O modelo tradicional</h3>
            <ul className="space-y-3.5">
              {common.map((c) => (
                <li key={c} className="flex items-start gap-3 text-sm text-foreground/70">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <X className="w-3 h-3 text-destructive" strokeWidth={3} />
                  </div>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative rounded-2xl bg-gradient-dark text-white p-8 shadow-glow overflow-hidden border border-accent/30">
            <div className="absolute inset-0 bg-gradient-mesh opacity-25 pointer-events-none" />
            <div className="relative">
              <div className="text-xs font-semibold uppercase tracking-wider text-accent-glow mb-2">Fraga Contabilidade</div>
              <h3 className="text-xl font-bold mb-6 text-white">O nosso jeito</h3>
              <ul className="space-y-3.5">
                {fraga.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-sm text-white/95">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-accent-foreground" strokeWidth={3} />
                    </div>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function Faq() {
  const faqs = [
    { q: "A Fraga atende empresas fora de Vila Velha?", a: "Sim. Atendemos clientes em todo o Brasil com processos 100% digitais, sem perder a proximidade." },
    { q: "Posso trocar de contador mesmo com a empresa em funcionamento?", a: "Sim. Conduzimos toda a migração contábil sem interromper sua operação, com transição segura." },
    { q: "Vocês atendem MEI?", a: "Sim, temos plano específico para MEI com emissão de notas, guia DAS e declaração anual." },
    { q: "Vocês fazem planejamento tributário?", a: "Sim. É um dos nossos diferenciais — analisamos a operação e reduzimos a carga tributária dentro da lei." },
    { q: "Como funciona a abertura de empresa?", a: "Cuidamos de toda a constituição: enquadramento, registros, alvarás e escolha do regime tributário ideal." },
    { q: "Preciso ir presencialmente?", a: "Não. Todo o atendimento pode ser feito digitalmente, mas você é bem-vindo no nosso escritório em Vila Velha sempre que quiser." },
    { q: "Como escolher o plano ideal?", a: "Fale com um especialista pelo WhatsApp. Em poucos minutos, indicamos o plano certo para o seu momento." },
    { q: "O atendimento é pelo WhatsApp?", a: "Sim. Seu canal direto com a equipe Fraga é o WhatsApp, com respostas rápidas e consultoras dedicadas." },
  ];
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-4">
            <span className="w-8 h-px bg-primary" /> FAQ <span className="w-8 h-px bg-primary" />
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">Perguntas frequentes</h2>
          <p className="text-muted-foreground text-lg">Tudo o que você precisa saber antes de começar.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={f.q} className={`rounded-2xl border transition-all duration-300 ${isOpen ? "bg-card border-primary/30 shadow-card" : "bg-card border-border hover:border-primary/20"}`}>
                <button onClick={() => setOpenIdx(isOpen ? null : i)} className="w-full text-left p-5 lg:p-6 flex items-center justify-between gap-4">
                  <span className="font-semibold text-foreground">{f.q}</span>
                  <ChevronDown className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid transition-all duration-500 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <div className="px-5 lg:px-6 pb-5 lg:pb-6 text-muted-foreground leading-relaxed">
                      {f.a}
                      <div className="mt-4">
                        <a href={waLink(`Olá, tenho uma dúvida sobre: ${f.q}`)} target="_blank" rel="noopener" onClick={() => trackConversion("faq_whatsapp_click", f.q)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                          <MessageCircle className="w-4 h-4" />
                          Fale com a Fraga pelo WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Final CTA ---------------- */
function FinalCta() {
  const link = waLink("Olá, quero falar com um especialista da Fraga Contabilidade.");
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-40 animate-mesh" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary-glow/20 blur-3xl animate-glow-pulse" />
      <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-accent/20 blur-3xl animate-glow-pulse" style={{ animationDelay: "1.5s" }} />

      <div className="relative mx-auto max-w-4xl px-4 lg:px-8 text-center text-white">
        <div className="inline-flex items-center gap-2 glass-dark rounded-full px-4 py-1.5 text-xs font-medium text-accent-glow mb-6">
          <Clock className="w-3.5 h-3.5" />
          Resposta em minutos no horário comercial
        </div>
        <h2 className="text-4xl lg:text-6xl font-bold leading-[1.05] mb-6">
          Pronto para ter uma <span className="text-gradient-gold">contabilidade mais estratégica</span> ao lado da sua empresa?
        </h2>
        <p className="text-lg lg:text-xl text-white/75 mb-10 max-w-2xl mx-auto leading-relaxed">
          Fale com a Fraga Contabilidade e descubra qual solução faz mais sentido para o seu momento.
        </p>
        <PremiumButton
          href={link}
          variant="gold"
          size="lg"
          icon={<MessageCircle className="w-6 h-6" />}
          trailingIcon={<ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
          trackLocation="final_cta_click"
          trackMessage="CTA Final"
        >
          Falar com especialista pelo WhatsApp
        </PremiumButton>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
          <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-accent-glow" /> Atendimento humano</div>
          <div className="flex items-center gap-2"><Award className="w-4 h-4 text-accent-glow" /> +50 anos de experiência</div>
          <div className="flex items-center gap-2"><Users className="w-4 h-4 text-accent-glow" /> +1.000 empresas atendidas</div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Contabilidade estratégica desde 1974. Mais de 50 anos contabilizando sucesso ao lado de empresas em todo o Brasil.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold mb-3 text-foreground">Contato</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><MessageCircle className="w-4 h-4 text-primary" /> +55 27 98848-2268</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Vila Velha — ES</li>
              <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Seg a Sex, 8h às 18h</li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold mb-3 text-foreground">Navegação</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#solucoes" className="hover:text-primary transition-colors">Soluções</a></li>
              <li><a href="#planos" className="hover:text-primary transition-colors">Planos</a></li>
              <li><a href="#depoimentos" className="hover:text-primary transition-colors">Depoimentos</a></li>
              <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Fraga Contabilidade. Todos os direitos reservados.</span>
          <span>Vila Velha, ES — Atendimento em todo o Brasil</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- WhatsApp Float ---------------- */
function WhatsAppFloat() {
  return (
    <a
      href={HERO_CTA}
      target="_blank"
      rel="noopener"
      aria-label="Falar no WhatsApp"
      onClick={() => trackConversion("floating_whatsapp_click")}
      className="fixed bottom-6 right-6 z-40 group"
    >
      <span className="absolute inset-0 rounded-full bg-whatsapp animate-glow-pulse" />
      <span className="relative flex items-center gap-2 bg-whatsapp text-whatsapp-foreground rounded-full pl-4 pr-5 py-3 shadow-elegant hover:shadow-glow transition-all hover:-translate-y-0.5">
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline text-sm font-semibold">Fale conosco</span>
      </span>
    </a>
  );
}
