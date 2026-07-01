import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "./primitives";
import { ScrollReveal, SplitTextReveal } from "./motion/kinetic";
import { ShinyButton } from "./ShinyButton";

const stages = [
  {
    n: "01",
    label: "Antes de abrir",
    title: "Decisões importantes vêm antes do CNPJ.",
    body: "Tipo de empresa, atividade, sócios, regime tributário: cada escolha inicial impacta impostos, obrigações e a rotina que sua empresa terá pelos próximos anos.",
    side: "right",
  },
  {
    n: "02",
    label: "Sinal de alerta",
    title: "Abrir sem orientação costuma sair caro.",
    body: "Enquadramento errado, CNAEs mal escolhidos, regime tributário inadequado e obrigações esquecidas viram impostos maiores, multas e retrabalho logo no início.",
    side: "left",
  },
  {
    n: "03",
    label: "Como a Fraga trabalha",
    title: "Abertura de empresa conduzida com método.",
    body: "Análise da atividade, orientação sobre o melhor regime tributário, abertura do CNPJ acompanhada de perto e organização da rotina contábil desde o primeiro mês.",
    side: "right",
    big: true,
  },
  {
    n: "04",
    label: "O que muda",
    title: "Sua empresa começa com clareza nos números.",
    body: "Enquadramento adequado, impostos previsíveis, obrigações organizadas e uma equipe técnica acessível pelo WhatsApp para as dúvidas do dia a dia.",
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
              <Eyebrow>Antes de abrir → Como trabalhamos → O que muda</Eyebrow>
            </ScrollReveal>
            <h2 className="font-display text-[clamp(2.2rem,5.4vw,5rem)] leading-[0.98] tracking-[-0.03em] text-bone mt-6">
              <SplitTextReveal
                text="Quem abre empresa com a Fraga começa com clareza nos números."
                highlight={["clareza"]}
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 md:mt-28 flex flex-wrap items-center justify-center gap-5"
        >
          <ShinyButton href="https://wa.me/5527988482268?text=Olá,%20quero%20abrir%20minha%20empresa%20com%20a%20Fraga%20e%20come%C3%A7ar%20com%20clareza.">
            Abrir empresa com a Fraga
            <ArrowUpRight className="h-4 w-4" />
          </ShinyButton>
          <ShinyButton href="#planos" variant="secondary">
            Ver planos
            <ArrowUpRight className="h-4 w-4" />
          </ShinyButton>
        </motion.div>
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
