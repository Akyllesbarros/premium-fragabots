import type { ReactNode } from "react";

type Props = {
  bg?: string;
  id?: string;
  layer?: number;
  flat?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * ScrollStackSection — Curtis-style rising layer wrapper.
 * Each section enters with a rounded top edge and stacks above the previous
 * one via negative margin + z-index, producing a layered scroll experience.
 * Respects prefers-reduced-motion via .stack-section CSS rules.
 */
export function ScrollStackSection({
  bg = "",
  id,
  layer = 1,
  flat = false,
  className = "",
  children,
}: Props) {
  return (
    <section
      id={id}
      data-layer={layer}
      className={`stack-section relative ${flat ? "stack-section--flat" : ""} ${bg} ${className}`}
    >
      {children}
    </section>
  );
}