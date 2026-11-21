import { motion } from "motion/react";
import { SplitText } from "./SplitText";
import { EASE } from "./motion";

type Props = {
  eyebrow: string;
  title: string;
  accentWords?: number[];
  intro?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  id?: string;
};

export function SectionHeading({ eyebrow, title, accentWords, intro, align = "left", tone = "dark", id }: Props) {
  const center = align === "center";
  const light = tone === "light";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-2xl`}>
      <motion.div
        className={`mb-5 flex items-center gap-3 ${center ? "justify-center" : ""}`}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.span
          className="h-px w-10 origin-left bg-gold"
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.9, ease: EASE } } }}
        />
        <motion.span
          className={`eyebrow ${light ? "text-gold" : "text-gold-deep"}`}
          variants={{
            hidden: { opacity: 0, x: -10, letterSpacing: "0.4em" },
            show: { opacity: 1, x: 0, letterSpacing: "0.22em", transition: { duration: 1, ease: EASE, delay: 0.15 } },
          }}
        >
          {eyebrow}
        </motion.span>
        {center && (
          <motion.span
            className="h-px w-10 origin-right bg-gold"
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.9, ease: EASE } } }}
          />
        )}
      </motion.div>
      <SplitText
        id={id}
        text={title}
        accentWords={accentWords}
        accentClassName={light ? "italic text-gold" : "italic text-gold-deep"}
        className={`text-[2.15rem] font-medium leading-[1.08] sm:text-5xl lg:text-[3.4rem] ${light ? "text-ivory" : "text-forest"}`}
      />
      {intro && (
        <motion.p
          className={`mt-6 text-[1.05rem] leading-relaxed ${light ? "text-ivory/75" : "text-muted"} ${center ? "mx-auto" : ""} max-w-xl`}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
        >
          {intro}
        </motion.p>
      )}
    </div>
  );
}
