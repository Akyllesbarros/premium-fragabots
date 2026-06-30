import { Eyebrow, Reveal } from "./primitives";

const principles = ["Clareza", "Responsabilidade", "Presença", "Prevenção", "Estratégia"];

export function AboutAuthority() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      <div id="sobre" className="container-rdlf grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 items-center">
        <Reveal>
          <div className="relative aspect-[4/5] w-full max-w-md rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[color:var(--ink-soft)] via-ink to-[color:var(--petrol)]/40 grain">
            <div className="absolute inset-0 flex flex-col justify-between p-8">
              <div className="flex items-center justify-between text-bone">
                <div className="font-display text-2xl italic leading-tight">Desde<br/>1974</div>
                <span className="text-[10px] uppercase tracking-[0.28em] text-bone/60">Fraga · ES</span>
              </div>
              <div className="text-bone">
                <div className="font-display text-[10rem] leading-none font-light tracking-tight text-[color:var(--gold)]/80">F</div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-bone/60 mt-2">Vila Velha · ES</div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-7 border-t border-white/10 bg-ink/80">
              <div className="font-display text-xl text-bone">Fraga Contabilidade</div>
              <p className="mt-2 text-sm text-bone/70 leading-relaxed">
                +50 anos de prática contábil em Vila Velha — acompanhando empresários, entendendo rotinas
                e construindo relações que atravessam gerações.
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow>Sobre</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-[clamp(2rem,4.4vw,4rem)] leading-[1.02] tracking-[-0.03em] text-bone mt-5">
              Uma contabilidade construída{" "}
              <span className="italic text-[color:var(--gold-light)]">de perto</span>,
              cliente por cliente,{" "}
              <span className="italic text-[color:var(--gold-light)]">desde 1974</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-bone/65 leading-relaxed text-[15px]">
              A Fraga nasceu da prática contábil feita de perto: acompanhando empresários, entendendo
              rotinas, corrigindo processos e construindo relações que atravessam anos. A tecnologia
              entrou para acelerar o trabalho, mas a base continua a mesma — clareza, responsabilidade
              e presença.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-5 gap-3">
              {principles.map((p) => (
                <div
                  key={p}
                  className="rounded-xl border border-white/10 px-4 py-3 text-center text-sm text-bone/80"
                >
                  {p}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
