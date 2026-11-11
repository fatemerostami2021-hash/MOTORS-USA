"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export default function Smooth({ children }: { children: React.ReactNode }) {
  const lenis = useRef<Lenis | null>(null); const path = usePathname();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const l = new Lenis({ lerp: 0.1 }); lenis.current = l;
    l.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => l.raf(t * 1000);
    gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); l.destroy(); lenis.current = null; };
  }, []);
  // On every page change: jump to top and recalculate all scroll triggers (no manual refresh needed).
  useEffect(() => {
    lenis.current?.scrollTo(0, { immediate: true }); window.scrollTo(0, 0);
    const id = setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => clearTimeout(id);
  }, [path]);
  return <>{children}</>;
}
