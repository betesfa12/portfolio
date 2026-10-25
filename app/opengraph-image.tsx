import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

export const runtime = "edge";
export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#f5f4ef",
          color: "#19251f",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 26, color: "#68736c" }}>
          <span style={{ width: 16, height: 16, borderRadius: 99, background: "#7da64e" }} />
          {profile.title}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 78, fontWeight: 700, letterSpacing: "-5px" }}>{profile.name}</div>
          <div style={{ fontSize: 30, color: "#68736c" }}>{profile.tagline}</div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#68736c" }}>{profile.location}</div>
      </div>
    ),
    size,
  );
}
