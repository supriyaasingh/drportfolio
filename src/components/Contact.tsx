import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Clock, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { clinic, hours, links } from "../data/site";
import { Button } from "./ui/Button";
import { SectionHeading } from "./ui/SectionHeading";
import { EASE } from "./ui/motion";

const waText = "Hello Dr. Abhay Singh, I would like to enquire about a consultation.";

export function Contact() {
  const reduce = useReducedMotion();
  const cards = [
    {
      icon: Phone,
      label: "Phone",
      value: clinic.phoneDisplay,
      href: links.tel,
      external: false,
      cta: "Call Now",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: clinic.phoneDisplay,
      href: links.whatsapp(waText),
      external: true,
      cta: "Message on WhatsApp",
    },
    {
      icon: MapPin,
      label: "Location",
      value: clinic.addressShort,
      href: links.directions,
      external: true,
      cta: "Get Directions",
    },
  ];

  return (
    <section id="contact" className="relative bg-white py-24 sm:py-32" aria-labelledby="contact-title">
      <div className="container-x">
        <SectionHeading
          eyebrow="Contact"
          title="We're here to help you take the first step"
          accentWords={[6, 7]}
          align="center"
          id="contact-title"
        />

        <motion.div
          className="mt-14 grid gap-5 md:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >
          {cards.map(({ icon: Icon, label, value, href, external, cta }) => (
            <motion.a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              variants={{
                hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 50, scale: 0.96 },
                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: EASE } },
              }}
              whileHover={reduce ? {} : { y: -8 }}
              className="group relative overflow-hidden rounded-[28px] border border-forest/10 bg-ivory p-8 transition-colors duration-500 hover:border-forest"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-forest transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-y-100" />
              <div className="relative flex items-start justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-forest shadow-soft transition-colors duration-500 group-hover:bg-ivory/10 group-hover:text-gold">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <ArrowUpRight className="h-6 w-6 text-forest/40 transition-all duration-500 group-hover:rotate-45 group-hover:text-gold" />
              </div>
              <p className="eyebrow relative mt-10 text-gold-deep transition-colors duration-500 group-hover:text-gold">{label}</p>
              <p className="relative mt-2 font-serif text-2xl text-forest transition-colors duration-500 group-hover:text-ivory">
                {value}
              </p>
              <p className="relative mt-6 text-sm font-medium text-forest transition-colors duration-500 group-hover:text-ivory/80">
                {cta} →
              </p>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="mt-5 flex flex-col items-center justify-between gap-6 rounded-[28px] bg-forest p-8 text-ivory sm:p-10 md:flex-row"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
        >
          <div className="flex items-center gap-5">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-gold/50 text-gold">
              <Clock className="h-6 w-6" strokeWidth={1.5} />
            </span>
            <div>
              <p className="eyebrow text-gold">Consultation Hours</p>
              <p className="mt-1 font-serif text-xl sm:text-2xl">
                {hours.map((h) => `${h.from.replace(":00", "")} – ${h.to.replace(":00", "")}`).join("  ·  ")}
              </p>
              <p className="text-sm text-ivory/60">Appointments highly recommended</p>
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href={links.tel} variant="gold" icon={<Phone className="h-4 w-4" />}>
              Call Now
            </Button>
            <Button href={links.whatsapp(waText)} external variant="outline-light" icon={<MessageCircle className="h-4 w-4" />}>
              WhatsApp
            </Button>
            <Button href={links.directions} external variant="outline-light" icon={<Navigation className="h-4 w-4" />}>
              Get Directions
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
