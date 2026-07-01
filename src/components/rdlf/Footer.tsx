import { Instagram, Linkedin, ArrowUpRight } from "lucide-react";

const cols = [
  {
    title: "Navegação",
    links: [
      ["Sobre", "#sobre"],
      ["Serviços", "#servicos"],
      ["Como trabalhamos", "#metodo"],
      ["FAQ", "#faq"],
      ["Contato", "#contato"],
    ],
  },
  {
    title: "Serviços",
    links: [
      ["Planejamento tributário", "#servicos"],
      ["Rotina contábil", "#servicos"],
      ["Departamento pessoal", "#servicos"],
      ["BPO financeiro", "#servicos"],
      ["Abertura de CNPJ", "#servicos"],
      ["Consultoria empresarial", "#servicos"],
    ],
  },
  {
    title: "Contato",
    links: [
      ["WhatsApp", "https://wa.me/5527988482268"],
      ["Vila Velha — ES", "#sobre"],
      ["Instagram", "#"],
      ["LinkedIn", "#"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative pt-28 pb-10 border-t border-white/10 overflow-hidden">
      {/* editorial top hairline marquee */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--gold)]/40 to-transparent" />

      <div className="container-rdlf relative">
        {/* Top: brand statement */}
        <div className="grid gap-12 lg:grid-cols-12 mb-20">
          <div className="lg:col-span-7">
            <div className="eyebrow">Fraga Contabilidade · desde 1974</div>
            <h3 className="font-display italic text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-[-0.03em] text-bone mt-5 max-w-2xl">
              Contabilidade não é só fechamento de mês. É a base que ajuda o empresário
              a decidir com clareza.
            </h3>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-3">
            <a
              href="https://wa.me/5527988482268?text=Olá,%20vim%20pela%20landing%20page%20da%20Fraga%20Contabilidade%20e%20gostaria%20de%20falar%20com%20um%20especialista."
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center gap-3 rounded-full border border-[color:var(--gold)]/50 bg-bone px-6 py-3 text-sm text-ink hover:bg-[color:var(--gold-light)] transition-colors"
            >
              Falar com especialista
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>

        {/* Cols */}
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <div className="font-display text-3xl text-bone">
              F<span className="text-[color:var(--gold)]">RAGA</span>
            </div>
            <p className="mt-5 max-w-sm text-bone/60 leading-relaxed text-[15px]">
              Contabilidade estratégica para empresas em Vila Velha e em todo o Brasil.
              +50 anos de experiência em rotinas contábeis, fiscais, tributárias e financeiras.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <SocialBtn label="Instagram" href="#">
                <Instagram className="h-4 w-4" />
              </SocialBtn>
              <SocialBtn label="LinkedIn" href="#">
                <Linkedin className="h-4 w-4" />
              </SocialBtn>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-10">
            {cols.map((c) => (
              <div key={c.title}>
                <div className="eyebrow mb-5">{c.title}</div>
                <ul className="space-y-3">
                  {c.links.map(([label, href]) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="group inline-flex items-center gap-2 text-sm text-bone/70 hover:text-bone transition-colors"
                      >
                        <span className="relative">
                          {label}
                          <span className="absolute inset-x-0 -bottom-0.5 h-px scale-x-0 origin-left bg-[color:var(--gold)] transition-transform duration-500 group-hover:scale-x-100" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Giant Fraga wordmark */}
        <div className="relative mt-24 mb-6 overflow-hidden">
          <div className="font-display italic text-[22vw] leading-[0.85] tracking-[-0.06em] text-bone/95 select-none">
            Fraga
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
        </div>

        <div className="hairline" />
        <div className="mt-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-bone/45">
          <div>© {new Date().getFullYear()} Fraga Contabilidade. Todos os direitos reservados.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-bone transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="hover:text-bone transition-colors">
              Termos
            </a>
            <span className="text-bone/30">·</span>
            <span className="text-bone/45">Brasil</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialBtn({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center text-bone/70 hover:text-[color:var(--gold-light)] hover:border-[color:var(--gold)]/60 hover:-translate-y-0.5 transition-all"
    >
      {children}
    </a>
  );
}
