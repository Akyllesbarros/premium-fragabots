import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Eyebrow, Reveal, SectionTitle } from "./primitives";

const faqs = [
  {
    q: "Atendem empresas fora do Espírito Santo?",
    a: "Sim. Atendemos empresas em todo o Brasil. A sede é em Vila Velha/ES, mas a rotina contábil, fiscal e trabalhista é feita à distância com reuniões periódicas e WhatsApp como canal direto.",
  },
  {
    q: "Quais regimes tributários a Fraga atende?",
    a: "Trabalhamos com MEI, Simples Nacional, Lucro Presumido e Lucro Real. Em todos os casos avaliamos se o enquadramento ainda é o mais adequado à realidade da empresa.",
  },
  {
    q: "É possível trocar de contador no meio do ano?",
    a: "Sim. Conduzimos a transição completa: solicitação de documentos ao contador anterior, conferência de obrigações pendentes e regularização do que estiver em aberto.",
  },
  {
    q: "A Fraga ajuda na abertura da empresa?",
    a: "Sim. Cuidamos de toda a abertura: definição de natureza jurídica, CNAEs, regime tributário, registro na junta, inscrições municipais e estaduais e emissão dos certificados.",
  },
  {
    q: "Vocês cuidam da folha e do eSocial?",
    a: "Sim. Folha de pagamento, admissões, desligamentos, férias, rescisões, eSocial e demais rotinas trabalhistas são conduzidas por uma equipe dedicada ao departamento pessoal.",
  },
  {
    q: "Quem é o ponto de contato no dia a dia?",
    a: "Cada cliente tem responsáveis técnicos por área (contábil, fiscal, pessoal e financeiro), e o WhatsApp é o canal direto para dúvidas e demandas do dia a dia.",
  },
  {
    q: "Como funciona o BPO financeiro?",
    a: "Assumimos contas a pagar e a receber, conciliação bancária, fluxo de caixa e relatórios gerenciais, deixando o empresário com tempo para decidir em vez de operar o financeiro.",
  },
  {
    q: "Vocês fazem planejamento tributário?",
    a: "Sim. Avaliamos se a empresa está no regime adequado, simulamos cenários e identificamos onde existem excessos, riscos ou oportunidades dentro da lei.",
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
              Dúvidas comuns{" "}
              <span className="italic text-[color:var(--gold-light)]">que recebemos</span>{" "}
              de quem está pensando em trocar de contador.
            </SectionTitle>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-bone/60 leading-relaxed text-[15px] max-w-sm">
              Se a sua pergunta não estiver aqui, fale direto com a Fraga pelo WhatsApp — sem
              formulário, sem intermediários.
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
