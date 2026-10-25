"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProfilePortrait({ photoAvailable }: { photoAvailable: boolean }) {
  const [imageUnavailable, setImageUnavailable] = useState(!photoAvailable);

  return (
    <div className="profile-portrait">
      {imageUnavailable ? (
        <span className="profile-initials" role="img" aria-label="Betesfa Mengesh initials">BM</span>
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
  );
}
