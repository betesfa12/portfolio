"use client";

import { useEffect, useState } from "react";

const MIN_TEXT_SIZE = 16;
const MAX_TEXT_SIZE = 24;
const TEXT_SIZE_STEP = 2;
const DEFAULT_TEXT_SIZE = 18;

export default function TextSizeControl() {
  const [textSize, setTextSize] = useState(DEFAULT_TEXT_SIZE);

  useEffect(() => {
    try {
      const storedSize = Number(window.localStorage.getItem("text-size"));
      const initialSize = Number.isFinite(storedSize)
        && Number.isInteger(storedSize)
        && storedSize % TEXT_SIZE_STEP === 0
        && storedSize >= MIN_TEXT_SIZE
        && storedSize <= MAX_TEXT_SIZE
        ? storedSize
        : DEFAULT_TEXT_SIZE;

      document.documentElement.dataset.textSize = String(initialSize);
      setTextSize(initialSize);
    } catch (error) {
      console.error("Unable to read the saved text size preference.", error);
    }
  }, []);

  function updateTextSize(nextSize: number) {
    const clampedSize = Math.min(MAX_TEXT_SIZE, Math.max(MIN_TEXT_SIZE, nextSize));
    document.documentElement.dataset.textSize = String(clampedSize);
    setTextSize(clampedSize);
    try {
      window.localStorage.setItem("text-size", String(clampedSize));
    } catch (error) {
      console.error("Unable to save the text size preference.", error);
    }
  }

  return (
    <div className="text-size-control" role="group" aria-label="Text size">
      <button
        type="button"
        aria-label="Decrease text size"
        onClick={() => updateTextSize(textSize - TEXT_SIZE_STEP)}
        disabled={textSize <= MIN_TEXT_SIZE}
      >
        A−
      </button>
      <button
        className="text-size-reset"
        type="button"
        aria-label={`Reset text size to 18px; current size ${textSize}px`}
        onClick={() => updateTextSize(DEFAULT_TEXT_SIZE)}
      >
        18px
      </button>
      <button
        type="button"
        aria-label="Increase text size"
        onClick={() => updateTextSize(textSize + TEXT_SIZE_STEP)}
        disabled={textSize >= MAX_TEXT_SIZE}
      >
        A+
      </button>
      <span className="sr-only" aria-live="polite">{textSize}px text size</span>
    </div>
  );
}
