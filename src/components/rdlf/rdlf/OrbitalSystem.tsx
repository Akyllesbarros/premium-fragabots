import { motion } from "framer-motion";

const orbit = [
  "Marca",
  "Contratos",
  "Operação",
  "Sócios",
  "Compliance",
  "Conflitos",
];

export function OrbitalSystem() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      {/* outer ring */}
      <motion.div
        className="absolute inset-4 rounded-full border border-white/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[color:var(--gold)]/70" />
      </motion.div>
      {/* mid ring */}
      <motion.div
        className="absolute inset-20 rounded-full border border-[color:var(--gold)]/20 border-dashed"
        animate={{ rotate: -360 }}
        transition={{ duration: 64, repeat: Infinity, ease: "linear" }}
      />
      {/* glow */}
      <div className="absolute inset-1/3 rounded-full bg-[color:var(--gold)]/10 blur-3xl" />

      {/* center */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[color:var(--gold)]/40 bg-ink/70 backdrop-blur-xl shadow-[0_0_80px_rgba(7,53,52,0.25)]"
      >
        <span className="font-display italic text-2xl text-bone" style={{ fontWeight: 400 }}>
          RDLF
        </span>
      </motion.div>

      {/* satellites */}
      {orbit.map((item, i) => {
        const angle = (i / orbit.length) * Math.PI * 2 - Math.PI / 2;
        const r = 200;
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        return (
          <motion.div
            key={item}
            className="absolute left-1/2 top-1/2"
            initial={{ opacity: 0, x: 0, y: 0, scale: 0.6 }}
            animate={{ opacity: 1, x, y, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-xs text-bone/75 backdrop-blur-xl whitespace-nowrap cursor-default"
              whileHover={{
                scale: 1.08,
                borderColor: "rgba(7,53,52,0.6)",
                color: "#F4F0E8",
              }}
            >
              {item}
            </motion.div>
          </motion.div>
        );
      })}

      {/* connecting lines svg */}
      <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="-280 -280 560 560">
        {orbit.map((_, i) => {
          const angle = (i / orbit.length) * Math.PI * 2 - Math.PI / 2;
          const r = 200;
          return (
            <motion.line
              key={i}
              x1="0"
              y1="0"
              x2={Math.cos(angle) * r}
              y2={Math.sin(angle) * r}
              stroke="oklch(0.30 0.045 175 / 0.18)"
              strokeWidth="0.6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.08, duration: 1 }}
            />
          );
        })}
      </svg>
    </div>
  );
}
