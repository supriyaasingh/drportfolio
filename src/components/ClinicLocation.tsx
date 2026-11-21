import { motion, useReducedMotion } from "motion/react";
import { Copy, MapPin, Navigation, Phone, Check } from "lucide-react";
import { useState } from "react";
import { clinic, doctor, links } from "../data/site";
import { Button } from "./ui/Button";
import { SectionHeading } from "./ui/SectionHeading";
import { EASE, EASE_IN_OUT } from "./ui/motion";

function PulsePin() {
  const reduce = useReducedMotion();
  return (
    <span className="relative grid h-14 w-14 place-items-center">
      {!reduce &&
        [0, 1].map((i) => (
          <motion.span
            key={i}
            className="absolute inset-0 rounded-full bg-teal/40"
            animate={{ scale: [1, 2.1], opacity: [0.55, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 1.2, ease: "easeOut" }}
          />
        ))}
      <motion.span
        className="relative grid h-14 w-14 place-items-center rounded-full bg-navy text-teal shadow-lift"
        initial={reduce ? {} : { y: -60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.5 }}
      >
        <MapPin className="h-6 w-6" strokeWidth={1.6} />
      </motion.span>
    </span>
  );
}

export function ClinicLocation() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${clinic.name}, ${clinic.addressLines.join(" ")}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  return (
    <section id="clinic" className="paper-grain relative bg-paper py-24 sm:py-32" aria-labelledby="clinic-title">
      <div className="container-x">
        <SectionHeading
          eyebrow="Clinic Location"
          title="Visit the Clinic"
          accentWords={[2]}
          intro="A calm, private setting for unhurried consultations in Bhandup West."
          id="clinic-title"
        />

        <div className="relative mt-14 grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:gap-0">
          {/* Address card */}
          <motion.div
            className="relative z-10 rounded-[28px] bg-white p-8 shadow-lift sm:p-10 lg:-mr-16 lg:my-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <PulsePin />
            <p className="eyebrow mt-8 text-teal-deep">General Practice</p>
            <h3 className="mt-2 text-[1.75rem] font-medium leading-tight text-navy">{clinic.name}</h3>
            <address className="mt-5 text-lg not-italic leading-relaxed text-ink">
              {clinic.addressLines.map((l, i) => (
                <motion.span
                  key={l}
                  className="block"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 + i * 0.12, ease: EASE }}
                >
                  {l}
                </motion.span>
              ))}
            </address>
            <p className="mt-4 text-sm text-muted">Consultations with {doctor.name} · Appointments highly recommended</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={links.directions} external icon={<Navigation className="h-4 w-4" />}>
                Get Directions
              </Button>
              <Button href={links.tel} variant="outline" icon={<Phone className="h-4 w-4" />}>
                Call Clinic
              </Button>
            </div>
            <button
              type="button"
              onClick={copy}
              className="mt-5 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-navy"
            >
              {copied ? <Check className="h-4 w-4 text-navy" /> : <Copy className="h-4 w-4" />}
              <span aria-live="polite">{copied ? "Address copied" : "Copy address"}</span>
            </button>
          </motion.div>

          {/* Map */}
          <motion.div
            className="relative min-h-[360px] overflow-hidden rounded-[28px] border border-navy/10 bg-aqua-light shadow-soft sm:min-h-[460px]"
            initial={{ clipPath: "inset(0% 0% 0% 100% round 28px)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0% round 28px)" }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1.4, ease: EASE_IN_OUT, delay: 0.2 }}
          >
            <div aria-hidden className="absolute inset-0 grid place-items-center bg-[linear-gradient(135deg,#E3F4F2,#EAF1F5)] p-6 text-center">
              <div className="text-navy/70">
                <MapPin className="mx-auto h-8 w-8 text-teal-deep" strokeWidth={1.5} />
                <p className="mt-3 font-display text-xl text-navy">Jamil Nagar, Bhandup West</p>
                <p className="mt-1 text-sm">Loading map…</p>
              </div>
            </div>
            <iframe
              title="Map showing Jamil Nagar, Bhandup West, Mumbai"
              src={links.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 grayscale-[35%] sepia-[12%]"
              allowFullScreen
            />
            <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-navy/10" />
            <a
              href={links.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2.5 text-sm font-medium text-paper shadow-lift transition-transform hover:-translate-y-0.5"
            >
              <MapPin className="h-4 w-4 text-teal" /> Open in Google Maps
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
