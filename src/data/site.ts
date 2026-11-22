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

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "clinic", label: "Clinic" },
  { id: "contact", label: "Contact" },
] as const;

/**
 * CLINICAL SERVICES & TREATMENTS — exactly the list provided by the clinic.
 * Do not add services here that the clinic has not confirmed.
 */
export const clinicalServices = [
  {
    id: "diagnostic",
    number: "01",
    title: "Diagnostic & Basic Clinical Services",
    short: "Diagnostics",
    intro: "Simple tests and procedures carried out at the clinic when advised during your consultation.",
    items: [
      {
        icon: "ecg",
        name: "ECG",
        full: "Electrocardiogram",
        description: "A quick, non-invasive recording of the heart's electrical activity, done at the clinic when clinically advised.",
      },
      {
        icon: "hgt",
        name: "HGT",
        full: "Blood Glucose Testing",
        description: "Finger-prick capillary blood glucose test to check your blood sugar level during the visit.",
      },
      {
        icon: "nebulisation",
        name: "Nebulisation",
        full: "Inhaled medication",
        description: "Medication given as a fine mist through a nebuliser, when prescribed by the doctor after assessment.",
      },
    ],
  },
  {
    id: "consultation",
    number: "02",
    title: "Medical Consultation",
    short: "Consultation",
    intro: "Consultations for common and long-term conditions, with treatment planned around your individual assessment.",
    items: [
      {
        icon: "diabetes",
        name: "Diabetes",
        full: "Blood sugar care",
        description: "Consultation and follow-up for diabetes, including review of blood sugar readings and current medicines.",
      },
      {
        icon: "fever",
        name: "Fever",
        full: "Evaluation & care",
        description: "Assessment of fever to understand its likely cause, with treatment or tests advised as appropriate.",
      },
      {
        icon: "cough",
        name: "Cough",
        full: "Short-term & persistent",
        description: "Evaluation of cough, with treatment or further investigation recommended where needed.",
      },
      {
        icon: "asthma",
        name: "Asthma",
        full: "Symptom review",
        description: "Consultation for asthma symptoms, treatment review and guidance on correct inhaler use.",
      },
      {
        icon: "joint",
        name: "Joint Pain",
        full: "Pain & stiffness",
        description: "Assessment of joint pain and stiffness, with treatment advice and referral when required.",
      },
      {
        icon: "bp",
        name: "Hypertension",
        full: "High blood pressure",
        description: "Blood pressure checks, review of treatment and regular follow-up for high blood pressure.",
      },
    ],
  },
  {
    id: "care",
    number: "03",
    title: "Clinical Care & Treatment",
    short: "Treatment",
    intro: "Treatment provided at the clinic only after an appropriate medical assessment by the doctor.",
    items: [
      {
        icon: "iv",
        name: "IV Fluid Administration",
        full: "Intravenous fluids",
        description: "Intravenous fluids given at the clinic when the doctor considers them medically appropriate after assessment.",
      },
      {
        icon: "medication",
        name: "Medications & Medical Treatment",
        full: "Prescribed treatment",
        description: "Medicines prescribed or administered as part of a treatment plan, based on the doctor's assessment.",
      },
    ],
  },
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
    a: "No. For a medical emergency, please call 112 or go to the nearest emergency department immediately.",
  },
];
