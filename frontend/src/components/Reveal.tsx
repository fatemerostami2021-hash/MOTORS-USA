"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;
let io: IntersectionObserver | null = null;
// Marks an element as visible (data-in) the first time it scrolls into view. Without JS or IntersectionObserver everything stays visible.
export function reveal(el: Element) {
  if (typeof IntersectionObserver === "undefined") { el.setAttribute("data-in", ""); return; }
  io ??= new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.setAttribute("data-in", ""); io!.unobserve(e.target); } }), { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });
  io.observe(el);
}
export function SplitHeading({ text, className = "", as: Tag = "h2" }: { text: string; className?: string; as?: "h1" | "h2" | "h3" }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useIso(() => { reveal(ref.current!); }, []);
  return (
    <Tag ref={ref} data-split aria-label={text} className={className}>
      {text.split(" ").map((w, i) => (<span key={i} aria-hidden className="me-[0.25em] inline-block overflow-hidden align-bottom">{w.split("").map((c, j) => <span key={j} data-c style={{ ["--i" as string]: i * 4 + j }}>{c}</span>)}</span>))}
    </Tag>
  );
}
export function Fade({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useIso(() => { reveal(ref.current!); }, []);
  return <div ref={ref} data-reveal className={className}>{children}</div>;
}
export function Counter({ to, suffix = "", prefix = "", raw = false }: { to: number; suffix?: string; prefix?: string; raw?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (n: number) => prefix + (raw ? String(n) : n.toLocaleString("en-US")) + suffix;
  useEffect(() => {
    const el = ref.current!; if (typeof IntersectionObserver === "undefined" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0; const o = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; o.disconnect(); const t0 = performance.now();
      const tick = (t: number) => { const p = Math.min(1, (t - t0) / 1600); el.textContent = fmt(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(tick); };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    o.observe(el); return () => { o.disconnect(); cancelAnimationFrame(raf); };
  }, [to, suffix, prefix, raw]);
  return <span ref={ref}>{fmt(to)}</span>;
}
