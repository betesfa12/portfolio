"use client";

import { type KeyboardEvent as ReactKeyboardEvent, useEffect, useRef, useState } from "react";

type CommandPaletteProps = {
  hasProjects: boolean;
  email: string;
  onToggleTheme: () => void;
};

export default function CommandPalette({ hasProjects, email, onToggleTheme }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [shortcutLabel, setShortcutLabel] = useState("Ctrl K");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const commandRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeIndex = useRef(0);

  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.platform)) setShortcutLabel("⌘ K");
  }, []);

  function closePalette() {
    setIsOpen(false);
    if (dialogRef.current?.open) dialogRef.current.close();
    triggerRef.current?.focus();
  }

  useEffect(() => {
    function openFromShortcut(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        event.preventDefault();
        closePalette();
        return;
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (isOpen) {
          closePalette();
        } else {
          setFeedback("");
          setIsOpen(true);
        }
      }
    }

    document.addEventListener("keydown", openFromShortcut);
    return () => document.removeEventListener("keydown", openFromShortcut);
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog || dialog.open) return;

    dialog.showModal();
    activeIndex.current = 0;
    commandRefs.current[0]?.focus();
  }, [isOpen]);

  function navigateTo(id: string) {
    window.history.pushState(null, "", `#${id}`);
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
    closePalette();
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setFeedback("Email copied");
    } catch {
      setFeedback("Unable to copy email. Please select the address instead.");
    }
  }

  const commands = [
    ...(hasProjects ? [{ label: "Projects", action: () => navigateTo("work") }] : []),
    { label: "About", action: () => navigateTo("about") },
    { label: "Contact", action: () => navigateTo("contact") },
    { label: "Toggle dark mode", action: () => { onToggleTheme(); closePalette(); } },
    ...(email ? [{ label: "Copy email", action: copyEmail }] : []),
  ];

  function handleDialogKeyDown(event: ReactKeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

    event.preventDefault();
    const direction = event.key === "ArrowDown" ? 1 : -1;
    activeIndex.current = (activeIndex.current + direction + commands.length) % commands.length;
    commandRefs.current[activeIndex.current]?.focus();
  }

  return (
    <>
      <button
        ref={triggerRef}
        className="command-trigger"
        type="button"
        aria-haspopup="dialog"
        aria-keyshortcuts="Control+K Meta+K"
        onClick={() => {
          setFeedback("");
          setIsOpen(true);
        }}
      >
        {shortcutLabel}
      </button>
      <dialog
        ref={dialogRef}
        className="command-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="command-dialog-title"
        onCancel={(event) => {
          event.preventDefault();
          closePalette();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closePalette();
        }}
        onKeyDown={handleDialogKeyDown}
      >
        <h2 id="command-dialog-title" className="sr-only">Quick actions</h2>
        <ul className="command-list">
          {commands.map((command, index) => (
            <li key={command.label}>
              <button
                ref={(element) => { commandRefs.current[index] = element; }}
                type="button"
                onFocus={() => { activeIndex.current = index; }}
                onClick={command.action}
              >
                {command.label}
              </button>
            </li>
          ))}
        </ul>
        {feedback && <p className="command-feedback" role="status" aria-live="polite">{feedback}</p>}
      </dialog>
    </>
  );
}
