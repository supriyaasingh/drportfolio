import { motion, useReducedMotion } from "motion/react";
import type { SVGProps } from "react";

/** Single elongated leaf with a central vein. */
export function Leaf({ className, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 220" fill="none" aria-hidden className={className} {...rest}>
      <path
        d="M60 6C98 46 112 102 96 152c-9 28-24 48-36 62-12-14-27-34-36-62C8 102 22 46 60 6Z"
        fill="currentColor"
      />
      <path d="M60 18v196" stroke="rgba(255,255,255,.28)" strokeWidth="1.6" />
      {[44, 72, 100, 128, 156].map((y, i) => (
        <g key={y} stroke="rgba(255,255,255,.2)" strokeWidth="1.2">
          <path d={`M60 ${y + 10}C${48 - i} ${y + 2} ${38 - i} ${y - 4} ${30 - i} ${y - 14}`} />
          <path d={`M60 ${y + 10}C${72 + i} ${y + 2} ${82 + i} ${y - 4} ${90 + i} ${y - 14}`} />
        </g>
      ))}
    </svg>
  );
}

/** Line-art branch that draws itself when it enters the viewport. */
export function Branch({ className, delay = 0 }: { className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  const leaves = [
    { d: "M70 210c-24-6-40-22-44-46 22 2 40 18 44 46Z" },
    { d: "M78 170c22-10 38-28 40-52-22 6-38 24-40 52Z" },
    { d: "M66 132c-22-8-36-26-38-50 22 4 36 22 38 50Z" },
    { d: "M74 96c20-10 32-28 32-50-20 6-32 24-32 50Z" },
    { d: "M68 62c-16-8-26-22-26-40 16 4 26 20 26 40Z" },
  ];
  return (
    <svg viewBox="0 0 150 300" fill="none" aria-hidden className={className}>
      <motion.path
        d="M72 296C64 240 82 200 70 150 60 108 78 70 68 10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        initial={{ pathLength: reduce ? 1 : 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, delay, ease: "easeInOut" }}
      />
      {leaves.map((l, i) => (
        <motion.path
          key={i}
          d={l.d}
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
          initial={{ pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: delay + 0.5 + i * 0.22, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}

/** Lotus-inspired mandala ring used as a slow-rotating background motif. */
export function Mandala({ className }: { className?: string }) {
  const petals = Array.from({ length: 16 });
  const inner = Array.from({ length: 8 });
  return (
    <svg viewBox="0 0 400 400" fill="none" aria-hidden className={className}>
      <g stroke="currentColor" strokeWidth="1">
        <circle cx="200" cy="200" r="196" strokeDasharray="2 6" />
        <circle cx="200" cy="200" r="150" />
        <circle cx="200" cy="200" r="60" />
        <circle cx="200" cy="200" r="24" />
        {petals.map((_, i) => (
          <path
            key={i}
            transform={`rotate(${(360 / petals.length) * i} 200 200)`}
            d="M200 50c18 30 18 62 0 92-18-30-18-62 0-92Z"
          />
        ))}
        {inner.map((_, i) => (
          <path
            key={`i${i}`}
            transform={`rotate(${(360 / inner.length) * i + 22.5} 200 200)`}
            d="M200 142c14 18 14 36 0 52-14-16-14-34 0-52Z"
          />
        ))}
        {petals.map((_, i) => (
          <circle
            key={`d${i}`}
            cx="200"
            cy="20"
            r="3"
            transform={`rotate(${(360 / petals.length) * i + 11.25} 200 200)`}
          />
        ))}
      </g>
    </svg>
  );
}

/** Small ornamental divider: line – leaf – line. */
export function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 16" fill="none" aria-hidden className={className}>
      <path d="M0 8h46M74 8h46" stroke="currentColor" strokeWidth="1" />
      <path d="M60 1c6 4 6 10 0 14-6-4-6-10 0-14Z" fill="currentColor" />
      <circle cx="50" cy="8" r="1.6" fill="currentColor" />
      <circle cx="70" cy="8" r="1.6" fill="currentColor" />
    </svg>
  );
}
