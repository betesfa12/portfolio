import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { profile, SITE_URL } from "@/lib/data";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });

const pageTitle = `${profile.name} — ${profile.title}`;
const pageDescription = `${profile.about} ${profile.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL || "http://localhost:3000"),
  title: pageTitle,
  description: pageDescription,
  ...(SITE_URL ? { alternates: { canonical: "/" } } : {}),
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    siteName: profile.name,
    locale: "en_US",
    ...(SITE_URL ? { url: SITE_URL, images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: pageTitle }] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    ...(SITE_URL ? { images: [`${SITE_URL}/opengraph-image`] } : {}),
  },
};

const themeScript = `try{var d=document.documentElement;var t=localStorage.getItem("theme");if(!t){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}d.dataset.theme=t;var s=Number(localStorage.getItem("text-size"));d.dataset.textSize=Number.isInteger(s)&&s%2===0&&s>=16&&s<=24?String(s):"18"}catch(e){document.documentElement.dataset.textSize="18"}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={display.variable} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>{children}</body>
    </html>
  );
}
