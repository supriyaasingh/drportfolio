import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowDown, ArrowRight, CalendarCheck, Clock, Leaf as LeafIcon, MapPin } from "lucide-react";
import { useEffect, useRef } from "react";
import { clinic, doctor } from "../data/site";
import { scrollToId } from "../hooks/useLenis";
import { Leaf, Mandala } from "./ui/Botanicals";
import { Button } from "./ui/Button";
import { SplitText } from "./ui/SplitText";
import { EASE, EASE_IN_OUT } from "./ui/motion";

function useMouseParallax(strength: number, mx: MotionValue<number>, my: MotionValue<number>) {
  const x = useTransform(mx, (v) => v * strength);
  const y = useTransform(my, (v) => v * strength);
  return { x, y };
}

function RotatingBadge() {
  const text = "AYURVEDIC PHYSICIAN • BAMS • HOLISTIC CARE •";
  return (
    <div className="relative grid h-24 w-24 place-items-center rounded-full bg-ivory shadow-soft sm:h-32 sm:w-32">
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full text-forest"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <defs>
          <path id="badge-circle" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" />
        </defs>
        <text fontSize="7.4" fill="currentColor" fontFamily="DM Sans Variable, sans-serif" fontWeight="600">
          <textPath href="#badge-circle" textLength="236" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </motion.svg>
      <span className="grid h-10 w-10 place-items-center rounded-full bg-forest text-gold sm:h-12 sm:w-12">
        <LeafIcon className="h-5 w-5" strokeWidth={1.5} />
      </span>
    </div>
  );
}

