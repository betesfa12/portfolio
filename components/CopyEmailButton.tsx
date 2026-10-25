"use client";

import { useState } from "react";

export default function CopyEmailButton({ email }: { email: string }) {
  const [message, setMessage] = useState("");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setMessage("Email copied");
    } catch {
      setMessage("Unable to copy email. Please select the address instead.");
    }
  }

  return (
    <>
      <button className="contact-link copy-email" type="button" onClick={copyEmail}>
        Copy email
      </button>
      {message && <span className="copy-status" role="status" aria-live="polite">{message}</span>}
    </>
  );
}
