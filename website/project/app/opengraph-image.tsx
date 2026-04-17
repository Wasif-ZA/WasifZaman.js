import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Wasif Zaman — Software Engineer · Sydney";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 56,
          background:
            "#FAF9F6 radial-gradient(#00000022 1.5px, transparent 0) 0 0 / 32px 32px",
          border: "10px solid #000",
          fontFamily: "Inter, Helvetica, sans-serif",
          color: "#000",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 120,
            right: 80,
            width: 240,
            height: 240,
            background: "#CEFF1A",
            border: "6px solid #000",
            borderRadius: 9999,
            boxShadow: "10px 10px 0 0 #000",
            transform: "rotate(6deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: 340,
            width: 140,
            height: 140,
            background: "#0000FF",
            border: "6px solid #000",
            boxShadow: "10px 10px 0 0 #000",
            transform: "rotate(-10deg)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              background: "#CEFF1A",
              border: "4px solid #000",
              padding: "6px 12px",
              fontWeight: 900,
              fontSize: 28,
              letterSpacing: -1,
              boxShadow: "6px 6px 0 0 #000",
            }}
          >
            WZ.
          </div>
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            wasifzaman.tech
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div
            style={{
              fontWeight: 900,
              fontSize: 140,
              lineHeight: 0.9,
              letterSpacing: -6,
              textTransform: "uppercase",
            }}
          >
            Wasif
          </div>
          <div
            style={{
              fontWeight: 900,
              fontSize: 140,
              lineHeight: 0.9,
              letterSpacing: -6,
              textTransform: "uppercase",
              color: "transparent",
              WebkitTextStroke: "3px #000",
            }}
          >
            Zaman
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 24,
          }}
        >
          <div
            style={{
              maxWidth: 700,
              fontWeight: 700,
              fontSize: 30,
              lineHeight: 1.15,
              borderLeft: "6px solid #000",
              paddingLeft: 16,
            }}
          >
            Software Engineer shipping AI products in Sydney. Building Korvo. Open to
            graduate SWE roles.
          </div>
          <div
            style={{
              display: "flex",
              gap: 8,
              fontFamily: "'Courier New', monospace",
              fontWeight: 700,
              fontSize: 16,
              textTransform: "uppercase",
            }}
          >
            <div
              style={{
                background: "#000",
                color: "#CEFF1A",
                padding: "6px 10px",
                letterSpacing: 2,
              }}
            >
              SYDNEY · AU
            </div>
            <div
              style={{
                background: "#CEFF1A",
                color: "#000",
                padding: "6px 10px",
                border: "2px solid #000",
                letterSpacing: 2,
              }}
            >
              AVAILABLE
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
