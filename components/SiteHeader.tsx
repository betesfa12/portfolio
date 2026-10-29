"use client";

import { useEffect, useRef, useState } from "react";
import CommandPalette from "@/components/CommandPalette";
import ThemeToggle from "@/components/ThemeToggle";
import TextSizeControl from "@/components/TextSizeControl";
import { certifications, experience, profile, projects } from "@/lib/data";

const sections = [
  { id: "about", label: "About" },
  ...(projects.length > 0 ? [{ id: "work", label: "Projects" }] : []),
  { id: "skills", label: "Skills" },
  ...(experience.length > 0 ? [{ id: "experience", label: "Experience" }] : []),
  ...(certifications.length > 0 ? [{ id: "certifications", label: "Certifications" }] : []),
  { id: "contact", label: "Contact" },
];

export default function SiteHeader() {
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef<HTMLSpanElement>(null);
  const themeToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;

    function updateActiveSection() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const headerHeight = document.querySelector(".bar")?.getBoundingClientRect().height ?? 0;
        const activationLine = headerHeight + 48;
        const lastSection = sections[sections.length - 1];
        const contactSection = document.getElementById("contact");
        const contactBounds = contactSection?.getBoundingClientRect();

        if (
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2 ||
          (contactBounds && contactBounds.top < window.innerHeight && contactBounds.bottom > headerHeight)
        ) {
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
    let frame = 0;

    function updateProgress() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        document.querySelector(".bar")?.classList.toggle("is-scrolled", window.scrollY > 24);
        progressRef.current?.style.setProperty("transform", `scaleX(${Math.min(1, Math.max(0, progress))})`);
      });
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
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
    <header className="bar container">
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
        {profile.cv?.trim() && (
          <a className="nav-cv" href={profile.cv.trim()} download>
            Download CV
          </a>
        )}
        <CommandPalette
          hasProjects={projects.length > 0}
          email={profile.email}
          phone={profile.phone.trim()}
          whatsapp={profile.whatsapp.trim() || profile.phone.replace(/\D/g, "")}
          onToggleTheme={() => themeToggleRef.current?.click()}
        />
        <ThemeToggle ref={themeToggleRef} />
        <TextSizeControl />
      </nav>
      <span className="scroll-progress" aria-hidden="true">
        <span ref={progressRef} />
      </span>
    </header>
  );
}
