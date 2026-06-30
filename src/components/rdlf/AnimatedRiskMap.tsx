import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eyebrow } from "./primitives";
import { SplitTextReveal } from "./motion/kinetic";
import { RDLFAnimatedLayerButton } from "./motion/RDLFAnimatedLayerButton";

type RiskNode = {
  id: string;
  number: string;
  title: string;
  label: string;
  risk: string;
  consequence: string;
  solution: string;
  x: number;
  y: number;
  severity: "alto" | "médio" | "estrutural";
};

const risks: RiskNode[] = [
  {
    id: "marca",
    number: "01",
    title: "Marca",
    label: "Ativo intangível",
    risk: "A empresa usa uma marca sem saber se ela está realmente disponível ou protegida.",
    consequence: "O crescimento pode criar exposição, conflito de nome ou perda de identidade comercial.",
    solution: "Análise de anterioridade, estratégia de classe e acompanhamento no INPI.",
    x: 18, y: 30, severity: "alto",
  },
  {
    id: "contratos",
    number: "02",
    title: "Contratos",
    label: "Relações comerciais",
    risk: "Contratos genéricos não acompanham a realidade da operação.",
    consequence: "Cláusulas frágeis geram cobrança difícil, conflito comercial e perda de previsibilidade.",
    solution: "Elaboração e revisão de contratos com cláusulas de proteção empresarial.",
    x: 42, y: 16, severity: "estrutural",
  },
  {
    id: "socios",
    number: "03",
    title: "Sócios",
    label: "Governança",
    risk: "Responsabilidades e regras societárias ficam informais ou mal documentadas.",
    consequence: "Decisões internas viram conflitos, travam crescimento e expõem patrimônio.",
    solution: "Estruturação societária, definição de responsabilidades e documentação interna.",
    x: 72, y: 26, severity: "médio",
  },
  {
    id: "operacao",
    number: "04",
    title: "Operação",
    label: "Rotina empresarial",
    risk: "A empresa cresce sem padronizar documentos, aprovações e processos jurídicos.",
    consequence: "A operação passa a depender de improviso e memória, aumentando riscos invisíveis.",
    solution: "Organização documental e construção de fluxos jurídicos preventivos.",
    x: 82, y: 58, severity: "estrutural",
  },
  {
    id: "trabalho",
    number: "05",
    title: "Trabalho",
    label: "Equipe e rotina",
    risk: "Relações de trabalho e prestação de serviços podem estar mal estruturadas.",
    consequence: "A empresa fica exposta a discussões, passivos e insegurança operacional.",
    solution: "Análise preventiva de documentos, rotinas e pontos sensíveis da relação de trabalho.",
    x: 52, y: 74, severity: "alto",
  },
  {
    id: "conflitos",
    number: "06",
    title: "Conflitos",
    label: "Antes do processo",
    risk: "Conflitos comerciais avançam sem estratégia extrajudicial.",
    consequence: "A empresa perde tempo, energia e margem de negociação.",
    solution: "Negociação estratégica, notificações extrajudiciais e acordos orientados por risco.",
    x: 22, y: 70, severity: "médio",
  },
];

const severityColor: Record<RiskNode["severity"], string> = {
  alto: "var(--gold)",
  médio: "var(--gold-light)",
  estrutural: "rgba(245,240,225,0.6)",
};

