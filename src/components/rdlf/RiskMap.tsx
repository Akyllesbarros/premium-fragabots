import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eyebrow } from "./primitives";
import { ScrollReveal, SplitTextReveal } from "./motion/kinetic";

type Risk = {
  id: string;
  label: string;
  x: number;
  y: number;
  level: "alert" | "warn" | "neutral";
  risk: string;
  consequence: string;
  structure: string;
  area: string;
};

const risks: Risk[] = [
  { id: "marca", label: "Marca", x: 18, y: 28, level: "alert", risk: "Marca não registrada usada por terceiro", consequence: "Perda do nome comercial após anos de construção.", structure: "Classes, INPI e monitoramento contínuo.", area: "Propriedade Intelectual" },
  { id: "contratos", label: "Contratos", x: 42, y: 18, level: "alert", risk: "Cláusulas genéricas em operações críticas", consequence: "Disputa interpretativa cara e imprevisível.", structure: "Contratos desenhados sobre o fluxo real.", area: "Contratos Empresariais" },
  { id: "socios", label: "Sócios", x: 70, y: 30, level: "alert", risk: "Sociedade sem regras claras", consequence: "Conflito societário trava decisões.", structure: "Acordo de sócios com governança e saídas.", area: "Estruturação" },
  { id: "trabalho", label: "Trabalho", x: 28, y: 56, level: "warn", risk: "Vínculos informais com prestadores", consequence: "Passivo trabalhista latente.", structure: "Modelagem contratual e fluxos de pagamento.", area: "Compliance" },
  { id: "operacao", label: "Operação", x: 50, y: 48, level: "warn", risk: "Processos internos sem formalização", consequence: "Riscos sem rastreabilidade.", structure: "Políticas internas mínimas e trilhas.", area: "Compliance" },
  { id: "documentos", label: "Documentos", x: 80, y: 60, level: "neutral", risk: "Documentação societária desatualizada", consequence: "Impossibilidade de auditoria ou captação.", structure: "Atualização cadastral e reorganização.", area: "Estruturação" },
  { id: "compliance", label: "Compliance", x: 36, y: 78, level: "warn", risk: "LGPD aplicada parcialmente", consequence: "Exposição regulatória e contratual.", structure: "Mapeamento de tratamento + políticas.", area: "Compliance" },
  { id: "conflitos", label: "Conflitos", x: 68, y: 80, level: "alert", risk: "Disputas tratadas tarde", consequence: "Judicialização cara e desgastante.", structure: "Notificações e composição estratégica.", area: "Resolução Extrajudicial" },
];

const dotColor = (l: Risk["level"]) =>
  l === "alert" ? "var(--gold)" : l === "warn" ? "var(--gold-light)" : "rgba(245,240,225,0.5)";

export function RiskMap() {
  const [active, setActive] = useState<Risk>(risks[0]);

  return (
    <section id="riscos" className="relative py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,#041F1F),#030504))]" />
      <div className="absolute inset-0 -z-10 grain" />
      <span className="pointer-events-none absolute right-0 bottom-10 font-display italic text-[18vw] leading-none text-white/[0.022] select-none">
        mapa
      </span>

      <div className="container-rdlf">
        <div className="grid gap-10 lg:grid-cols-12 mb-14">
          <div className="lg:col-span-9">
            <ScrollReveal>
              <Eyebrow>Mapa de risco</Eyebrow>
            </ScrollReveal>
            <h2 className="font-display text-[clamp(2rem,5vw,4.8rem)] leading-[0.98] tracking-[-0.03em] text-bone mt-5">
              <SplitTextReveal
                text="Empresas que improvisam assumem riscos invisíveis."
                highlight={["invisíveis."]}
              />
            </h2>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] items-stretch">
          {/* Constellation map */}
          <div className="relative aspect-[4/3] rounded-3xl border border-white/8 bg-ink-soft/40 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle,oklch(1_0_0/0.04)_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.30_0.05_175/0.25),transparent_70%)]" />

            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {risks.map((r, i) =>
                risks.slice(i + 1).map((r2) => {
                  const isActive = active.id === r.id || active.id === r2.id;
                  return (
                    <line
                      key={`${r.id}-${r2.id}`}
                      x1={r.x}
                      y1={r.y}
                      x2={r2.x}
                      y2={r2.y}
                      stroke={isActive ? "oklch(0.30 0.045 175 / 0.45)" : "oklch(1 0 0 / 0.05)"}
                      strokeWidth="0.12"
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                }),
              )}
            </svg>

            {risks.map((r) => {
              const isActive = active.id === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setActive(r)}
                  onMouseEnter={() => setActive(r)}
                  style={{ left: `${r.x}%`, top: `${r.y}%`, color: dotColor(r.level) }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  aria-label={r.label}
                >
                  <span className="relative grid place-items-center">
                    <span
                      className={`absolute rounded-full bg-current opacity-30 transition-all ${
                        isActive ? "h-10 w-10" : "h-6 w-6"
                      }`}
                    />
                    <span
                      className={`block rounded-full bg-current transition-all ${
                        isActive ? "h-3 w-3" : "h-2 w-2"
                      } node-pulse`}
                    />
                  </span>
                  <span
                    className={`absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.18em] transition-colors ${
                      isActive ? "text-bone" : "text-bone/55 group-hover:text-bone"
                    }`}
                  >
                    {r.label}
                  </span>
                </button>
              );
            })}

            <div className="absolute left-4 top-4 flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-bone/55">
              <Legend color="var(--gold)" label="Alto" />
              <Legend color="var(--gold-light)" label="Médio" />
              <Legend color="rgba(245,240,225,0.5)" label="Atenção" />
            </div>
          </div>

          {/* Detail panel */}
          <div className="relative glass-card rounded-3xl p-8 md:p-10 overflow-hidden">
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[color:var(--petrol)]/40 blur-3xl" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="eyebrow">Categoria · {active.label}</div>
                <h3 className="font-display text-3xl md:text-4xl text-bone mt-4 leading-tight">
                  {active.risk}
                </h3>
                <div className="hairline my-7" />
                <Block label="Consequência prática" value={active.consequence} />
                <div className="mt-6">
                  <Block label="Como a Fraga estrutura" value={active.structure} accent />
                </div>
                <div className="mt-6">
                  <Block label="Área relacionada" value={active.area} />
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

function Block({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <div className="eyebrow mb-2">{label}</div>
      <p className={accent ? "text-bone text-[15px]" : "text-bone/65 leading-relaxed text-[15px]"}>
        {value}
      </p>
    </div>
  );
}
