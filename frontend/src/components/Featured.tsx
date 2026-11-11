"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Vehicle } from "@/data/vehicles";
import VehicleCard from "./VehicleCard";
import { usePrefs } from "./Prefs";
// Pinned horizontal scroll. The pinned <section> sits inside a wrapper <div> that React owns,
// so GSAP's pin-spacer never breaks React's unmount (that was the "removeChild" error).
export default function Featured({ items }: { items: Vehicle[] }) {
  const { t, lang } = usePrefs();
  const sec = useRef<HTMLElement>(null), track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const dist = () => Math.max(0, track.current!.scrollWidth - innerWidth + 128);
      gsap.to(track.current, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: sec.current, pin: true, scrub: 1, anticipatePin: 1, end: () => "+=" + dist(), invalidateOnRefresh: true } });
    });
    return () => mm.revert();
  }, []);
  return (
    <div>
      <section ref={sec} dir="ltr" className="overflow-hidden bg-coal py-16">
        <h2 dir={lang === "fa" ? "rtl" : "ltr"} className="mb-8 px-6 font-heading text-2xl font-bold md:px-12 md:text-3xl">{t.featured}</h2>
        <div ref={track} className="hscroll flex gap-5 overflow-x-auto px-6 md:overflow-visible md:px-12">
          {items.map(v => <div key={v.slug} className="w-72 shrink-0 md:w-80"><VehicleCard v={v} /></div>)}
        </div>
      </section>
    </div>
  );
}
