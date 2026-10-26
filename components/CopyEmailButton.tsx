"use client";

import { useEffect, useRef, useState } from "react";

export default function CopyEmailButton({ email }: { email: string }) {
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setMessage("");
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setMessage("Unable to copy email. Please select the address instead.");
    }
  }

  return (
    <>
      <button className="contact-link copy-email" type="button" onClick={copyEmail}>
        {copied ? "Copied" : "Copy email"}
      </button>
      {message && <span className="copy-status" role="status" aria-live="polite">{message}</span>}
    </>
  );
}
