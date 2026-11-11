"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Children rise in as batches while scrolling (ScrollTrigger.batch).
export default function Stagger({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const kids = Array.from(ref.current!.children); if (!kids.length) return; gsap.set(kids, { y: 70, opacity: 0, scale: 0.95 });
    const st = ScrollTrigger.batch(kids, { start: "top 92%", onEnter: b => gsap.to(b, { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out", stagger: 0.12, overwrite: true }) });
    return () => { st.forEach(s => s.kill()); gsap.set(kids, { clearProps: "all" }); };
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}
