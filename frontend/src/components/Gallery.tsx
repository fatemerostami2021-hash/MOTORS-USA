"use client";
import Image from "./SafeImage";
import { useState } from "react";
export default function Gallery({ images, video, alt }: { images: string[]; video?: string; alt: string }) {
  const items = [...images, ...(video ? ["video"] : [])]; const [i, setI] = useState(0);
  const cur = items[i];
  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-card">
        {cur === "video" ? <video src={video} controls autoPlay muted playsInline className="h-full w-full object-cover" /> : <Image src={cur} alt={alt} fill priority sizes="(min-width:1024px) 66vw, 100vw" className="object-cover" />}
        {items.length > 1 && <>
          <button onClick={() => setI((i + items.length - 1) % items.length)} aria-label="Previous" className="absolute start-3 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full bg-black/60 text-xl text-white">‹</button>
          <button onClick={() => setI((i + 1) % items.length)} aria-label="Next" className="absolute end-3 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full bg-black/60 text-xl text-white">›</button></>}
      </div>
      {items.length > 1 && <div className="mt-3 flex gap-3 overflow-x-auto">{items.map((s, k) => (
        <button key={k} onClick={() => setI(k)} aria-label={`Media ${k + 1}`} className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-md ${k === i ? "ring-2 ring-flag" : "opacity-60"}`}>
          {s === "video" ? <span className="grid h-full place-items-center bg-card text-sm">▶ VIDEO</span> : <Image src={s} alt="" fill sizes="96px" className="object-cover" />}</button>))}</div>}
    </div>
  );
}
