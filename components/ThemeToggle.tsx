"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
  }

  return (
    <button className="toggle" onClick={toggle} aria-label="ብሩህ/ጨለማ ገጽታ ቀይር">
      {theme === "dark" ? "ብሩህ ገጽታ" : "ጨለማ ገጽታ"}
    </button>
  );
}
