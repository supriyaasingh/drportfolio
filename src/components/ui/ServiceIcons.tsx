import { motion, useReducedMotion } from "motion/react";

/**
 * Custom line icons for the five service areas. Each path draws itself
 * when the card reveals, then stays as crisp 1.5px line art.
 */
const paths: Record<string, string[]> = {
  // Mortar & pestle with a sprig — classical Ayurvedic preparation
  ayurvedic: [
    "M8 22h32",
    "M10 22c0 9 6 15 14 15s14-6 14-15",
    "M18 37l-2 5h16l-2-5",
    "M27 21L36 6",
    "M36 6c2-1 4 0 4 2",
    "M14 16c-3-4-2-9 2-11 2 4 1 9-2 11Z",
    "M14 16c4-2 8-1 9 2-4 2-8 1-9-2Z",
  ],
  // Head profile with a calm lotus inside — mind & stress
  stress: [
    "M30 42v-6c5-1 9-5 9-11 0-9-7-16-16-16S7 16 7 25c0 4 2 7 4 9v8",
    "M23 29c-3-2-4-5-3-8 3 1 4 4 3 8Z",
    "M23 29c3-2 4-5 3-8-3 1-4 4-3 8Z",
    "M23 29c-5 0-8-2-9-5 4-1 7 1 9 5Z",
    "M23 29c5 0 8-2 9-5-4-1-7 1-9 5Z",
  ],
  // Bowl with leaf and steam — digestion & nourishment
  digestive: [
    "M6 26h36",
    "M8 26c1 9 8 15 16 15s15-6 16-15",
    "M18 41h12",
    "M17 19c-2-3 2-5 0-8",
    "M24 19c-2-3 2-5 0-8",
    "M31 19c-2-3 2-5 0-8",
    "M34 26c0-6 4-10 9-10 0 6-4 10-9 10Z",
  ],
  // Spine / joints with a gentle pulse — chronic pain
  pain: [
    "M24 5v38",
    "M18 9h12M17 16h14M18 23h12M17 30h14M18 37h12",
    "M4 24h6l3-6 4 12 3-6h2",
    "M44 24h-6l-2 4",
  ],
  // Sun over rising leaves — daily rhythm & prevention
  lifestyle: [
    "M17 20a7 7 0 1 0 14 0a7 7 0 1 0 -14 0",
    "M24 6v3M13 10l2 2M35 10l-2 2M8 20h3M37 20h3",
    "M6 40h36",
    "M24 40c0-6-4-10-10-10 0 6 4 10 10 10Z",
    "M24 40c0-6 4-10 10-10 0 6-4 10-10 10Z",
  ],
};

export function ServiceIcon({ name, className = "" }: { name: string; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden className={className}>
      {(paths[name] ?? []).map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 + i * 0.12, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}
