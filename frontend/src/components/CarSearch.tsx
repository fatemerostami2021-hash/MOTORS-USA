"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { vehicles } from "@/data/vehicles";
import { brands } from "@/data/brands";
import { usePrefs } from "./Prefs";
export default function CarSearch({ onPick, autoFocus }: { onPick: () => void; autoFocus?: boolean }) {
  const { t, lang, bn, money } = usePrefs(); const [q, setQ] = useState("");
  const s = q.trim().toLowerCase();
  const res = s ? vehicles.filter(v => `${v.make} ${v.model} ${v.year} ${brands.find(b => b.name === v.make)?.fa ?? ""}`.toLowerCase().includes(s)).slice(0, 6) : [];
  return (
    <div>
      <input autoFocus={autoFocus} value={q} onChange={e => setQ(e.target.value)} placeholder={t.searchPh} aria-label={t.search} className="w-full border-b-2 border-bone/40 bg-transparent py-4 text-2xl outline-none focus:border-flag md:text-4xl" />
      {s && <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {res.map(v => (<Link key={v.slug} href={`/inventory/${v.slug}`} onClick={onPick} className="flex items-center gap-4 rounded-xl bg-card p-3 hover:ring-1 hover:ring-flag">
          <span className="relative h-16 w-24 shrink-0 overflow-hidden rounded-md"><Image src={v.image} alt="" fill sizes="96px" className="object-cover" /></span><span><b className="block"><bdi dir="ltr">{bn(v.make)} {v.model}</bdi></b><span className="text-sm text-bone/60">{v.year} · {money(v.price)}</span></span></Link>))}
        {!res.length && <p className="text-bone/60">{t.noRes}</p>}
      </div>}
      <div className="mt-6 flex flex-wrap gap-2">{brands.map(b => <Link key={b.slug} href={`/brands/${b.slug}`} onClick={onPick} className="rounded-full border border-bone/20 px-4 py-1.5 text-sm hover:border-flag">{b.name}</Link>)}</div>
    </div>
  );
}
