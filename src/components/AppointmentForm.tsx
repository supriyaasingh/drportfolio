import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from "motion/react";
import { AlertCircle, CalendarDays, Clock, MessageCircle, Phone, RotateCcw, Send, ShieldCheck, User } from "lucide-react";
import { useEffect, useId, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { clinic, doctor, links } from "../data/site";
import { PulseLine } from "./ui/MedicalVisuals";
import { Button } from "./ui/Button";
import { SectionHeading } from "./ui/SectionHeading";
import { EASE } from "./ui/motion";

type Values = { name: string; mobile: string; date: string; time: string; reason: string };
type Errors = Partial<Record<keyof Values, string>>;

const timeGroups = [
  {
    label: "Morning session (11:00 AM – 1:00 PM)",
    options: ["11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "Any time — Morning"],
  },
  {
    label: "Evening session (7:00 PM – 10:30 PM)",
    options: ["7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "Any time — Evening"],
  },
];

const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

function normaliseMobile(v: string) {
  let digits = v.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits;
}

export function validate(v: Values): Errors {
  const e: Errors = {};
  const name = v.name.trim();
  if (!name) e.name = "Please enter the patient's name.";
  else if (name.length < 2 || !/^[\p{L} .'-]+$/u.test(name)) e.name = "Please enter a valid name (letters only).";

  const m = normaliseMobile(v.mobile);
  if (!v.mobile.trim()) e.mobile = "Please enter a mobile number.";
  else if (!/^[6-9]\d{9}$/.test(m)) e.mobile = "Enter a valid 10-digit Indian mobile number.";

  if (!v.date) e.date = "Please choose a preferred date.";
  else if (v.date < todayISO()) e.date = "Please choose today or a future date.";

  if (!v.time) e.time = "Please choose a preferred time.";

  const r = v.reason.trim();
  if (!r) e.reason = "Please briefly describe the reason for consultation.";
  else if (r.length < 5) e.reason = "Please add a little more detail (at least 5 characters).";
  return e;
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function buildMessage(v: Values) {
  return [
    `Hello ${doctor.name},`,
    "",
    "I would like to request an appointment.",
    "",
    `Patient Name: ${v.name.trim()}`,
    `Mobile: +91 ${normaliseMobile(v.mobile)}`,
    `Preferred Date: ${formatDate(v.date)}`,
    `Preferred Time: ${v.time}`,
    `Reason for Consultation: ${v.reason.trim()}`,
    "",
    "Please let me know if this time is available. Thank you.",
  ].join("\n");
}

/* ---------- Field shell with floating label & animated underline ---------- */
function Field({
  id,
  label,
  icon,
  error,
  filled,
  float = false,
  children,
  shakeKey,
  className = "",
  hint,
}: {
  id: string;
  label: string;
  icon: ReactNode;
  error?: string;
  filled: boolean;
  /** Keep the label floated even when empty (date/select inputs). */
  float?: boolean;
  children: ReactNode;
  shakeKey: number;
  className?: string;
  hint?: string;
}) {
  const reduce = useReducedMotion();
  const controls = useAnimationControls();
  useEffect(() => {
    if (shakeKey > 0 && error && !reduce) controls.start({ x: [0, -8, 7, -5, 3, 0], transition: { duration: 0.45 } });
  }, [shakeKey, error, controls, reduce]);

  return (
    <motion.div animate={controls} className={`group relative ${className}`}>
      <div
        className={`relative rounded-2xl border bg-white transition-[border-color,box-shadow] duration-300 focus-within:shadow-[0_0_0_4px_rgba(43,179,163,.16)] ${
          error ? "border-red-700/60" : "border-navy/12 focus-within:border-teal"
        }`}
      >
        <span
          className={`pointer-events-none absolute left-4 top-[1.15rem] transition-colors duration-300 ${
            error ? "text-red-700" : filled ? "text-navy" : "text-navy/40 group-focus-within:text-teal-deep"
          }`}
        >
          {icon}
        </span>
        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-11 origin-left transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] ${
            filled || float
              ? "top-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-teal-deep"
              : "top-[1.05rem] text-[0.98rem] text-muted group-focus-within:top-2 group-focus-within:text-[0.7rem] group-focus-within:font-semibold group-focus-within:uppercase group-focus-within:tracking-[0.12em] group-focus-within:text-teal-deep"
          }`}
        >
          {label}
        </label>
        {children}
        {/* animated success tick */}
        <AnimatePresence>
          {filled && !error && (
            <motion.svg
              viewBox="0 0 24 24"
              className="pointer-events-none absolute right-4 top-[1.15rem] h-5 w-5 text-navy"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              aria-hidden
            >
              <circle cx="12" cy="12" r="10" fill="#E3F4F2" />
              <motion.path
                d="M7 12.5l3.2 3L17 9"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            id={`${id}-error`}
            role="alert"
            className="mt-1.5 flex items-center gap-1.5 pl-1 text-[0.82rem] text-red-800"
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {error}
          </motion.p>
        ) : hint ? (
          <p className="mt-1.5 pl-1 text-[0.78rem] text-muted">{hint}</p>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

const inputCls =
  "peer block w-full appearance-none rounded-2xl bg-transparent pb-2.5 pl-11 pr-11 pt-7 text-[1rem] text-ink outline-none placeholder-transparent";

export function AppointmentForm() {
  const uid = useId();
  const empty: Values = { name: "", mobile: "", date: "", time: "", reason: "" };
  const [values, setValues] = useState<Values>(empty);
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [shake, setShake] = useState(0);
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  const allErrors = useMemo(() => validate(values), [values]);
  const visibleErrors: Errors = {};
  (Object.keys(allErrors) as (keyof Values)[]).forEach((k) => {
    if (submitted || touched[k]) visibleErrors[k] = allErrors[k];
  });
  const completed = (Object.keys(values) as (keyof Values)[]).filter((k) => values[k].trim() && !allErrors[k]).length;

  const set = (k: keyof Values) => (e: { target: { value: string } }) => setValues((v) => ({ ...v, [k]: e.target.value }));
  const blur = (k: keyof Values) => () => setTouched((t) => ({ ...t, [k]: true }));
  const fid = (k: string) => `${uid}-${k}`;
  const aria = (k: keyof Values) => ({
    "aria-invalid": !!visibleErrors[k] || undefined,
    "aria-describedby": visibleErrors[k] ? `${fid(k)}-error` : undefined,
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate(values);
    if (Object.keys(errs).length) {
      setShake((s) => s + 1);
      const first = (Object.keys(errs) as (keyof Values)[])[0];
      document.getElementById(fid(first))?.focus();
      return;
    }
    const url = links.whatsapp(buildMessage(values));
    setSentUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const reset = () => {
    setValues(empty);
    setTouched({});
    setSubmitted(false);
    setSentUrl(null);
  };

  return (
    <section id="appointment" className="relative overflow-hidden bg-paper-deep py-24 sm:py-32" aria-labelledby="appointment-title">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-10 hidden h-24 text-teal/60 lg:block">
        <PulseLine className="h-full w-full" />
      </div>
      <div className="container-x grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="Book an Appointment"
            title="Request your consultation"
            accentWords={[2]}
            intro="Fill in your details and we'll prepare a WhatsApp message to the clinic. Your appointment is confirmed only when the clinic replies."
            id="appointment-title"
          />
          <motion.ol
            className="mt-10 space-y-5"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } } }}
          >
            {[
              "Share your details and preferred time.",
              "WhatsApp opens with your request ready — press send.",
              "The clinic replies to confirm availability.",
            ].map((t, i) => (
              <motion.li
                key={t}
                className="flex items-start gap-4"
                variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } } }}
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-teal/60 font-display text-sm font-semibold text-navy">
                  {i + 1}
                </span>
                <span className="pt-1.5 text-ink">{t}</span>
              </motion.li>
            ))}
          </motion.ol>
          <p className="mt-10 flex items-center gap-2 text-sm text-muted">
            <Phone className="h-4 w-4 text-teal-deep" />
            Prefer to call?{" "}
            <a href={links.tel} className="font-medium text-navy underline decoration-teal underline-offset-4">
              {clinic.phoneDisplay}
            </a>
          </p>
        </div>

        <motion.div
          className="relative rounded-[32px] bg-white p-6 shadow-lift sm:p-10"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.16em] text-muted">
              <span>Appointment request</span>
              <span aria-live="polite">
                {completed}/5 complete
              </span>
            </div>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-navy/8">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-navy to-teal"
                animate={{ width: `${(completed / 5) * 100}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!sentUrl ? (
              <motion.form
                key="form"
                noValidate
                onSubmit={onSubmit}
                className="grid gap-5 sm:grid-cols-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                transition={{ duration: 0.45 }}
              >
                <Field
                  id={fid("name")}
                  label="Patient Name"
                  icon={<User className="h-[18px] w-[18px]" />}
                  error={visibleErrors.name}
                  filled={!!values.name}
                  shakeKey={shake}
                  className="sm:col-span-2"
                >
                  <input
                    id={fid("name")}
                    type="text"
                    autoComplete="name"
                    maxLength={80}
                    value={values.name}
                    onChange={set("name")}
                    onBlur={blur("name")}
                    className={inputCls}
                    {...aria("name")}
                  />
                </Field>

                <Field
                  id={fid("mobile")}
                  label="Mobile Number"
                  icon={<Phone className="h-[18px] w-[18px]" />}
                  error={visibleErrors.mobile}
                  filled={!!values.mobile}
                  shakeKey={shake}
                  className="sm:col-span-2"
                  hint="10-digit mobile number, e.g. 98XXXXXXXX"
                >
                  <input
                    id={fid("mobile")}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    maxLength={16}
                    value={values.mobile}
                    onChange={set("mobile")}
                    onBlur={blur("mobile")}
                    className={inputCls}
                    {...aria("mobile")}
                  />
                </Field>

                <Field
                  id={fid("date")}
                  label="Preferred Date"
                  icon={<CalendarDays className="h-[18px] w-[18px]" />}
                  error={visibleErrors.date}
                  filled={!!values.date}
                  float
                  shakeKey={shake}
                >
                  <input
                    id={fid("date")}
                    type="date"
                    min={todayISO()}
                    value={values.date}
                    onChange={set("date")}
                    onBlur={blur("date")}
                    className={`${inputCls} min-h-[3.6rem] ${values.date ? "" : "text-muted/60"}`}
                    {...aria("date")}
                  />
                </Field>

                <Field
                  id={fid("time")}
                  label="Preferred Time"
                  icon={<Clock className="h-[18px] w-[18px]" />}
                  error={visibleErrors.time}
                  filled={!!values.time}
                  float
                  shakeKey={shake}
                >
                  <select
                    id={fid("time")}
                    value={values.time}
                    onChange={set("time")}
                    onBlur={blur("time")}
                    className={`${inputCls} min-h-[3.6rem] cursor-pointer ${values.time ? "" : "text-muted/70"}`}
                    {...aria("time")}
                  >
                    <option value="" disabled>
                      Select a time
                    </option>
                    {timeGroups.map((g) => (
                      <optgroup key={g.label} label={g.label}>
                        {g.options.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </Field>

                <Field
                  id={fid("reason")}
                  label="Reason for Consultation"
                  icon={<MessageCircle className="h-[18px] w-[18px]" />}
                  error={visibleErrors.reason}
                  filled={!!values.reason}
                  shakeKey={shake}
                  className="sm:col-span-2"
                >
                  <textarea
                    id={fid("reason")}
                    rows={4}
                    maxLength={500}
                    value={values.reason}
                    onChange={set("reason")}
                    onBlur={blur("reason")}
                    className={`${inputCls} resize-none`}
                    {...aria("reason")}
                  />
                  <span className="pointer-events-none absolute bottom-2 right-4 text-[0.7rem] text-muted/70">
                    {values.reason.length}/500
                  </span>
                </Field>

                <div className="sm:col-span-2">
                  <p className="mb-5 flex items-start gap-2 text-[0.82rem] leading-relaxed text-muted">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-navy" />
                    Your details are not stored on this website. They are only placed into a WhatsApp message that you
                    choose to send. Please avoid sharing sensitive medical details here.
                  </p>
                  <Button type="submit" className="w-full sm:w-auto" icon={<Send className="h-4 w-4" />}>
                    Submit Appointment Request
                  </Button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="done"
                className="py-6 text-center"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: EASE }}
                role="status"
              >
                <svg viewBox="0 0 80 80" className="mx-auto h-20 w-20" aria-hidden>
                  <motion.circle
                    cx="40"
                    cy="40"
                    r="36"
                    fill="none"
                    stroke="#2BB3A3"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M25 41l10 10 20-22"
                    fill="none"
                    stroke="#0B2E42"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  />
                </svg>
                <h3 className="mt-6 text-3xl font-medium text-navy">Your request is ready to send</h3>
                <p className="mx-auto mt-3 max-w-md text-muted">
                  WhatsApp should now be open with your appointment request. Please press <strong>send</strong> in
                  WhatsApp. Your appointment is <strong>not yet confirmed</strong> — the clinic will reply to confirm
                  availability.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button href={sentUrl} external variant="accent" icon={<MessageCircle className="h-4 w-4" />}>
                    Open WhatsApp Again
                  </Button>
                  <Button variant="outline" onClick={reset} icon={<RotateCcw className="h-4 w-4" />}>
                    New Request
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
