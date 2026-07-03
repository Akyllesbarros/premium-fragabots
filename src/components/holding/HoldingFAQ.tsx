import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Eyebrow, Reveal, SectionTitle } from "../rdlf/primitives";

const faqs = [
  {
    q: "O que é uma holding familiar?",
    a: "Uma holding familiar é uma empresa criada para concentrar bens, participações e investimentos da família, facilitando o planejamento sucessório, a proteção patrimonial e a organização tributária.",
  },
  {
    q: "Quanto custa estruturar uma holding?",
    a: "O custo varia conforme o patrimônio envolvido, o formato escolhido, as taxas cartoriais e a complexidade da família. A Fraga analisa o seu caso antes de iniciar qualquer estruturação.",
  },
  {
    q: "Vale a pena abrir uma holding?",
    a: "Depende do patrimônio, dos objetivos sucessórios e do perfil da família. Em muitos casos, a holding reduz impostos, protege bens e evita inventários demorados — mas cada situação exige análise específica.",
  },
  {
    q: "Quais bens posso colocar em uma holding?",
    a: "É possível integralizar imóveis, participações em empresas, investimentos financeiros e outros ativos. A escolha correta depende do planejamento tributário e sucessório definido para a família.",
  },
  {
    q: "A holding ajuda a reduzir impostos na sucessão?",
    a: "Bem estruturada, a holding pode reduzir significativamente a carga tributária em heranças e doações, sempre dentro da legislação vigente. Cada estado tem regras próprias que precisam ser avaliadas.",
  },
  {
    q: "Quanto tempo leva para constituir uma holding?",
    a: "O prazo depende da complexidade do patrimônio, dos cartórios, das juntas comerciais e das exigências dos órgãos envolvidos. A Fraga acompanha cada etapa para você ter previsibilidade.",
  },
  {
    q: "A Fraga atende estruturação de holding em Vila Velha e no Espírito Santo?",
    a: "Sim. A Fraga Contabilidade atende famílias em Vila Velha e em todo o Espírito Santo, com orientação para estruturar holdings familiares e patrimoniais com mais segurança.",
  },
  {
    q: "Depois de constituída, a Fraga continua acompanhando a holding?",
    a: "Sim. Seguimos com a rotina contábil, fiscal e patrimonial da holding, apoiando decisões da família ao longo dos anos e mantendo a estrutura em ordem.",
  },
];

export function HoldingFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28 md:py-36">
      <div className="container-rdlf grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <Reveal>
            <Eyebrow>FAQ · holding familiar</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionTitle className="mt-5">
              Dúvidas comuns{" "}
              <span className="italic text-[color:var(--gold-light)]">sobre holding</span>{" "}
              familiar e patrimonial.
            </SectionTitle>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-bone/60 leading-relaxed text-[15px] max-w-sm">
              Veja respostas para perguntas frequentes de famílias que pensam em estruturar uma
              holding para proteger patrimônio e organizar a sucessão. Se a sua dúvida não
              estiver aqui, fale direto com a Fraga pelo WhatsApp.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <a
              href="https://wa.me/5527988482268?text=Olá,%20tenho%20uma%20d%C3%BAvida%20sobre%20holding%20familiar%20com%20a%20Fraga."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-[12px] tracking-[0.18em] uppercase text-[color:var(--gold-light)] hover:text-bone transition-colors"
            >
              Tirar minha dúvida no WhatsApp →
            </a>
          </Reveal>
        </div>

        <div className="border-t border-white/10">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.03}>
                <div className={`border border-transparent border-b-white/10 rounded-xl transition-colors duration-300 ${isOpen ? "faq-item-open" : ""}`}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-start gap-6 py-6 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-sm text-[color:var(--gold-light)]/80 pt-1 w-8">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-display text-lg md:text-xl text-bone leading-snug group-hover:text-[color:var(--gold-light)] transition-colors">
                      {f.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-bone/70 flex-none"
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pl-14 pr-14 pb-7 text-bone/65 leading-relaxed max-w-2xl">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
