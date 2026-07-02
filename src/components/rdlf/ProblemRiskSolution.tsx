import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Eyebrow } from "./primitives";
import { ShinyButton } from "./ShinyButton";

type JourneyStep = {
  number: string;
  title: string;
  headline: string;
  description: string;
  chips: string[];
  cta: string;
  ctaHref: string;
  highlighted?: boolean;
};

const WA_SPECIALIST =
  "https://wa.me/5527988482268?text=" +
  encodeURIComponent(
    "Olá, quero abrir minha empresa com a Fraga Contabilidade. Pode me ajudar a entender o melhor caminho para abrir meu CNPJ com segurança?",
  );

const journeySteps: JourneyStep[] = [
  {
    number: "01",
    title: "Antes de abrir",
    headline: "Nem todo CNPJ começa do jeito certo.",
    description:
      "Antes da formalização, é preciso entender sua atividade, faturamento previsto, modelo de operação e documentos necessários. Essa análise evita abrir a empresa com enquadramento errado ou estrutura limitada.",
    chips: ["Tipo de empresa", "Atividade exercida", "Faturamento previsto", "Documentos iniciais"],
    cta: "Quero começar certo",
    ctaHref: WA_SPECIALIST,
  },
  {
    number: "02",
    title: "Como trabalhamos",
    headline: "A Fraga organiza o caminho antes da abertura.",
    description:
      "Avaliamos o melhor enquadramento, orientamos sobre regime tributário, acompanhamos a abertura do CNPJ e indicamos as inscrições necessárias para sua empresa começar regularizada.",
    chips: ["Enquadramento", "Regime tributário", "Abertura do CNPJ", "Inscrições necessárias"],
    cta: "Falar com especialista",
    ctaHref: WA_SPECIALIST,
    highlighted: true,
  },
  {
    number: "03",
    title: "O que muda",
    headline: "Sua empresa começa com mais segurança contábil.",
    description:
      "Com o suporte certo desde o início, você reduz retrabalho, entende suas obrigações fiscais e começa com uma rotina contábil mais organizada para tomar decisões com mais segurança.",
    chips: ["Menos retrabalho", "Obrigações mapeadas", "Rotina organizada", "Decisões mais seguras"],
    cta: "Abrir meu CNPJ com orientação",
    ctaHref: WA_SPECIALIST,
  },
];

