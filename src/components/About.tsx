import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ClipboardList, GraduationCap, HeartHandshake, Stethoscope, UserRound } from "lucide-react";
import { useRef } from "react";
import { doctor } from "../data/site";
import { PulseLine } from "./ui/MedicalVisuals";
import { SectionHeading } from "./ui/SectionHeading";
import { EASE, EASE_IN_OUT } from "./ui/motion";

const highlights = [
  { icon: GraduationCap, title: "Qualification", text: "BAMS." },
  { icon: Stethoscope, title: "General Physician", text: "Consultations for everyday health concerns." },
  { icon: HeartHandshake, title: "Independent Practice", text: "A personal clinic in Bhandup West, Mumbai." },
  { icon: UserRound, title: "Personal Attention", text: "Time to listen and explain clearly." },
  { icon: ClipboardList, title: "Prevention & Lifestyle", text: "Guidance that looks beyond the immediate symptom to long-term health." },
];

export function About() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.1, 1]);
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);
  const branchY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [80, -80]);
  const labelX = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["10%", "-25%"]);

  return (
    <section id="about" className="relative overflow-hidden bg-white py-24 sm:py-32" aria-labelledby="about-title">
      {/* Giant drifting watermark word */}
      <motion.p
        aria-hidden
        style={{ x: labelX }}
        className="pointer-events-none absolute -top-2 left-0 whitespace-nowrap font-display text-[22vw] font-bold leading-none tracking-tight text-navy/[0.035] lg:text-[16vw]"
      >
        Care · Trust · Wellbeing
      </motion.p>

      <div ref={ref} className="container-x relative grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* Portrait */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <motion.div
            aria-hidden
            style={{ y: branchY }}
            className="dot-grid absolute -left-10 -top-10 z-0 hidden h-44 w-44 rounded-3xl sm:block"
          />
          <motion.div
            aria-hidden
            style={{ y: branchY }}
            className="absolute -right-6 top-1/3 z-0 hidden h-24 w-48 text-teal lg:block"
          >
            <PulseLine className="h-full w-full" />
          </motion.div>

          <div className="relative">
            <div
              aria-hidden
              className="absolute -bottom-5 -right-5 h-full w-full rounded-[32px] bg-aqua-light sm:-bottom-7 sm:-right-7"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-paper-deep shadow-lift">
              <motion.picture style={{ scale: imgScale, y: imgY }} className="block h-full w-full">
                <source srcSet="/images/doctor-portrait.webp" type="image/webp" />
                <img
                  src="/images/doctor-portrait.jpg"
                  alt="Portrait of Dr. Abhay Singh, General Physician"
                  width={880}
                  height={1100}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-[50%_30%]"
                />
              </motion.picture>
              {/* Curtain reveal: two panels part vertically */}
              <motion.div
                aria-hidden
                className="absolute inset-0 origin-top bg-navy"
                initial={{ scaleY: 1 }}
                whileInView={{ scaleY: 0 }}
                viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                transition={{ duration: 1.3, ease: EASE_IN_OUT }}
              />
              <motion.div
                aria-hidden
                className="absolute inset-0 origin-bottom bg-teal"
                initial={{ scaleY: 1 }}
                whileInView={{ scaleY: 0 }}
                viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                transition={{ duration: 1.1, ease: EASE_IN_OUT }}
              />
            </div>

            {/* Caption plate */}
            <motion.div
              className="absolute -bottom-6 left-6 right-6 rounded-2xl bg-navy px-5 py-4 text-paper shadow-lift sm:left-auto sm:right-10 sm:w-64"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
            >
              <p className="eyebrow !text-[0.62rem] text-teal">Physician</p>
              <p className="mt-1 font-display text-lg">{doctor.name}</p>
              <p className="text-sm text-paper/70">
                {doctor.qualification} · {doctor.title}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Copy */}
        <div>
          <SectionHeading eyebrow="About the Doctor" title="Meet Dr. Abhay Singh" accentWords={[2, 3]} id="about-title" />

          <motion.div
            className="mt-8 space-y-5 text-[1.05rem] leading-relaxed text-muted"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } } }}
          >
            {[
              `${doctor.name} (${doctor.qualification}) is a general physician running an independent practice in Jamil Nagar, Bhandup West, Mumbai. The clinic offers personal consultations for everyday health concerns, along with preventive healthcare advice and lifestyle guidance.`,
              "Every consultation begins with listening. Time is taken to understand your symptoms, history and daily routine, to explain findings in plain language, and to agree on clear next steps — including referral to a specialist when that is the right course.",
            ].map((t, i) => (
              <motion.p
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 24, filter: reduce ? "none" : "blur(6px)" },
                  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: EASE } },
                }}
              >
                {t}
              </motion.p>
            ))}
          </motion.div>

          {/* Highlights */}
          <motion.ul
            className="mt-10 grid gap-3 sm:grid-cols-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } } }}
          >
            {highlights.map(({ icon: Icon, title, text }, i) => (
              <motion.li
                key={title}
                variants={{
                  hidden: { opacity: 0, x: -24 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
                }}
                className={`group flex gap-4 rounded-2xl border border-navy/8 bg-paper/60 p-4 transition-colors duration-500 hover:border-teal/50 hover:bg-paper ${
                  i === highlights.length - 1 ? "sm:col-span-2" : ""
                }`}
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-navy shadow-soft transition-all duration-500 group-hover:-rotate-6 group-hover:bg-navy group-hover:text-teal">
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <span>
                  <span className="block font-medium text-navy">{title}</span>
                  <span className="block text-sm text-muted">{text}</span>
                </span>
              </motion.li>
            ))}
          </motion.ul>

          {/* Signature-style name mark (typographic, not a real signature) */}
          <div className="mt-12 flex items-end gap-5">
            <div className="relative">
              <motion.p
                className="font-display text-4xl font-semibold tracking-tight text-navy sm:text-[2.6rem]"
                initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: EASE_IN_OUT }}
              >
                Abhay Singh
              </motion.p>
              <svg viewBox="0 0 260 24" className="-mt-1 w-56 text-teal" fill="none" aria-hidden>
                <motion.path
                  d="M2 14H90l8-10 10 18 8-8h142"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: reduce ? 1 : 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: 0.9, ease: "easeInOut" }}
                />
              </svg>
            </div>
            <p className="pb-4 text-xs uppercase tracking-[0.2em] text-muted">
              {doctor.qualification}
              <br />
              {doctor.title}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
