import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { CalendarCheck, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { clinic, doctor, links, navItems } from "../data/site";
import { lockScroll, scrollToId } from "../hooks/useLenis";
import { Button } from "./ui/Button";
import { EASE } from "./ui/motion";

function useActiveSection() {
  const [active, setActive] = useState<string>("home");
  useEffect(() => {
    const ids = navItems.map((n) => n.id);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return active;
}

export function Navbar({ ready }: { ready: boolean }) {
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
  });

  useEffect(() => {
    lockScroll(open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    // Allow the menu to start closing before scrolling.
    setTimeout(() => scrollToId(id), open ? 250 : 0);
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: ready ? 0 : -100 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <div
          className={`transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
            scrolled || open
              ? "bg-ivory/85 shadow-[0_1px_0_rgba(23,61,43,.08),0_10px_30px_-18px_rgba(23,61,43,.35)] backdrop-blur-xl"
              : "bg-transparent"
          }`}
        >
          <nav
            className={`container-x flex items-center justify-between transition-[height] duration-500 ${scrolled ? "h-[72px]" : "h-[88px]"}`}
            aria-label="Primary"
          >
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                go("home");
              }}
              className="group flex min-w-0 items-center gap-2.5 sm:gap-3"
              aria-label={`${doctor.name} — home`}
            >
              <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-forest text-ivory sm:h-11 sm:w-11">
                <span className="font-serif text-[1.05rem] italic">AS</span>
                <span className="absolute inset-[3px] rounded-full border border-gold/60 transition-transform duration-700 group-hover:rotate-180 group-hover:scale-90" />
              </span>
              <span className="leading-tight">
                <span className="block font-serif text-[1.05rem] font-semibold text-forest sm:text-[1.15rem]">{doctor.name}</span>
                <span className="block text-[0.6rem] font-medium uppercase tracking-[0.12em] text-muted sm:text-[0.68rem] sm:tracking-[0.2em]">
                  {doctor.qualification} · {doctor.title}
                </span>
              </span>
            </a>

            <ul className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(item.id);
                    }}
                    aria-current={active === item.id ? "true" : undefined}
                    className={`group relative px-3.5 py-2 text-[0.92rem] font-medium transition-colors ${
                      active === item.id ? "text-forest" : "text-charcoal/70 hover:text-forest"
                    }`}
                  >
                    {item.label}
                    <span className="absolute inset-x-3.5 bottom-1 h-px origin-right scale-x-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:origin-left group-hover:scale-x-100" />
                    {active === item.id && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <div className="hidden sm:block">
                <Button
                  onClick={() => go("appointment")}
                  icon={<CalendarCheck className="h-4 w-4" />}
                  className="!min-h-11 !px-5 !text-sm"
                >
                  Book Appointment
                </Button>
              </div>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-forest/15 bg-white/50 lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
              >
                <span className="relative block h-3.5 w-5">
                  <motion.span
                    className="absolute left-0 top-0 h-[1.5px] w-5 rounded bg-forest"
                    animate={open ? { top: "50%", rotate: 45, y: "-50%" } : { top: "0%", rotate: 0, y: "0%" }}
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                  <motion.span
                    className="absolute left-0 top-1/2 h-[1.5px] w-3.5 -translate-y-1/2 rounded bg-forest"
                    animate={{ opacity: open ? 0 : 1, x: open ? 8 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="absolute bottom-0 left-0 h-[1.5px] w-5 rounded bg-forest"
                    animate={open ? { bottom: "50%", rotate: -45, y: "50%" } : { bottom: "0%", rotate: 0, y: "0%" }}
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                </span>
              </button>
            </div>
          </nav>
          {/* Scroll progress indicator */}
          <motion.div
            aria-hidden
            className="h-[2px] origin-left bg-gradient-to-r from-gold via-gold to-sage"
            style={{ scaleX: progress, opacity: scrolled ? 1 : 0 }}
          />
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-forest text-ivory lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 42px) 44px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 42px) 44px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 42px) 44px)" }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="h-[88px]" />
            <motion.ul
              className="container-x mt-6 flex flex-1 flex-col gap-1"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } },
              }}
            >
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  className="overflow-hidden border-b border-ivory/10"
                  variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(item.id);
                    }}
                    className="flex items-baseline justify-between py-4"
                  >
                    <span className={`font-serif text-[2rem] ${active === item.id ? "italic text-gold" : ""}`}>
                      {item.label}
                    </span>
                    <span className="text-xs tracking-[0.2em] text-ivory/40">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div
              className="container-x flex flex-col gap-3 pb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}
              exit={{ opacity: 0 }}
            >
              <Button variant="gold" onClick={() => go("appointment")} icon={<CalendarCheck className="h-4 w-4" />}>
                Book Appointment
              </Button>
              <Button variant="outline-light" href={links.tel} icon={<Phone className="h-4 w-4" />}>
                Call {clinic.phoneDisplay}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
