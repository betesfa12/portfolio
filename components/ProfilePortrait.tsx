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
    const mx = ((event.clientX - bounds.left) / bounds.width) * 100;
    const my = ((event.clientY - bounds.top) / bounds.height) * 100;

    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      group.style.setProperty("--orb-rx", `${y * -6}deg`);
      group.style.setProperty("--orb-ry", `${x * 6}deg`);
      group.style.setProperty("--orb-mx", `${mx}%`);
      group.style.setProperty("--orb-my", `${my}%`);
      frameRef.current = null;
    });
  }

  function handlePointerLeave() {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    if (groupRef.current) {
      groupRef.current.style.setProperty("--orb-rx", "0deg");
      groupRef.current.style.setProperty("--orb-ry", "0deg");
      groupRef.current.style.removeProperty("--orb-mx");
      groupRef.current.style.removeProperty("--orb-my");
    }
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
              alt="Portrait of Betesfa Mengesha"
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
