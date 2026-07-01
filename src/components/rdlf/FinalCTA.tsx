import { ArrowUpRight, MessageCircle, Check, Phone, Video } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, SplitTextReveal } from "./motion/kinetic";
import { ShinyButton } from "./ShinyButton";
import fragaLogo from "@/assets/fraga-logo.png.asset.json";

const WA_PRIMARY =
  "https://wa.me/5527988482268?text=" +
  encodeURIComponent(
    "Olá, quero abrir minha empresa com a Fraga Contabilidade. Pode me ajudar a entender o melhor caminho para abrir meu CNPJ com segurança?"
  );
const WA_SECONDARY =
  "https://wa.me/5527988482268?text=" +
  encodeURIComponent("Olá, quero falar com um especialista da Fraga sobre abertura de empresa.");

export function FinalCTA() {
  return (
    <section id="contato" className="relative overflow-hidden py-24 md:py-36">
      {/* Background layers — matches LP teal palette */}
      <div className="absolute inset-0 -z-20 bg-[#36a2ac]" />
      <div
        className="absolute inset-0 -z-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(31,111,120,0.55) 0%, transparent 45%), radial-gradient(circle at 80% 80%, rgba(255,168,25,0.14) 0%, transparent 40%), radial-gradient(circle at 50% 100%, rgba(13,70,76,0.45) 0%, transparent 55%)",
        }}
      />
      <div className="absolute inset-0 -z-10 grain opacity-30" />
      <span className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display italic text-[40vw] md:text-[24vw] leading-none text-white/[0.06] select-none tracking-[-0.05em]">
        Fraga
      </span>

      <div className="container-rdlf relative">
        <div className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-white/15 bg-gradient-to-br from-white/10 via-white/[0.06] to-[rgba(13,70,76,0.35)] backdrop-blur-xl px-6 py-14 md:px-14 md:py-20 lg:px-20 shadow-[0_40px_120px_-40px_rgba(13,70,76,0.6)]">
          {/* Glow behind phone */}
          <div className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[color:var(--gold)]/15 blur-[120px]" />

          <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 items-center relative">
            {/* Left — Copy */}
            <div className="relative z-10">
              <ScrollReveal>
                <span className="eyebrow inline-flex">— Abertura de empresa · atendimento direto</span>
              </ScrollReveal>

              <h2 className="font-display text-[clamp(2.2rem,5vw,4.6rem)] leading-[1] tracking-[-0.035em] text-bone mt-5">
                <SplitTextReveal
                  text="Abra sua empresa conversando direto com quem entende."
                  highlight={["conversando", "entende."]}
                />
              </h2>

              <ScrollReveal delay={0.25}>
                <p className="mt-7 text-bone/70 text-[15px] md:text-base max-w-lg leading-relaxed">
                  Fale com a Fraga pelo WhatsApp e receba orientação para abrir seu CNPJ com
                  clareza, segurança tributária e acompanhamento contábil desde o primeiro passo.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <div className="mt-9 flex flex-wrap gap-4">
                  <ShinyButton href={WA_PRIMARY}>
                    Abrir minha empresa agora
                    <ArrowUpRight className="h-4 w-4" />
                  </ShinyButton>
                  <ShinyButton
                    href={WA_SECONDARY}
                    variant="secondary"
                    ariaLabel="Falar com especialista da Fraga pelo WhatsApp"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Falar com especialista
                  </ShinyButton>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.5}>
                <p className="mt-6 text-xs uppercase tracking-[0.22em] text-bone/50">
                  Atendimento consultivo para abertura de empresa em Vila Velha e no Espírito Santo.
                </p>
              </ScrollReveal>
            </div>

            {/* Right — WhatsApp mockup */}
            <ScrollReveal delay={0.3}>
              <WhatsAppMockup />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatsAppMockup() {
  return (
    <div className="relative mx-auto max-w-sm lg:max-w-md">
      {/* Floating decorative dots */}
      <div className="pointer-events-none absolute -left-6 top-10 h-2 w-2 rounded-full bg-[color:var(--gold)]/60" />
      <div className="pointer-events-none absolute -left-10 top-24 h-1.5 w-1.5 rounded-full bg-white/30" />
      <div className="pointer-events-none absolute -right-4 -top-3 h-3 w-3 rounded-full bg-[color:var(--gold)]/40" />

      <motion.div
        initial={{ rotate: -4, y: 20, opacity: 0 }}
        whileInView={{ rotate: -4, y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-[2rem] border border-white/15 bg-[#0b1413] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 bg-[oklch(0.22_0.045_175)] border-b border-white/10">
          <img
            src={fragaLogo.url}
            alt="Fraga Contabilidade"
            className="h-10 w-10 rounded-full object-cover ring-2 ring-[color:var(--gold)]/60 bg-[#0d464c]"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-bone text-sm font-medium truncate">Fraga Contabilidade</p>
              <Check className="h-3 w-3 text-[color:var(--gold-light)]" strokeWidth={3} />
            </div>
            <p className="text-[11px] text-bone/50">online agora · atendimento consultivo</p>
          </div>
          <Video className="h-4 w-4 text-bone/40" />
          <Phone className="h-4 w-4 text-bone/40" />
        </div>

        {/* Chat body */}
        <div className="px-4 py-5 space-y-3 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22><circle cx=%2230%22 cy=%2230%22 r=%220.5%22 fill=%22white%22 opacity=%220.03%22/></svg>')] bg-[#0b1413]">
          <Bubble side="in" delay={0.1}>Olá, quero abrir minha empresa. Por onde começo?</Bubble>
          <Bubble side="out" delay={0.35}>
            Olá! Vamos te orientar na abertura do CNPJ, escolha do regime tributário e primeiros passos contábeis.
          </Bubble>
          <Bubble side="in" delay={0.6}>Preciso saber qual tipo de empresa faz sentido para mim.</Bubble>
          <Bubble side="out" delay={0.85}>
            Perfeito. A Fraga analisa sua atividade, faturamento previsto e modelo de operação para indicar o caminho mais seguro.
          </Bubble>
          <Bubble side="out" delay={1.1} highlight>
            Comece com clareza desde o primeiro dia.
          </Bubble>

          {/* Typing */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.35, duration: 0.4 }}
            className="flex items-center gap-1.5 pl-1"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-bone/40 animate-pulse" />
            <span className="h-1.5 w-1.5 rounded-full bg-bone/40 animate-pulse [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 rounded-full bg-bone/40 animate-pulse [animation-delay:300ms]" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function Bubble({
  side,
  children,
  delay = 0,
  highlight = false,
}: {
  side: "in" | "out";
  children: React.ReactNode;
  delay?: number;
  highlight?: boolean;
}) {
  const isOut = side === "out";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`flex ${isOut ? "justify-start" : "justify-end"}`}
    >
      <div
        className={
          isOut
            ? `max-w-[82%] rounded-2xl rounded-tl-sm px-3.5 py-2 text-[13px] leading-relaxed text-bone/90 border ${
                highlight
                  ? "bg-[oklch(0.28_0.06_175/0.75)] border-[color:var(--gold)]/40"
                  : "bg-white/[0.06] border-white/10"
              }`
            : "max-w-[82%] rounded-2xl rounded-tr-sm px-3.5 py-2 text-[13px] leading-relaxed text-[#e6f4ea] bg-[oklch(0.32_0.08_155/0.85)] border border-[oklch(0.4_0.1_155/0.5)]"
        }
      >
        {children}
      </div>
    </motion.div>
  );
}
