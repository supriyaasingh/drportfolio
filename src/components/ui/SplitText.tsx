import { motion, useReducedMotion } from "motion/react";
import type { ElementType } from "react";
import { EASE } from "./motion";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  /** Words (by index) rendered in the accent style. */
  accentWords?: number[];
  accentClassName?: string;
  delay?: number;
  stagger?: number;
  /** Animate when scrolled into view instead of on mount. */
  inView?: boolean;
  id?: string;
  /** When inView is false, animation plays once this becomes true. */
  play?: boolean;
};

/**
 * Masked word reveal: each word rises from behind an invisible line mask
 * with a slight rotation, giving headings an editorial, typeset feel.
 */
export function SplitText({
  text,
  as: Tag = "h2",
  className,
  accentWords = [],
  accentClassName = "italic text-gold-deep",
  delay = 0,
  stagger = 0.06,
  inView = true,
  id,
  play = true,
}: Props) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const animateProps = inView
    ? { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } }
    : { initial: "hidden", animate: play ? "show" : "hidden" };

  return (
    <Tag id={id} className={className} aria-label={text}>
      <motion.span
        aria-hidden
        className="inline"
        {...animateProps}
        variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      >
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span
              className={`inline-block will-change-transform ${accentWords.includes(i) ? accentClassName : ""}`}
              variants={{
                hidden: reduce ? { opacity: 0 } : { y: "110%", rotate: 4, opacity: 0 },
                show: {
                  y: "0%",
                  rotate: 0,
                  opacity: 1,
                  transition: { duration: reduce ? 0.3 : 1.05, ease: EASE },
                },
              }}
            >
              {w}
            </motion.span>
            {i < words.length - 1 && " "}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
