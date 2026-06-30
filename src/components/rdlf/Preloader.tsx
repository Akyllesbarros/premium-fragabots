import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import rdlfLogo from "@/assets/fraga-logo.png.asset.json";

export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      console.log("[Fraga] Preloader completo");
      setDone(true);
    }, 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
        >
          <div className="flex flex-col items-center gap-4">
            <motion.img
              src={rdlfLogo.url}
              alt="Fraga Contabilidade"
              initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="h-auto w-[90px] sm:w-[110px] md:w-[130px] lg:w-[150px] select-none"
              draggable={false}
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-px bg-[color:var(--gold)]"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="text-[0.6rem] tracking-[0.3em] uppercase text-[color:var(--gold)]"
              style={{ fontWeight: 400 }}
            >
              Contabilidade estratégica
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
