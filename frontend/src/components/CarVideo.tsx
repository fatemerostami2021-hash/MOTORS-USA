"use client";
import { useEffect, useRef, useState } from "react";
// Plays only while on screen (saves bandwidth/CPU). object-cover + zoom crops empty studio space so the car fills the frame.
export default function CarVideo({ src, title, zoom = 1.3, label }: { src: string; title: string; zoom?: number; label: string }) {
  const v = useRef<HTMLVideoElement>(null); const [muted, setMuted] = useState(true);
  useEffect(() => {
    const el = v.current!; if (typeof IntersectionObserver === "undefined") return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.play().catch(() => {}); else el.pause(); }, { threshold: 0.4 });
    o.observe(el); return () => o.disconnect();
  }, []);
  return (
    <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
      <video ref={v} src={`${src}#t=0.1`} aria-label={title} muted={muted} loop playsInline preload="metadata" className="h-full w-full object-cover" style={{ transform: `scale(${zoom})` }} />
      <button onClick={() => setMuted(!muted)} aria-label={label} className="absolute bottom-3 end-3 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white">{muted ? "🔇" : "🔊"}</button>
    </div>
  );
}
