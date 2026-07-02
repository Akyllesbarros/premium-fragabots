import { useEffect } from "react";

/**
 * Premium scroll layer:
 *  - Top scroll progress bar (gold)
 *  - IntersectionObserver reveal for `.reveal-on-scroll` elements
 *  - Desktop-only mouse glow (teal/gold radial)
 *  - Subtle parallax for `[data-parallax]` elements
 * Respects prefers-reduced-motion.
 */
export function ScrollEffects() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- Reveal on scroll ---
    const targets = document.querySelectorAll<HTMLElement>(".reveal-on-scroll");
    let observer: IntersectionObserver | null = null;
    if (reduce) {
      targets.forEach((el) => el.classList.add("is-visible"));
    } else if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -80px 0px" },
      );
      targets.forEach((el) => observer!.observe(el));
    } else {
      targets.forEach((el) => el.classList.add("is-visible"));
    }

    // --- Scroll progress bar ---
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
        // Parallax
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

    // --- Mouse glow (desktop only) ---
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
    if (isDesktop && !reduce && glow) {
      window.addEventListener("mousemove", onMouse, { passive: true });
    }

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("mousemove", onMouse);
      if (rafScroll) cancelAnimationFrame(rafScroll);
      if (rafMouse) cancelAnimationFrame(rafMouse);
    };
  }, []);

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
    </>
  );
}
