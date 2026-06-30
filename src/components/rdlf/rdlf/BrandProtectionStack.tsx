import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { Eyebrow } from "./primitives";
import { SplitTextReveal } from "./motion/kinetic";
import { MagneticButton } from "./motion/MagneticButton";

const protectionSteps = [
  "Anterioridade",
  "Viabilidade",
  "Classe INPI",
  "Protocolo",
  "Exigência",
  "Oposição",
  "Monitoramento",
];

const bullets = [
  "Análise antes do protocolo",
  "Estratégia de classe e viabilidade",
  "Acompanhamento administrativo no INPI",
];

const dossier = [
  "Busca de anterioridade",
  "Análise de viabilidade",
  "Estratégia de classes",
  "Resposta a exigências",
  "Atuação em oposições",
];

export function BrandProtectionStack() {
  return (
    <section id="pi" className="relative overflow-hidden py-32">
      <div className="absolute inset-0 -z-10 grain" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-10 text-center font-display italic tracking-[-0.06em] text-bone/[0.035] select-none"
        style={{ fontSize: "34vw", lineHeight: 0.85 }}
      >
        MARCA
      </div>

      <div className="container-rdlf relative grid gap-16 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        {/* LEFT — editorial */}
        <div>
          <Eyebrow>Propriedade Intelectual</Eyebrow>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-[-0.03em] text-bone max-w-xl">
            <SplitTextReveal
              text="Marca tratada como ativo estratégico da empresa."
              highlight={["ativo estratégico"]}
            />
          </h2>
          <p className="mt-6 max-w-lg text-bone/65 leading-relaxed">
            Antes de registrar é preciso entender viabilidade, anterioridade, classe, risco e
            estratégia. A marca não é um nome — é um ativo intangível com peso patrimonial.
          </p>

          <ul className="mt-8 space-y-3">
            {bullets.map((b, i) => (
              <motion.li
                key={b}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-3 text-[15px] text-bone/80"
              >
                <span className="mt-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-[color:var(--gold)]/50 bg-[color:var(--gold)]/10">
                  <Check className="h-3 w-3 text-[color:var(--gold-light)]" />
                </span>
                {b}
              </motion.li>
            ))}
          </ul>

          <div className="mt-10">
            <MagneticButton as="a" href="https://wa.me/5527988496428" className="bg-bone/95 text-ink hover:bg-[color:var(--gold-light)] hover:text-ink border-transparent">
              Analisar proteção de marca
              <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
          </div>
        </div>

        {/* RIGHT — Brand Radar */}
        <div className="relative aspect-square w-full max-w-[600px] mx-auto">
          {/* radar rings */}
          {[1, 0.78, 0.56, 0.34].map((s, i) => (
            <div
              key={i}
              className="absolute inset-0 m-auto rounded-full border border-white/10"
              style={{ width: `${s * 100}%`, height: `${s * 100}%`, top: 0, bottom: 0, left: 0, right: 0 }}
            />
          ))}
          {/* sweep */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, color-mix(in oklab, var(--gold) 30%, transparent) 40deg, transparent 80deg)",
              maskImage: "radial-gradient(circle, black 0%, black 50%, transparent 51%)",
              WebkitMaskImage: "radial-gradient(circle, black 0%, black 50%, transparent 51%)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          />
          {/* crosshair */}
          <div className="absolute inset-x-0 top-1/2 h-px bg-white/8" />
          <div className="absolute inset-y-0 left-1/2 w-px bg-white/8" />

          {/* center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="font-display text-2xl text-bone">Brand</div>
            <div className="font-display italic text-[color:var(--gold-light)]">Radar</div>
          </div>

          {/* orbiting steps */}
          {protectionSteps.map((step, i) => {
            const angle = (i / protectionSteps.length) * Math.PI * 2 - Math.PI / 2;
            const r = 44; // % from center
            const x = 50 + Math.cos(angle) * r;
            const y = 50 + Math.sin(angle) * r;
            return (
              <motion.div
                key={step}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.06, duration: 0.6 }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <div className="flex items-center gap-2 rounded-full border border-white/15 bg-ink/80 px-3 py-1.5 text-[10px] tracking-[0.18em] uppercase text-bone/80 backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--gold)]" />
                  {step}
                </div>
              </motion.div>
            );
          })}

          {/* dossiê card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="absolute -bottom-6 -right-2 w-[260px] rounded-2xl border border-white/12 bg-[oklch(0.13_0.005_80)]/95 p-5 backdrop-blur-xl shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div className="font-display text-sm text-bone">Dossiê INPI</div>
              <span className="text-[9px] tracking-[0.22em] uppercase text-[color:var(--gold-light)]">
                Estratégico
              </span>
            </div>
            <ul className="mt-4 space-y-2">
              {dossier.map((d) => (
                <li key={d} className="flex items-center justify-between text-[11px] text-bone/70">
                  <span>{d}</span>
                  <span className="h-1 w-1 rounded-full bg-[color:var(--gold)]" />
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