export function AnimatedRiskMap() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const active = risks[activeIndex];

  useEffect(() => {
    if (isPaused) return;
    const t = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % risks.length);
    }, 3400);
    return () => window.clearInterval(t);
  }, [isPaused]);

  const lines = useMemo(
    () =>
      risks.map((r, i) => {
        const n = risks[(i + 1) % risks.length];
        return { id: `${r.id}-${n.id}`, x1: r.x, y1: r.y, x2: n.x, y2: n.y };
      }),
    [],
  );

  return (
    <section id="riscos" className="relative py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,#041F1F),#030504))]" />
      <div className="absolute inset-0 -z-10 grain" />
      <span className="pointer-events-none absolute right-0 bottom-10 select-none font-display italic text-[18vw] leading-none text-white/[0.022]">
        risco
      </span>

      <div className="container-rdlf">
        <div className="mb-14 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <Eyebrow>Mapa de risco</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2rem,5vw,4.8rem)] leading-[0.98] tracking-[-0.03em] text-bone">
              <SplitTextReveal
                text="Riscos invisíveis aparecem quando a empresa começa a crescer."
                highlight={["crescer."]}
              />
            </h2>
            <p className="mt-6 max-w-2xl text-bone/65 leading-relaxed">
              O mapa percorre automaticamente os pontos sensíveis da operação e mostra onde a
              Fraga transforma improviso em estrutura jurídica.
            </p>
            <div className="mt-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-bone/45">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--gold)] node-pulse" />
              {isPaused ? "Pausado · controle manual" : "Análise automática em andamento"}
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] items-stretch">
          {/* Map */}
          <div
            className="relative aspect-[4/3] rounded-3xl border border-white/8 bg-ink-soft/40 overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle,oklch(1_0_0/0.04)_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.30_0.05_175/0.25),transparent_70%)]" />

            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {lines.map((line, i) => {
                const isActive =
                  i === activeIndex || i === (activeIndex - 1 + risks.length) % risks.length;
                return (
                  <line
                    key={line.id}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke={isActive ? "oklch(0.30 0.045 175 / 0.55)" : "oklch(1 0 0 / 0.06)"}
                    strokeWidth={isActive ? "0.25" : "0.12"}
                    vectorEffect="non-scaling-stroke"
                    style={{ transition: "stroke 600ms, stroke-width 600ms" }}
                  />
                );
              })}
            </svg>

            {risks.map((r, i) => {
              const isActive = i === activeIndex;
              const color = severityColor[r.severity];
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  onMouseEnter={() => {
                    setIsPaused(true);
                    setActiveIndex(i);
                  }}
                  style={{ left: `${r.x}%`, top: `${r.y}%`, color }}
                  className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 group transition-all duration-500 ${
                    isActive ? "scale-110" : "scale-100 opacity-80 hover:opacity-100"
                  }`}
                  aria-label={r.title}
                >
                  <span className="relative grid place-items-center">
                    <span
                      className={`absolute rounded-full bg-current opacity-25 transition-all ${
                        isActive ? "h-12 w-12" : "h-6 w-6"
                      }`}
                    />
                    {isActive && (
                      <span className="absolute h-12 w-12 rounded-full bg-current opacity-30 node-pulse" />
                    )}
                    <span
                      className={`block rounded-full bg-current transition-all ${
                        isActive ? "h-3.5 w-3.5" : "h-2 w-2"
                      }`}
                    />
                  </span>
                  <span
                    className={`absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.18em] transition-colors hidden md:inline ${
                      isActive ? "text-bone" : "text-bone/55 group-hover:text-bone"
                    }`}
                  >
                    <span className="mr-1 text-[color:var(--gold-light)]">{r.number}</span>
                    {r.title}
                  </span>
                </button>
              );
            })}

            <div className="absolute left-4 top-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-bone/55">
              <Legend color="var(--gold)" label="Alto" />
              <Legend color="var(--gold-light)" label="Médio" />
              <Legend color="rgba(245,240,225,0.6)" label="Estrutural" />
            </div>
          </div>

          {/* Active panel */}
          <div className="relative glass-card rounded-3xl p-8 md:p-10 overflow-hidden">
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
                  <div className="eyebrow">{active.label}</div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--gold-light)] border border-[color:var(--gold)]/30 rounded-full px-3 py-1">
                    {active.severity}
                  </span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl text-bone mt-4 leading-tight">
                  {active.title}
                </h3>
                <p className="text-bone/70 mt-4 leading-relaxed text-[15px]">{active.risk}</p>

                <div className="hairline my-7" />

                <div className="space-y-6">
                  <div>
                    <div className="eyebrow mb-2">Consequência prática</div>
                    <p className="text-bone/65 text-[15px] leading-relaxed">{active.consequence}</p>
                  </div>
                  <div>
                    <div className="eyebrow mb-2">Como a Fraga estrutura</div>
                    <p className="text-bone text-[15px] leading-relaxed">{active.solution}</p>
                  </div>
                </div>

                <div className="mt-8">
                  <RDLFAnimatedLayerButton href="#contato">
                    Mapear riscos da minha empresa
                  </RDLFAnimatedLayerButton>
                </div>

                <div className="mt-8 h-px w-full bg-white/5 overflow-hidden">
                  {!isPaused && (
                    <motion.div
                      key={`p-${active.id}`}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3.4, ease: "linear" }}
                      className="h-px bg-[color:var(--gold)]"
                    />
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}
