import { motion, useReducedMotion } from "motion/react";

const ECG =
  "M0 40 H120 L132 40 L140 28 L148 40 H170 L180 40 L188 6 L198 70 L208 32 L216 40 H262 L276 40 C282 30 294 30 300 40 H420 L432 40 L440 28 L448 40 H470 L480 40 L488 6 L498 70 L508 32 L516 40 H562 L576 40 C582 30 594 30 600 40 H720";

/**
 * Electrocardiogram trace that draws itself, followed by a soft glowing
 * pulse that travels along it on a loop.
 */
export function PulseLine({
  className = "",
  loop = true,
  delay = 0,
  inView = true,
}: {
  className?: string;
  loop?: boolean;
  delay?: number;
  inView?: boolean;
}) {
  const reduce = useReducedMotion();
  const trigger = inView ? { whileInView: { pathLength: 1, opacity: 1 }, viewport: { once: true } } : { animate: { pathLength: 1, opacity: 1 } };
  return (
    <svg viewBox="0 0 720 80" fill="none" aria-hidden className={className} preserveAspectRatio="none">
      <motion.path
        d={ECG}
        stroke="currentColor"
        strokeOpacity=".35"
        strokeWidth="1.5"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0 }}
        {...trigger}
        transition={{ duration: 2.2, delay, ease: "easeInOut" }}
      />
      {!reduce && loop && (
        <motion.path
          d={ECG}
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0.12, pathOffset: 0, opacity: 0 }}
          animate={{ pathOffset: [0, 1], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4, delay: delay + 2, repeat: Infinity, ease: "linear", times: [0, 0.05, 0.9, 1] }}
        />
      )}
    </svg>
  );
}

/** Precision-instrument style rings with tick marks and plus markers. */
export function Rings({ className }: { className?: string }) {
  const ticks = Array.from({ length: 72 });
  const plus = Array.from({ length: 4 });
  return (
    <svg viewBox="0 0 400 400" fill="none" aria-hidden className={className}>
      <g stroke="currentColor">
        <circle cx="200" cy="200" r="196" strokeDasharray="1 7" />
        <circle cx="200" cy="200" r="170" strokeWidth="1" />
        <circle cx="200" cy="200" r="120" strokeWidth="1" strokeDasharray="4 6" />
        <circle cx="200" cy="200" r="70" strokeWidth="1" />
        {ticks.map((_, i) => (
          <line
            key={i}
            x1="200"
            y1="30"
            x2="200"
            y2={i % 6 === 0 ? 44 : 37}
            strokeWidth={i % 6 === 0 ? 1.5 : 1}
            transform={`rotate(${i * 5} 200 200)`}
          />
        ))}
        {plus.map((_, i) => (
          <path key={`p${i}`} d="M200 72v16M192 80h16" strokeWidth="1.5" transform={`rotate(${i * 90 + 45} 200 200)`} />
        ))}
      </g>
    </svg>
  );
}

/** A medical plus mark. */
export function PlusMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3Z" fill="currentColor" />
    </svg>
  );
}

/** Divider: line – plus – line. */
export function Divider({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 16" fill="none" aria-hidden className={className}>
      <path d="M0 8h48M72 8h48" stroke="currentColor" strokeWidth="1" />
      <path d="M57 3h6v2.5h2.5v5H63V13h-6v-2.5h-2.5v-5H57V3Z" fill="currentColor" />
    </svg>
  );
}
