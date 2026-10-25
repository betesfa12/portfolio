"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProfilePortrait() {
  const [imageUnavailable, setImageUnavailable] = useState(false);

  return (
    <div className="profile-portrait" role="img" aria-label="Betesfa Mengesh">
      {imageUnavailable ? (
        <span className="profile-initials" aria-hidden="true">BM</span>
      ) : (
        <Image
          src="/photo.jpg"
          alt=""
          fill
          sizes="(max-width: 560px) 54vw, (max-width: 800px) 290px, 31vw"
          className="profile-photo"
          onError={() => setImageUnavailable(true)}
        />
      )}
    </div>
  );
}
