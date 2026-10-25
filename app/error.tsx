"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Portfolio page error:", error.digest ?? error.name);
  }, [error]);

  return (
    <main className="message-page">
      <p className="section-index">Something went wrong</p>
      <h1>Please try again<span className="name-period">.</span></h1>
      <p className="message-copy">The page could not be displayed right now.</p>
      <button className="btn primary" type="button" onClick={reset}>Try again</button>
    </main>
  );
}
