import { motion, useReducedMotion } from "motion/react";

/**
 * Custom medical line icons for the five service areas. Each path draws
 * itself when the card reveals, then stays as crisp line art.
 */
const paths: Record<string, string[]> = {
  // Stethoscope — general consultations
  general: [
    "M11 6v11a8 8 0 0 0 16 0V6",
    "M8 6h6M24 6h6",
    "M19 25v6a8 8 0 0 0 16 0v-5",
    "M32 23a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
  ],
  // Shield with plus — prevention
  preventive: ["M24 5l15 6v11c0 10-6.5 17-15 21C15.5 39 9 32 9 22V11l15-6Z", "M24 16v12", "M18 22h12"],
  // Thermometer — common illnesses
  illness: [
    "M21 8a3 3 0 0 1 6 0v19a7 7 0 1 1-6 0V8Z",
    "M24 18v14",
    "M32 12h5M32 17h5M32 22h5",
  ],
  // Clipboard with pulse — health assessments
  assessment: ["M15 9h-4v34h26V9h-4", "M18 5h12v7H18z", "M14 28h6l3-7 4 12 3-6h4"],
  // Heart with activity — lifestyle guidance
  lifestyle: [
    "M24 40S7 30 7 17a9 9 0 0 1 17-4 9 9 0 0 1 17 4c0 13-17 23-17 23Z",
    "M11 24h7l3-5 4 9 3-4h9",
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
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}
