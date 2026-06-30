import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: "button" | "a";
    strength?: number;
    children: React.ReactNode;
  };

export const MagneticButton = React.forwardRef<HTMLElement, Props>(
  ({ className, children, as: Tag = "button", strength = 0.18, ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
      const el = localRef.current;
      if (!el || typeof window === "undefined") return;
      if (window.matchMedia("(pointer: coarse)").matches) return;

      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        gsap.to(el, {
          x: x * strength,
          y: y * strength,
          scale: 1.035,
          ease: "power3.out",
          duration: 0.45,
        });
      };
      const onLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          scale: 1,
          ease: "elastic.out(1, 0.35)",
          duration: 1.1,
        });
      };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    }, [strength]);

    const setRef = (node: HTMLElement | null) => {
      localRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
    };

    return React.createElement(
      Tag,
      {
        ref: setRef,
        className: cn(
          "relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-medium text-bone backdrop-blur-xl transition-colors hover:border-[color:var(--gold)]/60 hover:bg-white/[0.08] will-change-transform",
          className,
        ),
        ...props,
      },
      children,
    );
  },
);
MagneticButton.displayName = "MagneticButton";
