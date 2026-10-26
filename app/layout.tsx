import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { profile, SITE_URL } from "@/lib/data";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });

const pageTitle = `${profile.name} — ${profile.title}`;
const pageDescription = `${profile.about} ${profile.tagline}`;

export const metadata: Metadata = {
  metadataBase: SITE_URL ? new URL(SITE_URL) : undefined,
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

const themeScript = `try{var t=localStorage.getItem("theme");if(!t){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={display.variable} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>{children}</body>
    </html>
  );
}
