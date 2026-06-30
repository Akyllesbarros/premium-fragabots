import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { RDLFAnimatedLayerButton } from "./motion/RDLFAnimatedLayerButton";
import { cn } from "@/lib/utils";
import rdlfLogo from "@/assets/fraga-logo.png.asset.json";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#metodo", label: "Como trabalhamos" },
  { href: "#planos", label: "Planos" },
  { href: "#faq", label: "FAQ" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-4 z-50 px-4"
      >
        <div
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between gap-6 rounded-full border border-white/10 bg-ink/80 pl-6 pr-2 py-2 backdrop-blur-xl transition-all duration-500",
            scrolled
              ? "shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
              : "shadow-[0_10px_40px_-20px_rgba(0,0,0,0.4)]",
          )}
        >
          <a href="#top" className="flex items-center shrink-0">
            <img src={rdlfLogo.url} alt="Fraga Contabilidade" className="h-7 md:h-8 w-auto select-none opacity-100" style={{ filter: "none" }} draggable={false} />
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-bone/70 hover:text-bone transition-colors relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[color:var(--gold)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <RDLFAnimatedLayerButton
                href="https://wa.me/5527988482268?text=Olá,%20vim%20pela%20landing%20page%20da%20Fraga%20Contabilidade%20e%20gostaria%20de%20falar%20com%20um%20especialista."
                className="h-[44px] min-w-[160px] px-5 text-xs shadow-[5px_5px_0px_#041F1F] hover:translate-y-[3px] hover:shadow-[2px_2px_0px_#041F1F]"
              >
                Falar com a Fraga
              </RDLFAnimatedLayerButton>
            </div>
            <button
              aria-label="Abrir menu"
              onClick={() => setOpen(true)}
              className="lg:hidden rounded-full border border-white/15 p-2.5 text-bone"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.header>


      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-ink/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="container-rdlf flex items-center justify-between py-5">
              <img src={rdlfLogo.url} alt="Fraga Contabilidade" className="h-8 w-auto select-none opacity-100" style={{ filter: "none" }} draggable={false} />
              <button
                aria-label="Fechar menu"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/15 p-2.5"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="container-rdlf mt-10 flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06 }}
                  className="font-display text-4xl py-4 border-b border-white/5 text-bone"
                >
                  {l.label}
                </motion.a>
              ))}
              <div className="mt-10">
              <RDLFAnimatedLayerButton
                href="https://wa.me/5527988482268?text=Olá,%20vim%20pela%20landing%20page%20da%20Fraga%20Contabilidade%20e%20gostaria%20de%20falar%20com%20um%20especialista."
                onClick={() => setOpen(false)}
                className="w-full"
              >
                Falar com a Fraga
              </RDLFAnimatedLayerButton>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
