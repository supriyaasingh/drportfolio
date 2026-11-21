import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { CalendarCheck, Info, Moon, Sun } from "lucide-react";
import { useRef, useState } from "react";
import { hours } from "../data/site";
import { scrollToId } from "../hooks/useLenis";
import { Button } from "./ui/Button";
import { SectionHeading } from "./ui/SectionHeading";
import { EASE } from "./ui/motion";

type SlotId = (typeof hours)[number]["id"];

/** Analog clock whose hands sweep to the start of the selected session. */
function SessionClock({ hour, active }: { hour: number; active: boolean }) {
  const reduce = useReducedMotion();
  const h12 = hour % 12;
  const hourDeg = h12 * 30 + (hour % 1) * 30;
  const minDeg = (hour % 1) * 360;
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
      <circle cx="100" cy="100" r="96" fill="#FFFFFF" stroke="#2BB3A3" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="86" fill="none" stroke="#0B2E42" strokeOpacity=".08" />
      {Array.from({ length: 60 }).map((_, i) => (
        <line
          key={i}
          x1="100"
          y1={i % 5 === 0 ? 18 : 22}
          x2="100"
          y2="26"
          stroke={i % 5 === 0 ? "#0B2E42" : "#9FD8D1"}
          strokeWidth={i % 5 === 0 ? 2 : 1}
          transform={`rotate(${i * 6} 100 100)`}
        />
      ))}
      {[12, 3, 6, 9].map((n, i) => (
        <text
          key={n}
          x={100 + Math.sin((i * Math.PI) / 2) * 58}
          y={100 - Math.cos((i * Math.PI) / 2) * 58 + 7}
          textAnchor="middle"
          fontFamily="Plus Jakarta Sans Variable, sans-serif"
          fontSize="20"
          fill="#0B2E42"
        >
          {n}
        </text>
      ))}
      <motion.line
        x1="100"
        y1="100"
        x2="100"
        y2="54"
        stroke="#0B2E42"
        strokeWidth="5"
        strokeLinecap="round"
        style={{ originX: "100px", originY: "100px" }}
        initial={{ rotate: 0 }}
        animate={{ rotate: active ? hourDeg : 0 }}
        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 70, damping: 15 }}
      />
      <motion.line
        x1="100"
        y1="100"
        x2="100"
        y2="34"
        stroke="#2BB3A3"
        strokeWidth="3"
        strokeLinecap="round"
        style={{ originX: "100px", originY: "100px" }}
        initial={{ rotate: 0 }}
        animate={{ rotate: active ? minDeg + 720 : 0 }}
        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 55, damping: 16 }}
      />
      <circle cx="100" cy="100" r="6" fill="#0B2E42" />
      <circle cx="100" cy="100" r="2.5" fill="#2BB3A3" />
    </svg>
  );
}

/** 24-hour ribbon highlighting both consultation windows. */
function DayRibbon({ selected }: { selected: SlotId }) {
  return (
    <div>
      <div className="relative h-3 rounded-full bg-navy/8">
        {hours.map((h, i) => (
          <motion.span
            key={h.id}
            className={`absolute top-0 h-full rounded-full transition-colors duration-500 ${
              selected === h.id ? "bg-teal" : "bg-aqua"
            }`}
            style={{ left: `${(h.startHour / 24) * 100}%`, width: `${((h.endHour - h.startHour) / 24) * 100}%`, originX: 0 }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 + i * 0.25, ease: EASE }}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[0.7rem] tracking-wide text-muted">
        <span>12 AM</span>
        <span>6 AM</span>
        <span>12 PM</span>
        <span>6 PM</span>
        <span>12 AM</span>
      </div>
    </div>
  );
}

export function ConsultationHours() {
  const [selected, setSelected] = useState<SlotId>("morning");
  const clockRef = useRef<HTMLDivElement>(null);
  const inView = useInView(clockRef, { once: true, margin: "0px 0px -20% 0px" });
  const current = hours.find((h) => h.id === selected)!;

  return (
    <section id="hours" className="relative overflow-hidden bg-white py-24 sm:py-32" aria-labelledby="hours-title">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Consultation Hours"
            title="Morning & Evening Consultations"
            accentWords={[2]}
            intro="Choose the session that suits your day. As timings may occasionally change, please call or message the clinic to confirm before visiting."
            id="hours-title"
          />

          <div className="mt-10 space-y-3" role="tablist" aria-label="Consultation sessions">
            {hours.map((h) => {
              const isSel = selected === h.id;
              const Icon = h.id === "morning" ? Sun : Moon;
              return (
                <button
                  key={h.id}
                  type="button"
                  role="tab"
                  aria-selected={isSel}
                  onClick={() => setSelected(h.id)}
                  onMouseEnter={() => setSelected(h.id)}
                  onFocus={() => setSelected(h.id)}
                  className="relative flex w-full items-center gap-5 rounded-2xl border border-navy/10 p-5 text-left transition-colors duration-300 hover:border-teal/50"
                >
                  {isSel && (
                    <motion.span
                      layoutId="hours-active"
                      className="absolute inset-0 rounded-2xl bg-navy"
                      transition={{ type: "spring", stiffness: 300, damping: 32 }}
                    />
                  )}
                  <span
                    className={`relative grid h-12 w-12 shrink-0 place-items-center rounded-xl transition-colors duration-500 ${
                      isSel ? "bg-paper/10 text-teal" : "bg-paper text-navy"
                    }`}
                  >
                    <motion.span animate={isSel ? { rotate: h.id === "morning" ? 90 : -20 } : { rotate: 0 }} transition={{ duration: 0.8, ease: EASE }}>
                      <Icon className="h-5 w-5" strokeWidth={1.6} />
                    </motion.span>
                  </span>
                  <span className="relative flex-1">
                    <span className={`eyebrow block transition-colors ${isSel ? "text-teal" : "text-teal-deep"}`}>{h.label}</span>
                    <span className={`mt-1 block font-display text-2xl transition-colors sm:text-[1.7rem] ${isSel ? "text-paper" : "text-navy"}`}>
                      {h.from} – {h.to}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-2xl bg-paper p-4 text-sm text-ink">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-teal-deep" />
            <p>
              <strong className="font-semibold text-navy">Appointments highly recommended.</strong> Timings shown are
              regular consultation hours and do not indicate live availability.
            </p>
          </div>
        </div>

        {/* Clock card */}
        <motion.div
          ref={clockRef}
          className="relative mx-auto w-full max-w-md rounded-[32px] bg-paper p-8 shadow-lift sm:p-10"
          initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <div className="mx-auto aspect-square w-full max-w-[280px]">
            <SessionClock hour={current.startHour} active={inView} />
          </div>
          <div className="mt-8 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                transition={{ duration: 0.4 }}
              >
                <p className="eyebrow text-teal-deep">{current.label} Session</p>
                <p className="mt-2 font-display text-3xl text-navy">
                  {current.from} – {current.to}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-8">
            <DayRibbon selected={selected} />
          </div>
          <div className="mt-8 flex justify-center">
            <Button onClick={() => scrollToId("appointment")} icon={<CalendarCheck className="h-4 w-4" />}>
              Request a Time
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
