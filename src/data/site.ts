/**
 * Central content file for the website.
 * Every fact shown on the site comes from here, so details can be
 * corrected in one place without touching component code.
 */

export const doctor = {
  name: "Dr. Abhay Singh",
  shortName: "Abhay Singh",
  initials: "AS",
  qualification: "BAMS",
  /**
   * Professional designation as provided by the practice.
   * Verify against the doctor's medical council registration before publishing.
   */
  title: "General Physician",
  practice: "Independent General Practice",
};

export const clinic = {
  name: "Dr. Abhay Singh's Clinic",
  addressLines: ["Jamil Nagar,", "Bhandup West,", "Mumbai, Maharashtra, India."],
  addressShort: "Jamil Nagar, Bhandup West, Mumbai",
  locality: "Bhandup West",
  city: "Mumbai",
  region: "Maharashtra",
  country: "IN",
  phoneDisplay: "+91 98678 15917",
  phoneE164: "+919867815917",
  whatsappNumber: "919867815917",
  /** Search query used for the map embed and directions. */
  mapsQuery: "Jamil Nagar, Bhandup West, Mumbai, Maharashtra, India",
};

export const hours = [
  { id: "morning", label: "Morning", from: "11:00 AM", to: "1:00 PM", startHour: 11, endHour: 13 },
  { id: "evening", label: "Evening", from: "7:00 PM", to: "10:30 PM", startHour: 19, endHour: 22.5 },
] as const;

export const links = {
  tel: `tel:${clinic.phoneE164}`,
  whatsapp: (text?: string) =>
    `https://wa.me/${clinic.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(clinic.mapsQuery)}`,
  mapEmbed: `https://maps.google.com/maps?q=${encodeURIComponent(clinic.mapsQuery)}&z=15&output=embed`,
};

/**
 * HOSPITAL SECTION — EDIT AND VERIFY BEFORE PUBLISHING
 * ---------------------------------------------------
 * Only the hospital name and city are shown as fact. NO affiliation,
 * employment, role or department is claimed. Each item below (the
 * affiliation statement, photo, website, address/directions) appears
 * ONLY when its `verified` flag is set to true after confirmation.
 *
 * To add the hospital photograph: place an authorised image at
 * public/images/hospital.jpg and set `image.verified` to true.
 */
export const hospital = {
  name: "Hiranandani Hospital",
  city: "Thane",
  region: "Maharashtra, India",
  /** Neutral description that avoids claiming any role or department. */
  intro:
    "Hiranandani Hospital in Thane is a multi-speciality hospital serving the Thane and wider Mumbai Metropolitan Region.",
  affiliation: {
    /** Shown only when verified. Describe the confirmed association exactly. */
    text: "Dr. Abhay Singh is associated with Hiranandani Hospital, Thane.",
    verified: false,
  },
  /** Shown while the affiliation is unverified. Makes no claim. */
  pendingNote:
    "Details of any professional association between Dr. Abhay Singh and this hospital will be added here once verified. For hospital-related queries, please contact the clinic.",
  image: {
    src: "/images/hospital.jpg",
    alt: "Exterior of Hiranandani Hospital, Thane",
    verified: false,
  },
  website: {
    url: "https://www.hiranandanihospital.org",
    verified: false,
  },
  address: {
    // Listed by third-party directories — confirm before enabling.
    text: "Hiranandani Estate, Off Ghodbunder Road, Patlipada, Thane (West), Maharashtra 400607",
    verified: false,
  },
};

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "hospital", label: "Hospital" },
  { id: "clinic", label: "Clinic" },
  { id: "contact", label: "Contact" },
] as const;

/**
 * Consultation services. Descriptions are deliberately general — adjust
 * them to match the doctor's registered scope of practice.
 */
export const services = [
  {
    key: "general",
    title: "General Health Consultations",
    description:
      "Unhurried consultations for everyday health concerns, with a careful history, examination and clear next steps.",
  },
  {
    key: "preventive",
    title: "Preventive Healthcare",
    description:
      "Guidance on staying well — routine check-up planning, risk-factor awareness and timely screening advice.",
  },
  {
    key: "illness",
    title: "Common Illnesses",
    description:
      "Consultation for common, short-term problems such as fever, cough, cold, sore throat and stomach upsets.",
  },
  {
    key: "assessment",
    title: "Health Assessments",
    description:
      "General health assessments, including blood pressure and weight checks and a review of your existing reports.",
  },
  {
    key: "lifestyle",
    title: "Lifestyle Guidance",
    description:
      "Practical advice on diet, physical activity, sleep and stress to support long-term health and wellbeing.",
  },
] as const;

export const faqs = [
  {
    q: "Do I need an appointment?",
    a: "Appointments are highly recommended so that adequate time can be given to your consultation. You can request one through the form on this page or by calling the clinic.",
  },
  {
    q: "Is my appointment confirmed once I send the WhatsApp request?",
    a: "No. The form only prepares a WhatsApp message with your preferred date and time. The clinic will reply to confirm availability.",
  },
  {
    q: "What are the consultation timings?",
    a: "Morning: 11:00 AM – 1:00 PM. Evening: 7:00 PM – 10:30 PM. Please call ahead to confirm before visiting.",
  },
  {
    q: "What should I bring to my consultation?",
    a: "Please bring any previous prescriptions, recent test reports and a list of the medicines you currently take. This helps the doctor understand your health history.",
  },
  {
    q: "Can I get a referral to a specialist?",
    a: "If your condition needs specialist evaluation or tests, the doctor will advise you on the appropriate next step.",
  },
  {
    q: "Is this website for emergencies?",
    a: "No. For a medical emergency, please call 112 or go to the nearest hospital emergency department immediately.",
  },
];
