import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function FloatingWhatsAppButton() {
  const whatsappUrl =
    "https://wa.me/5527988482268?text=" +
    encodeURIComponent(
      "Olá, quero abrir minha empresa com a Fraga Contabilidade. Pode me ajudar a entender o melhor caminho para abrir meu CNPJ com segurança?",
    );

  const [expanded, setExpanded] = useState(false);
  const [pulsed, setPulsed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? h.scrollTop / max : 0;
      if (p >= 0.25) setExpanded(true);
      if (p >= 0.5 && !pulsed) setPulsed(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pulsed]);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com especialista pelo WhatsApp"
      className={`rdlf-whatsapp-float group fixed bottom-6 right-5 z-[80] flex h-[58px] items-center justify-center rounded-full border border-white/15 bg-[#25d366] shadow-[0_18px_50px_rgba(0,0,0,0.35)] transition-all duration-500 hover:bg-[#1ebe57] md:bottom-8 md:right-8 md:h-[62px] ${
        expanded
          ? "w-auto pl-3 pr-5 md:pl-4 md:pr-6 gap-3"
          : "w-[58px] md:w-[62px]"
      } ${pulsed ? "fraga-cta-pulse-once" : ""}`}
    >
      <motion.span
        className="absolute inset-0 rounded-full border border-[#F5F0E1]/15"
        animate={{ scale: [1, 1.45], opacity: [0.45, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
      />

      <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-[#ffa819] shadow-[0_0_18px_rgba(255,168,25,0.55)]" />

      <span className="relative z-10 flex h-9 w-9 md:h-10 md:w-10 items-center justify-center flex-none">
        <svg
          className="h-8 w-8 fill-white transition duration-300 group-hover:scale-105"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path d="M.33,48.33,3.06,35.62A23.67,23.67,0,0,1,0,24,24.06,24.06,0,0,1,24.12,0h0a23.95,23.95,0,1,1,0,47.89,24.33,24.33,0,0,1-11-2.61ZM13.7,41.08l.67.36a20.3,20.3,0,0,0,9.74,2.49A20,20,0,1,0,4,24a19.78,19.78,0,0,0,2.89,10.3l.41.68L5.52,43Z" />
          <path d="M34.67,31.75C34.22,33,32,34.21,31,34.31S30,35.12,24.5,33s-9-7.77-9.27-8.13S13,21.92,13,19.27a6.08,6.08,0,0,1,1.89-4.5,2,2,0,0,1,1.45-.67c.36,0,.72.05,1,.05s.77-.18,1.22.9,1.54,3.72,1.67,4a1,1,0,0,1,.05.95,3.53,3.53,0,0,1-.54.89c-.28.32-.58.71-.82.95s-.55.56-.24,1.09a16.48,16.48,0,0,0,3,3.73,14.93,14.93,0,0,0,4.37,2.68c.54.26.86.22,1.17-.14s1.36-1.58,1.72-2.12.72-.45,1.22-.26,3.17,1.47,3.71,1.74.9.41,1,.63A4.4,4.4,0,0,1,34.67,31.75Z" />
        </svg>
      </span>

      {expanded && (
        <span className="relative z-10 whitespace-nowrap text-white text-sm font-medium tracking-tight animate-[fade-in_0.35s_ease-out]">
          Abrir CNPJ com especialista
        </span>
      )}
    </a>
  );
}
