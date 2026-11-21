import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { useRef } from "react";
import { clinic, doctor, hours, links, navItems } from "../data/site";
import { scrollToId } from "../hooks/useLenis";
import { Divider } from "./ui/MedicalVisuals";
import { EASE } from "./ui/motion";

export function Footer({ onPrivacy }: { onPrivacy: () => void }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const nameY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["40%", "0%"]);
  const year = new Date().getFullYear();

  return (
    <footer ref={ref} className="relative overflow-hidden bg-navy-deep pt-20 text-paper/80">
      <div className="container-x grid gap-12 pb-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full border border-teal/50 font-display text-base font-semibold text-teal">
              AS
            </span>
            <div>
              <p className="font-display text-xl text-paper">{doctor.name}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-paper/50">
                {doctor.qualification} | {doctor.title}
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-paper/60">
            General physician consultations, preventive healthcare and lifestyle guidance at an independent clinic in
            Bhandup West, Mumbai.
          </p>
          <Divider className="mt-6 w-28 text-teal/60" />
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow text-teal">Navigate</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {[...navItems, { id: "appointment", label: "Book Appointment" }].map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(n.id);
                  }}
                  className="group inline-flex items-center gap-2 transition-colors hover:text-paper"
                >
                  <span className="h-px w-0 bg-teal transition-all duration-500 group-hover:w-4" />
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow text-teal">Clinic</p>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
              <a href={links.directions} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
                {clinic.addressLines.join(" ")}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
              <a href={links.tel} className="hover:text-paper">
                {clinic.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
              <a href={links.whatsapp()} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-teal">Consultation Hours</p>
          <ul className="mt-5 space-y-3 text-sm">
            {hours.map((h) => (
              <li key={h.id} className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                <span>
                  <span className="block text-paper">{h.label}</span>
                  {h.from} – {h.to}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-paper/50">Appointments highly recommended.</p>
        </div>
      </div>

      {/* Oversized name, rising into place */}
      <div className="container-x overflow-hidden" aria-hidden>
        <motion.p
          style={{ y: nameY }}
          className="select-none whitespace-nowrap text-center font-display text-[12vw] font-bold leading-[0.95] tracking-tight text-paper/[0.06] lg:text-[9rem]"
        >
          Dr. Abhay Singh
        </motion.p>
      </div>

      <motion.div
        className="border-t border-paper/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE }}
      >
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 pb-24 text-xs text-paper/50 sm:flex-row lg:pb-6">
          <p>
            © {year} {doctor.name}. All rights reserved.
          </p>
          <p className="text-center">This website provides general information and is not a substitute for medical advice.</p>
          <button type="button" onClick={onPrivacy} className="underline decoration-teal/50 underline-offset-4 hover:text-paper">
            Privacy Policy
          </button>
        </div>
      </motion.div>
    </footer>
  );
}
