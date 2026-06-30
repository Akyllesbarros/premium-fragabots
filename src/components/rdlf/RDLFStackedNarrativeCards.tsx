import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Eyebrow } from "./primitives";
import { SplitTextReveal } from "./motion/kinetic";
import { WorldClassCard } from "./motion/WorldClassCard";


export interface RDLFStackedCardItem {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  output?: string;
  tag: string;
  giantWord: string;
}

interface Props {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: RDLFStackedCardItem[];
}

function StackedCard({
  item,
  index,
  total,
  progress,
}: {
  item: RDLFStackedCardItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  // Cards permanecem 100% sólidos durante todo o encaixe.
  const scale = useTransform(progress, [start, end], [1, 0.97]);
  const y = useTransform(progress, [start, end], [0, -10]);

  return (
    <div className="sticky" style={{ top: `calc(12vh + ${index * 18}px)` }}>
      <motion.div
        style={{ scale, y }}
        transition={{ type: "spring", stiffness: 60, damping: 22, mass: 1.1 }}
      >
      <WorldClassCard radius="rounded-[28px]" intensity="medium" className="mx-auto max-w-5xl">
      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,#082322,#050706)] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)]">

        {/* giant background word */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-6 -bottom-10 font-display italic text-[18vw] leading-[0.8] tracking-[-0.06em] text-bone/[0.04] select-none"
        >
          {item.giantWord}
        </div>

        {/* grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "linear-gradient(180deg, transparent, black 40%, transparent)",
          }}
        />

        <div className="relative grid gap-10 p-10 md:p-14 lg:grid-cols-[1fr_1.1fr]">
          {/* left */}
          <div className="relative flex flex-col">
            <div className="flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-[color:var(--gold)]" />
              <span className="eyebrow">{item.eyebrow}</span>
            </div>

            <div className="mt-8 font-display leading-[0.82] tracking-[-0.05em] text-bone/95 text-[clamp(5.5rem,9vw,9rem)]">
              {item.number}
            </div>

            <div className="mt-3 text-[10px] tracking-[0.28em] uppercase text-bone/45">
              Capítulo {item.number} / 05
            </div>

            <div className="mt-auto pt-10 flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase">
              <span className="rounded-full border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/10 px-3 py-1 text-[color:var(--gold-light)]">
                {item.tag}
              </span>
              <span className="text-bone/40">RDLF System · {String(index + 1).padStart(2, "0")}</span>
            </div>
          </div>

          {/* right */}
          <div className="relative flex flex-col gap-6 border-t border-white/10 pt-10 lg:border-t-0 lg:border-l lg:pl-12 lg:pt-0">
            <h3 className="font-display text-[clamp(1.6rem,2.4vw,2.4rem)] leading-[1.05] tracking-[-0.02em] text-bone">
              {item.title}
            </h3>

            <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-bone/50">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--gold)]/70 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--gold)]" />
              </span>
              Active Layer
            </div>

            <p className="text-[15px] leading-relaxed text-bone/70 max-w-lg">{item.description}</p>

            {item.output && (
              <div className="mt-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 backdrop-blur-sm">
                <div className="eyebrow text-bone/45">Output esperado</div>
                <div className="mt-1 font-display text-lg text-[color:var(--gold-light)]">
                  → {item.output}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      </WorldClassCard>
      </motion.div>
    </div>

  );
}

export function RDLFStackedNarrativeCards({
  eyebrow = "Método RDLF",
  title = "Improviso jurídico vira sistema em cinco capítulos.",
  description = "Sequência consultiva para mapear riscos, priorizar decisões e construir base jurídica para crescimento responsável.",
  items,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section id="metodo" className="relative">
      <div className="absolute inset-0 -z-10 grain" />
      <div className="container-rdlf pt-32 pb-16">
        <div className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.6rem)] leading-[1] tracking-[-0.03em] text-bone">
            <SplitTextReveal text={title} highlight={["sistema", "estrutura"]} />
          </h2>
          <p className="mt-6 max-w-xl text-bone/65 leading-relaxed">{description}</p>
        </div>
      </div>

      <div ref={ref} className="container-rdlf relative pb-0">
        <div>
          {items.map((item, i) => (
            <StackedCard
              key={item.number}
              item={item}
              index={i}
              total={items.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
