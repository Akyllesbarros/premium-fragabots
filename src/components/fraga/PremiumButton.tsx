import { forwardRef, useRef, useCallback } from "react";
import type { ReactNode, MouseEvent } from "react";
import { trackConversion } from "@/lib/whatsapp";

type Variant = "primary" | "secondary" | "ghost" | "gold";
type Size = "md" | "lg";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  trailingIcon?: ReactNode;
  className?: string;
  trackLocation?: string;
  trackMessage?: string;
};

type AnchorProps = CommonProps & {
  href: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  type?: never;
};
type ButtonProps = CommonProps & {
  href?: undefined;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit";
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-glow",
  gold:
    "bg-gradient-accent text-accent-foreground shadow-gold hover:shadow-glow",
  secondary:
    "glass text-foreground hover:bg-white hover:text-primary-deep",
  ghost:
    "bg-transparent text-foreground/80 hover:text-primary",
};

const sizeClasses: Record<Size, string> = {
  md: "px-6 py-3 text-sm rounded-xl",
  lg: "px-8 py-4 text-base rounded-2xl",
};

function useMagnetic() {
  const ref = useRef<HTMLElement | null>(null);
  const onMove = useCallback((e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.setProperty("--mx", `${x * 0.18}px`);
    el.style.setProperty("--my", `${y * 0.25}px`);
    el.style.setProperty("--gx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--gy", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  }, []);
  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", "0px");
    el.style.setProperty("--my", "0px");
  }, []);
  return { ref, onMove, onLeave };
}

const base =
  "fraga-btn group relative inline-flex items-center justify-center gap-2 font-semibold isolate select-none " +
  "transition-[transform,box-shadow,background] duration-300 ease-out will-change-transform " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
  "disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

export const PremiumButton = forwardRef<HTMLElement, AnchorProps | ButtonProps>(
  function PremiumButton(props, _ref) {
    const {
      children,
      variant = "primary",
      size = "md",
      icon,
      trailingIcon,
      className = "",
      trackLocation,
      trackMessage,
      ...rest
    } = props;
    const mag = useMagnetic();

    const handleClick = (e: MouseEvent<HTMLElement>) => {
      if (trackLocation) trackConversion(trackLocation, trackMessage);
      // @ts-expect-error union event target
      props.onClick?.(e);
    };

    const cls = `${base} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
    const inner = (
      <>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(180px circle at var(--gx,50%) var(--gy,50%), rgba(255,255,255,0.28), transparent 60%)",
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)",
            backgroundSize: "200% 100%",
            animation: "fraga-shine 1.6s ease-in-out infinite",
            mixBlendMode: "overlay",
          }}
        />
        <span className="relative flex items-center gap-2">
          {icon}
          <span>{children}</span>
          {trailingIcon}
        </span>
      </>
    );

    const style = {
      transform: "translate(var(--mx,0), var(--my,0))",
    } as React.CSSProperties;

    if ("href" in props && props.href) {
      const { href, ...anchorRest } = rest as Omit<AnchorProps, keyof CommonProps>;
      return (
        <a
          {...anchorRest}
          href={href}
          target="_blank"
          rel="noopener"
          ref={(el) => {
            mag.ref.current = el;
          }}
          onMouseMove={mag.onMove}
          onMouseLeave={mag.onLeave}
          onClick={handleClick}
          className={cls}
          style={style}
        >
          {inner}
        </a>
      );
    }

    const { type = "button", ...btnRest } = rest as Omit<ButtonProps, keyof CommonProps>;
    return (
      <button
        {...btnRest}
        type={type}
        ref={(el) => {
          mag.ref.current = el;
        }}
        onMouseMove={mag.onMove}
        onMouseLeave={mag.onLeave}
        onClick={handleClick}
        className={cls}
        style={style}
      >
        {inner}
      </button>
    );
  },
);