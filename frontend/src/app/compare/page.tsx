"use client";
import { useState } from "react";
import Image from "next/image";
import { vehicles, Vehicle } from "@/data/vehicles";
import { usePrefs } from "@/components/Prefs";
export default function Compare() {
  const { t, nf, money, bn, tr, lang } = usePrefs();
  const [ids, setIds] = useState<string[]>([vehicles[0].slug, vehicles[1].slug, ""]);
  const picked = ids.map(i => vehicles.find(v => v.slug === i)).filter(Boolean) as Vehicle[];
  const rows: [string, (v: Vehicle) => string][] = [[t.rPrice, v => money(v.price)], [t.rYear, v => nf(v.year).replace(/[,٬]/g, "")], [t.rMileage, v => `${nf(v.mileage)} ${t.mi}`], [t.rPower, v => `${nf(v.hp)} ${t.hp}`], [t.rEngine, v => v.engine], [t.rTrans, v => tr(v.transmission)], [t.rFuel, v => tr(v.fuel)], [t.rAcc, v => v.accel ? nf(v.accel) + (lang === "fa" ? " ثانیه" : "s") : "—"], [t.rTop, v => v.top ? nf(v.top) : "—"]];
  return (
    <div className="mx-auto max-w-6xl px-6 py-14 md:px-12"><h1 className="font-heading text-4xl font-bold md:text-6xl">{t.cmpTitle}</h1>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[0, 1, 2, 3].map(i => (
        <select key={i} aria-label={`${t.carN} ${i + 1}`} value={ids[i] ?? ""} onChange={e => { const n = [...ids]; n[i] = e.target.value; setIds(n); }} className="rounded-lg border border-bone/20 bg-card p-3">
          <option value="">— {t.carN} {nf(i + 1)} —</option>{vehicles.map(v => <option key={v.slug} value={v.slug}>{bn(v.make)} {v.model} {nf(v.year).replace(/[,٬]/g, "")}</option>)}</select>))}</div>
      <div className="mt-8 overflow-x-auto"><table className="w-full min-w-[640px] text-start"><thead><tr><th />{picked.map(v => <th key={v.slug} className="p-3 text-start"><span className="relative mb-2 block aspect-video w-full overflow-hidden rounded-lg"><Image src={v.image} alt="" fill sizes="25vw" className="object-cover" /></span><bdi dir="ltr">{bn(v.make)} {v.model}</bdi></th>)}</tr></thead>
        <tbody>{rows.map(([l, f]) => <tr key={l} className="border-t border-bone/10"><td className="p-3 text-xs tracking-widest text-bone/60">{l}</td>{picked.map(v => <td key={v.slug} className="p-3">{f(v)}</td>)}</tr>)}</tbody></table></div>
    </div>
  );
}
