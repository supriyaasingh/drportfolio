import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { faqs } from "../data/site";
import { SectionHeading } from "./ui/SectionHeading";
import { EASE } from "./ui/motion";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();
  return (
    <section id="faq" className="paper-grain relative bg-ivory py-24 sm:py-32" aria-labelledby="faq-title">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading
          eyebrow="Questions"
          title="Frequently asked questions"
          accentWords={[2]}
          intro="Helpful information before your first visit. For anything else, please call the clinic."
          id="faq-title"
        />
        <motion.ul
          className="divide-y divide-forest/10 border-y border-forest/10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const pid = `${uid}-panel-${i}`;
            const bid = `${uid}-btn-${i}`;
            return (
              <motion.li
                key={f.q}
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
              >
                <h3 className="font-sans">
                  <button
                    id={bid}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={pid}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span
                      className={`font-serif text-xl transition-colors duration-300 sm:text-[1.4rem] ${
                        isOpen ? "text-forest" : "text-charcoal group-hover:text-forest"
                      }`}
                    >
                      {f.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 135 : 0, backgroundColor: isOpen ? "#173D2B" : "rgba(255,255,255,0)" }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border ${
                        isOpen ? "border-forest text-gold" : "border-forest/20 text-forest"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={pid}
                      role="region"
                      aria-labelledby={bid}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <motion.p
                        className="max-w-2xl pb-7 pr-12 leading-relaxed text-muted"
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                      >
                        {f.a}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
