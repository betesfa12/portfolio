// Edit all content here only.
export type Project = {
  year: string;
  title: string;
  role: string;
  problem?: string;
  result?: string;
  features?: string[];
  tools?: string[];
  link?: string;
  repo?: string;
};

export const profile = {
  name: "Betesfa Mengesh",
  title: "Software Developer",
  tagline: "I build fast, clean and simple digital products for real people.",
  about:
    "Final-year student at Injibara University. I take ideas from understanding the problem all the way to a working product, with a focus on simplicity, speed and accessibility.",
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
    problem: "An Amharic-first marketplace connecting Ethiopian farmers with buyers.",
    result: "Buyers can discover and order produce while farmers manage product listings and incoming orders.",
    features: [
      "Browse produce by category and location",
      "Buyer cart and order placement",
      "Farmer tools for managing products and incoming orders",
      "Buyer and farmer accounts with Amharic and English localization",
    ],
    tools: ["React", "Vite", "TypeScript", "NestJS", "PostgreSQL", "Prisma", "Passport/JWT", "CSS"],
    repo: "https://github.com/betesfa12/agri-market",
  },
];

export const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Git",
];

export const experience = [
  {
    period: "Current",
    place: "Injibara University",
    what: "BSc student (final year)",
  },
];