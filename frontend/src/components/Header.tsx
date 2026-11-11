"use client";
import Link from "next/link";
import { useState } from "react";
import { usePrefs } from "./Prefs";
import CarSearch from "./CarSearch";
import { IranFlag, UKFlag } from "./Flags";
export { default as Logo } from "./Logo";
import Logo from "./Logo";
export default function Header() {
  const { t, lang, setLang, theme, setTheme } = usePrefs();
  const [panel, setPanel] = useState<null | "menu" | "search">(null);
  const links: [string, string][] = [[t.cars, "/inventory"], [t.brands, "/brands"], [t.compare, "/compare"], [t.sell, "/sell-your-car"], [t.sold, "/inventory?status=sold"], [t.contact, "/contact"]];
  const btn = "flex h-12 items-center gap-2 px-2 text-sm font-bold tracking-widest transition hover:text-flag";
  const ic = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const close = () => setPanel(null);
  return (
    <>
      <header className="sticky top-0 z-50 grid grid-cols-[1fr_auto_1fr] items-center bg-ink/80 px-4 py-3 backdrop-blur-md md:px-12">
        <div className="flex"><button onClick={() => setPanel("menu")} aria-label={t.menu} className={btn}><span className="flex flex-col gap-[6px]"><i className="block h-[2.5px] w-8 bg-current" /><i className="block h-[2.5px] w-8 bg-current" /><i className="block h-[2.5px] w-5 bg-current" /></span><span className="hidden sm:inline">{t.menu}</span></button></div>
        <Link href="/" aria-label="Motors USA" onClick={close}><Logo /></Link>
        <div className="flex items-center justify-end gap-1 md:gap-3">
          <div role="group" aria-label="Language" className="flex items-center gap-2">
            {([["en", UKFlag, "English"], ["fa", IranFlag, "فارسی"]] as const).map(([code, F, name]) => (
              <button key={code} onClick={() => setLang(code)} aria-label={name} aria-pressed={lang === code} className={`rounded-full transition duration-300 ${lang === code ? "scale-110 opacity-100 ring-2 ring-flag ring-offset-2 ring-offset-ink" : "opacity-50 hover:opacity-100"}`}><F size={30} /></button>))}
          </div>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className={btn} aria-label="Theme">
            {theme === "dark" ? <svg {...ic}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg> : <svg {...ic}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>}</button>
          <button onClick={() => setPanel("search")} className={btn} aria-label={t.search}><svg {...ic}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg><span className="hidden sm:inline">{t.search}</span></button>
        </div>
      </header>
      {panel && (
        <div role="dialog" aria-modal className="fixed inset-0 z-[100] overflow-y-auto bg-ink px-5 py-6 md:px-16">
          <div className="flex items-center justify-between"><button onClick={close} className={btn}>✕ {t.close}</button><Logo /><span className="w-12" /></div>
          {panel === "search" ? <div className="mx-auto mt-10 max-w-5xl"><CarSearch onPick={close} autoFocus /></div> : (
            <div className="mx-auto mt-8 grid max-w-6xl gap-10 lg:grid-cols-[1fr_1fr]">
              <nav>{links.map(([l, h], i) => <Link key={h} href={h} onClick={close} className="flex items-baseline gap-4 border-b border-bone/10 py-3 font-heading text-3xl font-bold uppercase transition-colors hover:text-flag md:text-5xl"><span className="font-mono text-sm text-flag">0{i + 1}</span>{l}</Link>)}</nav>
              <div><CarSearch onPick={close} /></div>
            </div>)}
        </div>
      )}
    </>
  );
}
