import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowDown, ArrowRight, CalendarCheck, Clock, HeartPulse, MapPin, Phone, ShieldPlus, Stethoscope } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { clinic, doctor, links } from "../data/site";
import { scrollToId } from "../hooks/useLenis";
import { Button } from "./ui/Button";
import { PlusMark, PulseLine, Rings } from "./ui/MedicalVisuals";
import { SplitText } from "./ui/SplitText";
import { EASE, EASE_IN_OUT } from "./ui/motion";

function useMouseParallax(strength: number, mx: MotionValue<number>, my: MotionValue<number>) {
  const x = useTransform(mx, (v) => v * strength);
  const y = useTransform(my, (v) => v * strength);
  return { x, y };
}

function RotatingBadge() {
  const text = "GENERAL PHYSICIAN • BAMS • BHANDUP WEST •";
  return (
    <div className="relative grid h-24 w-24 place-items-center rounded-full bg-white shadow-soft sm:h-32 sm:w-32">
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full text-navy"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <defs>
          <path id="badge-circle" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" />
        </defs>
        <text fontSize="7.4" fill="currentColor" fontFamily="Inter Variable, sans-serif" fontWeight="600">
          <textPath href="#badge-circle" textLength="236" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </motion.svg>
      <span className="grid h-10 w-10 place-items-center rounded-full bg-navy text-teal sm:h-12 sm:w-12">
        <Stethoscope className="h-5 w-5" strokeWidth={1.6} />
      </span>
    </div>
  );
}