export function Hero({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Scroll-linked parallax
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-18%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const mandalaRotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 50]);
  const leafScrollY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -160]);

  // Pointer parallax (desktop only — no effect on touch)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });
  const far = useMouseParallax(-14, smx, smy);
  const near = useMouseParallax(26, smx, smy);
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
      className="paper-grain relative isolate overflow-hidden bg-ivory pt-[104px] sm:pt-[120px]"
      aria-labelledby="hero-title"
    >
      {/* Background atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-[20%] top-[-10%] h-[80vmax] w-[80vmax] rounded-full bg-[radial-gradient(circle,rgba(165,182,155,.35),transparent_60%)]" />
        <div className="absolute -left-[15%] bottom-[-30%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(circle,rgba(195,166,107,.14),transparent_60%)]" />
        <motion.div
          className="absolute right-[-10%] top-[8%] w-[min(900px,120vw)] text-forest/[0.07] lg:right-[-6%]"
          style={{ rotate: mandalaRotate }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={ready ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 2, ease: EASE }}
          >
            <Mandala className="h-full w-full" />
          </motion.div>
        </motion.div>
      </div>

      <div className="container-x grid items-center gap-14 pb-20 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pb-28">
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
              className="inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-white/60 py-1.5 pl-1.5 pr-4 backdrop-blur"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-forest">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              </span>
              <span className="eyebrow text-forest">Ayurvedic Physician | BAMS</span>
            </motion.div>
          </motion.div>

          <SplitText
            as="h1"
            id="hero-title"
            inView={false}
            text="A Healthier Life Begins With Better Care."
            accentWords={[4, 5]}
            play={ready}
            delay={d + 0.2}
            stagger={0.075}
            className="mt-7 text-[2.6rem] font-medium leading-[1.04] text-forest sm:text-6xl lg:text-[4.4rem]"
          />

          <motion.div
            initial="hidden"
            animate={show}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: d + 0.8 } } }}
          >
            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } } }}
              className="mt-7 max-w-lg text-[1.075rem] leading-relaxed text-muted"
            >
              Welcome to the independent clinical practice of {doctor.name}, offering personalised Ayurvedic
              consultations and holistic care — traditional healing, thoughtfully tailored to your modern lifestyle.
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } } }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button onClick={() => scrollToId("appointment")} icon={<CalendarCheck className="h-4 w-4" />}>
                Book an Appointment
              </Button>
              <Button variant="outline" onClick={() => scrollToId("about")} icon={<ArrowRight className="h-4 w-4" />}>
                Explore My Practice
              </Button>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 1 } } }}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-forest/10 pt-7"
            >
              <div>
                <p className="font-serif text-xl font-semibold text-forest">{doctor.name}</p>
                <p className="text-sm tracking-wide text-muted">
                  {doctor.qualification} | {doctor.title}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <MapPin className="h-4 w-4 text-gold-deep" strokeWidth={1.75} />
                {clinic.addressShort}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right: portrait composition */}
        <div className="relative order-first mx-auto w-full max-w-[300px] sm:max-w-[420px] lg:order-none lg:max-w-[520px]">
          {/* Far floating leaves */}
          <motion.div style={{ ...far, y: leafScrollY }} className="pointer-events-none absolute -left-10 top-16 z-0 w-16 text-sage sm:-left-16 sm:w-20">
            <motion.div
              initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
              animate={ready ? { opacity: 0.9, rotate: -28, scale: 1 } : {}}
              transition={{ duration: 1.6, delay: d + 0.9, ease: EASE }}
            >
              <motion.div
                animate={reduce ? {} : { rotate: [0, 6, 0], y: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              >
                <Leaf className="w-full" />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div style={near} className="pointer-events-none absolute -right-4 bottom-28 z-30 w-12 text-forest sm:-right-8 sm:w-16">
            <motion.div
              initial={{ opacity: 0, rotate: 80, scale: 0.5 }}
              animate={ready ? { opacity: 1, rotate: 38, scale: 1 } : {}}
              transition={{ duration: 1.6, delay: d + 1.1, ease: EASE }}
            >
              <motion.div
                animate={reduce ? {} : { rotate: [0, -8, 0], y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Leaf className="w-full" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Arch frame */}
          <div className="relative aspect-[4/5]">
            {/* Gold offset outline */}
            <motion.div
              aria-hidden
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-t-[999px] rounded-b-[28px] border border-gold/70 sm:translate-x-5 sm:translate-y-5"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={ready ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.4, delay: d + 0.6, ease: EASE }}
            />
            {/* Arch background with reveal */}
            <motion.div
              className="absolute inset-0 overflow-hidden rounded-t-[999px] rounded-b-[28px] bg-forest shadow-lift"
              initial={{ clipPath: "inset(100% 0% 0% 0% round 999px 999px 28px 28px)" }}
              animate={ready ? { clipPath: "inset(0% 0% 0% 0% round 999px 999px 28px 28px)" } : {}}
              transition={{ duration: 1.4, delay: d, ease: EASE_IN_OUT }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_15%,#2c6047_0%,#173d2b_55%,#0f2a1d_100%)]" />
              <Mandala className="absolute left-1/2 top-[6%] w-[92%] -translate-x-1/2 text-gold/20" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest-deep/70 to-transparent" />
            </motion.div>

            {/* Doctor photograph (real photo, background removed — face untouched) */}
            <motion.div className="absolute inset-x-0 bottom-0 top-[-6%] z-10 overflow-hidden rounded-b-[28px]" style={{ y: imgY }}>
              <motion.img
                src="/images/doctor-hero.webp"
                alt="Dr. Abhay Singh, BAMS, Ayurvedic physician, wearing a white coat and stethoscope"
                width={500}
                height={980}
                {...{ fetchpriority: "high" }}
                className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain object-bottom drop-shadow-[0_30px_40px_rgba(15,42,29,.45)]"
                initial={{ opacity: 0, y: 80, scale: 1.08 }}
                animate={ready ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 1.5, delay: d + 0.45, ease: EASE }}
              />
            </motion.div>

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
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-forest font-serif text-base italic text-gold">
                    AS
                  </span>
                  <div>
                    <p className="font-serif text-[1.05rem] font-semibold leading-tight text-forest">{doctor.name}</p>
                    <p className="text-[0.78rem] text-muted">
                      {doctor.qualification} · {doctor.title}
                    </p>
                  </div>
                </div>
                <div className="mt-3 hidden items-center gap-2 border-t border-forest/10 pt-3 text-[0.76rem] text-forest/80 sm:flex">
                  <Clock className="h-3.5 w-3.5 text-gold-deep" />
                  11 AM – 1 PM · 7 PM – 10:30 PM
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
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-forest/60 lg:flex"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: d + 1.8 }}
        aria-label="Scroll to About section"
      >
        <span className="eyebrow !text-[0.62rem]">Scroll</span>
        <span className="relative h-10 w-[1px] overflow-hidden bg-forest/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-gold"
            animate={reduce ? {} : { y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <ArrowDown className="sr-only" />
      </motion.button>
    </section>
  );
}
