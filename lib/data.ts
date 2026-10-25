// ሁሉንም ይዘት እዚህ ብቻ ቀይር። ሌሎች ፋይሎችን መንካት አያስፈልግም።
export type Project = {
  year: string;
  title: string;
  role: string;
  problem: string;
  result: string;
  tools: string[];
  link?: string;
};

export const profile = {
  name: "ስምህ ይህ ነው",
  title: "ሶፍትዌር ገንቢ",
  tagline: "ለሰዎች ቀላል የሆኑ ፈጣን እና ንጹህ ዲጂታል ምርቶችን እሠራለሁ።",
  about:
    "ችግርን ከመረዳት ጀምሬ እስከ ሥራ ላይ እስከሚውል ምርት ድረስ የምሠራ ገንቢ ነኝ። ቀላልነትን፣ ፍጥነትንና ተደራሽነትን አስቀድማለሁ።",
  email: "you@example.com",
  cv: "/cv.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
  ],
};

export const projects: Project[] = [
  {
    year: "2026",
    title: "የገበሬዎች የገበያ መተግበሪያ",
    role: "ሙሉ ስታክ ገንቢ",
    problem: "ገበሬዎች የምርታቸውን ዋጋ በወቅቱ ማወቅ አይችሉም ነበር።",
    result: "በመጀመሪያው ወር ከ500 በላይ ተጠቃሚዎች ተመዝግበዋል።",
    tools: ["Next.js", "TypeScript", "PostgreSQL"],
    link: "https://example.com",
  },
  {
    year: "2025",
    title: "የትምህርት ቤት አስተዳደር ሥርዓት",
    role: "የፊት ገጽ መሪ",
    problem: "የተማሪ ውጤት በወረቀት ስለሚያዝ ለመፈለግ ብዙ ጊዜ ይወስድ ነበር።",
    result: "ውጤት መፈለግ ከደቂቃዎች ወደ ሰከንዶች ቀንሷል።",
    tools: ["React", "Node.js"],
  },
  {
    year: "2024",
    title: "የአነስተኛ ንግድ ድረ-ገጽ",
    role: "ዲዛይንና ልማት",
    problem: "ንግዱ በመስመር ላይ አልነበረም።",
    result: "የስልክ ጥሪዎች በ40% ጨምረዋል።",
    tools: ["Figma", "Next.js"],
  },
];

export const skills = ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Figma", "Git"];

export const experience = [
  { period: "2024 – አሁን", place: "ነጻ ሥራ", what: "ለአነስተኛ ንግዶች ድረ-ገጾችና መተግበሪያዎች" },
  { period: "2022 – 2024", place: "የኩባንያ ስም", what: "ጁኒየር ገንቢ" },
];
