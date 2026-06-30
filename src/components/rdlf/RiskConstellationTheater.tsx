import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "./primitives";
import { SplitTextReveal } from "./motion/kinetic";
import { MobileCinematicStepper } from "./motion/MobileCinematicStepper";

type RiskStar = {
  id: string;
  number: string;
  title: string;
  category: string;
  risk: string;
  consequence: string;
  rdlfAction: string;
  x: number;
  y: number;
  size: number;
  accent: string;
};

const riskStars: RiskStar[] = [
  { id: "brand", number: "01", title: "Marca vulnerável", category: "Ativo intangível",
    risk: "A empresa cresce com uma marca sem proteção adequada.",
    consequence: "A identidade comercial pode virar ponto de conflito quando ganha mercado.",
    rdlfAction: "Anterioridade, viabilidade, estratégia de classe e acompanhamento no INPI.",
    x: 18, y: 28, size: 74, accent: "#073534" },
  { id: "contracts", number: "02", title: "Contrato genérico", category: "Relação comercial",
    risk: "A operação depende de documentos que não refletem a realidade do negócio.",
    consequence: "Cobrança, entrega e responsabilidade ficam abertas a disputa.",
    rdlfAction: "Contratos personalizados, revisão técnica e cláusulas de proteção.",
    x: 48, y: 17, size: 88, accent: "#F5F0E1" },
  { id: "partners", number: "03", title: "Sócios desalinhados", category: "Governança",
    risk: "Papéis, responsabilidades e decisões ficam informais.",
    consequence: "O crescimento amplia conflitos internos e trava decisões relevantes.",
    rdlfAction: "Estruturação societária e documentação clara de responsabilidades.",
    x: 76, y: 33, size: 68, accent: "#0B4644" },
  { id: "operation", number: "04", title: "Operação sem lastro", category: "Rotina empresarial",
    risk: "A empresa cresce sem padronizar documentos e fluxos jurídicos.",
    consequence: "A gestão passa a depender de improviso, memória e acordos verbais.",
    rdlfAction: "Organização documental, fluxos preventivos e padronização jurídica.",
    x: 66, y: 72, size: 82, accent: "#073534" },
  { id: "work", number: "05", title: "Relações frágeis", category: "Equipe e rotina",
    risk: "Contratações, prestação de serviços e rotinas podem estar mal estruturadas.",
    consequence: "A empresa acumula passivos e insegurança na operação diária.",
    rdlfAction: "Análise preventiva de documentos e pontos sensíveis da relação de trabalho.",
    x: 32, y: 76, size: 70, accent: "#F5F0E1" },
  { id: "conflict", number: "06", title: "Conflito escalando", category: "Pré-contencioso",
    risk: "Problemas comerciais avançam sem estratégia extrajudicial.",
    consequence: "A empresa perde margem de negociação e aumenta desgaste.",
    rdlfAction: "Notificações, negociação estratégica e solução extrajudicial.",
    x: 12, y: 58, size: 62, accent: "#0B4644" },
];

