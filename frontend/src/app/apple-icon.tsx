import { ImageResponse } from "next/og";
import { CarMark } from "@/lib/carmark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#d7263d" }}>
        <div style={{ display: "flex", color: "#fff", fontSize: 72, fontWeight: 900, lineHeight: 1 }}>M</div>
        <div style={{ display: "flex", marginTop: 6 }}><CarMark width={130} wheel="#d7263d" /></div>
      </div>
    ),
    size
  );
}
