import { ArrowUpRight } from "lucide-react";
import { Eyebrow, Reveal } from "./primitives";
import { ShinyButton } from "./ShinyButton";

const chapters = [
  { n: "01", title: "História contábil", desc: "Prática consolidada em contabilidade consultiva para empresas de diferentes portes." },
  { n: "02", title: "Atendimento próximo", desc: "Relação direta com o empresário — sem intermediários, sem respostas genéricas." },
  { n: "03", title: "Orientação para abrir empresa", desc: "Enquadramento, regime tributário e obrigações discutidos antes do primeiro passo." },
  { n: "04", title: "Suporte para crescer com clareza", desc: "Rotina contábil organizada desde o início, para você tomar decisões com segurança." },
];

const pillars = ["Abertura de CNPJ", "Regime tributário", "Organização inicial", "Suporte contábil"];

export function AboutAuthority() {
  return (
    <section id="sobre" className="relative py-28 md:py-36 overflow-hidden">
      {/* subtle background wash */}
      <div
        className="absolute inset-0 -z-10 opacity-70 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(31,111,120,0.35) 0%, transparent 45%), radial-gradient(circle at 85% 80%, rgba(255,168,25,0.08) 0%, transparent 45%)",
        }}
      />

      <div className="container-rdlf grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20 items-center">
        {/* Left — editorial timeline card (no photo) */}
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[color:var(--ink-soft)]/70 via-ink/60 to-[color:var(--petrol)]/40 backdrop-blur-xl p-8 md:p-10 shadow-[0_40px_120px_-50px_rgba(0,0,0,0.6)] group transition-transform duration-500 hover:-translate-y-1">
            {/* giant Fraga word — background */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-6 -right-4 font-display italic text-[10rem] md:text-[13rem] leading-none tracking-[-0.06em] text-white/[0.045] select-none"
            >
              Fraga
            </span>

            <div className="relative flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.28em] text-bone/55">
                Fraga · Vila Velha · ES
              </span>
              <span className="h-px w-16 bg-gradient-to-r from-transparent via-[color:var(--gold)]/60 to-transparent" />
            </div>

            <h3 className="relative mt-6 font-display text-[clamp(1.6rem,2.4vw,2.2rem)] leading-[1.1] tracking-[-0.02em] text-bone">
              Uma trajetória{" "}
              <span className="italic text-[color:var(--gold-light)]">contábil</span>{" "}
              construída no dia a dia das empresas.
            </h3>

            <ol className="relative mt-8 md:mt-10 space-y-5">
              {chapters.map((c, i) => (
                <li key={c.n} className="grid grid-cols-[auto_1fr] gap-5 items-start">
                  <div className="flex flex-col items-center pt-1">
                    <span className="font-display text-lg text-[color:var(--gold-light)] leading-none">
                      {c.n}
                    </span>
                    {i < chapters.length - 1 && (
                      <span className="mt-2 h-10 w-px bg-gradient-to-b from-[color:var(--gold)]/40 to-transparent" />
                    )}
                  </div>
                  <div className="pb-1">
                    <div className="text-bone text-[15px] font-medium">{c.title}</div>
                    <p className="mt-1 text-[13px] text-bone/60 leading-relaxed">{c.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="relative mt-8 grid grid-cols-2 gap-2">
              {pillars.map((p) => (
                <div
                  key={p}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-center text-[12px] tracking-[0.02em] text-bone/75"
                >
                  {p}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Right — copy + CTA */}
        <div>
          <Reveal>
            <Eyebrow>Sobre a Fraga</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-[clamp(2rem,4.4vw,4rem)] leading-[1.02] tracking-[-0.03em] text-bone mt-5">
              Uma contabilidade com{" "}
              <span className="italic text-[color:var(--gold-light)]">história</span> para sua
              empresa nascer{" "}
              <span className="italic text-[color:var(--gold-light)]">melhor</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-bone/70 leading-relaxed text-[15px]">
              Abrir uma empresa envolve decisões importantes. A Fraga Contabilidade une
              experiência, proximidade e visão tributária para orientar empreendedores desde a
              abertura do CNPJ até os primeiros passos da operação.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-xl text-bone/60 leading-relaxed text-[14px]">
              Mais do que formalizar uma empresa, ajudamos você a começar com clareza: escolhendo
              o enquadramento adequado, entendendo seus impostos e organizando a rotina contábil
              desde o início.
            </p>
          </Reveal>
          <Reveal delay={0.28}>
            <div className="mt-9">
              <ShinyButton href="https://wa.me/5527988482268?text=Olá,%20quero%20abrir%20minha%20empresa%20com%20a%20Fraga%20Contabilidade%20e%20gostaria%20de%20entender%20o%20melhor%20caminho.">
                Falar com a Fraga
                <ArrowUpRight className="h-4 w-4" />
              </ShinyButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
