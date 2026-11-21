import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { MouseEvent, ReactNode } from "react";

type Variant = "primary" | "accent" | "outline" | "ghost-light" | "outline-light";

const styles: Record<Variant, string> = {
  primary: "bg-navy text-paper shadow-[0_14px_30px_-14px_rgba(11,46,66,.7)]",
  accent: "bg-teal text-navy-deep shadow-[0_14px_30px_-14px_rgba(14,124,114,.7)]",
  outline: "border border-navy/25 text-navy bg-white/40 backdrop-blur-sm",
  "outline-light": "border border-paper/30 text-paper",
  "ghost-light": "bg-paper/10 text-paper border border-paper/15",
};

const fill: Record<Variant, string> = {
  primary: "bg-navy-soft",
  accent: "bg-[#5FD0C2]",
  outline: "bg-navy",
  "outline-light": "bg-paper",
  "ghost-light": "bg-paper/20",
};

const hoverText: Record<Variant, string> = {
  primary: "",
  accent: "",
  outline: "group-hover:text-paper",
  "outline-light": "group-hover:text-navy",
  "ghost-light": "",
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  icon?: ReactNode;
  className?: string;
  type?: "button" | "submit";
  external?: boolean;
  ariaLabel?: string;
  magnetic?: boolean;
  disabled?: boolean;
};

/**
 * Premium pill button: magnetic pull towards the cursor, a liquid fill
 * that rises from below on hover, and an icon that slides on hover.
 */
export function Button({
  children,
  variant = "primary",
  href,
  onClick,
  icon,
  className = "",
  type = "button",
  external,
  ariaLabel,
  magnetic = true,
  disabled,
}: Props) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (!magnetic || reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.18);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const cls = `group relative inline-flex min-h-12 items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 py-3 text-[0.95rem] font-medium tracking-wide transition-colors duration-300 disabled:opacity-60 ${styles[variant]} ${className}`;

  const inner = (
    <>
      <span
        aria-hidden
        className={`absolute inset-0 translate-y-[102%] rounded-[inherit] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0 ${fill[variant]}`}
      />
      <span className={`relative z-10 transition-colors duration-300 ${hoverText[variant]}`}>{children}</span>
      {icon && (
        <span
          className={`relative z-10 inline-flex transition-[transform,color] duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-1 ${hoverText[variant]}`}
        >
          {icon}
        </span>
      )}
    </>
  );

  const common = {
    className: cls,
    style: { x: sx, y: sy },
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    whileTap: { scale: 0.97 },
    "aria-label": ariaLabel,
  };

  if (href) {
    return (
      <motion.a
        {...common}
        href={href}
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button {...common} type={type} onClick={onClick} disabled={disabled}>
      {inner}
    </motion.button>
  );
}
