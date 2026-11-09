"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Vehicle } from "@/data/vehicles";
import VehicleCard from "./VehicleCard";
// Pinned horizontal scroll: vertical scroll moves the card track sideways.
export default function Featured({ items }: { items: Vehicle[] }) {
  const sec = useRef<HTMLElement>(null), track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const dist = () => track.current!.scrollWidth - innerWidth + 128;
      gsap.to(track.current, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: sec.current, pin: true, scrub: 1, end: () => "+=" + dist(), invalidateOnRefresh: true } });
    });
    return () => mm.revert();
  }, []);
  return (
    <section ref={sec} className="overflow-hidden bg-coal py-20">
      <h2 className="mb-8 px-6 font-mono text-sm font-bold tracking-[0.2em] md:px-16">FEATURED STOCK</h2>
      <div ref={track} className="hscroll flex gap-5 overflow-x-auto px-6 md:overflow-visible md:px-16">
        {items.map(v => <div key={v.slug} className="w-72 shrink-0 md:w-80"><VehicleCard v={v} /></div>)}
      </div>
    </section>
  );
}
