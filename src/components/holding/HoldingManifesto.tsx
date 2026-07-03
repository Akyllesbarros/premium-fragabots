import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "../rdlf/primitives";
import { ShinyButton } from "../rdlf/ShinyButton";

const HEADLINE = "Abrir uma empresa não é só emitir um CNPJ.";

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
        Fraga
      </motion.span>

      <div className="container-rdlf grid gap-12 lg:grid-cols-12 relative">
        <div className="lg:col-span-3 flex lg:flex-col items-start gap-4">
          <Eyebrow>Manifesto</Eyebrow>
          <div className="relative h-40 w-px bg-white/10 hidden lg:block">
            <motion.div
              style={{ height: lineH }}
              className="absolute inset-x-0 top-0 w-px bg-gradient-to-b from-[color:var(--gold)] to-transparent"
            />
          </div>
        </div>

        <div className="lg:col-span-9">
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
                  highlight={word === "escuro."}
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
            Antes de começar, é preciso entender o melhor tipo de empresa, o regime tributário adequado,
            as obrigações fiscais e o caminho mais seguro para operar com tranquilidade. Uma escolha
            errada no início pode gerar impostos maiores, burocracias desnecessárias e retrabalho.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <ShinyButton href="https://wa.me/5527988482268?text=Olá,%20quero%20abrir%20minha%20empresa%20com%20seguran%C3%A7a%20junto%20%C3%A0%20Fraga.">
              Quero abrir com segurança
              <ArrowUpRight className="h-4 w-4" />
            </ShinyButton>
            <ShinyButton href="#servicos" variant="secondary">
              Ver como funciona
              <ArrowUpRight className="h-4 w-4" />
            </ShinyButton>
          </motion.div>
        </div>

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
