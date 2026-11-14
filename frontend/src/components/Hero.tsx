"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePrefs } from "./Prefs";
import { site } from "@/data/site";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export default function Hero() {
  const root = useRef<HTMLElement>(null); const vid = useRef<HTMLVideoElement>(null); const { t, nf } = usePrefs();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from("[data-h]", { yPercent: 110, opacity: 0, duration: 1.1, ease: "power4.out", stagger: 0.12, delay: 0.2 });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} className="relative overflow-hidden bg-black md:h-[92svh] md:min-h-[520px]">
      <div className="relative aspect-video w-full bg-black md:absolute md:inset-0 md:aspect-auto">
      <video ref={vid} onLoadedMetadata={() => { if (vid.current) vid.current.playbackRate = 0.5; }} data-video autoPlay loop muted playsInline preload="auto" poster="/cars/hero-poster.webp" aria-hidden className="absolute inset-0 h-full w-full object-cover">
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-1/2 bg-gradient-to-t from-ink to-transparent md:block" />
      <div data-copy className="relative px-6 pb-12 pt-6 text-white md:absolute md:bottom-16 md:start-16 md:p-0">
        <p className="overflow-hidden font-mono text-sm md:text-base"><bdi dir="ltr" data-h className="inline-block">{site.hero.brand.toUpperCase()}</bdi></p>
        <h1 className="mt-2 overflow-hidden font-mono text-5xl font-bold leading-tight md:text-8xl">{site.hero.model ? <><bdi dir="ltr" data-h className="inline-block">{site.hero.model.toUpperCase()}</bdi>{site.hero.year > 0 && <><br /><span data-h className="inline-block">{nf(site.hero.year).replace(/[,٬]/g, "")}</span></>}</> : <span data-h className="inline-block">{t.heroCollection}</span>}</h1>
        <Link href={site.hero.href} className="mt-6 inline-block rounded-full bg-white px-8 py-4 font-mono text-sm font-bold tracking-[0.2em] text-black">{t.viewMore}</Link>
      </div>
    </section>
  );
}
