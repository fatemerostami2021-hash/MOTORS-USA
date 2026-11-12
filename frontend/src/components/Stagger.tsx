"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import { reveal } from "./Reveal";
const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;
// Children fade/slide in one after another as they enter the viewport.
export default function Stagger({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useIso(() => {
    const kids = Array.from(ref.current!.children) as HTMLElement[];
    kids.forEach((k, i) => { k.setAttribute("data-reveal", ""); k.style.setProperty("--d", `${(i % 5) * 90}ms`); reveal(k); });
    return () => kids.forEach(k => { k.removeAttribute("data-reveal"); k.removeAttribute("data-in"); });
  }, [children]);
  return <div ref={ref} className={className}>{children}</div>;
}
