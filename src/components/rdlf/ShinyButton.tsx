import * as React from "react";
import { cn } from "@/lib/utils";

type CommonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  size?: "md" | "sm";
  block?: boolean;
  ariaLabel?: string;
};

type AnchorProps = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "aria-label"> & {
    href: string;
  };

type ButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> & {
    href?: undefined;
  };

export type ShinyButtonProps = AnchorProps | ButtonProps;

/**
 * Premium Fraga CTA — dark teal fill, animated gold border, subtle shimmer.
 * Renders <a> when `href` is present, otherwise <button>. Respects prefers-reduced-motion.
 */
export const ShinyButton = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ShinyButtonProps
>(function ShinyButton(
  { children, className, variant = "primary", size = "md", block, ariaLabel, ...rest },
  ref,
) {
  const classes = cn(
    "shiny-cta",
    variant === "secondary" && "shiny-cta--secondary",
    size === "sm" && "shiny-cta--sm",
    block && "shiny-cta--block",
    className,
  );

  if ("href" in rest && typeof rest.href === "string") {
    const { href, target, rel, ...anchorRest } = rest as AnchorProps;
    const isExternal = /^https?:\/\//i.test(href);
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target ?? (isExternal ? "_blank" : undefined)}
        rel={rel ?? (isExternal ? "noopener noreferrer" : undefined)}
        aria-label={ariaLabel}
        className={classes}
        {...anchorRest}
      >
        <span className="shiny-cta__label">{children}</span>
      </a>
    );
  }

  const { type, ...buttonRest } = rest as ButtonProps;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type ?? "button"}
      aria-label={ariaLabel}
      className={classes}
      {...buttonRest}
    >
      <span className="shiny-cta__label">{children}</span>
    </button>
  );
});

ShinyButton.displayName = "ShinyButton";