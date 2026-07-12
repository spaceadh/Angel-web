import { ImageResponse } from "next/og";

export const alt = "Malaika Studios by Rotsi";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#f4f1e9",
          color: "#1d1c19",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: 72,
          width: "100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em" }}>Malaika Studios</div>
          <div style={{ color: "#6C7661", fontSize: 22 }}>by Rotsi</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ color: "#C99A24", fontSize: 28, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Website design in Nairobi
          </div>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: "-0.075em", lineHeight: 0.92, maxWidth: 980 }}>
            Creative digital presence for serious businesses.
          </div>
        </div>
        <div style={{ color: "#6C7661", fontSize: 26 }}>
          Websites, audits, client magnet systems, and inquiry paths for growing Kenyan businesses.
        </div>
      </div>
    ),
    size,
  );
}

