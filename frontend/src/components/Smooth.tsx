"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Native browser scrolling (smoothest and most stable on every device). On each page change: jump to top and refresh triggers.
export default function Smooth({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  useEffect(() => { gsap.registerPlugin(ScrollTrigger); }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const id = setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => clearTimeout(id);
  }, [path]);
  return <>{children}</>;
}
