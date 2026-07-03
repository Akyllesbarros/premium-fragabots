import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Eyebrow, Reveal, SectionTitle } from "../rdlf/primitives";

const faqs = [
  {
    q: "Quanto custa abrir uma empresa?",
    a: "O custo pode variar conforme o tipo de empresa, atividade, cidade, taxas públicas e estrutura necessária. A Fraga analisa o seu caso e orienta o melhor caminho antes de iniciar o processo de abertura.",
  },
  {
    q: "Preciso de contador para abrir empresa?",
    a: "Ter um contador desde o início ajuda a escolher o enquadramento correto, entender impostos, evitar erros na abertura do CNPJ e manter a empresa regular depois que estiver ativa.",
  },
  {
    q: "Qual o melhor regime tributário para abrir empresa?",
    a: "Depende da atividade, faturamento previsto, margem e modelo de operação. A Fraga avalia essas informações para orientar a escolha entre Simples Nacional, Lucro Presumido ou Lucro Real.",
  },
  {
    q: "Posso abrir empresa como MEI?",
    a: "Depende da atividade exercida, do faturamento esperado e das regras aplicáveis ao MEI. Antes de formalizar, é importante verificar se esse modelo realmente atende ao seu negócio.",
  },
  {
    q: "Quanto tempo leva para abrir um CNPJ?",
    a: "O prazo pode variar conforme o tipo de empresa, atividade, município e exigências dos órgãos responsáveis. A Fraga acompanha o processo e orienta você em cada etapa.",
  },
  {
    q: "A Fraga atende abertura de empresa em Vila Velha e no Espírito Santo?",
    a: "Sim. A Fraga Contabilidade atende empresas em Vila Velha e em todo o Espírito Santo, oferecendo orientação contábil para quem deseja abrir empresa com mais segurança e clareza.",
  },
  {
    q: "A Fraga atende abertura de empresa fora do Espírito Santo?",
    a: "Sim. Atendemos empresas em todo o Brasil. A sede é em Vila Velha/ES, mas todo o processo é conduzido com reuniões e WhatsApp como canal direto.",
  },
  {
    q: "Depois da abertura, a Fraga continua acompanhando a empresa?",
    a: "Sim. Depois que o CNPJ está ativo, seguimos com a rotina contábil, fiscal e trabalhista para manter tudo em ordem e apoiar as próximas decisões.",
  },
];

export function HoldingFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28 md:py-36">
      <div className="container-rdlf grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <Reveal>
            <Eyebrow>FAQ · abertura de empresa</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionTitle className="mt-5">
              Dúvidas comuns{" "}
              <span className="italic text-[color:var(--gold-light)]">sobre abertura</span>{" "}
              de empresa.
            </SectionTitle>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-bone/60 leading-relaxed text-[15px] max-w-sm">
              Veja respostas para perguntas frequentes de quem está pensando em abrir um CNPJ
              com segurança. Se a sua dúvida não estiver aqui, fale direto com a Fraga pelo
              WhatsApp.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <a
              href="https://wa.me/5527988482268?text=Olá,%20tenho%20uma%20d%C3%BAvida%20sobre%20abertura%20de%20empresa%20com%20a%20Fraga."
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
