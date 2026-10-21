import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

// Brand fonts as static WOFF files (the OG renderer can't use variable fonts
// or WOFF2). Read once at module load; cards are generated at build time.
function font(file: string) {
  return fs.readFileSync(path.join(process.cwd(), "assets/fonts", file));
}
const fonts = [
  {
    name: "Bricolage",
    data: font("bricolage-grotesque-latin-800-normal.woff"),
    weight: 800 as const,
  },
  {
    name: "DM Sans",
    data: font("dm-sans-latin-500-normal.woff"),
    weight: 500 as const,
  },
  {
    name: "DM Sans",
    data: font("dm-sans-latin-700-normal.woff"),
    weight: 700 as const,
  },
];

/**
 * Branded 1200×630 social card shared by every route that needs one.
 * With `stat`, the card adds a large headline number, which makes a shared
 * blog link stand out in WhatsApp, LinkedIn and X previews.
 */
export function renderOgImage({
  eyebrow = "Malaika Studios · Nairobi",
  title,
  footer = "malaikastudios.rotsi.co.ke",
  stat,
  accent = "#ffd400",
}: {
  eyebrow?: string;
  title: string;
  footer?: string;
  stat?: { value: string; label: string };
  accent?: string;
}) {
  const titleSize = stat
    ? title.length > 55
      ? 52
      : 60
    : title.length > 60
      ? 64
      : 80;

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
        padding: "64px 72px",
        fontFamily: "DM Sans",
        borderTop: `14px solid ${accent}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: 999,
            background: accent,
          }}
        />
        <div
          style={{
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: accent,
          }}
        >
          {eyebrow}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
        <div
          style={{
            display: "flex",
            flex: 1,
            fontFamily: "Bricolage",
            fontSize: titleSize,
            fontWeight: 800,
            lineHeight: 1.04,
            letterSpacing: -2,
          }}
        >
          {title}
        </div>
        {stat && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 360,
              background: "#ffd400",
              color: "#101b1b",
              borderRadius: 32,
              padding: "32px 34px",
            }}
          >
            <div
              style={{
                fontFamily: "Bricolage",
                fontSize:
                  stat.value.length > 7 ? 62 : stat.value.length > 5 ? 80 : 96,
                whiteSpace: "nowrap",
                fontWeight: 800,
                letterSpacing: -3,
                lineHeight: 1,
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: 26,
                lineHeight: 1.25,
                marginTop: 14,
                fontWeight: 600,
              }}
            >
              {stat.label}
            </div>
          </div>
        )}
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
    { ...ogSize, fonts },
  );
}
