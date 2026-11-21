import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Building2, ImageOff, MapPin, Navigation } from "lucide-react";
import { useRef, useState } from "react";
import { hospital } from "../data/site";
import { Button } from "./ui/Button";
import { SectionHeading } from "./ui/SectionHeading";
import { EASE, EASE_IN_OUT } from "./ui/motion";

/**
 * Hospital affiliation. Only the hospital name, city and the affiliation
 * statement are shown as fact. Photo, website and directions are rendered
 * only once their `verified` flag in src/data/site.ts is set to true.
 */
export function Hospital() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [imgFailed, setImgFailed] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.6], reduce ? [1, 1] : [1.25, 1]);
  const clip = useTransform(
    scrollYProgress,
    [0, 0.45],
    reduce ? ["inset(0% 0% 0% 0% round 28px)", "inset(0% 0% 0% 0% round 28px)"] : ["inset(12% 10% 12% 10% round 120px)", "inset(0% 0% 0% 0% round 28px)"],
  );

  const showImage = hospital.image.verified && !imgFailed;
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

        <div ref={ref} className="mt-14 grid items-stretch gap-8 lg:grid-cols-[1.35fr_1fr]">
          {/* Image / placeholder with scroll-driven unmasking */}
          <motion.div style={{ clipPath: clip }} className="relative min-h-[320px] overflow-hidden bg-paper-deep sm:min-h-[440px]">
            {showImage ? (
              <motion.img
                src={hospital.image.src}
                alt={hospital.image.alt}
                loading="lazy"
                decoding="async"
                onError={() => setImgFailed(true)}
                style={{ scale }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <motion.div style={{ scale }} className="absolute inset-0">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,#EAF1F5_0%,#E3F4F2_100%)]" />
                {/* Architectural line drawing — clearly a placeholder, not a photo */}
                <svg viewBox="0 0 600 400" className="absolute inset-0 h-full w-full text-navy/15" fill="none" aria-hidden preserveAspectRatio="xMidYMid slice">
                  <g stroke="currentColor" strokeWidth="1.5">
                    <path d="M60 340h480" />
                    <rect x="150" y="120" width="300" height="220" />
                    <rect x="230" y="70" width="140" height="50" />
                    {Array.from({ length: 5 }).map((_, r) =>
                      Array.from({ length: 6 }).map((__, c) => (
                        <rect key={`${r}-${c}`} x={170 + c * 46} y={140 + r * 36} width="26" height="20" />
                      )),
                    )}
                    <path d="M285 85h30M300 75v20" strokeWidth="3" />
                  </g>
                </svg>
                <div className="absolute inset-0 grid place-items-center p-6">
                  <div className="max-w-sm rounded-2xl border border-dashed border-navy/30 bg-white/85 p-6 text-center backdrop-blur">
                    <ImageOff className="mx-auto h-7 w-7 text-teal-deep" strokeWidth={1.5} />
                    <p className="mt-3 font-medium text-navy">Hospital photograph placeholder</p>
                    <p className="mt-1.5 text-sm text-muted">
                      A verified, authorised photograph of {hospital.name}, {hospital.city} will appear here.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
            <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-navy/90 px-4 py-2 text-xs font-medium tracking-wide text-paper backdrop-blur">
              <Building2 className="h-3.5 w-3.5 text-teal" />
              {hospital.city}, Maharashtra
            </div>
          </motion.div>

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
