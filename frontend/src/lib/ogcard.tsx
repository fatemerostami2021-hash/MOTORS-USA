import { ImageResponse } from "next/og";
import { CarMark } from "./carmark";

export const ogSize = { width: 1200, height: 630 };

export function ogCard() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "linear-gradient(135deg,#0b0b0c 0%,#17171a 55%,#3a0a12 100%)", color: "#f4efe6" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div style={{ display: "flex", width: 120, height: 84, borderRadius: 18, background: "#d7263d", alignItems: "center", justifyContent: "center" }}>
            <CarMark width={92} />
          </div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 800, letterSpacing: 6 }}>MOTORS <span style={{ color: "#d7263d", marginLeft: 14 }}>USA</span></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", fontSize: 80, fontWeight: 800, lineHeight: 1.05 }}>Buy &amp; Sell Luxury Cars</div>
          <div style={{ display: "flex", fontSize: 34, color: "#b9b2a5" }}>Supercars · Hypercars · Collector vehicles</div>
          <div style={{ display: "flex", fontSize: 30, color: "#b9b2a5" }}>Ferrari · Lamborghini · Porsche · McLaren · Rolls-Royce</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 30, color: "#d7263d", fontWeight: 700 }}>Inspected · Documented · Verified</div>
          <div style={{ display: "flex", fontSize: 28, color: "#b9b2a5" }}>motors-usa.vercel.app</div>
        </div>
        <div style={{ position: "absolute", left: 0, bottom: 0, width: 1200, height: 10, background: "#d7263d", display: "flex" }} />
      </div>
    ),
    ogSize
  );
}
