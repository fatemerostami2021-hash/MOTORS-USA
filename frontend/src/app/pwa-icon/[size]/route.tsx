import { ImageResponse } from "next/og";
import { CarMark } from "@/lib/carmark";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ size: "192" }, { size: "512" }, { size: "maskable" }];
}

// App icons for the installed web app (home screen / app launcher).
export async function GET(_req: Request, ctx: { params: Promise<{ size: string }> }) {
  const { size } = await ctx.params;
  const maskable = size === "maskable";
  const px = maskable ? 512 : Number(size);
  const k = px / 512;
  // "maskable" icons keep everything inside the central safe zone and fill the whole square.
  const letter = (maskable ? 150 : 190) * k, car = (maskable ? 250 : 360) * k;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#0b0b0c", border: maskable ? "none" : `${16 * k}px solid #d7263d`, borderRadius: maskable ? 0 : 112 * k }}>
        <div style={{ display: "flex", color: "#d7263d", fontSize: letter, fontWeight: 900, lineHeight: 1 }}>M</div>
        <div style={{ display: "flex", marginTop: 14 * k }}><CarMark width={car} /></div>
      </div>
    ),
    { width: px, height: px }
  );
}
