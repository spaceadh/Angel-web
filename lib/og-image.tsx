import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Branded 1200×630 social card shared by every route that needs one. */
export function renderOgImage({
  eyebrow = "Malaika Studios · Nairobi",
  title,
  footer = "malaikastudios.rotsi.co.ke",
}: {
  eyebrow?: string;
  title: string;
  footer?: string;
}) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#101b1b",
        color: "#f7f5ee",
        padding: "72px 80px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: 999,
            background: "#ffd400",
          }}
        />
        <div
          style={{
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#ffd400",
          }}
        >
          {eyebrow}
        </div>
      </div>
      <div
        style={{
          fontSize: title.length > 60 ? 64 : 80,
          fontWeight: 800,
          lineHeight: 1.02,
          letterSpacing: -2,
          maxWidth: 1000,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 26,
          color: "#b9c2c2",
        }}
      >
        <span>{footer}</span>
        <span
          style={{
            background: "#ffd400",
            color: "#101b1b",
            padding: "10px 22px",
            borderRadius: 999,
            fontWeight: 700,
          }}
        >
          MALAIKA STUDIOS
        </span>
      </div>
    </div>,
    ogSize,
  );
}
