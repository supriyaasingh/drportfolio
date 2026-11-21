import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { ArrowUp, CalendarCheck, Phone } from "lucide-react";
import { useState } from "react";
import { links } from "../data/site";
import { scrollToId } from "../hooks/useLenis";
import { EASE } from "./ui/motion";

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35ZM12.04 21.5h-.01a9.43 9.43 0 0 1-4.8-1.32l-.35-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43a9.38 9.38 0 0 1 6.67 2.77 9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.43 9.43Zm8.03-17.47A11.28 11.28 0 0 0 12.04.7C5.78.7.69 5.79.69 12.05c0 2 .52 3.95 1.52 5.67L.6 23.6l6.02-1.58a11.33 11.33 0 0 0 5.42 1.38h.01c6.25 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.33-8.02Z" />
    </svg>
  );
}

export function FloatingActions({ ready }: { ready: boolean }) {
  const { scrollY, scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const ring = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 600));

  return (
    <>
      {/* Desktop / tablet floating cluster */}
      <div className="fixed bottom-6 right-6 z-40 hidden flex-col items-end gap-3 sm:flex">
        <AnimatePresence>
          {visible && (
            <motion.button
              key="top"
              type="button"
              onClick={() => scrollToId("home")}
              aria-label="Back to top"
              className="relative grid h-14 w-14 place-items-center rounded-full bg-white text-navy shadow-lift"
              initial={{ opacity: 0, scale: 0.4, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.4, y: 20 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <svg viewBox="0 0 56 56" className="absolute inset-0 -rotate-90" aria-hidden>
                <circle cx="28" cy="28" r="26" fill="none" stroke="#0B2E42" strokeOpacity=".08" strokeWidth="2" />
                <motion.circle cx="28" cy="28" r="26" fill="none" stroke="#2BB3A3" strokeWidth="2" style={{ pathLength: ring }} />
              </svg>
              <ArrowUp className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>

        <motion.a
          href={links.whatsapp("Hello Dr. Abhay Singh, I would like to enquire about a consultation.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="group relative flex h-14 items-center gap-0 overflow-hidden rounded-full bg-[#1F8A5B] pl-4 pr-4 text-white shadow-lift"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={ready ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 1.6, ease: EASE }}
          whileHover={{ y: -4 }}
        >
          <motion.span
            className="absolute inset-0 rounded-full bg-[#1F8A5B]"
            animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.6, repeat: Infinity }}
            aria-hidden
          />
          <WhatsAppGlyph className="relative h-6 w-6" />
          <span className="relative max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-500 group-hover:ml-2.5 group-hover:max-w-[160px]">
            WhatsApp
          </span>
        </motion.a>
      </div>

      {/* Mobile sticky action bar */}
      <AnimatePresence>
        {ready && (
          <motion.div
            className="fixed inset-x-0 bottom-0 z-40 border-t border-navy/10 bg-paper/90 px-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-3 backdrop-blur-xl sm:hidden"
            initial={{ y: "100%" }}
            animate={{ y: visible ? 0 : "100%" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="grid grid-cols-[auto_auto_1fr] gap-2">
              <a
                href={links.tel}
                className="grid h-12 w-12 place-items-center rounded-full border border-navy/15 bg-white text-navy"
                aria-label="Call the clinic"
              >
                <Phone className="h-5 w-5" />
              </a>
              <a
                href={links.whatsapp("Hello Dr. Abhay Singh, I would like to enquire about a consultation.")}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-12 w-12 place-items-center rounded-full bg-[#1F8A5B] text-white"
                aria-label="Chat on WhatsApp"
              >
                <WhatsAppGlyph className="h-5 w-5" />
              </a>
              <button
                type="button"
                onClick={() => scrollToId("appointment")}
                className="flex h-12 items-center justify-center gap-2 rounded-full bg-navy text-sm font-medium text-paper"
              >
                <CalendarCheck className="h-4 w-4" /> Book Appointment
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
