import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import {
  Activity,
  AudioWaveform,
  Bone,
  CloudFog,
  Droplet,
  Droplets,
  Gauge,
  Info,
  MessageCircle,
  Phone,
  Pill,
  Syringe,
  Thermometer,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { useState, type MouseEvent } from "react";
import { clinicalServices, clinic, links } from "../data/site";
import { Button } from "./ui/Button";
import { PulseLine } from "./ui/MedicalVisuals";
import { SectionHeading } from "./ui/SectionHeading";
import { EASE } from "./ui/motion";

const icons: Record<string, LucideIcon> = {
  ecg: Activity,
  hgt: Droplet,
  nebulisation: CloudFog,
  diabetes: Droplets,
  fever: Thermometer,
  cough: AudioWaveform,
  asthma: Wind,
  joint: Bone,
  bp: Gauge,
  iv: Syringe,
  medication: Pill,
};

type Group = (typeof clinicalServices)[number];
type Item = Group["items"][number];
type FilterId = "all" | Group["id"];

const enquiry = (name: string) =>
  links.whatsapp(`Hello Dr. Abhay Singh, I would like to enquire about a consultation regarding: ${name}.`);

function ServiceCard({ item, wide, index }: { item: Item; wide?: boolean; index: number }) {
  const reduce = useReducedMotion();
  const Icon = icons[item.icon];
  const px = useMotionValue(50);
  const py = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(360px circle at ${px}% ${py}%, rgba(43,179,163,.12), transparent 65%)`;
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width) * 100);
    py.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <motion.article
      layout={!reduce}
      variants={{
        hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 48, scale: 0.97 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.85, ease: EASE } },
      }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
      whileHover={reduce ? {} : { y: -6 }}
      onMouseMove={onMove}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-navy/10 bg-white p-6 shadow-soft transition-[border-color,box-shadow] duration-500 hover:border-teal/50 hover:shadow-lift sm:p-7"
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />
      {/* Top accent line that draws on hover */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-teal to-navy-soft transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-x-100"
      />

      <div className={`relative flex ${wide ? "flex-col gap-5 sm:flex-row sm:items-start" : "flex-col gap-5"}`}>
        <div className="flex items-start justify-between">
          <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-aqua-light text-teal-deep transition-all duration-500 group-hover:-rotate-6 group-hover:bg-navy group-hover:text-teal">
            {Icon && <Icon className="h-6 w-6" strokeWidth={1.7} />}
            <span className="absolute inset-0 rounded-2xl ring-1 ring-teal/0 transition-all duration-700 group-hover:scale-125 group-hover:opacity-0 group-hover:ring-teal/40" />
          </span>
          {!wide && <span className="font-display text-xs font-semibold text-navy/30">{String(index + 1).padStart(2, "0")}</span>}
        </div>

        <div className="flex-1">
          <h4 className="font-display text-xl font-semibold tracking-tight text-navy">{item.name}</h4>
          <p className="mt-0.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-teal-deep">{item.full}</p>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{item.description}</p>
        </div>
      </div>

      <div className="relative mt-auto flex items-center justify-between pt-6">
        <a
          href={enquiry(`${item.name} (${item.full})`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-navy transition-colors hover:text-teal-deep"
          aria-label={`Enquire about ${item.name} on WhatsApp`}
        >
          <MessageCircle className="h-4 w-4" />
          <span className="relative">
            Enquire
            <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 group-hover:scale-x-100" />
          </span>
        </a>
        <span aria-hidden className="h-5 w-20 text-teal opacity-30 transition-opacity duration-500 group-hover:opacity-100">
          <PulseLine loop={item.icon === "ecg"} className="h-full w-full" />
        </span>
      </div>
    </motion.article>
  );
}

function GroupBlock({ group }: { group: Group }) {
  const cols =
    group.items.length === 2 ? "md:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="scroll-mt-28"
    >
      <motion.div
        className="mb-6 flex flex-col gap-3 border-b border-navy/10 pb-5 sm:flex-row sm:items-end sm:justify-between"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy font-display text-sm font-bold text-teal">
            {group.number}
          </span>
          <h3 className="font-display text-2xl font-semibold tracking-tight text-navy sm:text-[1.7rem]">{group.title}</h3>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-muted sm:text-right">{group.intro}</p>
      </motion.div>

      <motion.div
        className={`grid gap-5 ${cols}`}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
      >
        {group.items.map((item, i) => (
          <ServiceCard key={item.name} item={item} index={i} wide={group.items.length === 2} />
        ))}
      </motion.div>
    </motion.div>
  );
}

export function ClinicalServices() {
  const [filter, setFilter] = useState<FilterId>("all");
  const tabs: { id: FilterId; label: string; count: number }[] = [
    { id: "all", label: "All Services", count: clinicalServices.reduce((n, g) => n + g.items.length, 0) },
    ...clinicalServices.map((g) => ({ id: g.id as FilterId, label: g.short, count: g.items.length })),
  ];
  const visible = clinicalServices.filter((g) => filter === "all" || g.id === filter);

  return (
    <section id="services" className="relative overflow-x-clip bg-paper py-24 sm:py-32" aria-labelledby="clinical-services-title">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-x-0 top-0 h-80 [mask-image:linear-gradient(to_bottom,#000,transparent)]" />

      <div className="container-x relative">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Clinical Services"
            title="Clinical Services & Treatments Available at the Clinic"
            accentWords={[7]}
            id="clinical-services-title"
          />
          <motion.div
            className="max-w-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          >
            <p className="text-muted">
              Tests, consultations and treatment available at {clinic.addressShort.replace(", Mumbai", "")}. Each service
              is provided following an appropriate medical assessment.
            </p>
          </motion.div>
        </div>

        {/* Category filter */}
        <LayoutGroup>
          <motion.div
            role="tablist"
            aria-label="Filter services by category"
            className="-mx-5 mt-12 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {tabs.map((t) => {
              const active = filter === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(t.id)}
                  className={`relative inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors duration-300 ${
                    active ? "border-navy text-paper" : "border-navy/15 text-navy hover:border-teal/60"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="clinical-filter"
                      className="absolute inset-0 rounded-full bg-navy"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{t.label}</span>
                  <span
                    className={`relative grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[0.7rem] font-semibold ${
                      active ? "bg-teal text-navy-deep" : "bg-aqua-light text-teal-deep"
                    }`}
                  >
                    {t.count}
                  </span>
                </button>
              );
            })}
          </motion.div>

          <div className="mt-10 space-y-16">
            <AnimatePresence initial={false}>
              {visible.map((g) => (
                <GroupBlock key={g.id} group={g} />
              ))}
            </AnimatePresence>
          </div>
        </LayoutGroup>

        {/* Responsible-care note + consultation CTA */}
        <motion.div
          className="relative mt-16 grid overflow-hidden rounded-[32px] bg-navy text-paper lg:grid-cols-[1.3fr_1fr]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-16 text-teal/15">
            <PulseLine className="h-full w-full" />
          </div>
          <div className="relative p-8 sm:p-10">
            <p className="eyebrow text-teal">Please note</p>
            <ul className="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-paper/80">
              <li className="flex gap-3">
                <Info className="mt-1 h-4 w-4 shrink-0 text-teal" />
                Tests and treatments, including IV fluids and medications, are provided only after an appropriate medical
                assessment, and may not be suitable for every patient.
              </li>
              <li className="flex gap-3">
                <Info className="mt-1 h-4 w-4 shrink-0 text-teal" />
                Individual responses to treatment vary, and no specific outcome is guaranteed.
              </li>
              <li className="flex gap-3">
                <Info className="mt-1 h-4 w-4 shrink-0 text-teal" />
                The clinic does not provide emergency or 24/7 services. In an emergency, call 112 or go to the nearest
                emergency department.
              </li>
            </ul>
          </div>
          <div className="relative flex flex-col justify-center gap-4 border-t border-paper/10 p-8 sm:p-10 lg:border-l lg:border-t-0">
            <p className="font-display text-2xl font-semibold tracking-tight">Not sure which service you need?</p>
            <p className="text-sm text-paper/70">Message the clinic and describe your concern — the doctor will advise during your consultation.</p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row lg:flex-col [&_a]:whitespace-nowrap">
              <Button
                href={links.whatsapp("Hello Dr. Abhay Singh, I would like to book a consultation.")}
                external
                variant="accent"
                icon={<MessageCircle className="h-4 w-4" />}
              >
                Contact for Consultation
              </Button>
              <Button href={links.tel} variant="outline-light" icon={<Phone className="h-4 w-4" />}>
                {clinic.phoneDisplay}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
