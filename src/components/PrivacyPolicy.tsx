import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { clinic, doctor } from "../data/site";
import { lockScroll } from "../hooks/useLenis";
import { EASE } from "./ui/motion";

export function PrivacyPolicy({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-forest-deep/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-title"
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-t-[28px] bg-ivory p-7 shadow-lift sm:rounded-[28px] sm:p-10"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-forest/15 text-forest hover:bg-forest hover:text-ivory"
              aria-label="Close privacy policy"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="eyebrow text-gold-deep">Privacy</p>
            <h2 id="privacy-title" className="mt-2 text-3xl text-forest">
              Privacy Policy
            </h2>
            <div className="mt-6 space-y-4 text-[0.95rem] leading-relaxed text-muted">
              <p>
                This website is the online presence of {doctor.name}'s independent Ayurvedic clinical practice. We respect
                your privacy and aim to collect as little personal information as possible.
              </p>
              <h3 className="pt-2 font-sans text-base font-semibold text-forest">Appointment requests</h3>
              <p>
                The appointment form does not store or transmit your details to any server operated by this website. When
                you submit it, your browser opens WhatsApp with a pre-written message. The message is sent only if you
                choose to send it, and is then handled under WhatsApp's own terms and privacy policy.
              </p>
              <h3 className="pt-2 font-sans text-base font-semibold text-forest">Maps and third-party services</h3>
              <p>
                The clinic location map is provided by Google Maps. Loading the map or following direction links may allow
                Google to collect usage data under its own privacy policy.
              </p>
              <h3 className="pt-2 font-sans text-base font-semibold text-forest">Cookies</h3>
              <p>This website does not use advertising or analytics cookies.</p>
              <h3 className="pt-2 font-sans text-base font-semibold text-forest">Medical information</h3>
              <p>
                Content on this website is general information and not medical advice. Please avoid sharing sensitive
                medical details through WhatsApp; these can be discussed during your consultation.
              </p>
              <h3 className="pt-2 font-sans text-base font-semibold text-forest">Contact</h3>
              <p>
                For any privacy questions, please call {clinic.phoneDisplay} or visit the clinic at {clinic.addressShort}.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
