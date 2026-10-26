// Edit all content here only.
export type Project = {
  year: string;
  title: string;
  role: string;
  overview?: string;
  problem?: string;
  result?: string;
  features?: string[];
  tools?: string[];
  screenshots?: string[];
  liveUrl?: string;
  link?: string;
  repo?: string;
};

export type Education = {
  institution: string;
  qualification: string;
};

export type Experience = {
  period: string;
  place: string;
  what: string;
};

export type Certification = {
  name: string;
  issuer: string;
  year?: string;
  url?: string;
};

export const profile = {
  name: "Betesfa Mengesh",
  title: "Software Engineering Student",
  tagline: "I build fast, clean and simple digital products for real people.",
  about:
    "4th-year Software Engineering student at Injibara University. I take ideas from understanding the problem all the way to a working product, with a focus on simplicity, speed and accessibility.",
  email: "mengeshabetesfa2@gmail.com",
  cv: undefined,
  // Optional: one availability sentence and a LinkedIn profile URL; keep empty until provided.
  availability: "",
  linkedin: "",
  // Public phone number in international format, e.g. "+251912345678".
  phone: "+251929767575",
  // WhatsApp number as digits only, e.g. "251912345678"; falls back to phone digits.
  whatsapp: "251929767575",
  // Telegram username without @.
  telegram: "",
  location: "Injibara, Ethiopia",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Injibara%2C%20Ethiopia",
  socials: [{ label: "GitHub", href: "https://github.com/betesfa12" }],
};

// Add projects as Project entries; screenshots can be discovered from public/projects/*.png.
export const projects: Project[] = [
  {
    year: "2026",
    title: "Agri Market",
    role: "Full-stack Developer",
    overview:
      "Agri Market is an Amharic-first marketplace that connects Ethiopian farmers with buyers. Buyers can discover and order produce, while farmers manage their product listings and incoming orders.",
    features: [
      "Browse produce by category and location",
      "Buyer cart and order placement",
      "Farmer tools for managing products and incoming orders",
      "Buyer and farmer accounts with Amharic and English localization",
    ],
    tools: ["React", "Vite", "TypeScript", "NestJS", "PostgreSQL", "Prisma", "Passport/JWT", "CSS"],
  },
];

export const skills = {
  Frontend: ["TypeScript", "React", "Next.js"],
  Backend: ["Node.js", "NestJS", "REST APIs"],
  Database: ["PostgreSQL", "Prisma"],
  Tools: ["Vite", "Git"],
};

export const education: Education[] = [
  { institution: "Injibara University", qualification: "BSc in Software Engineering (4th year)" },
];

// Add verified internships, clubs, volunteering, or hackathons as Experience entries.
export const experience: Experience[] = [];

// Add verified credentials as Certification entries.
export const certifications: Certification[] = [];

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
export const SITE_URL = configuredSiteUrl?.replace(/\/+$/, "") || "";