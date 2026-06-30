import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck, FileText, Scan } from "lucide-react";
import { Eyebrow } from "./primitives";
import { SplitTextReveal } from "./motion/kinetic";
import { MobileCinematicStepper } from "./motion/MobileCinematicStepper";
import { WorldClassCard } from "./motion/WorldClassCard";
import { RDLFAnimatedLayerButton } from "./motion/RDLFAnimatedLayerButton";


type VaultLayer = {
  id: string;
  number: string;
  title: string;
  eyebrow: string;
  description: string;
  businessImpact: string;
  artifacts: string[];
  accent: string;
};

const vaultLayers: VaultLayer[] = [
  {
    id: "search",
    number: "01",
    title: "Antes do registro, a marca precisa ser lida.",
    eyebrow: "Anterioridade",
    description:
      "A busca de anterioridade identifica sinais de conflito, proximidade e vulnerabilidade antes do protocolo.",
    businessImpact:
      "Evita que a empresa invista crescimento em uma identidade juridicamente frágil.",
    artifacts: ["Busca nominativa", "Marcas semelhantes", "Risco de colidência"],
    accent: "#073534",
  },
  {
    id: "viability",
    number: "02",
    title: "Viabilidade não é promessa. É leitura estratégica.",
    eyebrow: "Parecer",
    description:
      "A marca é analisada em força distintiva, risco de oposição, enquadramento e cenário administrativo.",
    businessImpact:
      "Dá clareza para decidir antes de investir em expansão, identidade e comunicação.",
    artifacts: ["Parecer técnico", "Força distintiva", "Cenário de risco"],
    accent: "#F5F0E1",
  },
  {
    id: "classes",
    number: "03",
    title: "A classe define o território de proteção.",
    eyebrow: "Classe INPI",
    description:
      "A estratégia de classes conecta a proteção jurídica à operação real e aos planos de crescimento da empresa.",
    businessImpact:
      "Reduz brechas e protege a marca conforme o negócio realmente atua.",
    artifacts: ["Classe principal", "Classe futura", "Escopo de atividade"],
    accent: "#0B4644",
  },
  {
    id: "filing",
    number: "04",
    title: "O protocolo é consequência da estratégia.",
    eyebrow: "Depósito",
    description:
      "O pedido é estruturado com dados corretos, escopo coerente e documentação adequada.",
    businessImpact:
      "Transforma o registro em etapa estratégica, não em tarefa operacional simples.",
    artifacts: ["Titularidade", "Especificação", "Comprovante"],
    accent: "#073534",
  },
  {
    id: "defense",
    number: "05",
    title: "Quando há exigência, a resposta precisa ter método.",
    eyebrow: "Exigências e oposições",
    description:
      "Durante o processo, exigências e oposições demandam resposta técnica, timing e posicionamento jurídico.",
    businessImpact:
      "Evita improviso no momento mais sensível do processo administrativo.",
    artifacts: ["Exigência", "Oposição", "Resposta técnica"],
    accent: "#F5F0E1",
  },
  {
    id: "monitoring",
    number: "06",
    title: "Ativo protegido também precisa ser monitorado.",
    eyebrow: "Monitoramento",
    description:
      "A marca segue acompanhada para manter o ativo organizado, visível e juridicamente defensável.",
    businessImpact:
      "Mantém a marca como ativo estratégico durante o crescimento da empresa.",
    artifacts: ["Vigilância", "Acompanhamento INPI", "Ativo intangível"],
    accent: "#0B4644",
  },
];

