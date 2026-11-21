import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Branch, Mandala } from "./ui/Botanicals";
import { SectionHeading } from "./ui/SectionHeading";
import { EASE } from "./ui/motion";

const statement =
  "Ayurveda views health as a balance between body, mind and daily life. The practice brings this time-honoured perspective into a calm, attentive consultation — one that respects your story, your routine and the care you already receive.";

const pillars = [
  {
    n: "01",
    title: "Personalised Consultations",
    text: "Time is taken to understand your concerns, habits and health history before any guidance is offered.",
  },
  {
    n: "02",
    title: "Traditional Ayurvedic Principles",
    text: "Guidance draws on classical Ayurvedic concepts of constitution, digestion, daily routine and seasonal rhythm.",
  },
  {
    n: "03",
    title: "Lifestyle-Oriented Wellness",
    text: "Practical, sustainable suggestions on diet, rest and routine that fit into modern working lives.",
  },
];

const terms = ["Āhāra · Diet", "Vihāra · Lifestyle", "Dinacharyā · Daily Routine", "Ṛtucharyā · Seasonal Routine", "Prakṛti · Constitution"];

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <span className="relative mr-[0.28em] inline-block">
      <motion.span style={{ opacity, y }} className="inline-block">
        {word}
      </motion.span>
    </span>
  );
}

function ScrollStatement() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = statement.split(" ");
  if (reduce) {
    return <p className="font-serif text-[1.7rem] leading-[1.35] text-ivory sm:text-4xl lg:text-[2.75rem]">{statement}</p>;
  }
  return (
    <p ref={ref} className="font-serif text-[1.7rem] leading-[1.35] text-ivory sm:text-4xl lg:text-[2.75rem]" aria-label={statement}>
      <span aria-hidden>
        {words.map((w, i) => {
          const start = i / words.length;
          return <Word key={i} word={w} progress={scrollYProgress} range={[start, start + 1 / words.length]} />;
        })}
      </span>
    </p>
  );
}

export function Philosophy() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const marqueeX = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-30%"]);
  const branchY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [120, -120]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-forest py-24 text-ivory sm:py-32"
      aria-labelledby="philosophy-title"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_80%_0%,#24543d_0%,transparent_60%)]" />
        <motion.div
          style={{ rotate }}
          className="absolute -left-[30%] top-[10%] w-[110vw] max-w-[1100px] text-gold/[0.08] sm:-left-[15%] lg:-left-[10%]"
        >
          <motion.div animate={reduce ? {} : { rotate: 360 }} transition={{ duration: 160, repeat: Infinity, ease: "linear" }}>
            <Mandala className="h-full w-full" />
          </motion.div>
        </motion.div>
        <motion.div style={{ y: branchY }} className="absolute right-4 top-24 hidden w-32 text-sage/40 lg:block">
          <Branch />
        </motion.div>
      </div>

      <div className="container-x">
        <SectionHeading
          eyebrow="Healthcare Philosophy"
          title="Traditional Wisdom. Thoughtful Modern Care."
          accentWords={[3, 4]}
          tone="light"
          id="philosophy-title"
        />

        <div className="mt-14 max-w-4xl">
          <ScrollStatement />
        </div>

        <motion.div
          className="mt-20 grid gap-px overflow-hidden rounded-[28px] border border-ivory/10 bg-ivory/10 md:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.18 } } }}
        >
          {pillars.map((p) => (
            <motion.div
              key={p.n}
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { duration: 0.6 } },
              }}
              className="group relative bg-forest p-8 transition-colors duration-700 hover:bg-forest-soft sm:p-10"
            >
              <div className="overflow-hidden">
                <motion.p
                  className="font-serif text-6xl italic text-gold/90"
                  variants={{
                    hidden: { y: "100%" },
                    show: { y: "0%", transition: { duration: 1, ease: EASE } },
                  }}
                >
                  {p.n}
                </motion.p>
              </div>
              <motion.span
                className="mt-6 block h-px w-full origin-left bg-ivory/20"
                variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.2, ease: EASE, delay: 0.2 } } }}
              />
              <motion.h3
                className="mt-6 text-2xl font-medium"
                variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } } }}
              >
                {p.title}
              </motion.h3>
              <motion.p
                className="mt-3 leading-relaxed text-ivory/70"
                variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } } }}
              >
                {p.text}
              </motion.p>
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold transition-all duration-700 group-hover:w-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll-driven term ribbon */}
      <div className="mt-20 overflow-hidden border-y border-ivory/10 py-6" aria-label="Core Ayurvedic concepts">
        <motion.ul style={{ x: marqueeX }} className="flex w-max gap-12 whitespace-nowrap px-6">
          {[...terms, ...terms].map((t, i) => (
            <li key={i} className="flex items-center gap-12 font-serif text-2xl italic text-ivory/60 sm:text-3xl" aria-hidden={i >= terms.length}>
              {t}
              <span className="h-2 w-2 rotate-45 bg-gold/70" />
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
