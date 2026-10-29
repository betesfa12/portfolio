import Link from "next/link";

export default function NotFound() {
  return (
    <main className="message-page">
      <p className="section-index">404 / Page not found</p>
      <h1>Nothing here<span className="name-period" aria-hidden="true" /></h1>
      <p className="message-copy">The page may have moved or the address may be incorrect.</p>
      <Link className="btn primary" href="/">Back to home <span aria-hidden="true">↗</span></Link>
    </main>
  );
}
