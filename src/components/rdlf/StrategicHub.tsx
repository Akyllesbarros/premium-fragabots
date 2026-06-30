import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
  type MotionValue,
} from "framer-motion";
import { Eyebrow } from "./primitives";
import { SplitTextReveal } from "./motion/kinetic";
import { ArrowUpRight, Plus, Minus } from "lucide-react";

type Area = {
  id: string;
  title: string;
  short: string;
  body: string;
  deliverables: string[];
  risk: string;
  gain: string;
  tag: string;
};

const areas: Area[] = [
  {
    id: "01",
    title: "Propriedade Intelectual",
    short: "Marca como ativo",
    body: "Marca, ativos intangíveis e portfólio de IP tratados como base patrimonial da operação — protegidos com técnica e estratégia, não com protocolo de cartório.",
    deliverables: ["Registro INPI estratégico", "Monitoramento contínuo", "Defesa em oposições"],
    risk: "Marca vulnerável a uso indevido e perda de exclusividade.",
    gain: "Ativo intangível protegido e valorizado no balanço empresarial.",
    tag: "Patrimônio",
  },
  {
    id: "02",
    title: "Contratos Empresariais",
    short: "Instrumentos sob medida",
    body: "Instrumentos modelados sobre o fluxo financeiro real da operação — não sobre templates genéricos copiados.",
    deliverables: ["Redação crítica", "Revisão estratégica", "Negociação assistida"],
    risk: "Contratos genéricos que não suportam o crescimento da empresa.",
    gain: "Segurança jurídica em cada relação comercial relevante.",
    tag: "Operação",
  },
  {
    id: "03",
    title: "Consultoria Preventiva",
    short: "Camada jurídica viva",
    body: "Presença jurídica nas decisões antes do problema aparecer — não depois que o conflito está instaurado.",
    deliverables: ["Pareceres ágeis", "Hotline jurídica", "Acompanhamento mensal"],
    risk: "Decisões tomadas sem leitura jurídica do impacto real.",
    gain: "Decisões empresariais com lastro técnico contínuo.",
    tag: "Prevenção",
  },
  {
    id: "04",
    title: "Estruturação Jurídica",
    short: "Governança escalável",
    body: "Societário, governança e desenho de operação que escalam com auditabilidade e clareza de papéis.",
    deliverables: ["Acordo de sócios", "Reorganização", "Governança"],
    risk: "Conflitos societários e estrutura que limita captação.",
    gain: "Estrutura preparada para crescer, captar e profissionalizar.",
    tag: "Governança",
  },
  {
    id: "05",
    title: "Compliance & ESG documental",
    short: "Trilhas de evidência",
    body: "Políticas internas mínimas e trilhas de evidência que suportam crescimento real perante clientes e investidores.",
    deliverables: ["LGPD aplicada", "Políticas internas", "Trilhas documentais"],
    risk: "Exposição regulatória e perda de contratos por falta de compliance.",
    gain: "Credibilidade institucional comprovável por documento.",
    tag: "Conformidade",
  },
  {
    id: "06",
    title: "Resolução Extrajudicial",
    short: "Composição antes do litígio",
    body: "Composição estruturada antes da judicialização — preserva tempo, capital e reputação da empresa.",
    deliverables: ["Notificações", "Mediação privada", "Acordos executáveis"],
    risk: "Litígios longos que drenam caixa, foco e reputação.",
    gain: "Conflitos resolvidos antes de virarem processo público.",
    tag: "Resolução",
  },
];

