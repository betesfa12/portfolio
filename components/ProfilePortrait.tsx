"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ProfilePortrait({ photoAvailable }: { photoAvailable: boolean }) {
  const [imageUnavailable, setImageUnavailable] = useState(!photoAvailable);
  const groupRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
  }, []);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType === "touch" ||
      window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches
    ) return;

    const group = event.currentTarget;
    const bounds = group.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width * 2 - 1;
    const y = (event.clientY - bounds.top) / bounds.height * 2 - 1;

    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      group.style.transform = `rotateX(${y * -8}deg) rotateY(${x * 8}deg)`;
      frameRef.current = null;
    });
  }

  function handlePointerLeave() {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    if (groupRef.current) groupRef.current.style.transform = "";
  }

  return (
    <div
      className="sphere-group"
      ref={groupRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="sphere-float">
        <span className="sphere-ground-shadow" aria-hidden="true" />
        <span className="sphere-accent-orb accent-orb-one" aria-hidden="true" />
        <span className="sphere-accent-orb accent-orb-two" aria-hidden="true" />
        <span className="sphere-accent-orb accent-orb-three" aria-hidden="true" />
        <span className="sphere-accent-orb accent-orb-four" aria-hidden="true" />
        <span className="sphere-orbit-track" aria-hidden="true" />
        <span className="art-orbit orbit-one" aria-hidden="true" />
        <span className="art-orbit orbit-two" aria-hidden="true" />
        <div className="profile-portrait">
          {imageUnavailable ? (
            <span className="profile-initials" aria-hidden="true">BM</span>
          ) : (
            <Image
              src="/photo.jpg"
              alt="Portrait of Betesfa Mengesh"
              fill
              sizes="(max-width: 560px) 54vw, (max-width: 800px) 290px, 31vw"
              className="profile-photo"
              onError={() => setImageUnavailable(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
