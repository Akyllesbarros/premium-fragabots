import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "top", label: "Início" },
  { id: "jornada-cnpj", label: "Processo" },
  { id: "servicos", label: "Serviços" },
  { id: "planos", label: "Planos" },
  { id: "sobre", label: "Sobre" },
  { id: "depoimentos", label: "Depoimentos" },
  { id: "faq", label: "FAQ" },
  { id: "contato", label: "Falar agora" },
];

const WA_URL =
  "https://wa.me/5527988482268?text=" +
  encodeURIComponent(
    "Olá, quero abrir minha empresa com a Fraga Contabilidade. Pode me ajudar a entender o melhor caminho para abrir meu CNPJ com segurança?",
  );

/**
 * Premium scroll & interaction layer (Fraga — Layer 2)
 *  - Top gold scroll progress bar
 *  - IntersectionObserver reveal for `.reveal-on-scroll`
 *  - Desktop mouse glow
 *  - Subtle parallax for `[data-parallax]`
 *  - Desktop section navigator (dots) with active state + smooth scroll
 *  - Spotlight-card cursor light (updates --mouse-x / --mouse-y)
 *  - Mobile sticky CTA appearing after 35% scroll, hiding near footer
 *  Respects prefers-reduced-motion.
 */
export function ScrollEffects() {
  const [scrolledPast, setScrolledPast] = useState(false); // >=25% scroll
  const [showMobileCta, setShowMobileCta] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- Reveal on scroll ---
    const targets = document.querySelectorAll<HTMLElement>(".reveal-on-scroll");
    let revealObs: IntersectionObserver | null = null;
    if (reduce) {
      targets.forEach((el) => el.classList.add("is-visible"));
    } else if ("IntersectionObserver" in window) {
      revealObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObs?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -80px 0px" },
      );
      targets.forEach((el) => revealObs!.observe(el));
    } else {
      targets.forEach((el) => el.classList.add("is-visible"));
    }

    // --- Active section observer (desktop navigator) ---
    let sectionObs: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      const sectionEls = SECTIONS
        .map((s) => document.getElementById(s.id))
        .filter((el): el is HTMLElement => !!el);
      sectionObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActiveSection(e.target.id);
          });
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
      );
      sectionEls.forEach((el) => sectionObs!.observe(el));
    }

    // --- Scroll progress + parallax + sticky-cta trigger ---
    const bar = document.getElementById("fraga-scroll-progress");
    let rafScroll = 0;
    const onScroll = () => {
      if (rafScroll) return;
      rafScroll = requestAnimationFrame(() => {
        rafScroll = 0;
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const p = max > 0 ? h.scrollTop / max : 0;
        if (bar) bar.style.transform = `scaleX(${p})`;
        setScrolledPast(p >= 0.25);
        // Hide mobile CTA near footer (last 12%)
        setShowMobileCta(p >= 0.35 && p < 0.9);
        if (!reduce) {
          const els = document.querySelectorAll<HTMLElement>("[data-parallax]");
          els.forEach((el) => {
            const speed = parseFloat(el.dataset.parallax || "0.08");
            const rect = el.getBoundingClientRect();
            const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
            el.style.transform = `translate3d(0, ${(-offset).toFixed(1)}px, 0)`;
          });
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    // --- Desktop-only interactions: mouse glow + spotlight cards ---
    const isDesktop =
      window.matchMedia("(min-width: 1024px)").matches &&
      !window.matchMedia("(pointer: coarse)").matches;
    const glow = document.getElementById("fraga-mouse-glow");
    let rafMouse = 0;
    let mx = 0;
    let my = 0;
    const onMouse = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (rafMouse) return;
      rafMouse = requestAnimationFrame(() => {
        rafMouse = 0;
        if (glow) {
          glow.style.transform = `translate3d(${mx - 300}px, ${my - 300}px, 0)`;
          glow.style.opacity = "1";
        }
      });
    };
    const spotlightMove = (e: MouseEvent) => {
      const card = (e.currentTarget as HTMLElement) ?? null;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    };
    const spotlightCards: HTMLElement[] = [];
    if (isDesktop && !reduce) {
      if (glow) window.addEventListener("mousemove", onMouse, { passive: true });
      document
        .querySelectorAll<HTMLElement>(".spotlight-card")
        .forEach((el) => {
          el.addEventListener("mousemove", spotlightMove as EventListener);
          spotlightCards.push(el);
        });
    }

    return () => {
      revealObs?.disconnect();
      sectionObs?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("mousemove", onMouse);
      spotlightCards.forEach((el) =>
        el.removeEventListener("mousemove", spotlightMove as EventListener),
      );
      if (rafScroll) cancelAnimationFrame(rafScroll);
      if (rafMouse) cancelAnimationFrame(rafMouse);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div
        aria-hidden
        className="fixed top-0 left-0 right-0 z-[70] h-[2px] pointer-events-none"
      >
        <div
          id="fraga-scroll-progress"
          className="h-full w-full origin-left bg-gradient-to-r from-[color:var(--gold)] via-[color:var(--gold-light)] to-[color:var(--gold)] shadow-[0_0_10px_rgba(255,168,25,0.55)]"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* Mouse glow */}
      <div
        id="fraga-mouse-glow"
        aria-hidden
        className="hidden lg:block fixed top-0 left-0 z-[5] pointer-events-none opacity-0 transition-opacity duration-500 will-change-transform"
        style={{
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle at center, rgba(255,168,25,0.10) 0%, rgba(54,162,172,0.08) 35%, transparent 65%)",
          filter: "blur(20px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Desktop section navigator */}
      <nav
        aria-label="Navegação de seções"
        className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-[55] flex-col items-end gap-3"
      >
        {SECTIONS.map((s) => {
          const active = activeSection === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollTo(s.id)}
              aria-label={`Ir para ${s.label}`}
              aria-current={active ? "true" : undefined}
              className="group flex items-center gap-2 cursor-pointer"
            >
              <span
                className={`text-[10px] tracking-[0.25em] uppercase whitespace-nowrap opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 ${
                  active ? "text-[color:var(--gold)]" : "text-bone/70"
                }`}
              >
                {s.label}
              </span>
              <span
                className={`block rounded-full transition-all duration-300 ${
                  active
                    ? "h-2.5 w-2.5 bg-[color:var(--gold)] shadow-[0_0_10px_rgba(255,168,25,0.6)]"
                    : "h-1.5 w-1.5 bg-white/35 group-hover:bg-white/70"
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* Mobile sticky CTA */}
      <div
        aria-hidden={!showMobileCta}
        className={`lg:hidden fixed inset-x-0 bottom-0 z-[75] transition-transform duration-500 ease-out ${
          showMobileCta ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-3 mb-3 rounded-2xl border border-[color:var(--gold)]/25 bg-[#0f3a3f]/95 backdrop-blur-xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] px-4 py-3 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[color:var(--gold-light)]/90">
              Fraga Contabilidade
            </p>
            <p className="text-[13px] text-bone font-medium leading-tight mt-0.5 truncate">
              Abrir CNPJ com especialista
            </p>
          </div>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shiny-cta shiny-cta--sm !py-2 !px-4 whitespace-nowrap"
          >
            <span className="shiny-cta__label">Falar agora</span>
          </a>
        </div>
      </div>

      {/* Signal to floating WA that page has been consumed */}
      <span
        id="fraga-scrolled-past"
        aria-hidden
        data-active={scrolledPast ? "true" : "false"}
        className="hidden"
      />
    </>
  );
}
