import { ImageResponse } from "next/og";
export const alt = "Motors USA: curated performance and collector cars";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "linear-gradient(135deg,#121110,#2a1115)", color: "#f1ede6" }}><div style={{ fontSize: 110, fontWeight: 900, letterSpacing: 6, display: "flex" }}>MOTORS<span style={{ color: "#d7263d", marginLeft: 24 }}>USA</span></div><div style={{ fontSize: 40, marginTop: 24, opacity: 0.8 }}>Curated performance and collector cars</div></div>, size);
}
