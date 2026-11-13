import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

export function ogCard() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "linear-gradient(135deg,#0b0b0c 0%,#17171a 55%,#3a0a12 100%)", color: "#f4efe6" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", width: 72, height: 72, borderRadius: 18, background: "#d7263d", alignItems: "center", justifyContent: "center", fontSize: 44, fontWeight: 800, color: "#fff" }}>M</div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 800, letterSpacing: 6 }}>MOTORS <span style={{ color: "#d7263d", marginLeft: 14 }}>USA</span></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 800, lineHeight: 1.05 }}>Luxury Supercars &amp; Hypercars</div>
          <div style={{ display: "flex", fontSize: 34, color: "#b9b2a5" }}>Ferrari · Lamborghini · Porsche · McLaren · Rolls-Royce</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 30, color: "#d7263d", fontWeight: 700 }}>Buy · Sell · Compare</div>
          <div style={{ display: "flex", fontSize: 28, color: "#b9b2a5" }}>motors-usa.vercel.app</div>
        </div>
        <div style={{ position: "absolute", left: 0, bottom: 0, width: 1200, height: 10, background: "#d7263d", display: "flex" }} />
      </div>
    ),
    ogSize
  );
}
