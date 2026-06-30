import { useEffect, useRef, useState, useCallback } from "react";
import type { ReactNode } from "react";

type Props = {
  /** Small uppercase label shown above the headline */
  eyebrow?: string;
  /** Headline — first word receives serif italic accent */
  title: string;
  /** Sub-text shown above the expanding media */
  scrollHint?: string;
  /** Right-side institutional content (CSS composition, no stock image) */
  media?: ReactNode;
  /** Content revealed after the media is fully expanded */
  children: ReactNode;
};

/**
 * FragaScrollExpandMedia
 * Cinematic hero: institutional card centered on screen that expands as the
 * user scrolls within the section. After expansion, the rest of the page
 * scrolls normally. No scroll hijacking outside the section. Mobile uses a
 * simplified static layout. Respects prefers-reduced-motion.
 */
export function ScrollExpandMedia({
  eyebrow = "Fraga Contabilidade · desde 1974",
  title,
  scrollHint = "Role para abrir a experiência",
  media,
  children,
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqMobile = window.matchMedia("(max-width: 767px)");
    const sync = () => setEnabled(!mqReduce.matches && !mqMobile.matches);
    sync();
    mqReduce.addEventListener("change", sync);
    mqMobile.addEventListener("change", sync);
    return () => {
      mqReduce.removeEventListener("change", sync);
      mqMobile.removeEventListener("change", sync);
    };
  }, []);

  const onScroll = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const total = el.offsetHeight - window.innerHeight;
    if (total <= 0) {
      setProgress(0);
      return;
    }
    const scrolled = -rect.top;
    const p = Math.max(0, Math.min(1, scrolled / total));
    setProgress(p);
  }, []);

  useEffect(() => {
    if (!enabled) {
      setProgress(1);
      return;
    }
    let raf = 0;
    const handler = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        onScroll();
        raf = 0;
      });
    };
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    onScroll();
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [enabled, onScroll]);

  // Curve scroll into two phases: 0–0.6 expand, 0.6–1 settle/reveal
  const expand = Math.min(1, progress / 0.6);
  const reveal = Math.max(0, (progress - 0.55) / 0.45);

  // Card grows from ~58vw to 100vw, height from ~62vh to 100vh, radius shrinks.
  const widthPct = 58 + expand * 42;
  const heightVh = 62 + expand * 38;
  const radius = 32 - expand * 28;
  const titleSpread = expand * 1; // 0 → 1 push outward
  const hintOpacity = 1 - expand;
  const overlayDim = 0.18 + expand * 0.22;

  const words = title.split(" ");
  const first = words[0];
  const rest = words.slice(1).join(" ");

  return (
    <div
      ref={sectionRef}
      className="relative bg-[oklch(0.13_0.025_220)]"
      style={{ height: enabled ? "260vh" : "auto" }}
    >
      {/* sticky stage during expansion */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ position: enabled ? "sticky" : "static" }}
      >
        {/* ambient backdrop */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 20% 18%, oklch(0.42 0.12 195 / 0.55), transparent 60%), radial-gradient(55% 45% at 82% 78%, oklch(0.78 0.16 78 / 0.32), transparent 60%), oklch(0.13 0.025 220)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />

        {/* eyebrow */}
        <div
          className="absolute top-28 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.32em] text-white/55 z-20"
          style={{ opacity: 1 - reveal * 0.4 }}
        >
          {eyebrow}
        </div>

        {/* split title */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none z-10">
          <div className="mx-auto max-w-[1400px] px-4 lg:px-8 flex items-center justify-between">
            <h1
              className="font-display font-bold tracking-[-0.04em] leading-[0.9] text-[clamp(2.4rem,7vw,6.5rem)]"
              style={{
                transform: `translate3d(${-titleSpread * 18}vw, 0, 0)`,
                transition: enabled ? "transform 80ms linear" : undefined,
              }}
            >
              <span
                className="italic font-serif text-gradient-gold block"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {first}
              </span>
            </h1>
            <h1
              className="font-display font-bold tracking-[-0.04em] leading-[0.9] text-[clamp(2.4rem,7vw,6.5rem)] text-white text-right max-w-[60%]"
              style={{
                transform: `translate3d(${titleSpread * 14}vw, 0, 0)`,
                transition: enabled ? "transform 80ms linear" : undefined,
              }}
            >
              {rest}
            </h1>
          </div>
        </div>

        {/* expanding media card */}
        <div className="absolute inset-0 flex items-center justify-center z-[5]">
          <div
            className="relative overflow-hidden border border-white/10 shadow-[0_60px_140px_-40px_rgba(0,0,0,0.7)]"
            style={{
              width: `${widthPct}vw`,
              height: `${heightVh}vh`,
              borderRadius: `${radius}px`,
              transition: enabled ? "width 90ms linear, height 90ms linear, border-radius 90ms linear" : undefined,
              background:
                "linear-gradient(135deg, oklch(0.18 0.03 220), oklch(0.16 0.03 220))",
            }}
          >
            {media}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(180deg, transparent 35%, oklch(0.1 0.02 220 / ${overlayDim}) 100%)`,
              }}
            />
          </div>
        </div>

        {/* scroll hint */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/55 text-[10px] uppercase tracking-[0.3em] z-20"
          style={{ opacity: hintOpacity }}
        >
          <span>{scrollHint}</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/55 to-transparent" />
        </div>

        {/* revealed content overlay (fades in at end of expansion) */}
        <div
          className="absolute inset-0 z-30 flex items-end lg:items-center pointer-events-none"
          style={{
            opacity: reveal,
            transform: `translate3d(0, ${(1 - reveal) * 24}px, 0)`,
            transition: enabled ? "opacity 120ms linear, transform 120ms linear" : undefined,
          }}
        >
          <div
            className="w-full pointer-events-auto"
            style={{ visibility: reveal > 0.05 ? "visible" : "hidden" }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}