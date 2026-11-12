"use client";
import Link from "next/link";
import Image from "./SafeImage";
import Stagger from "./Stagger";
import { usePrefs } from "./Prefs";
import { articles } from "@/data/articles";
import { vehicles } from "@/data/vehicles";
export default function News() {
  const { t, lang, bn } = usePrefs();
  return (
    <section className="bg-ink px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between"><h2 className="font-heading text-3xl font-bold md:text-4xl">{t.latest}</h2><Link href="/journal" className="text-sm font-bold tracking-widest hover:text-flag">{t.viewAll}</Link></div>
        <Stagger className="mt-8 grid gap-6 md:grid-cols-3">
          {articles.map(a => { const car = vehicles.find(v => v.make === a.brand) ?? vehicles[0]; return (
            <Link key={a.slug} href={`/journal/${a.slug}`} className="group overflow-hidden rounded-2xl border border-bone/10 bg-card transition hover:border-flag/60">
              <div className="relative aspect-[16/10] overflow-hidden"><Image src={car.image} alt={a.title} fill sizes="(min-width:768px) 33vw, 90vw" className="object-cover transition duration-700 group-hover:scale-105" /><span className="absolute start-3 top-3 bg-black px-2 py-1 text-xs text-white">{t.newsBadge}</span></div>
              <div className="p-5"><p className="font-mono text-xs text-bone/60">{a.date} · <bdi dir="ltr">{bn(a.brand)}</bdi></p><h3 className="mt-2 text-xl font-bold leading-snug">{lang === "fa" ? a.titleFa : a.title}</h3><p className="mt-2 text-sm text-bone/70">{lang === "fa" ? a.excerptFa : a.excerpt}</p><p className="mt-4 text-xs font-bold tracking-widest group-hover:text-flag">{t.readArticle}</p></div>
            </Link>); })}
        </Stagger>
      </div>
    </section>
  );
}
