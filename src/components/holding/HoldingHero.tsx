import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Eyebrow } from "./primitives";
import { ScrollReveal, SplitTextReveal } from "./motion/kinetic";
import { ShinyButton } from "./ShinyButton";
import ColorBends from "./react-bits/ColorBends";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden bg-ink"
    >
      {/* Full-bleed container filling the entire first section */}
      <div className="relative w-full overflow-hidden min-h-screen grain">

        {/* Animated shader background — Fraga teal */}
        <div className="absolute inset-0 z-0 opacity-80 md:opacity-100">
          <ColorBends
            colors={["#36a2ac", "#2a8a93", "#1f6f78", "#5fb8c1"]}
            rotation={112}
            speed={0.12}
            scale={1.18}
            frequency={0.82}
            warpStrength={0.72}
            mouseInfluence={0.35}
            noise={0.08}
            parallax={0.22}
            iterations={1}
            intensity={0.72}
            bandWidth={7.5}
            transparent
            autoRotate={-0.45}
          />
        </div>

        {/* Overlays for legibility */}
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_42%,rgba(31,111,120,0.35)_0%,rgba(31,111,120,0.20)_28%,rgba(31,111,120,0.42)_58%,rgba(31,111,120,0.55)_100%)] pointer-events-none" />
        <div className="absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(54,162,172,0.15)_0%,rgba(54,162,172,0.05)_36%,rgba(31,111,120,0.45)_100%)] pointer-events-none" />
        <div className="absolute inset-0 z-[3] opacity-[0.035] pointer-events-none [background-image:radial-gradient(rgba(245,240,225,0.42)_0.5px,transparent_0.5px)] [background-size:4px_4px]" />

        {/* Content */}
        <div className="relative z-10 flex min-h-screen flex-col">
          <div className="flex-1 flex items-center">
            <div className="container-rdlf w-full py-16 md:py-24">
              <div className="max-w-4xl mx-auto text-center">
                <ScrollReveal>
                  <div className="flex justify-center">
                    <Eyebrow>Abertura de empresa · desde 1974</Eyebrow>
                  </div>
                </ScrollReveal>

                <h1
                  className="font-display hero-display text-bone mt-6 md:mt-8 mx-auto max-w-4xl drop-shadow-[0_8px_38px_rgba(0,0,0,0.48)]"
                  style={{ fontWeight: 300 }}
                >
                  <SplitTextReveal
                    text="Abertura de empresa em Vila Velha para começar com a estrutura contábil certa"
                    highlight={["estrutura", "contábil", "certa"]}
                  />
                </h1>

                <ScrollReveal delay={0.3}>
                  <p
                    className="mt-7 md:mt-9 mx-auto max-w-[620px] text-base md:text-lg text-bone/75 leading-[1.75] drop-shadow-[0_4px_22px_rgba(0,0,0,0.45)]"
                    style={{ fontWeight: 300 }}
                  >
                    Abra seu CNPJ com orientação da Fraga para escolher o tipo de empresa, o regime
                    tributário e os primeiros passos contábeis com segurança em Vila Velha, no Espírito
                    Santo e em todo o Brasil.
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={0.45}>
                  <div className="mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-5">
                    <ShinyButton href="https://wa.me/5527988482268?text=Ol%C3%A1%2C%20quero%20abrir%20minha%20empresa%20com%20a%20Fraga%20Contabilidade.%20Pode%20me%20ajudar%20a%20entender%20o%20melhor%20caminho%20para%20abrir%20meu%20CNPJ%20com%20seguran%C3%A7a%3F">
                      Falar com especialista
                    </ShinyButton>
                    <ShinyButton href="#servicos" variant="secondary">
                      Conhecer serviços
                      <ArrowRight className="h-4 w-4" />
                    </ShinyButton>
                  </div>
                  <p className="mt-4 text-sm text-bone/60 text-center font-light tracking-wide">
                    Atendimento consultivo para quem quer começar do jeito certo.
                  </p>
                </ScrollReveal>

              </div>
            </div>
          </div>

        </div>

        {/* Smooth teal transition fading into next section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-[34vh] bg-gradient-to-b from-transparent via-[#2a8a93]/55 to-[#36a2ac]" />
        <div className="pointer-events-none absolute -bottom-[18vh] left-1/2 z-[3] h-[42vh] w-[92vw] -translate-x-1/2 rounded-[50%] bg-[#1f6f78]/40 blur-[110px]" />
      </div>
    </section>
  );
}