export function StrategicHub() {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <section id="hub" className="relative overflow-hidden py-28 md:py-36">
      {/* ambient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,oklch(0.2_0.04_180/0.32),oklch(0.12_0.005_80))]" />
      <div className="absolute inset-0 -z-10 grain" />
      <div
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 font-display italic text-[38vw] leading-none text-white/[0.02] select-none"
      >
        LOS
      </span>

      <div className="container-rdlf relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <Eyebrow>Legal Operating System</Eyebrow>
          <h2 className="font-display text-[clamp(2.2rem,4.6vw,4.2rem)] leading-[0.98] tracking-[-0.03em] text-bone mt-5">
            <SplitTextReveal
              text="Um hub jurídico estratégico, não um escritório."
              highlight={["estratégico,"]}
            />
          </h2>
          <p className="mt-6 text-bone/65 max-w-xl text-[15px] leading-relaxed">
            Seis camadas conectadas que operam como um sistema vivo da sua empresa —
            integradas a uma base jurídica sólida.
          </p>
        </div>

        {isMobile ? (
          <MobileAccordion areas={areas} />
        ) : (
          <DesktopScene areas={areas} active={active} setActive={setActive} />
        )}
      </div>
    </section>
  );
}

/* -------------------- DESKTOP -------------------- */

function DesktopScene({
  areas,
  active,
  setActive,
}: {
  areas: Area[];
  active: number;
  setActive: (i: number) => void;
}) {
  const current = areas[active];

  return (
    <div className="grid grid-cols-[1.05fr_0.95fr] gap-10 xl:gap-16 items-center">
      {/* LEFT — orbital system */}
      <div className="relative aspect-square w-full max-w-[720px] mx-auto">
        <OrbitalSystem areas={areas} active={active} setActive={setActive} />
      </div>

      {/* RIGHT — active panel */}
      <div className="relative min-h-[520px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card rounded-3xl p-8 md:p-10 relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[color:var(--gold)]/15 blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="flex items-start justify-between">
                <span className="font-display italic text-7xl text-[color:var(--gold-light)]/45 leading-none">
                  {current.id}
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-bone/55 border border-white/10 rounded-full px-3 py-1.5">
                  {current.tag}
                </span>
              </div>
              <h3 className="font-display text-3xl md:text-4xl text-bone mt-3 leading-[1.05]">
                {current.title}
              </h3>
              <p className="text-bone/65 mt-4 leading-relaxed text-[15px] max-w-md">
                {current.body}
              </p>

              <div className="hairline my-7" />

              <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                <div>
                  <div className="text-[10px] tracking-[0.22em] uppercase text-[color:var(--gold-light)]/80 mb-3">
                    Entregáveis
                  </div>
                  <ul className="space-y-2">
                    {current.deliverables.map((d, i) => (
                      <motion.li
                        key={d}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.07 }}
                        className="flex items-center gap-3 text-sm text-bone/85"
                      >
                        <span className="h-1 w-3 bg-[color:var(--gold)] flex-none" />
                        {d}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-5">
                  <div>
                    <div className="text-[10px] tracking-[0.22em] uppercase text-bone/50 mb-2">
                      Risco que resolve
                    </div>
                    <p className="text-[13px] text-bone/75 leading-relaxed">{current.risk}</p>
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.22em] uppercase text-[color:var(--gold-light)]/80 mb-2">
                      Ganho empresarial
                    </div>
                    <p className="text-[13px] text-bone/85 leading-relaxed">{current.gain}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-white/8 pt-5">
                <div className="text-[10px] tracking-[0.25em] uppercase text-bone/40">
                  {String(active + 1).padStart(2, "0")} / {String(areas.length).padStart(2, "0")}
                </div>
                <a
                  href="#contato"
                  className="inline-flex items-center gap-2 text-xs tracking-wider text-bone/85 hover:text-[color:var(--gold-light)] transition-colors"
                >
                  Avaliar esta camada
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function OrbitalSystem({
  areas,
  active,
  setActive,
}: {
  areas: Area[];
  active: number;
  setActive: (i: number) => void;
}) {
  const R = 42; // radius for satellites (% of svg)
  const R_LABEL = R + 9;
  const cx = 50;
  const cy = 50;
  const N = areas.length;

  // Continuous orbit rotation (degrees). The whole satellite ring rotates,
  // and each label counter-rotates by the same amount so text stays upright.
  const rotation = useMotionValue(0);
  useEffect(() => {
    const controls = animate(rotation, 360, {
      duration: 60,
      ease: "linear",
      repeat: Infinity,
    });
    return () => controls.stop();
  }, [rotation]);

  const points = areas.map((a, i) => {
    const angle = (i / N) * Math.PI * 2 - Math.PI / 2;
    return {
      ...a,
      i,
      angleDeg: (i / N) * 360,
      x: cx + Math.cos(angle) * R,
      y: cy + Math.sin(angle) * R,
      labelX: cx + Math.cos(angle) * R_LABEL,
      labelY: cy + Math.sin(angle) * R_LABEL,
    };
  });

  // Arc that highlights active node + its two neighbors
  const activePoint = points[active];
  const arcStart = points[(active - 1 + N) % N];
  const arcEnd = points[(active + 1) % N];
  const arcPath = `M ${arcStart.x} ${arcStart.y} A ${R} ${R} 0 0 1 ${activePoint.x} ${activePoint.y} A ${R} ${R} 0 0 1 ${arcEnd.x} ${arcEnd.y}`;

  // Tick marks around the outer ring
  const ticks = Array.from({ length: 72 }, (_, i) => i);
  // Drifting particles on inner ring
  const particles = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className="relative h-full w-full select-none">
      {/* ambient depth */}
      <div className="absolute inset-1/3 rounded-full bg-[color:var(--gold)]/10 blur-3xl" />
      <div className="absolute inset-[42%] rounded-full bg-[color:var(--gold-light)]/15 blur-2xl" />

      {/* OUTER decorative ring with tick marks (slow CCW) */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <circle
            cx={cx}
            cy={cy}
            r={48}
            fill="none"
            stroke="oklch(1 0 0 / 0.06)"
            strokeWidth={0.15}
          />
          {ticks.map((t) => {
            const a = (t / ticks.length) * Math.PI * 2;
            const isMajor = t % 6 === 0;
            const inner = isMajor ? 46.4 : 47.2;
            const x1 = cx + Math.cos(a) * inner;
            const y1 = cy + Math.sin(a) * inner;
            const x2 = cx + Math.cos(a) * 48;
            const y2 = cy + Math.sin(a) * 48;
            return (
              <line
                key={t}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isMajor ? "oklch(0.94 0.012 85 / 0.55)" : "oklch(1 0 0 / 0.18)"}
                strokeWidth={isMajor ? 0.25 : 0.12}
              />
            );
          })}
        </svg>
      </motion.div>

      {/* MID dashed ring (CW) */}
      <motion.div
        className="absolute inset-[14%] rounded-full border border-dashed border-[color:var(--gold)]/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      />

      {/* INNER ring with floating particles (CCW) */}
      <motion.div
        className="absolute inset-[26%] rounded-full border border-white/8"
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        {particles.map((p) => {
          const a = (p / particles.length) * 360;
          return (
            <span
              key={p}
              className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-[color:var(--gold-light)]/70 shadow-[0_0_8px_rgba(216,192,138,0.8)]"
              style={{
                transform: `rotate(${a}deg) translateY(calc(-50% - 0px)) translateX(-50%)`,
                transformOrigin: "0 0",
                marginTop: "0",
                marginLeft: "0",
                top: `calc(50% + ${Math.sin((a * Math.PI) / 180) * 0}px)`,
              }}
            />
          );
        })}
      </motion.div>

      {/* Radar sweep — conic gradient that rotates */}
      <motion.div
        className="absolute inset-[10%] rounded-full pointer-events-none opacity-60"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, oklch(0.94 0.012 85 / 0.18) 18deg, transparent 36deg, transparent 360deg)",
          maskImage: "radial-gradient(circle, black 50%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(circle, black 50%, transparent 75%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Connector lines + active arc (static, in svg-space) */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full pointer-events-none">
        <defs>
          <radialGradient id="rdlf-core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.94 0.012 85 / 0.35)" />
            <stop offset="100%" stopColor="oklch(0.94 0.012 85 / 0)" />
          </radialGradient>
        </defs>
        <circle cx={cx} cy={cy} r={20} fill="url(#rdlf-core-glow)" />
        {points.map((p) => {
          const isActive = p.i === active;
          // Live positions follow the ring rotation
          const rad = ((p.angleDeg + rotation.get()) * Math.PI) / 180 - Math.PI / 2;
          const px = cx + Math.cos(rad) * R;
          const py = cy + Math.sin(rad) * R;
          return (
            <motion.line
              key={`line-${p.id}`}
              x1={cx}
              y1={cy}
              x2={px}
              y2={py}
              stroke={isActive ? "oklch(0.94 0.012 85)" : "oklch(1 0 0 / 0.12)"}
              strokeWidth={isActive ? 0.35 : 0.15}
              strokeDasharray={isActive ? "0" : "0.6 0.6"}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + p.i * 0.08, duration: 0.9 }}
              style={{ transition: "stroke 0.5s ease, stroke-width 0.5s ease" }}
            />
          );
        })}
        <motion.path
          d={arcPath}
          fill="none"
          stroke="oklch(0.94 0.012 85 / 0.55)"
          strokeWidth={0.45}
          strokeLinecap="round"
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{ filter: "drop-shadow(0 0 1px oklch(0.94 0.012 85))" }}
        />
      </svg>

      {/* CENTER node */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-32 w-32 rounded-full bg-ink/85 backdrop-blur-xl border border-[color:var(--gold)]/45 grid place-items-center shadow-[0_0_80px_rgba(7,53,52,0.28)]"
        >
          <div className="text-center px-3">
            <div className="text-[9px] tracking-[0.28em] uppercase text-[color:var(--gold-light)]/85">
              Núcleo
            </div>
            <div className="font-display italic text-[1.35rem] text-bone leading-[1.05] mt-1">
              Base
              <br />
              jurídica sólida
            </div>
          </div>
          {/* triple pulse rings */}
          <span className="absolute inset-0 rounded-full border border-[color:var(--gold)]/35 animate-[rdlf-pulse-soft_3.5s_ease-in-out_infinite]" />
          <motion.span
            className="absolute -inset-2 rounded-full border border-[color:var(--gold)]/20"
            animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            className="absolute -inset-5 rounded-full border border-[color:var(--gold)]/10"
            animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0, 0.35] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          />
        </motion.div>
      </div>

      {/* ORBITING satellites + labels (rotate together, labels counter-rotate) */}
      <motion.div className="absolute inset-0" style={{ rotate: rotation }}>
        {points.map((p) => (
          <Satellite
            key={p.id}
            point={p}
            isActive={p.i === active}
            onActivate={() => setActive(p.i)}
            rotation={rotation}
          />
        ))}
      </motion.div>

      {/* Floating ambient badges (depth) */}
      <motion.div
        className="absolute top-[8%] right-[6%] text-[9px] tracking-[0.25em] uppercase text-bone/35 border border-white/10 rounded-full px-2 py-1 backdrop-blur-sm bg-white/[0.02]"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        Sistema vivo
      </motion.div>
      <motion.div
        className="absolute bottom-[6%] left-[4%] text-[9px] tracking-[0.25em] uppercase text-bone/35 border border-white/10 rounded-full px-2 py-1 backdrop-blur-sm bg-white/[0.02]"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        6 camadas integradas
      </motion.div>
    </div>
  );
}

