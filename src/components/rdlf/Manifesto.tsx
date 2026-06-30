import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Eyebrow } from "./primitives";

const HEADLINE = "A empresa que cresce sem estrutura jurídica não economiza — acumula riscos invisíveis.";

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 40%"],
  });
  const lineH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const monogramX = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  const words = HEADLINE.split(" ");

  return (
    <section ref={ref} className="relative py-32 md:py-48 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#050706),#082322))]" />
      <motion.span
        style={{ x: monogramX }}
        className="pointer-events-none absolute -left-10 top-1/2 -translate-y-1/2 font-display italic text-[34vw] leading-none text-white/[0.02] select-none tracking-[-0.05em]"
      >
        RDLF
      </motion.span>

      <div className="container-rdlf grid gap-12 lg:grid-cols-12 relative">
        <div className="lg:col-span-2 flex lg:flex-col items-start gap-4">
          <Eyebrow>Manifesto</Eyebrow>
          <div className="relative h-40 w-px bg-white/10 hidden lg:block">
            <motion.div
              style={{ height: lineH }}
              className="absolute inset-x-0 top-0 w-px bg-gradient-to-b from-[color:var(--gold)] to-transparent"
            />
          </div>
        </div>

        <div className="lg:col-span-8">
          <h2
            className="font-display italic text-bone"
            style={{
              fontSize: "clamp(2.2rem, 5.2vw, 5.2rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              fontWeight: 300,
            }}
          >
            {words.map((word, i) => {
              const start = i / words.length;
              const end = (i + 1) / words.length;
              return (
                <Word
                  key={i}
                  word={word}
                  highlight={word === "invisíveis."}
                  progress={scrollYProgress}
                  start={start}
                  end={end}
                />
              );
            })}
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "left" }}
            className="mt-14 h-px w-full bg-[color:var(--gold)]/40"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-10 max-w-2xl text-bone/65 leading-[1.85] text-[15px]"
          >
            A Fraga previne, estrutura e acompanha.{" "}
            Cada empresa atendida recebe uma base jurídica desenhada para o crescimento real —
            não para o papel.
          </motion.p>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-2 lg:pt-4"
        >
          <div className="text-[10px] uppercase tracking-[0.3em] text-bone/40">Nota institucional</div>
          <p className="mt-3 text-[13px] text-bone/55 leading-[1.7]">
            Fraga Contabilidade&nbsp; · Atuação consultiva e preventiva para empresas em
            crescimento estruturado.
          </p>
        </motion.aside>
      </div>
    </section>
  );
}

function Word({
  word,
  highlight,
  progress,
  start,
  end,
}: {
  word: string;
  highlight?: boolean;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={
        highlight
          ? "inline-block mr-[0.25em] font-semibold not-italic text-[color:var(--gold-light)]"
          : "inline-block mr-[0.25em]"
      }
    >
      {word}
    </motion.span>
  );
}
