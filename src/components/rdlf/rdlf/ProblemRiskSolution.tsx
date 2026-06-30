import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Eyebrow } from "./primitives";
import { ScrollReveal, SplitTextReveal } from "./motion/kinetic";

const stages = [
  {
    n: "01",
    label: "Improviso",
    title: "Decisão sem camada jurídica.",
    body: "A empresa cresce e cada decisão importante passa por planilha, conversa e bom senso — sem registro defensável.",
    side: "right",
  },
  {
    n: "02",
    label: "Risco invisível",
    title: "Passivo que ninguém vê.",
    body: "Contratos genéricos, marca exposta, sócios sem acordo. O risco não aparece — até virar custo, processo ou perda de ativo.",
    side: "left",
  },
  {
    n: "03",
    label: "Estrutura jurídica",
    title: "Base que sustenta a operação.",
    body: "Contratos modelados sobre o fluxo real, marca registrada e monitorada, governança escrita, política mínima implementada.",
    side: "right",
    big: true,
  },
  {
    n: "04",
    label: "Crescimento seguro",
    title: "Decisão rápida, defensável e replicável.",
    body: "A empresa decide mais rápido porque a base jurídica já antecipou o problema. Escala sem acumular passivo.",
    side: "left",
  },
];

export function ProblemRiskSolution() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 30%"] });
  const lineY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative py-32 md:py-44 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#050706),#082322)_50%,#050706))]" />
      <span className="pointer-events-none absolute -left-10 top-32 font-display italic text-[22vw] leading-none text-white/[0.022] select-none">
        risco
      </span>

      <div className="container-rdlf">
        <div className="grid gap-10 lg:grid-cols-12 mb-20">
          <div className="lg:col-span-9">
            <ScrollReveal>
              <Eyebrow>Improviso → Risco → Estrutura → Crescimento</Eyebrow>
            </ScrollReveal>
            <h2 className="font-display text-[clamp(2.2rem,5.4vw,5rem)] leading-[0.98] tracking-[-0.03em] text-bone mt-6">
              <SplitTextReveal
                text="O problema não é o processo. É a ausência de estrutura."
                highlight={["estrutura."]}
              />
            </h2>
          </div>
        </div>

        {/* diagonal sequence */}
        <div className="relative">
          {/* vertical progress line — desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 hidden md:block w-px bg-white/8" />
          <motion.div
            style={{ height: lineY }}
            className="absolute left-1/2 top-0 hidden md:block w-px bg-gradient-to-b from-[color:var(--gold)] to-transparent"
          />

          <div className="space-y-20 md:space-y-32">
            {stages.map((s, i) => (
              <Stage key={s.n} stage={s} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stage({ stage, index }: { stage: (typeof stages)[number]; index: number }) {
  const isRight = stage.side === "right";
  return (
    <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-center relative">
      {/* center dot on the timeline */}
      <span className="absolute left-1/2 -translate-x-1/2 hidden md:block">
        <span className="block h-3 w-3 rounded-full bg-[color:var(--gold)] node-pulse" />
        <span className="absolute inset-0 -m-2 rounded-full border border-[color:var(--gold)]/30" />
      </span>

      <motion.div
        initial={{ opacity: 0, x: isRight ? -50 : 50, filter: "blur(12px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 * index }}
        className={`${isRight ? "md:order-1" : "md:order-2 md:text-right md:items-end"} flex flex-col gap-3`}
      >
        <div className="flex items-baseline gap-4">
          <span className="font-display text-6xl md:text-7xl text-[color:var(--gold-light)]/45">
            {stage.n}
          </span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-bone/45">
            {stage.label}
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 + 0.05 * index }}
        className={`${isRight ? "md:order-2" : "md:order-1"} ${
          stage.big ? "md:scale-[1.04] origin-left" : ""
        }`}
      >
        <div
          className={`relative overflow-hidden rounded-3xl border p-8 md:p-10 transition-colors ${
            stage.big
              ? "border-[color:var(--gold)]/30 bg-[color:var(--petrol)]/30"
              : "border-white/10 bg-ink-soft/60"
          }`}
        >
          {stage.big && (
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[color:var(--gold)]/15 blur-3xl" />
          )}
          <h3 className="relative font-display text-2xl md:text-3xl text-bone leading-tight">
            {stage.title}
          </h3>
          <p className="relative text-bone/65 mt-4 leading-relaxed text-[15px] max-w-md">
            {stage.body}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
