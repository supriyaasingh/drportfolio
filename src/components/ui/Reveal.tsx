import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { EASE } from "./motion";

type Direction = "up" | "left" | "right" | "none";

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 32,
  blur = false,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  distance?: number;
  blur?: boolean;
  as?: "div" | "p" | "li" | "span";
}) {
  const reduce = useReducedMotion();
  const offset =
    reduce || direction === "none"
      ? {}
      : direction === "up"
        ? { y: distance }
        : { x: direction === "left" ? -distance : distance };
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, ...offset, ...(blur && !reduce ? { filter: "blur(8px)" } : {}) }}
      whileInView={{ opacity: 1, x: 0, y: 0, ...(blur && !reduce ? { filter: "blur(0px)" } : {}) }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

/** Thin gold rule that draws itself from the left. */
export function DrawLine({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.span
      aria-hidden
      className={`block h-px origin-left bg-gold ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay, ease: EASE }}
    />
  );
}
