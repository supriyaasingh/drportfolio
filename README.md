# Dr. Abhay Singh — Ayurvedic Physician Website

Portfolio and practice website for Dr. Abhay Singh, BAMS, Ayurvedic Physician, Jamil Nagar, Bhandup West, Mumbai.

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

All facts live in **`src/data/site.ts`**: doctor details, clinic address, phone number, timings, services, FAQ and hospital affiliation. Components read from this file, so you don't need to edit them to change content.

### Hospital affiliation: verify before publishing

The hospital section shows only the hospital name, the city and a neutral affiliation statement. Everything else stays hidden until you confirm it and set its `verified` flag to `true` in `src/data/site.ts`:

| Item | Flag | Current status |
| --- | --- | --- |
| Hospital photograph | `hospital.image.verified` | A clearly marked placeholder is shown. Add an authorised photo at `public/images/hospital.jpg`. |
| Hospital website link | `hospital.website.verified` | Hidden. `hiranandanihospital.org` was found only through third-party sources. |
| Address and directions | `hospital.address.verified` | Hidden. The address listed by directories needs confirming. |

Also review `hospital.intro` and `hospital.affiliationNote` with the doctor.

## Images

```
public/images/
  doctor-hero.webp / .png   White-coat photo from the supplied flyer. Background removed; face and features unchanged.
  doctor-portrait.webp/.jpg Supplied portrait, cropped to 4:5.
  og-image.jpg              1200×630 social sharing image.
public/favicon.svg          "AS" monogram favicon
public/apple-touch-icon.png
```

The white-coat photo was taken from the promotional flyer, so its resolution is limited (500 px wide). If you have the original high-resolution photo, replace `doctor-hero.webp` and `doctor-hero.png` with a transparent-background version at the same aspect ratio.

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
    Preloader, Navbar, Hero, About, Services, Philosophy, Hospital,
    ClinicLocation, ConsultationHours, AppointmentForm, FAQ, Contact,
    Footer, FloatingActions, PrivacyPolicy
    ui/  Button (magnetic), SplitText, Reveal, SectionHeading,
         Botanicals (SVG leaves, branch, mandala), ServiceIcons, motion presets
```

## Accessibility and motion

- Respects `prefers-reduced-motion`. Parallax, looping and drawing animations are turned off, and content appears without movement.
- Lenis smooth scrolling runs only on mouse/trackpad devices. Touch devices keep native scrolling.
- Includes a skip link, keyboard-operable menu, FAQ and modal (Esc closes), visible focus rings, labelled form fields and `aria-live` error messages.
