import { ArrowUpRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, SplitTextReveal, MagneticButton, FloatingBadge } from "./motion/kinetic";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative py-36 md:py-52">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,oklch(0.24_0.05_175/0.55),#030504))]" />
        <div className="absolute inset-0 -z-10 grain" />

        {/* Light sweep */}
        <motion.div
          aria-hidden
          initial={{ x: "-120%" }}
          whileInView={{ x: "120%" }}
          viewport={{ once: true }}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="absolute inset-y-0 -z-10 w-1/3 bg-gradient-to-r from-transparent via-[color:var(--gold)]/20 to-transparent blur-2xl"
        />

        {/* Giant monogram */}
        <span className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display italic text-[44vw] md:text-[28vw] leading-none text-white/[0.04] select-none tracking-[-0.05em]">
          Fraga
        </span>

        <div className="container-rdlf relative text-center max-w-3xl">
          <ScrollReveal>
            <span className="eyebrow inline-flex">— Próximo movimento</span>
          </ScrollReveal>

          <h2 className="font-display text-[clamp(2.4rem,6vw,5.8rem)] leading-[0.98] tracking-[-0.035em] text-bone mt-6">
            <SplitTextReveal
              text="Empresas que crescem com estrutura jurídica crescem com segurança."
              highlight={["estrutura", "segurança."]}
            />
          </h2>

          <ScrollReveal delay={0.3}>
            <p className="mt-8 text-bone/65 text-[15px] md:text-base max-w-xl mx-auto leading-relaxed">
              Comece pelo diagnóstico jurídico estratégico — o ponto onde o improviso
              vira sistema.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.45}>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <MagneticButton href="https://wa.me/5527988482268">
                Agendar diagnóstico jurídico
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
              <a
                href="https://wa.me/5527988482268"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm text-bone/85 hover:border-[color:var(--gold)]/50 hover:text-bone transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Falar pelo WhatsApp
              </a>
            </div>
          </ScrollReveal>

          <div className="mt-14 flex flex-wrap justify-center gap-2">
            {["Diagnóstico", "Estrutura", "Acompanhamento", "Crescimento"].map((t, i) => (
              <FloatingBadge key={t} label={t} delay={0.55 + i * 0.08} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
