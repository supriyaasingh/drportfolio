import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { useRef } from "react";
import { clinic, doctor, hours, links, navItems } from "../data/site";
import { scrollToId } from "../hooks/useLenis";
import { Ornament } from "./ui/Botanicals";
import { EASE } from "./ui/motion";

export function Footer({ onPrivacy }: { onPrivacy: () => void }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const nameY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["40%", "0%"]);
  const year = new Date().getFullYear();

  return (
    <footer ref={ref} className="relative overflow-hidden bg-forest-deep pt-20 text-ivory/80">
      <div className="container-x grid gap-12 pb-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/50 font-serif text-lg italic text-gold">
              AS
            </span>
            <div>
              <p className="font-serif text-xl text-ivory">{doctor.name}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-ivory/50">
                {doctor.qualification} | {doctor.title}
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/60">
            Personalised Ayurvedic consultations and holistic care at an independent clinical practice in Bhandup West,
            Mumbai.
          </p>
          <Ornament className="mt-6 w-28 text-gold/60" />
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow text-gold">Navigate</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {[...navItems, { id: "appointment", label: "Book Appointment" }].map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(n.id);
                  }}
                  className="group inline-flex items-center gap-2 transition-colors hover:text-ivory"
                >
                  <span className="h-px w-0 bg-gold transition-all duration-500 group-hover:w-4" />
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow text-gold">Clinic</p>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href={links.directions} target="_blank" rel="noopener noreferrer" className="hover:text-ivory">
                {clinic.addressLines.join(" ")}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href={links.tel} className="hover:text-ivory">
                {clinic.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href={links.whatsapp()} target="_blank" rel="noopener noreferrer" className="hover:text-ivory">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-gold">Consultation Hours</p>
          <ul className="mt-5 space-y-3 text-sm">
            {hours.map((h) => (
              <li key={h.id} className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>
                  <span className="block text-ivory">{h.label}</span>
                  {h.from} – {h.to}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-ivory/50">Appointments highly recommended.</p>
        </div>
      </div>

      {/* Oversized name, rising into place */}
      <div className="container-x overflow-hidden" aria-hidden>
        <motion.p
          style={{ y: nameY }}
          className="select-none whitespace-nowrap text-center font-serif text-[12.5vw] italic leading-[0.95] text-ivory/[0.06] lg:text-[9.5rem]"
        >
          Dr. Abhay Singh
        </motion.p>
      </div>

      <motion.div
        className="border-t border-ivory/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE }}
      >
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 pb-24 text-xs text-ivory/50 sm:flex-row lg:pb-6">
          <p>
            © {year} {doctor.name}. All rights reserved.
          </p>
          <p className="text-center">This website provides general information and is not a substitute for medical advice.</p>
          <button type="button" onClick={onPrivacy} className="underline decoration-gold/50 underline-offset-4 hover:text-ivory">
            Privacy Policy
          </button>
        </div>
      </motion.div>
    </footer>
  );
}
