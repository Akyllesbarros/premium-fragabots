import { ReactNode, useEffect, useState } from "react";
import { AnimatePresence, motion, PanInfo, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type MobileCinematicStepperProps<T> = {
  items: T[];
  activeIndex?: number;
  onChange?: (index: number) => void;
  renderItem: (item: T, index: number) => ReactNode;
  autoPlay?: boolean;
  interval?: number;
  label?: string;
  className?: string;
};

export function MobileCinematicStepper<T>({
  items,
  activeIndex,
  onChange,
  renderItem,
  autoPlay = true,
  interval = 8200,
  label = "Navegar conteúdo",
  className = "",
}: MobileCinematicStepperProps<T>) {
  const shouldReduceMotion = useReducedMotion();
  const [internalIndex, setInternalIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const currentIndex = activeIndex ?? internalIndex;
  const total = items.length;

  function updateIndex(nextIndex: number) {
    const normalized = ((nextIndex % total) + total) % total;
    if (onChange) onChange(normalized);
    else setInternalIndex(normalized);
  }

  function goPrev() {
    setPaused(true);
    updateIndex(currentIndex - 1);
  }
  function goNext() {
    setPaused(true);
    updateIndex(currentIndex + 1);
  }

  function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    const swipePower = Math.abs(info.offset.x) * info.velocity.x;
    if (swipePower < -4500 || info.offset.x < -70) return goNext();
    if (swipePower > 4500 || info.offset.x > 70) return goPrev();
  }

  useEffect(() => {
    if (!autoPlay || paused || shouldReduceMotion || total <= 1) return;
    const timer = window.setInterval(() => {
      updateIndex(currentIndex + 1);
    }, interval);
    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, paused, shouldReduceMotion, total, interval, currentIndex]);

  const activeItem = items[currentIndex];

  return (
    <div
      className={`relative mx-auto w-full max-w-xl md:max-w-2xl lg:max-w-none ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label={label}
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.015] backdrop-blur-xl">
        <div className="pointer-events-none absolute -top-24 -right-20 h-56 w-56 rounded-full bg-[color:var(--petrol)]/35 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-[#073534]/30 blur-3xl" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            drag={total > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={handleDragEnd}
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, x: 42, scale: 0.98, filter: "blur(14px)" }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }
            }
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, x: -34, scale: 0.98, filter: "blur(10px)" }
            }
            transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-h-[420px] touch-pan-y p-6 sm:p-7"
          >
            {renderItem(activeItem, currentIndex)}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Anterior"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-bone backdrop-blur-xl transition hover:border-[color:var(--gold)]/60 hover:bg-white/[0.08] active:scale-95"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-1.5">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                setPaused(true);
                updateIndex(index);
              }}
              aria-label={`Ir para item ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-[#F5F0E1]"
                  : "w-1.5 bg-[#F5F0E1]/25"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Próximo"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-bone backdrop-blur-xl transition hover:border-[color:var(--gold)]/60 hover:bg-white/[0.08] active:scale-95"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 text-center text-[10px] uppercase tracking-[0.24em] text-bone/40">
        deslize ou use as setas
      </div>
    </div>
  );
}
