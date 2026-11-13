import { ImageResponse } from "next/og";
import { CarMark } from "@/lib/carmark";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#0b0b0c", borderRadius: 112, border: "16px solid #d7263d" }}>
        <div style={{ display: "flex", color: "#d7263d", fontSize: 190, fontWeight: 900, lineHeight: 1 }}>M</div>
        <div style={{ display: "flex", marginTop: 14 }}><CarMark width={360} /></div>
      </div>
    ),
    size
  );
}
