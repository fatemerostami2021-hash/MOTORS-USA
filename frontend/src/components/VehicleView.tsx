"use client";
import Link from "next/link";
import Image from "./SafeImage";
import Gallery from "./Gallery";
import CarVideo from "./CarVideo";
import { usePrefs } from "./Prefs";
import { Vehicle } from "@/data/vehicles";
import { Article } from "@/data/articles";
import { brandSlug } from "@/data/brands-util";
import { site } from "@/data/site";
import { stories, handover } from "@/data/vehicle-stories";
export default function VehicleView({ v, same, art }: { v: Vehicle; same: Vehicle[]; art: Article }) {
  const { t, lang, nf, money, bn, tr } = usePrefs();
  const plain = (n: number) => nf(n).replace(/[,٬]/g, "");
  const name = `${bn(v.make)} ${v.model} ${plain(v.year)}`;
  const story = stories[v.slug];
  const stats: [string, string][] = [[nf(v.hp), t.hp], [v.accel ? nf(v.accel) + (lang === "fa" ? " ثانیه" : "s") : "—", t.acc], [v.top ? nf(v.top) : "—", t.top], [plain(v.year), t.year]];
  const more: [string, string][] = [[t.lMileage, `${nf(v.mileage)} ${t.mi}`], [t.lEngine, v.engine], [t.lTrans, tr(v.transmission)], [t.lFuel, tr(v.fuel)], [t.lBody, tr(v.body)], ...(v.cc ? [[t.lDisp, `${nf(v.cc)} cc`] as [string, string]] : []), ...(v.iceHp ? [[t.lIce, v.iceHp] as [string, string]] : []), ...(v.motors ? [[t.lMotors, nf(v.motors)] as [string, string]] : []), ...(v.battery ? [[t.lBattery, v.battery] as [string, string]] : []), ...(v.drive ? [[t.lDrive, v.drive] as [string, string]] : []), ...(v.seats ? [[t.lSeats, nf(v.seats)] as [string, string]] : [])];
  const btn = "rounded-full border border-bone/30 py-3";
  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:px-12">
      <nav className="font-mono text-xs tracking-widest text-bone/60"><Link href="/">{t.home}</Link> — <Link href="/inventory">{t.collection}</Link> — <Link href={`/brands/${brandSlug(v.make)}`}><bdi dir="ltr">{bn(v.make)}</bdi></Link></nav>
      <h1 className="mt-4 font-heading text-3xl font-bold md:text-5xl"><bdi dir="ltr">{bn(v.make)} {v.model}</bdi> {plain(v.year)}</h1>
      {v.tagline && <p className="mt-2 text-lg text-bone/70">{v.tagline[lang]}</p>}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div>
          <Gallery images={v.gallery} alt={name} />
          {v.video && <section className="mt-10"><h2 className="mb-4 font-heading text-2xl font-bold">{t.videoTitle}</h2><CarVideo src={v.video} title={name} label="Sound" /></section>}
          <article className="mt-10 rounded-xl bg-card p-6 md:p-10">
            <h2 className="font-heading text-2xl font-bold"><bdi dir="ltr">{bn(v.make)} {v.model}</bdi></h2>
            <p className="mt-4 text-bone/80">{t.overview({ year: plain(v.year), make: bn(v.make), model: v.model, body: tr(v.body), engine: v.engine, hp: nf(v.hp), transmission: tr(v.transmission), accel: v.accel ? nf(v.accel) : null, top: v.top ? nf(v.top) : null })}</p>
            <h3 className="mt-8 font-heading text-xl font-bold">{t.condHistory}</h3>
            {story && <p className="mt-3 text-bone/80">{story[lang]}</p>}
            <p className="mt-3 text-bone/80">{handover[lang]}</p>
            <h3 className="mt-8 font-heading text-xl font-bold">{t.tech}</h3>
            <dl className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-bone/10">{more.map(([k, val]) => <div key={k} className="bg-coal p-4"><dt className="font-mono text-xs tracking-widest text-bone/60">{k}</dt><dd className="mt-1">{val}</dd></div>)}</dl>
            <p className="mt-6 text-xs text-bone/50">{t.verify}</p>
          </article>
        </div>
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl bg-card p-6">
            <p className="font-mono text-xs tracking-widest text-bone/60">{t.price}</p><p className="mt-1 font-mono text-3xl font-bold">{money(v.price)}</p><p className="text-sm text-bone/60">{v.status === "sold" ? t.soldBadge : t.availableTxt}</p>
            <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-bone/10">{stats.map(([n, l]) => <div key={l} className="bg-coal p-4 text-center"><p className="font-mono text-2xl font-bold">{n}</p><p className="text-xs tracking-widest text-bone/60">{l}</p></div>)}</div>
            <div className="mt-6 grid grid-cols-2 gap-3 text-center text-sm font-bold tracking-widest">
              <Link href="/compare" data-track="compare" data-slug={v.slug} className={btn}>{t.compare}</Link>
              <Link href="/contact" data-track="inquiry" data-slug={v.slug} className={btn}>{t.inquiry}</Link>
              <a href={`https://wa.me/?text=${encodeURIComponent(name)}`} data-track="whatsapp" data-slug={v.slug} className={btn}>{t.whatsapp}</a>
              <a href={`tel:${site.phone}`} data-track="call" data-slug={v.slug} className="rounded-full bg-flag py-3 text-white">{t.call}</a></div>
          </div>
          <Link href={`/journal/${art.slug}`} className="group block overflow-hidden rounded-xl bg-card">
            <div className="relative aspect-video"><Image src={art.image} alt="" fill sizes="380px" className="object-cover transition duration-700 group-hover:scale-105" /><span className="absolute start-3 top-3 bg-black px-2 py-1 text-xs text-white">{t.articleBadge}</span></div>
            <div className="p-5"><p className="font-mono text-xs text-bone/60">{art.date}</p><h3 className="mt-1 font-heading text-xl font-bold">{lang === "fa" ? art.titleFa : art.title}</h3><p className="mt-2 text-sm text-bone/70">{lang === "fa" ? art.excerptFa : art.excerpt}</p></div>
          </Link>
        </aside>
      </div>
      {same.length > 0 && <section className="mt-16 border-t border-bone/10 pt-10"><h2 className="font-heading text-2xl font-bold md:text-4xl">{t.maybe}</h2>
        <div className="mt-6 divide-y divide-bone/10">{same.map(s => <Link key={s.slug} href={`/inventory/${s.slug}`} className="flex items-center gap-5 py-4 hover:text-flag"><span className="relative h-16 w-24 shrink-0 overflow-hidden rounded"><Image src={s.image} alt="" fill sizes="96px" className="object-cover" /></span><span className="flex-1 text-lg font-semibold"><bdi dir="ltr">{bn(s.make)} {s.model}</bdi> <span className="text-bone/60">{plain(s.year)}</span></span><span className="font-mono">{money(s.price)} →</span></Link>)}</div></section>}
    </div>
  );
}
