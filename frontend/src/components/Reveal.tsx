"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Splits text into letters that slide up on scroll. Use for headlines.
export function SplitHeading({ text, className = "", as: Tag = "h2" }: { text: string; className?: string; as?: "h1" | "h2" | "h3" }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current!; const chars = el.querySelectorAll("[data-c]");
    const ctx = gsap.context(() => {
      gsap.fromTo(chars, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, ease: "power4.out", stagger: 0.025, scrollTrigger: { trigger: el, start: "top 85%" } });
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    <Tag ref={ref} aria-label={text} className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden align-bottom mr-[0.25em]">
          {w.split("").map((c, j) => <span key={j} data-c className="inline-block">{c}</span>)}
        </span>
      ))}
    </Tag>
  );
}
export function Fade({ children, className = "", y = 40 }: { children: React.ReactNode; className?: string; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => { gsap.fromTo(ref.current, { y, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 88%" } }); });
    return () => ctx.revert();
  }, [y]);
  return <div ref={ref} className={className}>{children}</div>;
}
export function Counter({ to, suffix = "", prefix = "", raw = false }: { to: number; suffix?: string; prefix?: string; raw?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const o = { v: 0 };
    const ctx = gsap.context(() => { gsap.to(o, { v: to, duration: 2, ease: "power2.out", scrollTrigger: { trigger: ref.current, start: "top 90%" }, onUpdate: () => { if (ref.current) ref.current.textContent = prefix + (raw ? String(Math.round(o.v)) : Math.round(o.v).toLocaleString("en-US")) + suffix; } }); });
    return () => ctx.revert();
  }, [to, suffix, prefix]);
  return <span ref={ref}>{prefix}0{suffix}</span>;
}
