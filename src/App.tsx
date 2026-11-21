import { MotionConfig, useReducedMotion } from "motion/react";
import { useCallback, useState } from "react";
import { About } from "./components/About";
import { AppointmentForm } from "./components/AppointmentForm";
import { ClinicLocation } from "./components/ClinicLocation";
import { ConsultationHours } from "./components/ConsultationHours";
import { Contact } from "./components/Contact";
import { FAQ } from "./components/FAQ";
import { FloatingActions } from "./components/FloatingActions";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Hospital } from "./components/Hospital";
import { Navbar } from "./components/Navbar";
import { Philosophy } from "./components/Philosophy";
import { Preloader } from "./components/Preloader";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { Services } from "./components/Services";
import { useLenis } from "./hooks/useLenis";
import { useMediaQuery } from "./hooks/useMediaQuery";

export default function App() {
  const reduce = useReducedMotion();
  const finePointer = useMediaQuery("(pointer: fine)");
  const [ready, setReady] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const closePrivacy = useCallback(() => setPrivacyOpen(false), []);

  // Smooth wheel scrolling on desktop only; touch devices keep native scrolling.
  useLenis(finePointer && !reduce);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-forest focus:px-5 focus:py-3 focus:text-ivory"
      >
        Skip to content
      </a>
      <Preloader onDone={() => setReady(true)} />
      <Navbar ready={ready} />
      <main id="main">
        <Hero ready={ready} />
        <About />
        <Services />
        <Philosophy />
        <Hospital />
        <ClinicLocation />
        <ConsultationHours />
        <AppointmentForm />
        <FAQ />
        <Contact />
      </main>
      <Footer onPrivacy={() => setPrivacyOpen(true)} />
      <FloatingActions ready={ready} />
      <PrivacyPolicy open={privacyOpen} onClose={closePrivacy} />
    </MotionConfig>
  );
}
