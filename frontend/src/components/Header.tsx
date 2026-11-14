"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePrefs } from "./Prefs";
import CarSearch from "./CarSearch";
import { site } from "@/data/site";
import { IranFlag, UKFlag } from "./Flags";
export { default as Logo } from "./Logo";
import Logo from "./Logo";
export default function Header() {
  const { t, lang, setLang, theme, setTheme } = usePrefs();
  const [panel, setPanel] = useState<null | "menu" | "search">(null);
  const links: [string, string][] = [[t.cars, "/inventory"], [t.shop, "/shop"], [t.media, "/media"], [t.newsNav, "/journal"], [t.about2, "/about"], [t.contact, "/contact"]];
  const more: [string, string][] = [[t.brands, "/brands"], [t.compare, "/compare"], [t.sell, "/sell-your-car"], [t.sold, "/inventory?status=sold"]];
  const btn = "flex h-10 items-center gap-2 px-1 text-sm font-bold tracking-widest transition hover:text-flag sm:h-12 sm:px-2";
  const ic = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className: "h-5 w-5 sm:h-6 sm:w-6" };
  const close = () => setPanel(null);
  useEffect(() => { document.documentElement.style.overflow = panel ? "hidden" : ""; return () => { document.documentElement.style.overflow = ""; }; }, [panel]);
  const langs = [["en", UKFlag, "English"], ["fa", IranFlag, "فارسی"]] as const;
  const other = langs.find(l => l[0] !== lang)!;
  const OtherFlag = other[1];
  return (
    <>
      <header className="sticky top-0 z-50 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-1 bg-ink/95 px-3 py-2 sm:px-4 sm:py-3 md:px-12">
        <div className="flex justify-start"><button onClick={() => setPanel("menu")} aria-label={t.menu} className={btn}><span className="flex flex-col gap-[5px] sm:gap-[6px]"><i className="block h-[2.5px] w-6 bg-current sm:w-8" /><i className="block h-[2.5px] w-6 bg-current sm:w-8" /><i className="block h-[2.5px] w-4 bg-current sm:w-5" /></span><span className="hidden lg:inline">{t.menu}</span></button></div>
        <Link href="/" aria-label="Motors USA" onClick={close} className="justify-self-center"><Logo /></Link>
        <div className="flex items-center justify-end gap-0.5 sm:gap-1 md:gap-3">
          {/* Mobile: one small flag that switches to the other language */}
          <button onClick={() => setLang(other[0])} aria-label={other[2]} className="grid h-10 w-8 place-items-center sm:hidden"><OtherFlag size={20} /></button>
          {/* Desktop / tablet: both flags */}
          <div role="group" aria-label="Language" className="hidden items-center gap-2 sm:flex">
            {langs.map(([code, F, name]) => (
              <button key={code} onClick={() => setLang(code)} aria-label={name} aria-pressed={lang === code} className={`rounded-full transition duration-300 ${lang === code ? "scale-110 opacity-100 ring-2 ring-flag ring-offset-2 ring-offset-ink" : "opacity-50 hover:opacity-100"}`}><F size={26} /></button>))}
          </div>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className={btn} aria-label="Theme">
            {theme === "dark" ? <svg {...ic}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg> : <svg {...ic}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>}</button>
          <button onClick={() => setPanel("search")} className={btn} aria-label={t.search}><svg {...ic}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg><span className="hidden lg:inline">{t.search}</span></button>
        </div>
      </header>
      {panel && (
        <div role="dialog" aria-modal className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-ink px-5 py-6 md:px-16">
          <div className="flex items-center justify-between"><button onClick={close} className={btn}>✕ {t.close}</button><Logo /><span className="w-12" /></div>
          {panel === "search" ? <div className="mx-auto mt-10 max-w-5xl"><CarSearch onPick={close} autoFocus /></div> : (
            <div className="mx-auto mt-8 grid max-w-6xl gap-10 lg:grid-cols-[1fr_1fr]">
              <nav>{links.map(([l, h], i) => <Link key={h} href={h} onClick={close} className="flex items-baseline gap-4 border-b border-bone/10 py-3 font-heading text-3xl font-bold uppercase transition-colors hover:text-flag md:text-5xl"><span className="font-mono text-sm text-flag">0{i + 1}</span>{l}</Link>)}</nav>
              <div><CarSearch onPick={close} /><div className="mt-8 flex flex-wrap gap-2">{more.map(([l, h]) => <Link key={h} href={h} onClick={close} className="rounded-full bg-card px-4 py-2 text-sm font-semibold hover:text-flag">{l}</Link>)}</div><div className="mt-8 border-t border-bone/10 pt-6 text-bone/80"><p className="font-semibold">{site.address[lang]}</p><p dir="ltr" className="mt-1 font-mono">{site.phone}</p><p className="mt-1">{site.email}</p></div></div>
            </div>)}
        </div>
      )}
    </>
  );
}
