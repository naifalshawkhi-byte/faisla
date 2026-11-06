import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const title =
    locale === "ar" ? "ما وراء الاستراتيجية. نحو الأثر." : "Beyond Strategy. Into Impact.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#FFFFFF",
          color: "#0C0C0C",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 4, color: "#3D2EF0" }}>LSAR* WORKS GROUP</div>
        <div style={{ fontSize: 68, lineHeight: 1.05, maxWidth: 900 }}>{title}</div>
      </div>
    ),
    { ...size },
  );
}
