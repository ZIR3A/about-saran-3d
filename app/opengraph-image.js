import { ImageResponse } from "next/og";

export const alt = "Saran Baral | Frontend Engineer";
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
          justifyContent: "center",
          padding: "80px",
          background: "#0A0A0A",
          color: "#F5F5F5",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#E50914",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Frontend Engineer
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
          Saran Baral
        </div>
        <div style={{ fontSize: 32, color: "#A1A1A1", maxWidth: 800 }}>
          Results-driven Frontend Engineer · React, Next.js &amp; TypeScript
        </div>
        <div
          style={{
            position: "absolute",
            right: 80,
            top: "50%",
            transform: "translateY(-50%)",
            width: 200,
            height: 200,
            borderRadius: "50%",
            border: "2px solid #E50914",
            opacity: 0.6,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
