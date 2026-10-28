"use client";

import { useEffect } from "react";

export default function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.dataset.revealed = "true";
      });
      return;
    }

    document.documentElement.dataset.revealReady = "true";
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.revealed = "true";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));
    const revealFallback = window.setTimeout(() => {
      elements.forEach((element) => {
        element.dataset.revealed = "true";
      });
      observer.disconnect();
    }, 2500);

    return () => {
      window.clearTimeout(revealFallback);
      observer.disconnect();
      delete document.documentElement.dataset.revealReady;
    };
  }, []);

  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches
    ) return;

    const spotlightTargets = document.querySelectorAll<HTMLElement>(
      ".project-card, .about-card, .contact-content",
    );
    const magneticTargets = document.querySelectorAll<HTMLElement>(".hero .btn.primary");
    const cleanup: (() => void)[] = [];

    spotlightTargets.forEach((target) => {
      const move = (event: PointerEvent) => {
        if (
          event.pointerType === "touch" ||
          window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches
        ) return;
        const bounds = target.getBoundingClientRect();
        target.style.setProperty("--mx", `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
        target.style.setProperty("--my", `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
        if (target.classList.contains("project-card")) {
          const x = (event.clientX - bounds.left) / bounds.width * 2 - 1;
          const y = (event.clientY - bounds.top) / bounds.height * 2 - 1;
          target.style.setProperty("--tilt-x", `${x * 2}deg`);
          target.style.setProperty("--tilt-y", `${y * -2}deg`);
        }
      };
      const leave = () => {
        target.style.removeProperty("--mx");
        target.style.removeProperty("--my");
        target.style.removeProperty("--tilt-x");
        target.style.removeProperty("--tilt-y");
      };
      target.addEventListener("pointermove", move, { passive: true });
      target.addEventListener("pointerleave", leave, { passive: true });
      cleanup.push(() => {
        target.removeEventListener("pointermove", move);
        target.removeEventListener("pointerleave", leave);
      });
    });

    magneticTargets.forEach((target) => {
      const move = (event: PointerEvent) => {
        if (
          event.pointerType === "touch" ||
          window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches
        ) return;
        const bounds = target.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - .5;
        const y = (event.clientY - bounds.top) / bounds.height - .5;
        target.style.setProperty("--mag-x", `${x * 12}px`);
        target.style.setProperty("--mag-y", `${y * 12}px`);
      };
      const leave = () => {
        target.style.removeProperty("--mag-x");
        target.style.removeProperty("--mag-y");
      };
      target.addEventListener("pointermove", move, { passive: true });
      target.addEventListener("pointerleave", leave, { passive: true });
      cleanup.push(() => {
        target.removeEventListener("pointermove", move);
        target.removeEventListener("pointerleave", leave);
      });
    });

    return () => cleanup.forEach((removeListeners) => removeListeners());
  }, []);

  return null;
}
