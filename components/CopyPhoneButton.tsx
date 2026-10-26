"use client";

import { useEffect, useRef, useState } from "react";

export default function CopyPhoneButton({ phone }: { phone: string }) {
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  async function copyPhone() {
    try {
      await navigator.clipboard.writeText(phone);
      setMessage("");
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setMessage("Unable to copy number. Please select the number instead.");
    }
  }

  return (
    <>
      <button className="contact-link" type="button" onClick={copyPhone}>
        {copied ? "Copied" : "Copy number"}
      </button>
      {message && <span className="copy-status" role="status" aria-live="polite">{message}</span>}
    </>
  );
}