export function MarkVaultExperience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = vaultLayers[activeIndex];

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % vaultLayers.length);
    }, 3600);
    return () => window.clearInterval(t);
  }, [paused]);

  return (
    <section id="propriedade-intelectual" className="relative py-28 md:py-40 overflow-hidden">
      <style>{`
        @keyframes vaultInspection {
          0% { transform: translateX(-150%); opacity: 0; }
          18% { opacity: 0.9; }
          72% { opacity: 0.9; }
          100% { transform: translateX(210%); opacity: 0; }
        }
        @keyframes vaultDepthA { 0%,100%{transform:translate3d(0,0,0) rotate(-3deg)} 50%{transform:translate3d(0,-18px,0) rotate(2deg)} }
        @keyframes vaultDepthB { 0%,100%{transform:translate3d(0,0,0) rotate(5deg)} 50%{transform:translate3d(0,16px,0) rotate(-2deg)} }
        @keyframes vaultDepthC { 0%,100%{transform:translate3d(0,0,0) rotate(1deg)} 50%{transform:translate3d(0,-10px,0) rotate(-4deg)} }
        @keyframes vaultArchive { 0%,100%{opacity:.04} 50%{opacity:.09} }
      `}</style>

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_30%_20%,#0B3534),#030504))]" />
      <div className="absolute inset-0 -z-10 grain" />
      <span className="pointer-events-none absolute -left-4 bottom-0 select-none font-display italic text-[22vw] leading-[0.8] tracking-tight text-white/[0.025]">
        MARCA
      </span>
      <div className="pointer-events-none absolute right-6 top-10 text-[10px] uppercase tracking-[0.3em] text-bone/30">
        coord · 23°34'S · 46°38'W
      </div>
      <div className="pointer-events-none absolute right-6 bottom-10 text-[10px] uppercase tracking-[0.3em] text-bone/30">
        vault · MK-{String(activeIndex + 1).padStart(3, "0")}
      </div>

      <div className="container-rdlf">
        {/* Mobile / tablet — cinematic stepper */}
        <div className="rdlf-mobile-experience">
          <div className="mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-bone/55">
            <span className="h-px w-8 bg-[color:var(--gold)]/40" />
            <span>marca como ativo</span>
          </div>
          <MobileCinematicStepper
            items={vaultLayers}
            activeIndex={activeIndex}
            onChange={setActiveIndex}
            renderItem={(item) => (
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-[color:var(--gold-light)]">
                    {item.eyebrow}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.24em] text-bone/55">
                    {item.number} / 06
                  </span>
                </div>
                <h3 className="mt-4 font-display text-[clamp(1.5rem,5.5vw,2.2rem)] leading-[1.1] text-bone">
                  {item.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-bone/70">
                  {item.description}
                </p>
                <div className="hairline my-6" />
                <div>
                  <div className="eyebrow mb-1.5">Impacto no negócio</div>
                  <p className="text-[14px] leading-relaxed text-bone/70">{item.businessImpact}</p>
                </div>
                <div className="mt-5">
                  <div className="eyebrow mb-2">Artefatos jurídicos</div>
                  <ul className="space-y-1.5">
                    {item.artifacts.map((a) => (
                      <li key={a} className="flex items-center justify-between text-[13px] text-bone/80">
                        <span>{a}</span>
                        <span className="h-px w-8 bg-[color:var(--gold)]/40" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          />
        </div>

        <div className="rdlf-desktop-only grid gap-12 lg:grid-cols-[1fr_1.1fr] items-start">
          {/* LEFT — copy */}
          <div>
            <Eyebrow>Propriedade Intelectual</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2rem,5vw,4.6rem)] leading-[0.98] tracking-[-0.03em] text-bone">
              <SplitTextReveal
                text="A marca não é registrada. Ela é arquitetada."
                highlight={["arquitetada."]}
              />
            </h2>
            <p className="mt-6 max-w-xl text-bone/65 leading-relaxed">
              A RDLF transforma marca em ativo estratégico: leitura de risco,
              viabilidade, classe, protocolo, defesa administrativa e monitoramento
              contínuo dentro de um único cofre jurídico.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["Anterioridade", "Classe INPI", "Ativo intangível"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-bone/70"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8">
              <RDLFAnimatedLayerButton href="#contato">
                Proteger minha marca
              </RDLFAnimatedLayerButton>
            </div>

            <div className="mt-10 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-bone/45">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--gold)] node-pulse" />
              {paused ? "Vault pausado · controle manual" : "Cofre em inspeção automática"}
            </div>
          </div>

          {/* RIGHT — the vault */}
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* The vault stage */}
            <WorldClassCard radius="rounded-3xl" intensity="medium">
            <div className="relative aspect-[4/5] md:aspect-[5/6] rounded-3xl border border-white/10 bg-gradient-to-b from-ink-soft/60 to-ink/80 overflow-hidden">

              {/* Vertical archive lines */}
              <div
                className="absolute inset-0 opacity-50"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, oklch(1 0 0 / 0.04) 0 1px, transparent 1px 28px)",
                }}
              />
              {/* Gold glow */}
              <div className="absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(ellipse_at_center,oklch(0.30_0.045_175/0.18),transparent_70%)]" />
              {/* Inspection light */}
              <div
                key={`scan-${active.id}`}
                className="absolute top-0 bottom-0 w-1/3 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, oklch(0.96 0.01 85 / 0.18) 50%, transparent)",
                  animation: "vaultInspection 3.4s ease-in-out infinite",
                }}
              />

              {/* Floating documents */}
              <div
                className="absolute left-[8%] top-[10%] hidden md:block h-28 w-44 rounded-md border border-white/10 bg-white/[0.04] backdrop-blur-sm p-3"
                style={{ animation: "vaultDepthA 9s ease-in-out infinite" }}
              >
                <FileText className="h-3 w-3 text-[color:var(--gold-light)]" />
                <div className="mt-2 h-1 w-3/4 bg-white/15 rounded" />
                <div className="mt-1.5 h-1 w-1/2 bg-white/10 rounded" />
                <div className="mt-1.5 h-1 w-2/3 bg-white/10 rounded" />
                <div className="mt-3 text-[8px] uppercase tracking-[0.2em] text-bone/40">
                  parecer · vw-{active.number}
                </div>
              </div>

              <div
                className="absolute right-[6%] top-[18%] hidden md:block h-24 w-36 rounded-md border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/[0.06] backdrop-blur-sm p-3"
                style={{ animation: "vaultDepthB 11s ease-in-out infinite" }}
              >
                <ShieldCheck className="h-3 w-3 text-[color:var(--gold-light)]" />
                <div className="mt-2 h-1 w-2/3 bg-white/15 rounded" />
                <div className="mt-1.5 h-1 w-1/2 bg-white/10 rounded" />
                <div className="mt-2 text-[8px] uppercase tracking-[0.2em] text-bone/40">
                  classe inpi
                </div>
              </div>

              <div
                className="absolute right-[12%] bottom-[14%] hidden md:block h-20 w-32 rounded-md border border-white/10 bg-white/[0.03] backdrop-blur-sm p-3"
                style={{ animation: "vaultDepthC 13s ease-in-out infinite" }}
              >
                <Scan className="h-3 w-3 text-[color:var(--gold-light)]" />
                <div className="mt-2 h-1 w-3/4 bg-white/12 rounded" />
                <div className="mt-1.5 h-1 w-1/2 bg-white/8 rounded" />
              </div>

              {/* Central vault core */}
              <div className="absolute inset-0 grid place-items-center p-6">
                <div className="relative w-full max-w-[420px] aspect-square">
                  {/* concentric protection layers */}
                  {[0, 1, 2].map((ring) => (
                    <div
                      key={ring}
                      className="absolute inset-0 rounded-full border border-white/8"
                      style={{
                        transform: `scale(${1 - ring * 0.18})`,
                        borderColor:
                          activeIndex % 3 === ring
                            ? "oklch(0.30 0.045 175 / 0.5)"
                            : "oklch(1 0 0 / 0.06)",
                        transition: "border-color 800ms",
                      }}
                    />
                  ))}
                  {/* Vault door */}
                  <div className="absolute inset-[22%] rounded-full border border-[color:var(--gold)]/40 bg-gradient-to-br from-white/[0.06] to-transparent backdrop-blur-md grid place-items-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={active.id}
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center px-4"
                      >
                        <div className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--gold-light)]">
                          {active.eyebrow}
                        </div>
                        <div className="mt-2 font-display text-3xl md:text-4xl text-bone">
                          {active.number}
                        </div>
                        <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-bone/50">
                          camada ativa
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  {/* tick marks */}
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute left-1/2 top-1/2 origin-left h-px w-2 bg-white/10"
                      style={{
                        transform: `rotate(${i * 15}deg) translateX(calc(50% + 4px))`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Bottom HUD */}
              <div className="absolute inset-x-0 bottom-0 p-5 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-bone/50">
                <span>mark vault</span>
                <span>proteção em camadas</span>
              </div>
            </div>
            </WorldClassCard>

          </div>

          {/* Detail card — full width, elongated horizontally */}
          <WorldClassCard radius="rounded-3xl" intensity="medium" alwaysOnBorder className="lg:col-span-2">
          <div className="glass-card rounded-3xl p-8 md:p-12 lg:p-14 relative overflow-hidden">
            <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-[color:var(--petrol)]/40 blur-3xl" />

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative grid gap-10 lg:gap-14 lg:grid-cols-[1.4fr_1fr_1fr] lg:items-start"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="eyebrow">{active.eyebrow}</div>
                    <div className="text-[10px] uppercase tracking-[0.24em] text-bone/50">
                      {active.number} / 06
                    </div>
                  </div>
                  <h3 className="font-display text-[clamp(1.75rem,2.6vw,2.75rem)] text-bone mt-5 leading-[1.05] tracking-[-0.01em]">
                    {active.title}
                  </h3>
                  <p className="text-bone/70 mt-5 text-[16px] leading-[1.65] max-w-[42ch]">
                    {active.description}
                  </p>
                </div>

                <div className="lg:border-l lg:border-white/10 lg:pl-10">
                  <div className="eyebrow mb-3">Impacto no negócio</div>
                  <p className="text-bone/75 text-[15px] leading-[1.7]">
                    {active.businessImpact}
                  </p>
                </div>

                <div className="lg:border-l lg:border-white/10 lg:pl-10">
                  <div className="eyebrow mb-4">Artefatos jurídicos</div>
                  <ul className="space-y-3">
                    {active.artifacts.map((a) => (
                      <li
                        key={a}
                        className="flex items-center justify-between gap-4 text-[14px] text-bone/85"
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="h-1 w-1 rounded-full bg-[color:var(--gold)]" />
                          {a}
                        </span>
                        <span className="h-px flex-1 bg-gradient-to-r from-[color:var(--gold)]/30 to-transparent" />
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>

            {!paused && (
              <div className="mt-6 h-px w-full bg-white/5 overflow-hidden">
                <motion.div
                  key={`p-${active.id}`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3.6, ease: "linear" }}
                  className="h-px bg-[color:var(--gold)]"
                />
              </div>
            )}
          </div>
          </WorldClassCard>



          {/* Pipeline — full width below both columns */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <div className="eyebrow">Pipeline proprietário</div>
              <span className="text-[10px] uppercase tracking-[0.22em] text-bone/45">
                auto-flow
              </span>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {vaultLayers.map((layer, i) => {
                const selected = i === activeIndex;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={`relative h-20 overflow-hidden rounded-xl border px-4 py-3 text-left transition ${
                      selected
                        ? "border-[color:var(--gold)]/70 bg-[color:var(--gold)]/15"
                        : "border-white/10 bg-white/[0.035] hover:border-[color:var(--gold)]/40"
                    }`}
                  >
                    <span
                      className={`block text-[10px] uppercase tracking-[0.22em] ${
                        selected ? "text-[color:var(--gold-light)]" : "text-bone/50"
                      }`}
                    >
                      {layer.number}
                    </span>
                    <span
                      className={`block text-[12px] mt-1.5 leading-tight ${
                        selected ? "text-bone" : "text-bone/65"
                      }`}
                    >
                      {layer.eyebrow}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
