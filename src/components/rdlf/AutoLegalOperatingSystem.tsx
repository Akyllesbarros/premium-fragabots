import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eyebrow } from "./primitives";
import { MobileCinematicStepper } from "./motion/MobileCinematicStepper";
import { WorldClassCard } from "./motion/WorldClassCard";
import { RDLFAnimatedLayerButton } from "./motion/RDLFAnimatedLayerButton";


type LegalArea = {
  id: string;
  number: string;
  title: string;
  short: string;
  risk: string;
  gain: string;
  deliverables: string[];
  angle: number;
  priority: "Alta" | "Estratégica" | "Preventiva";
};

const legalAreas: LegalArea[] = [
  {
    id: "pi",
    number: "01",
    title: "Propriedade Intelectual",
    short: "Proteção de marca, ativos intangíveis e estratégia junto ao INPI.",
    risk: "Marca desprotegida, conflito de nome e perda de ativo intangível na expansão.",
    gain: "A empresa cresce com identidade protegida e base estratégica para escalar.",
    deliverables: ["Anterioridade", "Estratégia de classes", "Acompanhamento INPI"],
    angle: -90,
    priority: "Alta",
  },
  {
    id: "contracts",
    number: "02",
    title: "Contratos Empresariais",
    short: "Documentos personalizados para relações comerciais previsíveis.",
    risk: "Contratos genéricos, cláusulas frágeis e relações sem proteção clara.",
    gain: "Mais clareza, previsibilidade e segurança nas negociações.",
    deliverables: ["Elaboração", "Revisão", "Cláusulas de proteção"],
    angle: -30,
    priority: "Estratégica",
  },
  {
    id: "preventive",
    number: "03",
    title: "Consultoria Preventiva",
    short: "Apoio jurídico contínuo para decisões com menos improviso.",
    risk: "Decisões tomadas sem análise jurídica e problemas percebidos tarde demais.",
    gain: "A empresa antecipa riscos antes que virem conflito.",
    deliverables: ["Análise de risco", "Orientação estratégica", "Suporte contínuo"],
    angle: 30,
    priority: "Preventiva",
  },
  {
    id: "structure",
    number: "04",
    title: "Estruturação Jurídica",
    short: "Organização societária, responsabilidades e documentação interna.",
    risk: "Sócios desalinhados e operação dependente de acordos informais.",
    gain: "Base interna sólida para crescer com menos atrito e mais governança.",
    deliverables: ["Societário", "Responsabilidades", "Documentação"],
    angle: 90,
    priority: "Estratégica",
  },
  {
    id: "compliance",
    number: "05",
    title: "Compliance & ESG",
    short: "Organização documental e boas práticas para empresas em crescimento.",
    risk: "Desorganização documental e dificuldade de demonstrar conformidade.",
    gain: "Mais maturidade e segurança em processos internos.",
    deliverables: ["Documentos", "Políticas", "Boas práticas"],
    angle: 150,
    priority: "Preventiva",
  },
  {
    id: "conflicts",
    number: "06",
    title: "Resolução Extrajudicial",
    short: "Estratégia para resolver conflitos antes da judicialização.",
    risk: "Conflitos escalando sem estratégia, perda de tempo e desgaste comercial.",
    gain: "Resolução rápida, técnica e alinhada aos interesses da empresa.",
    deliverables: ["Notificações", "Negociação", "Acordos"],
    angle: 210,
    priority: "Estratégica",
  },
];

function polar(angle: number, r: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: Math.cos(rad) * r, y: Math.sin(rad) * r };
}

