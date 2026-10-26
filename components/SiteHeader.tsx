"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { certifications, experience, profile, projects } from "@/lib/data";

const sections = [
  ...(projects.length > 0 ? [{ id: "work", label: "Projects" }] : []),
  { id: "about", label: "About" },
  ...(experience.length > 0 ? [{ id: "experience", label: "Experience" }] : []),
  ...(certifications.length > 0 ? [{ id: "certifications", label: "Certifications" }] : []),
  { id: "contact", label: "Contact" },
];

export default function SiteHeader() {
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;

    function updateActiveSection() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const headerHeight = document.querySelector(".bar")?.getBoundingClientRect().height ?? 0;
        const activationLine = headerHeight + 48;
        const lastSection = sections[sections.length - 1];

        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
          setActiveSection(lastSection.id);
          return;
        }

        const currentSection = [...sections]
          .reverse()
          .find(({ id }) => {
            const section = document.getElementById(id);
            return section && section.getBoundingClientRect().top <= activationLine;
          });

        setActiveSection(currentSection?.id ?? "");
      });
    }

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <header className="bar">
      <a href="#top" className="brand" aria-label={`${profile.name} home`} onClick={() => setMenuOpen(false)}>
        <span className="brand-mark" aria-hidden="true">BM</span>
        <span>{profile.name}</span>
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
        <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
      </button>
      <nav
        id="primary-navigation"
        className={menuOpen ? "primary-navigation is-open" : "primary-navigation"}
        aria-label="Main navigation"
      >
        {sections.map(({ id, label }) => (
          <a
            href={`#${id}`}
            key={id}
            aria-current={activeSection === id ? "location" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </a>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  );
}
