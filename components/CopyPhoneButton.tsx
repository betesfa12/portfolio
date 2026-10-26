"use client";

import { useState } from "react";

export default function CopyPhoneButton({ phone }: { phone: string }) {
  const [message, setMessage] = useState("");

  async function copyPhone() {
    try {
      await navigator.clipboard.writeText(phone);
      setMessage("Number copied");
    } catch {
      setMessage("Unable to copy number. Please select the number instead.");
    }
  }

  return (
    <>
      <button className="contact-link" type="button" onClick={copyPhone}>
        Copy number
      </button>
      {message && <span className="copy-status" role="status" aria-live="polite">{message}</span>}
    </>
  );
}
