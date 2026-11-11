"use client";
import Link from "next/link";
import Image from "next/image";
import { Vehicle } from "@/data/vehicles";
import { brandSlug } from "@/data/brands-util";
import BrandIcon from "./BrandIcon";
import Heart from "./Heart";
import { usePrefs } from "./Prefs";
export default function VehicleCard({ v }: { v: Vehicle }) {
  const { t, lang, nf, money, bn } = usePrefs();
  return (
    <div dir={lang === "fa" ? "rtl" : "ltr"} className="group relative rounded-2xl border border-bone/10 bg-card p-2 transition hover:border-flag/60">
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gradient-to-b from-bone/10 to-bone/25">
        <Image src={v.image} alt={`${v.year} ${v.make} ${v.model}`} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-x-3 top-3 flex items-start justify-between">
          {v.featured ? <span className="rounded bg-emerald-300 px-2 py-1 text-xs font-bold text-black">{t.featuredBadge}</span> : <span />}
          <Heart label={t.save} />
        </div>
        {v.status === "sold" && <span className="absolute bottom-3 start-3 rounded bg-black/70 px-2 py-1 font-mono text-xs text-white">{t.soldBadge}</span>}
      </div>
      <div className="flex items-center gap-3 px-3 pb-3 pt-4">
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-2 text-sm text-bone/70"><BrandIcon slug={brandSlug(v.make)} name={v.make} size={24} /><bdi dir="ltr">{bn(v.make)}</bdi></p>
          <h3 className="mt-1 truncate font-mono text-lg font-bold"><Link href={`/inventory/${v.slug}`} className="after:absolute after:inset-0"><bdi dir="ltr">{bn(v.make)} {v.model}</bdi></Link></h3>
          <p className="mt-1 font-mono text-sm text-bone/70">{nf(v.year).replace(/[,٬]/g, "")} · {money(v.price)}</p>
        </div>
        <span aria-hidden className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-bone/30 transition group-hover:bg-flag group-hover:text-white">→</span>
      </div>
    </div>
  );
}
