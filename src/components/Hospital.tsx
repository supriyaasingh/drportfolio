import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Building2, MapPin, Navigation } from "lucide-react";
import { useRef } from "react";
import { hospital } from "../data/site";
import { Button } from "./ui/Button";
import { SectionHeading } from "./ui/SectionHeading";
import { EASE, EASE_IN_OUT } from "./ui/motion";

/**
 * Hospital section with the photograph supplied by the practice. The
 * affiliation statement, website and directions are rendered only once
 * their `verified` flag in src/data/site.ts is set to true.
 */
export function Hospital() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.6], reduce ? [1, 1] : [1.25, 1]);
  const clip = useTransform(
    scrollYProgress,
    [0, 0.45],
    reduce ? ["inset(0% 0% 0% 0% round 28px)", "inset(0% 0% 0% 0% round 28px)"] : ["inset(12% 10% 12% 10% round 120px)", "inset(0% 0% 0% 0% round 28px)"],
  );

  const directionsUrl = hospital.address.verified
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(hospital.address.text)}`
    : null;

  return (
    <section id="hospital" className="relative overflow-x-clip bg-white py-24 sm:py-32" aria-labelledby="hospital-title">
      <div className="container-x">
        <SectionHeading
          eyebrow={hospital.affiliation.verified ? "Hospital Affiliation" : "Hospital"}
          title={`${hospital.name}, ${hospital.city}`}
          accentWords={[2]}
          id="hospital-title"
        />

        <div ref={ref} className="mt-14 grid items-center gap-8 lg:grid-cols-[1.6fr_1fr]">
          {/* Hospital photograph with scroll-driven unmasking and hover zoom */}
          <motion.figure
            style={{ clipPath: clip }}
            className="group relative m-0 aspect-[16/10] overflow-hidden rounded-[28px] bg-paper-deep shadow-lift sm:aspect-[2/1]"
          >
            <motion.div style={{ scale }} className="absolute inset-0">
              <picture className="block h-full w-full">
                <source srcSet={hospital.image.webp} type="image/webp" />
                <img
                  src={hospital.image.src}
                  alt={hospital.image.alt}
                  width={1080}
                  height={537}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-[55%_45%] transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]"
                />
              </picture>
            </motion.div>
            {/* Subtle tonal overlays */}
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/75 via-navy-deep/5 to-transparent transition-opacity duration-700 group-hover:opacity-80" />
            <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/15" />

            <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-navy/85 px-4 py-2 text-xs font-medium tracking-wide text-paper backdrop-blur sm:left-5 sm:top-5">
              <Building2 className="h-3.5 w-3.5 text-teal" />
              {hospital.city}, Maharashtra
            </div>
            <figcaption className="absolute inset-x-0 bottom-0 p-5 text-paper sm:p-7">
              <span className="translate-y-1 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0">
                <span className="block font-display text-lg font-semibold tracking-tight sm:text-2xl">{hospital.name}</span>
                <span className="block text-xs text-paper/75 sm:text-sm">
                  {hospital.city}, {hospital.region}
                </span>
              </span>
            </figcaption>
          </motion.figure>

          {/* Details */}
          <motion.div
            className="flex flex-col rounded-[28px] border border-navy/10 bg-paper p-8 sm:p-10"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy text-teal">
              <Building2 className="h-6 w-6" strokeWidth={1.5} />
            </span>
            <h3 className="mt-6 text-3xl font-medium text-navy">{hospital.name}</h3>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted">
              <MapPin className="h-4 w-4 text-teal-deep" />
              {hospital.address.verified ? hospital.address.text : `${hospital.city}, ${hospital.region}`}
            </p>
            <motion.span
              className="my-6 block h-px origin-left bg-navy/10"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4, ease: EASE_IN_OUT }}
            />
            <p className="leading-relaxed text-muted">{hospital.intro}</p>
            {hospital.affiliation.verified ? (
              <p className="mt-4 leading-relaxed text-ink">{hospital.affiliation.text}</p>
            ) : (
              <p className="mt-4 rounded-2xl border border-dashed border-navy/20 bg-white/60 p-4 text-sm leading-relaxed text-muted">
                {hospital.pendingNote}
              </p>
            )}

            <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row lg:flex-col xl:flex-row">
              {hospital.website.verified && (
                <Button href={hospital.website.url} external variant="primary" icon={<ArrowUpRight className="h-4 w-4" />}>
                  Hospital Website
                </Button>
              )}
              {directionsUrl && (
                <Button href={directionsUrl} external variant="outline" icon={<Navigation className="h-4 w-4" />}>
                  Directions
                </Button>
              )}
              {!hospital.website.verified && !directionsUrl && (
                <p className="text-xs leading-relaxed text-muted/80">
                  Hospital website and directions will be added once the details are verified.
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
