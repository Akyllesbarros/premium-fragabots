import {
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

type Intensity = "soft" | "medium" | "strong";

type WorldClassCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
  /** Tailwind radius utility to keep wrapper aligned with inner card. */
  radius?: string;
  intensity?: Intensity;
  /** Force the conic border visible (useful on active panels). */
  alwaysOnBorder?: boolean;
  /** Disable spotlight (use on dense forms). */
  noSpotlight?: boolean;
};

/**
 * WorldClassCard — proprietary RDLF card augmentation layer.
 *
 * It is a non-invasive wrapper: keeps the inner card's exact size, padding
 * and background. Adds three premium layers on top:
 *   1. Conic "living border" that wakes on hover (rdlf-world-card-border)
 *   2. Pointer-tracking spotlight (off-white wash, subtle)
 *   3. Hairline corner ticks + 1px noise grain for texture
 */
export function WorldClassCard({
  children,
  className,
  radius = "rounded-3xl",
  intensity = "soft",
  alwaysOnBorder = false,
  noSpotlight = false,
  style,
  ...rest
}: WorldClassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50, active: false });

  const glow =
    intensity === "strong" ? 0.22 : intensity === "medium" ? 0.16 : 0.1;

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
      active: true,
    });
  }
  function onPointerLeave() {
    setPos((p) => ({ ...p, active: false }));
  }

  const vars: CSSProperties = {
    ["--rdlf-spot-x" as never]: `${pos.x}%`,
    ["--rdlf-spot-y" as never]: `${pos.y}%`,
    ["--rdlf-glow-opacity" as never]: glow,
    ...style,
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={vars}
      className={cn(
        "rdlf-world-card-border group/wc relative isolate h-full",
        radius,
        alwaysOnBorder && "rdlf-world-card-border--always",
        className,
      )}
      {...rest}
    >
      {/* spotlight wash */}
      {!noSpotlight && (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-500 group-hover/wc:opacity-100 group-focus-within/wc:opacity-100",
            radius,
          )}
          style={{
            background:
              "radial-gradient(280px circle at var(--rdlf-spot-x,50%) var(--rdlf-spot-y,50%), rgba(245,240,225,var(--rdlf-glow-opacity,0.12)), transparent 60%)",
            mixBlendMode: "screen",
          }}
        />
      )}

      {/* fine grain noise */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 z-[1] opacity-[0.05] mix-blend-overlay",
          radius,
        )}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* corner ticks — sutil, 4 cantos */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-3 top-3 z-[2] h-2 w-2 border-l border-t border-bone/15 opacity-0 transition-opacity duration-500 group-hover/wc:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute right-3 top-3 z-[2] h-2 w-2 border-r border-t border-bone/15 opacity-0 transition-opacity duration-500 group-hover/wc:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute left-3 bottom-3 z-[2] h-2 w-2 border-l border-b border-bone/15 opacity-0 transition-opacity duration-500 group-hover/wc:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute right-3 bottom-3 z-[2] h-2 w-2 border-r border-b border-bone/15 opacity-0 transition-opacity duration-500 group-hover/wc:opacity-100"
      />

      {/* orange accent micro-dot */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-4 z-[2] h-[5px] w-[5px] rounded-full bg-[color:var(--rdlf-orange)] opacity-0 shadow-[0_0_10px_rgba(255,49,49,0.6)] transition-opacity duration-500 group-hover/wc:opacity-80"
      />

      {/* content */}
      <div className={cn("relative z-[3] h-full", radius)}>{children}</div>
    </div>
  );
}
