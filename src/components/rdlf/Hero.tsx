import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Eyebrow } from "./primitives";
import { ScrollReveal, SplitTextReveal } from "./motion/kinetic";
import { RDLFAnimatedLayerButton } from "./motion/RDLFAnimatedLayerButton";
import ColorBends from "./react-bits/ColorBends";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden bg-ink"
    >
      {/* Full-bleed container filling the entire first section */}
      <div className="relative w-full overflow-hidden min-h-screen grain">

        {/* Animated shader background — green only, deep, subtle */}
        <div className="absolute inset-0 z-0 opacity-80 md:opacity-100">
          <ColorBends
            colors={["#073534", "#0B4644", "#041F1F", "#0E5A56"]}
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
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_42%,rgba(5,7,6,0.58)_0%,rgba(5,7,6,0.44)_28%,rgba(4,31,31,0.68)_58%,rgba(5,7,6,0.86)_100%)] pointer-events-none" />
        <div className="absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(5,7,6,0.38)_0%,rgba(5,7,6,0.16)_36%,rgba(5,7,6,0.78)_100%)] pointer-events-none" />
        <div className="absolute inset-0 z-[3] opacity-[0.035] pointer-events-none [background-image:radial-gradient(rgba(245,240,225,0.42)_0.5px,transparent_0.5px)] [background-size:4px_4px]" />

        {/* Content */}
        <div className="relative z-10 flex min-h-screen flex-col">
          <div className="flex-1 flex items-center">
            <div className="container-rdlf w-full py-16 md:py-24">
              <div className="max-w-4xl mx-auto text-center">
                <ScrollReveal>
                  <div className="flex justify-center">
                    <Eyebrow>Hub jurídico estratégico para empresas</Eyebrow>
                  </div>
                </ScrollReveal>

                <h1
                  className="font-display hero-display text-bone mt-6 md:mt-8 mx-auto max-w-4xl drop-shadow-[0_8px_38px_rgba(0,0,0,0.48)]"
                  style={{ fontWeight: 300 }}
                >
                  <SplitTextReveal
                    text="Base jurídica para empresas que crescem com responsabilidade."
                    highlight={["jurídica", "crescem", "responsabilidade"]}
                  />
                </h1>

                <ScrollReveal delay={0.3}>
                  <p
                    className="mt-7 md:mt-9 mx-auto max-w-[620px] text-base md:text-lg text-bone/75 leading-[1.75] drop-shadow-[0_4px_22px_rgba(0,0,0,0.45)]"
                    style={{ fontWeight: 300 }}
                  >
                    Estrutura preventiva, proteção de propriedade intelectual e clareza jurídica para decisões
                    empresariais que sustentam crescimento.
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={0.45}>
                  <div className="mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-5">
                    <RDLFAnimatedLayerButton href="https://wa.me/5527988482268">
                      Agendar diagnóstico
                    </RDLFAnimatedLayerButton>
                    <a
                      href="#hub"
                      className="group inline-flex items-center gap-2 text-sm text-bone/80 hover:text-bone transition-colors"
                    >
                      Ver estrutura
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </ScrollReveal>

              </div>
            </div>
          </div>

        </div>

        {/* Smooth green transition fading into next section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-[34vh] bg-gradient-to-b from-transparent via-[#041F1F]/60 to-[#041F1F]" />
        <div className="pointer-events-none absolute -bottom-[18vh] left-1/2 z-[3] h-[42vh] w-[92vw] -translate-x-1/2 rounded-[50%] bg-[#073534]/45 blur-[110px]" />
      </div>
    </section>
  );
}