/* -------------------- SATELLITE -------------------- */

type SatPoint = Area & { i: number; x: number; y: number; angleDeg: number };

function Satellite({
  point,
  isActive,
  onActivate,
  rotation,
}: {
  point: SatPoint;
  isActive: boolean;
  onActivate: () => void;
  rotation: MotionValue<number>;
}) {
  const counter = useTransform(rotation, (r) => -r);
  return (
    <div
      className="absolute"
      style={{
        left: `${point.x}%`,
        top: `${point.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <motion.div style={{ rotate: counter }}>
        <motion.button
          onClick={onActivate}
          onMouseEnter={onActivate}
          whileHover={{ scale: 1.15 }}
          className="relative grid place-items-center group"
          aria-label={point.title}
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + point.i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {isActive && (
            <motion.span
              layoutId="rdlf-node-halo"
              className="absolute h-9 w-9 rounded-full bg-[color:var(--gold)]/20 blur-md"
            />
          )}
          <span
            className={`relative block h-3 w-3 rounded-full transition-all duration-500 ${
              isActive
                ? "bg-[color:var(--gold-light)] shadow-[0_0_24px_rgba(216,192,138,0.9)] scale-150"
                : "bg-bone/45 group-hover:bg-[color:var(--gold)] group-hover:scale-125"
            }`}
          />
          {isActive && <span className="absolute h-1 w-1 rounded-full bg-ink" />}
          {!isActive && (
            <span className="absolute h-3 w-3 rounded-full bg-[color:var(--gold)]/40 animate-ping" />
          )}
          <span
            className={`absolute -top-4 left-1/2 -translate-x-1/2 text-[8px] tracking-[0.2em] font-display italic transition-colors ${
              isActive ? "text-[color:var(--gold-light)]" : "text-bone/35"
            }`}
          >
            {point.id}
          </span>
        </motion.button>
        <div
          className={`absolute left-1/2 top-4 -translate-x-1/2 mt-2 pointer-events-none whitespace-nowrap transition-colors duration-500 ${
            isActive ? "text-[color:var(--gold-light)]" : "text-bone/55"
          }`}
        >
          <div className="font-display text-[12px] leading-none tracking-tight text-center">
            {point.title}
          </div>
        </div>
      </motion.div>
    </div>
  );
}


function MobileAccordion({ areas }: { areas: Area[] }) {
  const [open, setOpen] = useState<string | null>(areas[0].id);
  return (
    <div className="space-y-3">
      {/* nucleus card */}
      <div className="glass-card rounded-2xl p-6 mb-6 text-center">
        <div className="text-[10px] tracking-[0.25em] uppercase text-bone/55">Núcleo</div>
        <div className="font-display italic text-2xl text-bone mt-1">Base jurídica sólida</div>
        <div className="hairline my-4" />
        <div className="text-xs text-bone/65">
          Seis camadas integradas operando como um sistema vivo.
        </div>
      </div>

      {areas.map((a) => {
        const isOpen = open === a.id;
        return (
          <div
            key={a.id}
            className="rounded-2xl border border-white/10 bg-white/[0.025] overflow-hidden"
          >
            <button
              onClick={() => setOpen(isOpen ? null : a.id)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-display text-sm text-[color:var(--gold-light)]">{a.id}</span>
                <span className="font-display text-lg text-bone">{a.title}</span>
              </div>
              {isOpen ? (
                <Minus className="h-4 w-4 text-bone/60" />
              ) : (
                <Plus className="h-4 w-4 text-bone/60" />
              )}
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="px-5 pb-5">
                    <p className="text-sm text-bone/70 leading-relaxed">{a.body}</p>
                    <ul className="mt-4 space-y-2">
                      {a.deliverables.map((d) => (
                        <li key={d} className="flex items-center gap-3 text-xs text-bone/80">
                          <span className="h-1 w-3 bg-[color:var(--gold)] flex-none" />
                          {d}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 grid grid-cols-1 gap-3 text-xs">
                      <div className="rounded-lg border border-white/8 p-3">
                        <div className="text-[9px] tracking-[0.2em] uppercase text-bone/50 mb-1">
                          Risco
                        </div>
                        <div className="text-bone/75">{a.risk}</div>
                      </div>
                      <div className="rounded-lg border border-[color:var(--gold)]/25 p-3">
                        <div className="text-[9px] tracking-[0.2em] uppercase text-[color:var(--gold-light)]/85 mb-1">
                          Ganho
                        </div>
                        <div className="text-bone/85">{a.gain}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
