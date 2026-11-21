import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { EASE_IN_OUT } from "./ui/motion";

/**
 * Brief branded intro: a monogram traces itself inside a ring, then
 * the curtain lifts away to reveal the hero. Kept under ~1.6s.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), reduce ? 200 : 1500);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: reduce ? 0.2 : 0.95, ease: EASE_IN_OUT }}
          role="status"
          aria-label="Loading"
        >
          <motion.div
            className="flex flex-col items-center gap-5"
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            <svg viewBox="0 0 120 120" className="h-24 w-24" fill="none" aria-hidden>
              <motion.circle
                cx="60"
                cy="60"
                r="56"
                stroke="#2BB3A3"
                strokeWidth="1"
                initial={{ pathLength: 0, rotate: -90 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: EASE_IN_OUT }}
                style={{ originX: "50%", originY: "50%" }}
              />
              <motion.text
                x="60"
                y="72"
                textAnchor="middle"
                fontFamily="Plus Jakarta Sans Variable, sans-serif"
                fontSize="34"
                fontWeight="700"
                fill="#F5F8FA"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                AS
              </motion.text>
            </svg>
            <motion.p
              className="eyebrow text-teal"
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ duration: 1.1, delay: 0.2 }}
            >
              General Physician
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
