# Dr. Abhay Singh — General Physician Website

Portfolio and practice website for Dr. Abhay Singh, BAMS, General Physician, Jamil Nagar, Bhandup West, Mumbai.

> **Verify before publishing:** the designation "General Physician" is shown as provided. Confirm it matches the doctor's medical council registration and permitted designation, and adjust the service descriptions in `src/data/site.ts` to the actual scope of practice.

Built with React 18, Vite, TypeScript, Tailwind CSS v4, Motion (Framer Motion), Lenis smooth scrolling and Lucide icons.

## Preview locally

Requires Node.js 18 or newer.

```bash
npm install
npm run dev        # development server → http://localhost:5173
```

Production preview:

```bash
npm run build      # type-checks and builds into dist/
npm run preview    # serves dist/ → http://localhost:4173
```

To test on your phone, connect it to the same Wi-Fi network and open the **Network** URL that `npm run dev` prints, for example `http://192.168.x.x:5173`.

## Where to edit content

All facts live in **`src/data/site.ts`**: doctor details, clinic address, phone number, timings, clinical services & treatments (`clinicalServices`), areas of care and FAQ. Components read from this file, so you don't need to edit them to change content.

## Images

```
public/images/
  doctor-hero.jpg / .webp   Full-length white-coat photo supplied by the practice (1200×1789, unaltered; cropped by CSS).
  doctor-portrait.webp/.jpg Supplied portrait, cropped to 4:5.
  og-image.jpg              1200×630 social sharing image.
public/favicon.svg          "AS" monogram favicon
public/apple-touch-icon.png
```

The hero frame crops the full-length photo to a 4:5 portrait from the top using CSS, so the original image file keeps its full proportions.

## Appointment flow

The form validates name, Indian mobile number, a date that isn't in the past, a time slot and the reason for the visit. It then opens `wa.me/919867815917` with a pre-filled message. Nothing is stored or sent automatically. The patient presses **Send** in WhatsApp, and the site states clearly that the clinic still has to confirm the appointment.

## Structure

```
src/
  App.tsx, main.tsx, index.css
  data/site.ts                 all content and verification flags
  hooks/useLenis.ts            smooth scroll and scroll-to-section
  hooks/useMediaQuery.ts
  components/
    Preloader, Navbar, Hero, About, ClinicalServices, Services (Areas of Care), Philosophy,
    ClinicLocation, ConsultationHours, AppointmentForm, FAQ, Contact,
    Footer, FloatingActions, PrivacyPolicy
    ui/  Button (magnetic), SplitText, Reveal, SectionHeading,
         MedicalVisuals (ECG pulse line, instrument rings, plus marks), ServiceIcons, motion presets
```

## Accessibility and motion

- Respects `prefers-reduced-motion`. Parallax, looping and drawing animations are turned off, and content appears without movement.
- Lenis smooth scrolling runs only on mouse/trackpad devices. Touch devices keep native scrolling.
- Includes a skip link, keyboard-operable menu, FAQ and modal (Esc closes), visible focus rings, labelled form fields and `aria-live` error messages.