/** Small frosted chip that floats gently beside the portrait. */
function FloatChip({
  icon,
  label,
  className,
  style,
  delay,
  ready,
  bob = 8,
}: {
  icon: ReactNode;
  label: string;
  className: string;
  style?: { x: MotionValue<number>; y: MotionValue<number> };
  delay: number;
  ready: boolean;
  bob?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div style={style} className={`pointer-events-none absolute z-20 ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: 20 }}
        animate={ready ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        <motion.div
          animate={reduce ? {} : { y: [0, -bob, 0] }}
          transition={{ duration: 5 + bob / 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-2.5 rounded-full border border-white/70 bg-white/85 py-2 pl-2 pr-4 shadow-lift backdrop-blur-md"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-aqua-light text-teal-deep">{icon}</span>
          <span className="whitespace-nowrap text-[0.8rem] font-medium text-navy">{label}</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Hero({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Scroll-linked parallax
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "5%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-16%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const ringsRotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "20%"]);

  // Pointer parallax (mouse only — no effect on touch)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });
  const far = useMouseParallax(-14, smx, smy);
  const near = useMouseParallax(22, smx, smy);
  const card = useMouseParallax(10, smx, smy);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);

  const show = ready ? "show" : "hidden";
  const d = 0.15; // base delay after preloader

  return (
    <section
      id="home"
      ref={ref}
      className="relative isolate overflow-hidden bg-paper pt-[104px] sm:pt-[120px]"
      aria-labelledby="hero-title"
    >
      {/* Background atmosphere: clinical grid, soft light, instrument rings */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          style={{ y: gridY }}
          className="grid-lines absolute inset-0 [mask-image:radial-gradient(70%_60%_at_70%_40%,#000_10%,transparent_75%)]"
        />
        <div className="absolute -right-[15%] top-[-15%] h-[75vmax] w-[75vmax] rounded-full bg-[radial-gradient(circle,rgba(43,179,163,.20),transparent_60%)]" />
        <div className="absolute -left-[20%] bottom-[-35%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(circle,rgba(19,69,99,.10),transparent_60%)]" />
        <motion.div
          className="absolute right-[-18%] top-[6%] w-[min(880px,125vw)] text-navy/[0.07] lg:right-[-8%]"
          style={{ rotate: ringsRotate }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={ready ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 2, ease: EASE }}
          >
            <Rings className="h-full w-full" />
          </motion.div>
        </motion.div>
      </div>

      <div className="container-x grid items-center gap-14 pb-24 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pb-32">
        {/* Left: copy */}
        <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-10 max-w-xl">
          <motion.div
            initial="hidden"
            animate={show}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: d } } }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16, scale: 0.96 },
                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE } },
              }}
              className="inline-flex items-center gap-2.5 rounded-full border border-teal/30 bg-white/70 py-1.5 pl-1.5 pr-4 backdrop-blur"
            >
              <span className="relative grid h-6 w-6 place-items-center rounded-full bg-navy">
                <PlusMark className="h-3 w-3 text-teal" />
              </span>
              <span className="eyebrow text-navy">
                {doctor.title} | {doctor.qualification}
              </span>
            </motion.div>
          </motion.div>

          <SplitText
            as="h1"
            id="hero-title"
            inView={false}
            play={ready}
            text="Your Health, Our Priority."
            accentWords={[2, 3]}
            accentClassName="text-teal-deep"
            delay={d + 0.2}
            stagger={0.09}
            className="mt-7 text-[2.75rem] font-semibold leading-[1.02] text-navy sm:text-6xl lg:text-[4.6rem]"
          />

          {/* Pulse underline beneath the heading */}
          <div className="mt-5 h-6 w-56 text-teal sm:w-72">
            {ready && <PulseLine inView={false} delay={0.7} className="h-full w-full" />}
          </div>

          <motion.div
            initial="hidden"
            animate={show}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: d + 0.8 } } }}
          >
            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } } }}
              className="mt-5 max-w-lg text-[1.075rem] leading-relaxed text-muted"
            >
              {doctor.name} is a {doctor.title.toLowerCase()} offering attentive, personal consultations for everyday
              health concerns, preventive care and lifestyle guidance at the clinic in Bhandup West, Mumbai.
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } } }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button onClick={() => scrollToId("appointment")} icon={<CalendarCheck className="h-4 w-4" />}>
                Book an Appointment
              </Button>
              <Button variant="outline" onClick={() => scrollToId("services")} icon={<ArrowRight className="h-4 w-4" />}>
                Explore Services
              </Button>
            </motion.div>

            <motion.ul
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
              className="mt-10 grid gap-4 border-t border-navy/10 pt-7 sm:grid-cols-3"
            >
              {[
                { icon: <MapPin className="h-4 w-4" />, k: "Clinic", v: "Bhandup West, Mumbai" },
                { icon: <Clock className="h-4 w-4" />, k: "Timings", v: "11–1 · 7–10:30 PM" },
                { icon: <Phone className="h-4 w-4" />, k: "Call", v: clinic.phoneDisplay, href: links.tel },
              ].map((it) => (
                <motion.li
                  key={it.k}
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
                  className="flex items-center gap-3"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-teal-deep shadow-soft">
                    {it.icon}
                  </span>
                  <span className="leading-tight">
                    <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted">{it.k}</span>
                    {it.href ? (
                      <a href={it.href} className="text-sm font-medium text-navy hover:text-teal-deep">
                        {it.v}
                      </a>
                    ) : (
                      <span className="text-sm font-medium text-navy">{it.v}</span>
                    )}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>

        {/* Right: portrait composition */}
        <div className="relative order-first mx-auto w-full max-w-[300px] sm:max-w-[420px] lg:order-none lg:max-w-[500px]">
          <FloatChip
            ready={ready}
            delay={d + 1.25}
            style={far}
            icon={<Stethoscope className="h-4 w-4" />}
            label="General Consultations"
            className="-left-16 top-[18%] hidden xl:block"
          />
          <FloatChip
            ready={ready}
            delay={d + 1.45}
            style={near}
            bob={10}
            icon={<ShieldPlus className="h-4 w-4" />}
            label="Preventive Care"
            className="-right-12 bottom-[30%] hidden xl:block"
          />

          <div className="relative aspect-[4/5]">
            {/* Offset outline */}
            <motion.div
              aria-hidden
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-[40px] border border-teal/60 sm:translate-x-5 sm:translate-y-5"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={ready ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.4, delay: d + 0.6, ease: EASE }}
            />
            {/* Doctor photograph — original photo, unaltered; cropped by layout only */}
            <motion.figure
              className="group absolute inset-0 m-0 overflow-hidden rounded-[40px] bg-navy shadow-lift"
              initial={{ clipPath: "inset(100% 0% 0% 0% round 40px)" }}
              animate={ready ? { clipPath: "inset(0% 0% 0% 0% round 40px)" } : {}}
              transition={{ duration: 1.4, delay: d, ease: EASE_IN_OUT }}
            >
              <motion.div className="absolute inset-x-0 top-[-4%] h-[108%]" style={{ y: imgY }}>
                <div className="h-full w-full transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]">
                  <picture className="block h-full w-full">
                    <source srcSet="/images/doctor-hero.webp" type="image/webp" />
                    <motion.img
                      src="/images/doctor-hero.jpg"
                      alt={`${doctor.name}, ${doctor.title}, in a white coat with a stethoscope`}
                      width={1200}
                      height={1789}
                      {...{ fetchpriority: "high" }}
                      className="h-full w-full object-cover object-[50%_0%]"
                      initial={{ scale: 1.18, filter: "blur(6px)" }}
                      animate={ready ? { scale: 1, filter: "blur(0px)" } : {}}
                      transition={{ duration: 1.8, delay: d + 0.2, ease: EASE }}
                    />
                  </picture>
                </div>
              </motion.div>
              {/* Tonal overlays: depth at the base, soft teal light on hover */}
              <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy-deep/70 via-navy-deep/20 to-transparent" />
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_0%,rgba(43,179,163,.18),transparent_70%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[40px] ring-1 ring-inset ring-white/20" />
              {/* Light sweep across the photo once revealed */}
              {!reduce && (
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/25 to-transparent"
                  initial={{ x: "0%" }}
                  animate={ready ? { x: "420%" } : {}}
                  transition={{ duration: 1.6, delay: d + 1.3, ease: EASE_IN_OUT }}
                />
              )}
            </motion.figure>

            {/* Rotating badge */}
            <motion.div
              className="absolute -right-3 top-[34%] z-20 sm:-right-8 sm:top-6"
              initial={{ opacity: 0, scale: 0.4, rotate: -90 }}
              animate={ready ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ duration: 1.2, delay: d + 1.2, ease: EASE }}
            >
              <RotatingBadge />
            </motion.div>

            {/* Identity card */}
            <motion.div style={card} className="absolute -bottom-8 -left-4 z-20 sm:-left-12 sm:bottom-14">
              <motion.div
                initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
                animate={ready ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 1.1, delay: d + 1.35, ease: EASE }}
                className="rounded-2xl border border-white/60 bg-white/90 p-3 pr-5 shadow-lift backdrop-blur-md sm:p-4 sm:pr-6"
              >
                <div className="flex items-center gap-3">
                  <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy font-display text-sm font-semibold text-paper">
                    AS
                    <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-teal ring-2 ring-white">
                      <PlusMark className="h-2 w-2 text-white" />
                    </span>
                  </span>
                  <div>
                    <p className="font-display text-[1.02rem] font-semibold leading-tight text-navy">{doctor.name}</p>
                    <p className="text-[0.78rem] text-muted">
                      {doctor.qualification} · {doctor.title}
                    </p>
                  </div>
                </div>
                <div className="mt-3 hidden items-center gap-2 border-t border-navy/10 pt-3 text-[0.76rem] text-navy/80 sm:flex">
                  <HeartPulse className="h-3.5 w-3.5 text-teal-deep" />
                  Appointments highly recommended
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        type="button"
        onClick={() => scrollToId("about")}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-navy/60 lg:flex"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: d + 1.8 }}
        aria-label="Scroll to About section"
      >
        <span className="eyebrow !text-[0.62rem]">Scroll</span>
        <span className="relative h-10 w-[1px] overflow-hidden bg-navy/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-teal"
            animate={reduce ? {} : { y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <ArrowDown className="sr-only" />
      </motion.button>
    </section>
  );
}
