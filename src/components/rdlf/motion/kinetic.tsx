import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { type MouseEvent, type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

/* ScrollReveal — entrada direcional com blur-to-sharp */
export function ScrollReveal({
  children,
  delay = 0,
  className,
  direction = "up",
  distance = 42,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const d = direction === "up" || direction === "left" ? distance : -distance;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, filter: "blur(12px)", [axis]: d }}
      animate={inView ? { opacity: 1, filter: "blur(0px)", [axis]: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* SplitTextReveal — palavras com stagger e highlight opcional */
export function SplitTextReveal({
  text,
  className,
  highlight = [],
  italicHighlight = true,
}: {
  text: string;
  className?: string;
  highlight?: string[];
  italicHighlight?: boolean;
}) {
  const words = text.split(" ");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => {
        const clean = word.replace(/[.,;:!?]/g, "");
        const hl = highlight.includes(clean);
        return (
          <motion.span
            key={`${word}-${i}`}
            className={cn(
              "inline-block mr-[0.22em]",
              hl && italicHighlight && "italic text-[color:var(--gold-light)]",
            )}
            initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.06 * i, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        );
      })}
    </span>
  );
}

/* MagneticButton */
export function MagneticButton({
  children,
  className,
  onClick,
  href,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  function onMove(e: MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.25);
    y.set((e.clientY - r.top - r.height / 2) * 0.25);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  const inner = (
    <motion.span
      style={{ x: sx, y: sy }}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-[color:var(--gold)]/50 bg-bone px-7 py-3.5 text-sm font-medium text-ink transition-colors",
        className,
      )}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      <span className="absolute inset-0 translate-y-full bg-[color:var(--gold-light)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} onMouseMove={onMove} onMouseLeave={reset} className="inline-block">
        {inner}
      </a>
    );
  }
  return (
    <button onMouseMove={onMove} onMouseLeave={reset} onClick={onClick} className="inline-block">
      {inner}
    </button>
  );
}

/* FloatingBadge */
export function FloatingBadge({
  label,
  delay = 0,
  className,
}: {
  label: string;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(
        "rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-bone/75 backdrop-blur-xl",
        className,
      )}
      initial={{ opacity: 0, scale: 0.9, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05, borderColor: "rgba(7,53,52,0.55)" }}
    >
      {label}
    </motion.div>
  );
}

/* ParallaxLayer */
export function ParallaxLayer({
  children,
  className,
  offset = 80,
}: {
  children: ReactNode;
  className?: string;
  offset?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/* SectionTransition — pequena costura entre cenas */
export function SectionTransition() {
  return (
    <div className="pointer-events-none relative h-24 overflow-hidden">
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--gold)]/10 blur-3xl" />
    </div>
  );
}
