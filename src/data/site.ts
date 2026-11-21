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
  title: "Ayurvedic Physician",
  practice: "Independent Ayurvedic Clinical Practice",
};

export const clinic = {
  name: "Dr. Abhay Singh's Ayurvedic Clinic",
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
 * HOSPITAL AFFILIATION — EDIT AND VERIFY BEFORE PUBLISHING
 * ---------------------------------------------------------
 * Only the hospital name and city are shown as fact. Anything else
 * (photo, website, address, directions) appears ONLY when its `verified`
 * flag is set to true after you have confirmed it with the hospital.
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
  affiliationNote:
    "Dr. Abhay Singh is affiliated with Hiranandani Hospital, Thane. For details of hospital consultations, please contact the clinic directly.",
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
  { id: "expertise", label: "Expertise" },
  { id: "hospital", label: "Hospital" },
  { id: "clinic", label: "Clinic" },
  { id: "contact", label: "Contact" },
] as const;

export const services = [
  {
    key: "ayurvedic",
    title: "Ayurvedic Health Solutions",
    description:
      "Personalised consultations grounded in classical Ayurvedic assessment, considering your constitution, routine and health concerns.",
  },
  {
    key: "stress",
    title: "Stress & Anxiety Management",
    description:
      "Supportive Ayurvedic guidance on daily rhythm, rest, diet and calming practices to help you manage everyday stress.",
  },
  {
    key: "digestive",
    title: "Digestive Health & Wellness",
    description:
      "Thoughtful advice on digestion, eating habits and seasonal routines, in line with traditional Ayurvedic principles.",
  },
  {
    key: "pain",
    title: "Chronic Pain & Conditions",
    description:
      "Ayurvedic consultation for long-standing discomfort and chronic concerns, planned alongside any care you already receive.",
  },
  {
    key: "lifestyle",
    title: "Lifestyle & Preventive Wellness",
    description:
      "Practical guidance on daily and seasonal routines to support balanced, preventive, long-term wellbeing.",
  },
] as const;

export const faqs = [
  {
    q: "Do I need an appointment?",
    a: "Walk-ins may be possible, but appointments are highly recommended so that adequate time can be given to your consultation. You can request one through the form on this page or by calling the clinic.",
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
    q: "What should I bring to my first consultation?",
    a: "Please bring any previous prescriptions, medical reports and a list of medicines or supplements you currently take. This helps the doctor understand your health history.",
  },
  {
    q: "Should I stop my current medicines?",
    a: "Please do not stop or change any prescribed medicine on your own. Discuss your current treatment openly during the consultation.",
  },
  {
    q: "Is this website for emergencies?",
    a: "No. For a medical emergency, please call 112 or visit the nearest hospital emergency department immediately.",
  },
];
