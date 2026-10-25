"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/lib/data";

const sections = [
  { id: "work", label: "Projects" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function SiteHeader() {
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
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
