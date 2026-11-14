"use client";
import { brandUrl } from "@/data/brand-links";
import Link from "next/link";
import Stagger from "./Stagger";
import BrandIcon from "./BrandIcon";
import VehicleCard from "./VehicleCard";
import { usePrefs } from "./Prefs";
import { brands } from "@/data/brands";
import { vehicles } from "@/data/vehicles";
export function BrandsView() {
  const { t, nf } = usePrefs();
  return (
    <div className="mx-auto max-w-6xl px-6 py-14 md:px-12"><h1 className="font-heading text-4xl font-bold md:text-6xl">{t.brandsTitle}</h1>
      <Stagger className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">
        {brands.map(b => (<a key={b.slug} href={brandUrl(b.slug)} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-4 rounded-xl bg-card p-8 transition hover:text-flag hover:ring-1 hover:ring-flag"><BrandIcon slug={b.slug} name={b.name} size={80} /><span dir="ltr" className="font-display text-xs font-bold tracking-widest">{b.name.toUpperCase()}</span><span className="text-sm text-bone/60">{nf(vehicles.filter(v => v.make === b.name).length)} {t.carsCount}</span></a>))}
      </Stagger></div>
  );
}
export function BrandView({ slug }: { slug: string }) {
  const { t, lang, nf, tr } = usePrefs(); const b = brands.find(x => x.slug === slug)!;
  const list = vehicles.filter(v => v.make === b.name);
  return (
    <div className="mx-auto max-w-6xl px-6 py-14 md:px-12">
      <Link href="/brands" className="text-sm text-bone/60 hover:text-flag">{t.backBrands}</Link>
      <div className="mt-6 flex flex-wrap items-center gap-8"><BrandIcon slug={b.slug} name={b.name} size={110} />
        <div><h1 dir="ltr" className="font-display text-4xl font-black md:text-6xl">{b.name.toUpperCase()}</h1><p className="mt-2 font-mono text-sm text-bone/60">{tr(b.country)} · {nf(b.founded).replace(/[,٬]/g, "")}</p><p className="mt-4 max-w-xl text-lg text-bone/80">{lang === "fa" ? b.descFa : b.desc}</p></div></div>
      <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map(v => <VehicleCard key={v.slug} v={v} />)}</Stagger>
      {!list.length && <p className="mt-10 text-bone/60">{t.noBrandCars}</p>}
    </div>
  );
}
