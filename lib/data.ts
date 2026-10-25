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

export const profile = {
  name: "Betesfa Mengesh",
  title: "Software Developer",
  tagline: "I build fast, clean and simple digital products for real people.",
  about:
    "4th-year student at Injibara University. I take ideas from understanding the problem all the way to a working product, with a focus on simplicity, speed and accessibility.",
  email: "mengeshabetesfa2@gmail.com",
  cv: undefined,
  phone: "",
  whatsapp: "",
  location: "Injibara, Ethiopia",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Injibara%2C%20Ethiopia",
  socials: [{ label: "GitHub", href: "https://github.com/betesfa12" }],
};

export const projects: Project[] = [
  {
    year: "2026",
    title: "Agri Market",
    role: "Full-stack Developer",
    tools: ["React", "Vite", "TypeScript", "NestJS", "PostgreSQL", "Prisma", "Passport/JWT", "CSS"],
    repo: "https://github.com/betesfa12/agri-market",
  },
];

export const skills = {
  Frontend: ["TypeScript", "React", "Next.js"],
  Backend: ["Node.js", "NestJS", "REST APIs"],
  Database: ["PostgreSQL", "Prisma"],
  Tools: ["Vite", "Git"],
};

export const experience = [
  {
    period: "Current",
    place: "Injibara University",
    what: "BSc student (4th year)",
  },
];

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
export const SITE_URL =
  configuredSiteUrl?.replace(/\/+$/, "") ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL.replace(/\/+$/, "")}` : "");