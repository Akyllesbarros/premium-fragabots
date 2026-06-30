import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { type ReactNode, forwardRef } from "react";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("eyebrow inline-flex items-center gap-2", className)}>
      <span className="inline-block h-px w-6 bg-[color:var(--gold)]" />
      {children}
    </div>
  );
}

export function SectionTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn("font-display section-display text-bone", className)}>{children}</h2>
  );
}

type ButtonVariant = "primary" | "ghost" | "outline";
type ButtonProps = HTMLMotionProps<"button"> & {
  variant?: ButtonVariant;
  asLink?: boolean;
  href?: string;
};

export const PremiumButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, children, ...props }, ref) => {
    const base =
      "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 will-change-transform";
    const variants: Record<ButtonVariant, string> = {
      primary:
        "bg-bone text-ink hover:bg-[color:var(--gold-light)] hover:-translate-y-0.5 shadow-[0_10px_40px_-10px_oklch(0.94_0.012_85/0.4)]",
      outline:
        "border border-white/20 text-bone hover:border-[color:var(--gold)] hover:text-[color:var(--gold-light)]",
      ghost: "text-bone/80 hover:text-bone",
    };
    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0, scale: 0.98 }}
        className={cn(base, variants[variant], className)}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);
PremiumButton.displayName = "PremiumButton";

export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Monogram({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-display text-xl tracking-tight text-bone inline-flex items-baseline gap-[1px]",
        className,
      )}
    >
      <span>R</span>
      <span className="text-[color:var(--gold)]">D</span>
      <span>L</span>
      <span>F</span>
    </span>
  );
}
