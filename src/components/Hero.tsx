"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from("[data-h]", { yPercent: 110, opacity: 0, duration: 1.1, ease: "power4.out", stagger: 0.12, delay: 0.2 });
      gsap.to("[data-video]", { scale: 1.15, yPercent: 8, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
      gsap.to("[data-copy]", { yPercent: -40, opacity: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "70% top", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} className="relative h-[88svh] min-h-[520px] overflow-hidden">
      <video data-video autoPlay loop muted playsInline preload="auto" poster="/cars/hero-poster.jpg" aria-hidden className="absolute inset-0 h-full w-full object-cover">
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink to-transparent" />
      <div data-copy className="absolute bottom-16 left-6 md:left-16">
        <p className="overflow-hidden font-mono text-sm md:text-base"><span data-h className="inline-block">PORSCHE</span></p>
        <h1 className="mt-2 overflow-hidden font-mono text-4xl font-bold leading-tight md:text-7xl"><span data-h className="inline-block">918 SPYDER</span><br /><span data-h className="inline-block">2015</span></h1>
        <Link href="/inventory/porsche-918-spyder-2015" className="mt-6 inline-block rounded-full bg-bone px-6 py-3 font-mono text-[11px] font-bold tracking-[0.2em] text-ink">VIEW MORE →</Link>
      </div>
    </section>
  );
}
