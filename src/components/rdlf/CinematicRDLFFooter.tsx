import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instagram, Linkedin } from "lucide-react";
import rdlfLogo from "@/assets/fraga-logo.png.asset.json";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}


export function CinematicRDLFFooter() {
  const wrapperRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Link grid intro only.
      if (linksRef.current) {
        gsap.fromTo(
          linksRef.current,
          { y: 40, opacity: 0.001, filter: "blur(10px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            ease: "power3.out",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 90%",
              once: true,
            },
          },
        );
      }
      // Ensure positions are correct after preloader/layout shifts
      ScrollTrigger.refresh();
    }, wrapperRef);

    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 1200);
    return () => {
      window.clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      ref={wrapperRef}
      className="relative isolate overflow-hidden pt-28 text-bone"
    >
      <style>{`
        @keyframes rdlf-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes rdlf-aurora { 0% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; } 100% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.85; } }
      `}</style>

      {/* aurora */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[80vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--gold) 18%, transparent) 0%, color-mix(in oklab, oklch(0.27 0.05 175) 22%, transparent) 38%, transparent 70%)",
          animation: "rdlf-aurora 8s ease-in-out infinite alternate",
        }}
      />


      {/* link grid */}
      <div className="container-rdlf relative mt-20" ref={linksRef}>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <img src={rdlfLogo.url} alt="Fraga Contabilidade" className="h-12 md:h-14 w-auto select-none opacity-100" style={{ filter: "none" }} draggable={false} />
            <p className="mt-5 max-w-sm text-bone/60 leading-relaxed text-[15px]">
              Contabilidade estratégica para empresas em Vila Velha e em todo o Brasil. +50 anos
              ajudando empresários a decidir com clareza.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <a
                href="https://www.instagram.com/fragacontabilidade"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center text-bone/70 hover:text-[color:var(--gold-light)] hover:border-[color:var(--gold)]/60 transition-all"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/fragacontabilidade/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center text-bone/70 hover:text-[color:var(--gold-light)] hover:border-[color:var(--gold)]/60 transition-all"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {[
              { title: "Navegação", links: [["Sobre", "#sobre"], ["Serviços", "#servicos"], ["Como trabalhamos", "#metodo"], ["FAQ", "#faq"], ["Contato", "#contato"]] },
              { title: "Serviços", links: [["Planejamento tributário", "#servicos"], ["Rotina contábil", "#servicos"], ["Departamento pessoal", "#servicos"], ["BPO financeiro", "#servicos"], ["Abertura de CNPJ", "#servicos"]] },
              { title: "Contato", links: [["WhatsApp", "https://wa.me/5527988482268"], ["Vila Velha — ES", "#sobre"], ["Instagram", "#"], ["LinkedIn", "#"]] },
            ].map((c) => (
              <div key={c.title}>
                <div className="eyebrow mb-5">{c.title}</div>
                <ul className="space-y-3">
                  {c.links.map(([label, href]) => (
                    <li key={label}>
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
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


      <div className="container-rdlf relative pb-10">
        <div className="hairline" />
        <div className="mt-7 flex flex-col items-center gap-2 text-xs text-bone/45 text-center">
          <div>S. T. Fraga Contabilidade ME · CRC-ES 004523/O · CNPJ 07.838.084/0001-86</div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
            <div>© {new Date().getFullYear()} Fraga Contabilidade. Todos os direitos reservados.</div>
            <div className="flex items-center gap-6">
              <a href="/privacidade" className="hover:text-bone transition-colors">
                Política de Privacidade
              </a>
              <a
                href="https://www.instagram.com/_matheusalm/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[color:var(--gold-light)] transition-colors"
              >
                Criado por Matheus Nascimento | BAKY Company
              </a>
              <button onClick={scrollTop} className="hover:text-bone transition-colors">↑ Topo</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
