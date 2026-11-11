"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => { gsap.registerPlugin(ScrollTrigger); const t = gsap.to(bar.current, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } }); return () => { t.scrollTrigger?.kill(); t.kill(); }; }, []);
  return <div ref={bar} className="fixed left-0 top-0 z-[120] h-[3px] w-full origin-left scale-x-0 bg-flag" />;
}
