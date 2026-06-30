import { motion } from "framer-motion";

type Props = { label?: string };

export function WorldClassSectionBridge({ label = "Fraga" }: Props) {
  return (
    <div
      aria-hidden
      className="relative w-full h-32 md:h-40 overflow-hidden pointer-events-none select-none"
    >
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-px w-[60%] bg-gradient-to-r from-transparent via-[color:var(--gold)]/60 to-transparent origin-center"
      />
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mt-6 text-[10px] uppercase tracking-[0.4em] text-bone/40 font-display"
      >
        {label}
      </motion.span>
    </div>
  );
}