export function AutoLegalOperatingSystem() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const active = legalAreas[activeIndex];

  useEffect(() => {
    if (isPaused) return;
    const t = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % legalAreas.length);
    }, 3600);
    return () => window.clearInterval(t);
  }, [isPaused]);

  const points = useMemo(
    () => legalAreas.map((a) => ({ ...a, pos: polar(a.angle, 220) })),
    [],
  );

  return (
    <section id="hub" className="relative overflow-hidden py-28 md:py-40">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,#041F1F),#030504))]" />
      <div className="absolute inset-0 -z-10 grain" />
      <span className="pointer-events-none absolute left-0 bottom-10 select-none font-display italic text-[18vw] leading-none text-white/[0.022]">
        system
      </span>

      <div className="container-rdlf">
        <div className="mb-14 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>Legal Operating System</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2rem,5vw,4.8rem)] leading-[0.98] tracking-[-0.03em] text-bone">
              Um hub jurídico que trabalha{" "}
              <span className="italic text-[color:var(--gold-light)]">antes do problema aparecer.</span>
            </h2>
            <p className="mt-6 max-w-xl text-bone/65 leading-relaxed">
              A experiência não depende do clique: o sistema percorre automaticamente as áreas
              essenciais da estrutura jurídica e revela como cada uma protege o crescimento da empresa.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Auto-flow", "Preventivo", "Empresarial"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-bone/55"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile / tablet — cinematic stepper */}
        <div className="rdlf-mobile-experience">
          <div className="mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-bone/55">
            <span className="h-px w-8 bg-[color:var(--gold)]/40" />
            <span>sistema jurídico</span>
          </div>
          <MobileCinematicStepper
            items={legalAreas}
            activeIndex={activeIndex}
            onChange={setActiveIndex}
            renderItem={(item) => (
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-[color:var(--gold-light)]">
                    Área ativa
                  </span>
                  <span className="font-display text-sm tracking-[0.3em] text-bone/60">
                    {item.number}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-[clamp(1.6rem,6vw,2.4rem)] leading-[1.05] text-bone">
                  {item.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-bone/70">
                  {item.short}
                </p>
                <div className="hairline my-6" />
                <div className="space-y-5">
                  <div>
                    <div className="eyebrow mb-1.5">Risco que resolve</div>
                    <p className="text-[14px] leading-relaxed text-bone/70">{item.risk}</p>
                  </div>
                  <div>
                    <div className="eyebrow mb-1.5">Ganho empresarial</div>
                    <p className="text-[14px] leading-relaxed text-bone">{item.gain}</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.deliverables.map((d) => (
                    <span
                      key={d}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] text-bone/70"
                    >
                      <span className="h-1 w-1 rounded-full bg-[color:var(--gold)]" />
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            )}
          />
        </div>

        <div className="rdlf-desktop-only grid gap-10 lg:grid-cols-[1.1fr_1fr] items-stretch">
          {/* Radial */}
          <div
            className="relative aspect-square w-full max-w-[640px] mx-auto hidden md:block"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="absolute inset-0 rounded-full border border-white/[0.06]" />
            <div className="absolute inset-[12%] rounded-full border border-white/[0.05]" />
            <div className="absolute inset-[28%] rounded-full border border-white/[0.04]" />

            {/* Connection lines */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="-260 -260 520 520"
              preserveAspectRatio="xMidYMid meet"
            >
              {points.map((p, i) => {
                const isActive = i === activeIndex;
                return (
                  <line
                    key={p.id}
                    x1={0}
                    y1={0}
                    x2={p.pos.x}
                    y2={p.pos.y}
                    stroke={isActive ? "oklch(0.30 0.045 175 / 0.55)" : "oklch(1 0 0 / 0.06)"}
                    strokeWidth={isActive ? "1.2" : "0.6"}
                    style={{ transition: "stroke 600ms, stroke-width 600ms" }}
                  />
                );
              })}
            </svg>

            {/* Center */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="grid h-32 w-32 place-items-center rounded-full border border-[color:var(--gold)]/30 bg-ink-soft/80 backdrop-blur-xl shadow-[0_0_60px_-10px_oklch(0.30_0.045_175/0.4)]">
                <div className="text-center">
                  <div className="font-display text-2xl text-bone">Fraga</div>
                  <div className="mt-1 text-[9px] uppercase tracking-[0.2em] text-bone/55">
                    Base sólida
                  </div>
                </div>
              </div>
            </div>

            {/* Nodes */}
            {points.map((p, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  onMouseEnter={() => {
                    setIsPaused(true);
                    setActiveIndex(i);
                  }}
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: `translate(calc(-50% + ${p.pos.x}px), calc(-50% + ${p.pos.y}px))`,
                  }}
                  className={`absolute z-20 min-w-[120px] rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.18em] backdrop-blur-xl transition-all duration-500 ${
                    isActive
                      ? "border-[color:var(--gold)]/70 bg-[color:var(--gold)]/15 text-bone shadow-[0_0_42px_-5px_oklch(0.30_0.045_175/0.45)] scale-110"
                      : "border-white/10 bg-white/[0.04] text-bone/55 hover:border-[color:var(--gold)]/40 hover:text-bone"
                  }`}
                >
                  <span className="mr-1 text-[color:var(--gold-light)]">{p.number}</span>
                  {p.title.split(" ").slice(0, 2).join(" ")}
                </button>
              );
            })}

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-bone/40">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--gold)] node-pulse" />
              {isPaused ? "Pausado · controle manual" : "Sistema percorrendo automaticamente"}
            </div>
          </div>

          {/* Mobile tabs */}
          <div className="md:hidden -mx-4 px-4 overflow-x-auto no-scrollbar">
            <div className="flex gap-2 pb-2">
              {points.map((p, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setIsPaused(true);
                      setActiveIndex(i);
                    }}
                    className={`flex-none rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.18em] transition-all ${
                      isActive
                        ? "border-[color:var(--gold)]/70 bg-[color:var(--gold)]/15 text-bone"
                        : "border-white/10 bg-white/[0.04] text-bone/55"
                    }`}
                  >
                    <span className="mr-1 text-[color:var(--gold-light)]">{p.number}</span>
                    {p.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active panel */}
          <WorldClassCard radius="rounded-3xl" intensity="medium" alwaysOnBorder>
          <div
            className="relative glass-card rounded-3xl p-8 md:p-10 overflow-hidden min-h-[500px]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >

            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[color:var(--petrol)]/40 blur-3xl" />

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="flex items-center justify-between">
                  <div className="eyebrow">Área ativa</div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--gold-light)] border border-[color:var(--gold)]/30 rounded-full px-3 py-1">
                    {active.priority}
                  </span>
                </div>

                <div className="mt-5 font-display text-[color:var(--gold-light)]/80 text-sm tracking-[0.3em]">
                  {active.number}
                </div>
                <h3 className="mt-2 font-display text-3xl md:text-4xl text-bone leading-tight">
                  {active.title}
                </h3>
                <p className="mt-4 text-bone/65 leading-relaxed">{active.short}</p>

                <div className="hairline my-7" />

                <div className="space-y-5">
                  <div>
                    <div className="eyebrow mb-2">Risco que resolve</div>
                    <p className="text-bone/70 text-[15px] leading-relaxed">{active.risk}</p>
                  </div>
                  <div>
                    <div className="eyebrow mb-2">Ganho empresarial</div>
                    <p className="text-bone text-[15px] leading-relaxed">{active.gain}</p>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap gap-2">
                  {active.deliverables.map((d) => (
                    <span
                      key={d}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-bone/70"
                    >
                      <span className="h-1 w-1 rounded-full bg-[color:var(--gold)]" />
                      {d}
                    </span>
                  ))}
                </div>

                <div className="mt-8">
                  <RDLFAnimatedLayerButton href="#contato">
                    Quero estruturar minha empresa
                  </RDLFAnimatedLayerButton>
                </div>

                {/* progress */}
                <div className="mt-8 h-px w-full bg-white/5 overflow-hidden">
                  {!isPaused && (
                    <motion.div
                      key={`p-${active.id}`}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3.6, ease: "linear" }}
                      className="h-px bg-[color:var(--gold)]"
                    />
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          </WorldClassCard>
        </div>

      </div>
    </section>
  );
}