export function ProblemRiskSolution() {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 75%", "end 40%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={ref}
      id="jornada-cnpj"
      className="relative py-28 md:py-40 overflow-hidden"
    >
      <span className="pointer-events-none absolute -left-10 top-24 font-display italic text-[22vw] leading-none text-white/[0.022] select-none">
        jornada
      </span>
      <div className="pointer-events-none absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-[color:var(--gold)]/8 blur-3xl" />

      <div className="container-rdlf">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Sticky left column */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <Eyebrow>Jornada do CNPJ</Eyebrow>
                <h2 className="font-display text-[clamp(2rem,4.6vw,3.75rem)] leading-[1.02] tracking-[-0.03em] text-bone mt-5">
                  Antes de abrir sua empresa,{" "}
                  <span className="text-[color:var(--gold)]">entenda o caminho</span> que evita
                  erros.
                </h2>
                <p className="mt-6 text-bone/70 text-[16px] md:text-[17px] leading-relaxed max-w-lg">
                  A Fraga orienta as decisões que vêm antes da formalização, organiza a abertura
                  do CNPJ e ajuda sua empresa a começar com estrutura contábil certa.
                </p>

                <div className="mt-8 flex flex-col items-start gap-3">
                  <ShinyButton href={WA_SPECIALIST}>
                    Falar com especialista
                    <ArrowUpRight className="h-4 w-4" />
                  </ShinyButton>
                  <p className="text-xs text-bone/50 max-w-sm leading-relaxed">
                    Atendimento consultivo para abertura de empresa em Vila Velha, no Espírito
                    Santo e em todo o Brasil.
                  </p>
                </div>

                {/* progress indicator — desktop */}
                <div className="hidden lg:flex mt-12 items-center gap-3">
                  {journeySteps.map((s) => (
                    <span
                      key={s.number}
                      className="h-[2px] w-10 rounded-full bg-white/15 overflow-hidden"
                    >
                      <span className="block h-full w-full bg-[color:var(--gold)]/70" />
                    </span>
                  ))}
                  <span className="text-[10px] tracking-[0.3em] uppercase text-bone/40 ml-2">
                    3 etapas
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right column — journey cards */}
          <div ref={trackRef} className="lg:col-span-7 relative">
            {/* vertical progress line */}
            <div
              aria-hidden
              className="absolute left-6 md:left-8 top-4 bottom-4 w-px bg-white/10 pointer-events-none"
            />
            <motion.div
              aria-hidden
              style={{ scaleY: lineScale }}
              className="absolute left-6 md:left-8 top-4 bottom-4 w-px origin-top bg-gradient-to-b from-[color:var(--gold)] via-[color:var(--gold-light)] to-[color:var(--gold)]/0 pointer-events-none journey-progress"
            />

            <div className="flex flex-col gap-10 md:gap-14">
              {journeySteps.map((step, i) => (
                <JourneyCard key={step.number} step={step} index={i} />
              ))}
            </div>

            {/* Final CTA of the section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative mt-12 md:mt-16 ml-14 md:ml-20 rounded-3xl border border-white/10 bg-ink-soft/50 backdrop-blur-sm p-6 md:p-8"
            >
              <p className="font-display text-xl md:text-2xl text-bone leading-tight max-w-md">
                Quer saber qual é o melhor caminho para abrir sua empresa?
              </p>
              <div className="mt-5">
                <ShinyButton href={WA_SPECIALIST}>
                  Falar com especialista
                  <ArrowRight className="h-4 w-4" />
                </ShinyButton>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function JourneyCard({ step, index }: { step: JourneyStep; index: number }) {
  const highlighted = step.highlighted;
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.08 * index }}
      className="journey-card relative pl-14 md:pl-20 group"
    >
      {/* node on the line */}
      <span
        aria-hidden
        className={`absolute left-6 md:left-8 top-8 -translate-x-1/2 h-3 w-3 rounded-full ${
          highlighted
            ? "bg-[color:var(--gold)] shadow-[0_0_0_6px_rgba(255,168,25,0.15)]"
            : "bg-white/70"
        }`}
      />
      <span
        aria-hidden
        className={`absolute left-6 md:left-8 top-8 -translate-x-1/2 h-3 w-3 rounded-full ${
          highlighted ? "node-pulse bg-[color:var(--gold)]/40" : ""
        }`}
      />

      <div
        className={`relative overflow-hidden rounded-3xl border p-6 md:p-8 transition-all duration-300 backdrop-blur-sm ${
          highlighted
            ? "border-[color:var(--gold)]/45 bg-[color:var(--petrol)]/45 shadow-[0_20px_60px_-30px_rgba(255,168,25,0.55)]"
            : "border-white/10 bg-ink-soft/55 hover:border-white/20 hover:-translate-y-0.5"
        }`}
      >
        {highlighted && (
          <>
            <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[color:var(--gold)]/18 blur-3xl" />
            <span className="absolute top-5 right-5 text-[10px] tracking-[0.28em] uppercase font-medium text-[color:var(--gold)] bg-[color:var(--gold)]/10 border border-[color:var(--gold)]/30 rounded-full px-2.5 py-1">
              Nossa etapa
            </span>
          </>
        )}

        <div className="relative flex items-baseline gap-4">
          <span
            className={`font-display text-5xl md:text-6xl leading-none ${
              highlighted ? "text-[color:var(--gold)]" : "text-[color:var(--gold-light)]/40"
            }`}
          >
            {step.number}
          </span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-bone/55">
            {step.title}
          </span>
        </div>

        <h3 className="relative font-display text-xl md:text-2xl text-bone leading-tight mt-4">
          {step.headline}
        </h3>
        <p className="relative text-bone/70 mt-3 leading-relaxed text-[15px] max-w-lg">
          {step.description}
        </p>

        <ul className="relative mt-5 flex flex-wrap gap-2">
          {step.chips.map((chip, ci) => (
            <motion.li
              key={chip}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: 0.15 + ci * 0.05,
              }}
              className={`journey-chip text-[12px] tracking-wide rounded-full px-3 py-1 border ${
                highlighted
                  ? "border-[color:var(--gold)]/35 bg-[color:var(--gold)]/8 text-bone/90"
                  : "border-white/12 bg-white/[0.04] text-bone/75"
              }`}
            >
              {chip}
            </motion.li>
          ))}
        </ul>

        <div className="relative mt-6">
          <a
            href={step.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
              highlighted
                ? "text-[color:var(--gold)] hover:text-[color:var(--gold-light)]"
                : "text-bone/85 hover:text-[color:var(--gold)]"
            }`}
          >
            {step.cta}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
