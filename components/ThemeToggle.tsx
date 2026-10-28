"use client";
import { forwardRef, useEffect, useState } from "react";
import { flushSync } from "react-dom";

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { finished: Promise<void> };
};

const ThemeToggle = forwardRef<HTMLButtonElement>(function ThemeToggle(_, ref) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  function toggle(event: React.MouseEvent<HTMLButtonElement>) {
    const next = theme === "dark" ? "light" : "dark";
    const applyTheme = () => {
      flushSync(() => {
        setTheme(next);
        document.documentElement.dataset.theme = next;
      });
      try { localStorage.setItem("theme", next); } catch {}
    };
    const transitionDocument = document as ViewTransitionDocument;

    if (
      !transitionDocument.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      applyTheme();
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = bounds.left + bounds.width / 2;
    const y = bounds.top + bounds.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    const root = document.documentElement;
    root.style.setProperty("--theme-x", `${x}px`);
    root.style.setProperty("--theme-y", `${y}px`);
    root.style.setProperty("--theme-radius", `${radius}px`);
    const transition = transitionDocument.startViewTransition(applyTheme);
    const clearTransitionOrigin = () => {
      root.style.removeProperty("--theme-x");
      root.style.removeProperty("--theme-y");
      root.style.removeProperty("--theme-radius");
    };
    void transition.finished.then(clearTransitionOrigin, clearTransitionOrigin);
  }

  return (
    <button
      ref={ref}
      className="toggle"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-pressed={theme === "dark"}
    >
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </button>
  );
});

export default ThemeToggle;
