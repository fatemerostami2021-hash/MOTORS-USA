"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "./Logo";
import { usePrefs } from "./Prefs";
import { socials } from "@/data/logos";
import { site } from "@/data/site";
function CarSvg() { return (<svg viewBox="0 0 220 60" className="h-full" aria-hidden><path d="M8 44c0-8 6-10 16-12l26-14c10-5 34-6 52-4 14 2 26 8 36 14 18 1 36 3 36 14v4H8z" fill="#d7263d" /><path d="M58 22l18-8c14-2 28-1 38 2l14 12H44z" fill="#0d0d0d" opacity=".75" /><circle cx="56" cy="46" r="11" fill="#111" stroke="#bbb" strokeWidth="3" /><circle cx="166" cy="46" r="11" fill="#111" stroke="#bbb" strokeWidth="3" /></svg>); }
export default function Footer() {
  const { t, lang } = usePrefs(); const strip = useRef<HTMLDivElement>(null), car = useRef<HTMLDivElement>(null); const [img, setImg] = useState(true);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tw = gsap.fromTo(car.current, { x: -260 }, { x: () => strip.current!.clientWidth + 40, ease: "none", scrollTrigger: { trigger: strip.current, start: "top bottom", end: "bottom bottom+=200", scrub: 1, invalidateOnRefresh: true } });
    return () => { tw.scrollTrigger?.kill(); tw.kill(); };
  }, []);
  const col = "font-display text-xs font-bold tracking-[0.25em] text-flag";
  const lk = "block py-1 text-bone/80 hover:text-flag";
  const cols: [string, [string, string][]][] = [
    [t.cars.toUpperCase(), [[t.available, "/inventory"], [t.soldCars, "/inventory?status=sold"], [t.compare, "/compare"], [t.sell, "/sell-your-car"]]],
    [t.discover, [[t.brands, "/brands"], [t.shop, "/shop"], [t.media, "/media"], [t.newsNav, "/journal"]]],
    [t.company, [[t.about2, "/about"], [t.contact, "/contact"], [t.privacy, "/privacy"], [t.terms, "/terms"]]],
  ];
  return (
    <footer className="bg-gradient-to-br from-coal to-ink">
      <div ref={strip} dir="ltr" className="relative h-20 overflow-hidden border-b border-bone/15">
        <div ref={car} className="absolute bottom-1 h-14 w-40">{img ? <img src="/footer/car.png" alt="" onError={() => setImg(false)} className="h-full object-contain" /> : <CarSvg />}</div>
      </div>
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-12">
        <div>
          <Logo /><p className="mt-3 max-w-xs text-bone/70">{t.footAbout}</p>
          <p className="mt-5 font-display text-xs tracking-[0.25em] text-bone/50">{t.visit}</p>
          <p className="mt-1 font-semibold">✦ {site.address[lang]}</p>
          <p className="mt-1 font-mono font-bold"><a href={`tel:${site.phoneIntl}`} dir="ltr">✦ {site.phone}</a></p>
          <p className="mt-1 text-bone/80"><a href={`mailto:${site.email}`}>✦ {site.email}</a></p>
          <div className="mt-4 flex gap-3">{Object.entries(socials).map(([k, d]) => <a key={k} href={site.socials[k]} aria-label={k} className="text-bone/70 hover:text-flag"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d={d} /></svg></a>)}</div>
        </div>
        {cols.map(([h, ls]) => <div key={h}><h3 className={col}>{h}</h3><div className="mt-3">{ls.map(([l, href]) => <Link key={href + l} href={href} className={lk}>{l}</Link>)}</div></div>)}
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 border-t border-bone/10 px-6 py-4 text-xs tracking-widest text-bone/60 md:px-12"><p className="font-mono">{t.rights}</p><button type="button" onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))} className="hover:text-flag">{lang === "fa" ? "تنظیمات کوکی" : "Cookie settings"}</button><p>{site.credit.name[lang]} · <a href={site.credit.url} target="_blank" rel="noreferrer" className="font-bold text-bone hover:text-flag">{site.credit.role[lang]}</a></p></div>
    </footer>
  );
}
