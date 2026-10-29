"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Screenshot = { src: string; alt: string };

export default function ProjectGallery({
  projectTitle,
  screenshots,
}: {
  projectTitle: string;
  screenshots: Screenshot[];
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const isOpen = activeIndex !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    dialog.querySelector<HTMLButtonElement>(".project-lightbox-close")?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, [isOpen]);

  function closeLightbox() {
    dialogRef.current?.close();
  }

  function handleDialogKeyDown(event: React.KeyboardEvent<HTMLDialogElement>) {
    if (activeIndex === null) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeLightbox();
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      setActiveIndex((activeIndex + 1) % screenshots.length);
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setActiveIndex((activeIndex - 1 + screenshots.length) % screenshots.length);
      return;
    }

    if (event.key === "Tab") {
      const dialog = dialogRef.current;
      const focusable = dialog?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  return (
    <section className="case-study-block" aria-label={`${projectTitle} screenshots`}>
      <div className="project-gallery-heading">
        <h4>Screenshots</h4>
        <p>Select an image to view it larger</p>
      </div>
      <div className="project-gallery">
        {screenshots.map((screenshot, index) => (
          <figure className="project-gallery-item" key={screenshot.src}>
            <button
              className="project-gallery-trigger"
              type="button"
              aria-label={`View image ${index + 1}: ${screenshot.alt}`}
              onClick={(event) => {
                openerRef.current = event.currentTarget;
                setActiveIndex(index);
              }}
            >
              <Image
                src={screenshot.src}
                alt={screenshot.alt}
                width={1600}
                height={900}
                loading="eager"
                unoptimized
              />
              <span className="project-gallery-zoom" aria-hidden="true">View</span>
            </button>
            <figcaption>{screenshot.alt}</figcaption>
          </figure>
        ))}
      </div>

      <dialog
        className="project-lightbox"
        ref={dialogRef}
        aria-modal="true"
        aria-labelledby="project-lightbox-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeLightbox();
        }}
        onKeyDown={handleDialogKeyDown}
        onClose={() => {
          setActiveIndex(null);
          openerRef.current?.focus();
        }}
      >
        {activeIndex !== null && (
          <>
            <div className="project-lightbox-heading">
              <div>
                <p className="project-lightbox-eyebrow">{projectTitle} · Screenshot</p>
                <h4 id="project-lightbox-title">{screenshots[activeIndex].alt}</h4>
              </div>
              <button
                className="project-lightbox-close"
                type="button"
                aria-label="Close image viewer"
                onClick={closeLightbox}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="project-lightbox-media">
              <Image
                src={screenshots[activeIndex].src}
                alt={screenshots[activeIndex].alt}
                width={1600}
                height={900}
                loading="eager"
                unoptimized
              />
            </div>
            <div className="project-lightbox-controls">
              <button
                type="button"
                aria-label="Previous screenshot"
                onClick={() => setActiveIndex((activeIndex - 1 + screenshots.length) % screenshots.length)}
              >
                <span aria-hidden="true">←</span> Previous
              </button>
              <p aria-live="polite">{activeIndex + 1} / {screenshots.length}</p>
              <button
                type="button"
                aria-label="Next screenshot"
                onClick={() => setActiveIndex((activeIndex + 1) % screenshots.length)}
              >
                Next <span aria-hidden="true">→</span>
              </button>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
