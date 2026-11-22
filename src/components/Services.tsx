import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowUpRight, Info } from "lucide-react";
import type { MouseEvent } from "react";
import { services } from "../data/site";
import { scrollToId } from "../hooks/useLenis";
import { PlusMark } from "./ui/MedicalVisuals";
import { SectionHeading } from "./ui/SectionHeading";
import { ServiceIcon } from "./ui/ServiceIcons";
import { EASE } from "./ui/motion";

function ServiceCard({ s, i }: { s: (typeof services)[number]; i: number }) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const px = useMotionValue(50);
  const py = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 180, damping: 20 });
  const sry = useSpring(ry, { stiffness: 180, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${px}% ${py}%, rgba(43,179,163,.16), transparent 60%)`;

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    px.set(x * 100);
    py.set(y * 100);
    if (reduce) return;
    ry.set((x - 0.5) * 10);
    rx.set(-(y - 0.5) * 10);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const featured = i === 0;

  return (
    <motion.article
      variants={{
        hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 90, rotateX: 18, scale: 0.94 },
        show: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { duration: 1.1, ease: EASE } },
      }}
      style={{ transformPerspective: 1000 }}
      className={featured ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : ""}
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
        whileHover={reduce ? {} : { y: -6 }}
        transition={{ duration: 0.5, ease: EASE }}
        className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] border p-7 sm:p-8 ${
          featured
            ? "border-navy bg-navy text-paper shadow-lift"
            : "border-navy/10 bg-white text-ink shadow-soft hover:border-teal/50"
        }`}
      >
        <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />
        {featured && (
          <PlusMark className="pointer-events-none absolute -bottom-12 -right-12 w-48 text-navy-soft/70 transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:rotate-90 group-hover:scale-110" />
        )}

        <div className="relative flex items-start justify-between">
          <span
            className={`relative grid h-16 w-16 place-items-center rounded-2xl transition-colors duration-500 ${
              featured ? "bg-paper/10 text-teal" : "bg-paper text-navy group-hover:bg-navy group-hover:text-teal"
            }`}
          >
            <ServiceIcon name={s.key} className="h-9 w-9" />
            <span className="absolute inset-0 rounded-2xl border border-teal/0 transition-all duration-700 group-hover:scale-125 group-hover:border-teal/40 group-hover:opacity-0" />
          </span>
          <span className={`font-display text-sm font-semibold ${featured ? "text-teal" : "text-teal-deep"}`}>0{i + 1}</span>
        </div>

        <h3 className={`relative mt-8 text-2xl font-medium leading-snug ${featured ? "text-paper lg:text-[2rem]" : "text-navy"}`}>
          {s.title}
        </h3>
        <p className={`relative mt-3 text-[0.98rem] leading-relaxed ${featured ? "text-paper/75" : "text-muted"}`}>
          {s.description}
        </p>

        <div className="relative mt-auto pt-8">
          <button
            type="button"
            onClick={() => scrollToId("appointment")}
            className={`inline-flex items-center gap-2 text-sm font-medium ${featured ? "text-teal" : "text-navy"}`}
          >
            <span className="relative">
              Request a consultation
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 group-hover:scale-x-100" />
            </span>
            <span className="grid h-8 w-8 place-items-center rounded-full border border-current/30 transition-all duration-500 group-hover:rotate-45 group-hover:bg-teal group-hover:text-navy-deep">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </button>
        </div>
      </motion.div>
    </motion.article>
  );
}

export function Services() {
  return (
    <section id="care" className="relative bg-white py-24 sm:py-32" aria-labelledby="services-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Areas of Care"
            title="Thorough care for everyday health"
            accentWords={[1, 2]}
            id="services-title"
          />
          <motion.p
            className="max-w-sm text-muted"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
          >
            Each consultation begins with listening. Guidance is shaped around your health history, routine and
            individual needs.
          </motion.p>
        </div>

        <motion.div
          className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          style={{ perspective: 1200 }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >
          {services.map((s, i) => (
            <ServiceCard key={s.key} s={s} i={i} />
          ))}
        </motion.div>

        <motion.p
          className="mt-10 flex items-start gap-2.5 text-sm text-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-teal-deep" />
          Services are offered within the doctor's scope of practice. Where specialist evaluation or tests are needed, you will be advised accordingly. Individual
          responses vary and no specific outcome is guaranteed.
        </motion.p>
      </div>
    </section>
  );
}
