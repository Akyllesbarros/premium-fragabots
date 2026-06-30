import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Eyebrow, Reveal, SectionTitle } from "./primitives";

const faqs = [
  {
    q: "Minha empresa precisa de jurídico preventivo mesmo sem processo?",
    a: "Sim. A maior parte dos custos jurídicos relevantes em empresas em crescimento nasce de decisões tomadas sem estrutura — não de processos. Prevenção é o que evita que o problema chegue ao judiciário.",
  },
  {
    q: "Qual a diferença entre contrato genérico e contrato estratégico?",
    a: "Contrato genérico cobre o óbvio. Contrato estratégico é desenhado sobre o fluxo real de receita, riscos e responsabilidades da operação. A diferença aparece no primeiro conflito.",
  },
  {
    q: "Quando devo proteger minha marca?",
    a: "Antes de a marca virar ativo. Quanto mais a empresa cresce sem registro, maior o risco de outro depositante registrar primeiro e exigir mudança de nome.",
  },
  {
    q: "A Fraga atua apenas em processos?",
    a: "Não. A atuação central é preventiva e estruturante. Processos são tratados quando inevitáveis, com leitura estratégica do impacto empresarial.",
  },
  {
    q: "Como funciona o diagnóstico jurídico?",
    a: "Leitura técnica de contratos críticos, marca, societário e governança, encerrada com um mapa de riscos priorizado e plano jurídico recomendado.",
  },
  {
    q: "Posso contratar apenas um projeto pontual?",
    a: "Sim. Projetos pontuais funcionam para escopos delimitados — como registro de marca, contrato crítico ou acordo de sócios.",
  },
  {
    q: "O acompanhamento mensal substitui um departamento jurídico interno?",
    a: "Para empresas em fase de crescimento e consolidação, sim. Oferece a camada jurídica recorrente sem o custo fixo de uma estrutura interna.",
  },
  {
    q: "A Fraga garante aprovação de marca?",
    a: "Não. Nenhum escritório pode garantir deferimento pelo INPI. O que entregamos é estratégia técnica, busca de anterioridade e acompanhamento processual administrativo.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-28 md:py-36">
      <div className="container-rdlf grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <Reveal>
            <Eyebrow>FAQ</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionTitle className="mt-5">
              Perguntas{" "}
              <span className="italic text-[color:var(--gold-light)]">estratégicas</span> antes
              de contratar.
            </SectionTitle>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-bone/60 leading-relaxed text-[15px] max-w-sm">
              Se a sua pergunta não estiver aqui, o diagnóstico inicial é o momento certo
              para fazê-la.
            </p>
          </Reveal>
        </div>

        <div className="border-t border-white/10">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.03}>
                <div className="border-b border-white/10">
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
