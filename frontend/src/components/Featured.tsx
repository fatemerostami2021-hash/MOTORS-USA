"use client";
import Link from "next/link";
import { useRef } from "react";
import { Vehicle } from "@/data/vehicles";
import VehicleCard from "./VehicleCard";
import { usePrefs } from "./Prefs";
// Native scroll-snap carousel: smooth, touch/drag friendly, no pinning (pinning caused blank gaps and crashes).
// dir="ltr" keeps the same behaviour in English and Persian.
export default function Featured({ items }: { items: Vehicle[] }) {
  const { t, lang } = usePrefs(); const track = useRef<HTMLDivElement>(null);
  const go = (d: number) => track.current?.scrollBy({ left: d * 340, behavior: "smooth" });
  const arrow = "grid h-11 w-11 place-items-center rounded-full border border-bone/30 text-xl transition hover:border-flag hover:text-flag";
  return (
    <section dir="ltr" className="bg-coal py-16">
      <div className="mx-auto mb-8 flex max-w-7xl items-center justify-between px-6 md:px-12">
        <h2 dir={lang === "fa" ? "rtl" : "ltr"} className="font-heading text-2xl font-bold md:text-3xl">{t.featured}</h2>
        <div className="flex items-center gap-3"><Link href="/inventory" dir={lang === "fa" ? "rtl" : "ltr"} className="me-2 hidden text-sm font-bold tracking-widest hover:text-flag sm:block">{t.viewAll}</Link>
          <button onClick={() => go(-1)} aria-label="Previous" className={arrow}>‹</button><button onClick={() => go(1)} aria-label="Next" className={arrow}>›</button></div>
      </div>
      <div ref={track} className="hscroll flex snap-x snap-mandatory scroll-pl-6 gap-5 overflow-x-auto scroll-smooth px-6 pb-4 md:scroll-pl-12 md:px-12">
        {items.map(v => <div key={v.slug} className="w-72 shrink-0 snap-start md:w-80"><VehicleCard v={v} /></div>)}
      </div>
    </section>
  );
}