export function RiskConstellationTheater() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = riskStars[activeIndex];

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % riskStars.length);
    }, 3500);
    return () => window.clearInterval(t);
  }, [paused]);

  const connections = useMemo(() => {
    return riskStars.flatMap((star, index) => {
      const next = riskStars[(index + 1) % riskStars.length];
      const cross = riskStars[(index + 2) % riskStars.length];
      return [
        { id: `${star.id}-${next.id}`, x1: star.x, y1: star.y, x2: next.x, y2: next.y, index },
        { id: `${star.id}-${cross.id}`, x1: star.x, y1: star.y, x2: cross.x, y2: cross.y, index },
      ];
    });
  }, []);

  return (
    <section id="riscos" className="relative py-28 md:py-40 overflow-hidden">
      <style>{`
        @keyframes theaterScan {
          0% { transform: translateX(-160%) rotate(8deg); opacity: 0; }
          22% { opacity: 0.85; }
          70% { opacity: 0.85; }
          100% { transform: translateX(240%) rotate(8deg); opacity: 0; }
        }
        @keyframes riskStarPulse {
          0%,100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(2.1); opacity: 0; }
        }
      `}</style>

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,#041F1F),#030504))]" />
      <div className="absolute inset-0 -z-10 grain" />
      <span className="pointer-events-none absolute -right-4 bottom-6 select-none font-display italic text-[22vw] leading-[0.8] text-white/[0.025]">
        RISCO
      </span>

      <div className="container-rdlf">
        <div className="mb-14 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <Eyebrow>Risk Constellation</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2rem,5vw,4.8rem)] leading-[0.98] tracking-[-0.03em] text-bone">
              <SplitTextReveal
                text="Risco jurídico não nasce isolado. Ele cria constelações."
                highlight={["constelações."]}
              />
            </h2>
            <p className="mt-6 max-w-2xl text-bone/65 leading-relaxed">
              Um contrato frágil pode tocar marca, operação, sócios e conflito.
              A Fraga lê essas relações antes que elas virem crise — e estrutura
              respostas onde a empresa está mais exposta.
            </p>
            <div className="mt-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-bone/45">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--gold)] node-pulse" />
              {paused ? "Constelação pausada · controle manual" : "Leitura automática em andamento"}
            </div>
          </div>
        </div>

        {/* Mobile / tablet — cinematic stepper */}
        <div className="rdlf-mobile-experience">
          <div className="mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-bone/55">
            <span className="h-px w-8 bg-[color:var(--gold)]/40" />
            <span>risco conectado</span>
          </div>
          <MobileCinematicStepper
            items={riskStars}
            activeIndex={activeIndex}
            onChange={setActiveIndex}
            renderItem={(item) => (
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-[color:var(--gold-light)]">
                    {item.category}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.24em] text-bone/55">
                    {item.number} / 06
                  </span>
                </div>
                <h3 className="mt-4 font-display text-[clamp(1.6rem,6vw,2.4rem)] leading-[1.05] text-bone">
                  {item.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-bone/75">
                  {item.risk}
                </p>
                <div className="hairline my-6" />
                <div>
                  <div className="eyebrow mb-1.5">Consequência prática</div>
                  <p className="text-[14px] leading-relaxed text-bone/70">{item.consequence}</p>
                </div>
                <div className="mt-5 rounded-2xl border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/[0.06] p-4">
                  <div className="eyebrow mb-1.5">Resposta Fraga</div>
                  <p className="text-[14px] leading-relaxed text-bone">{item.rdlfAction}</p>
                </div>
              </div>
            )}
          />
        </div>

        <div className="rdlf-desktop-only grid gap-8 lg:grid-cols-[1.25fr_1fr] items-stretch">
          {/* Constellation stage */}
          <div
            className="relative aspect-[5/4] rounded-3xl border border-white/8 bg-ink-soft/40 overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle,oklch(1_0_0/0.05)_1px,transparent_1px)] [background-size:28px_28px] opacity-60" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,oklch(0.30_0.05_175/0.3),transparent_70%)]" />

            {/* Scan wave */}
            <div
              className="absolute -top-1/4 -bottom-1/4 w-1/3 pointer-events-none"
              style={{
                left: "-30%",
                background:
                  "linear-gradient(90deg, transparent, oklch(0.30 0.045 175 / 0.12) 50%, transparent)",
                animation: "theaterScan 6s ease-in-out infinite",
              }}
            />

            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {connections.map((line) => {
                const isActive =
                  line.index === activeIndex ||
                  line.index === (activeIndex - 1 + riskStars.length) % riskStars.length;
                return (
                  <line
                    key={line.id}
                    x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                    stroke={isActive ? "oklch(0.30 0.045 175 / 0.5)" : "oklch(1 0 0 / 0.05)"}
                    strokeWidth={isActive ? "0.22" : "0.1"}
                    vectorEffect="non-scaling-stroke"
                    style={{ transition: "stroke 600ms, stroke-width 600ms" }}
                  />
                );
              })}
            </svg>

            {riskStars.map((star, i) => {
              const selected = i === activeIndex;
              return (
                <motion.button
                  key={star.id}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  onMouseEnter={() => { setPaused(true); setActiveIndex(i); }}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${star.x}%`, top: `${star.y}%`, color: star.accent }}
                  initial={{ opacity: 0, scale: 0.4 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.7 }}
                  aria-label={star.title}
                >
                  <span className="relative grid place-items-center">
                    {selected && (
                      <span
                        className="absolute rounded-full bg-current"
                        style={{
                          width: star.size, height: star.size,
                          animation: "riskStarPulse 2.2s ease-out infinite",
                        }}
                      />
                    )}
                    <span
                      className={`absolute rounded-full bg-current transition-all ${
                        selected ? "opacity-30" : "opacity-15"
                      }`}
                      style={{
                        width: selected ? star.size * 0.55 : star.size * 0.32,
                        height: selected ? star.size * 0.55 : star.size * 0.32,
                      }}
                    />
                    <span
                      className={`block rounded-full bg-current transition-all ${
                        selected ? "h-3.5 w-3.5" : "h-2 w-2"
                      }`}
                    />
                  </span>
                  <span
                    className={`absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.2em] transition-colors hidden md:inline ${
                      selected ? "text-bone" : "text-bone/55 group-hover:text-bone"
                    }`}
                  >
                    <span className="mr-1.5 text-[color:var(--gold-light)]">{star.number}</span>
                    {star.title}
                  </span>
                </motion.button>
              );
            })}

            <div className="absolute left-5 top-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-bone/55">
              <span className="font-display italic">risco</span>
              <span className="h-px w-8 bg-white/15" />
              <span>conectado</span>
            </div>
            <div className="absolute right-5 bottom-5 text-[10px] uppercase tracking-[0.22em] text-bone/45">
              theater · {String(activeIndex + 1).padStart(2, "0")}/06
            </div>
          </div>

          {/* Active risk panel */}
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
                  <div className="eyebrow">{active.category}</div>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-bone/50">
                    {active.number} / 06
                  </span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl text-bone mt-3 leading-tight">
                  {active.title}
                </h3>
                <p className="text-bone/70 mt-4 leading-relaxed text-[15px]">{active.risk}</p>

                <div className="hairline my-7" />

                <div>
                  <div className="eyebrow mb-2">Consequência prática</div>
                  <p className="text-bone/65 text-[15px] leading-relaxed">{active.consequence}</p>
                </div>

                <div className="mt-6 rounded-2xl border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/[0.06] p-5">
                  <div className="eyebrow mb-2">Resposta Fraga</div>
                  <p className="text-bone text-[15px] leading-relaxed">{active.rdlfAction}</p>
                </div>

                <div className="mt-7">
                  <a
                    href="https://wa.me/5527988482268"
                    className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/10 px-5 py-3 text-sm text-bone hover:border-[color:var(--gold)] hover:bg-[color:var(--gold)]/20 transition-all"
                  >
                    Mapear riscos da minha empresa
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>

                {!paused && (
                  <div className="mt-7 h-px w-full bg-white/5 overflow-hidden">
                    <motion.div
                      key={`p-${active.id}`}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3.5, ease: "linear" }}
                      className="h-px bg-[color:var(--gold)]"
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
