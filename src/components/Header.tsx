"use client";
import Link from "next/link";
import { useState } from "react";
const links = [["Cars", "/inventory"], ["Compare", "/compare"], ["Sell", "/sell-your-car"], ["Sold", "/inventory?status=sold"], ["Contact", "/#contact"]] as const;
export function Logo() { return <span className="font-display text-sm tracking-[0.18em] md:text-lg">MOTORS <span className="text-flag">USA</span></span>; }
export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between bg-ink/70 px-5 py-4 backdrop-blur-md md:px-16">
        <button onClick={() => setOpen(true)} aria-label="Open menu" className="font-mono text-[11px] tracking-[0.2em]">☰ MENU</button>
        <Link href="/" aria-label="Motors USA home"><Logo /></Link>
        <Link href="/inventory" className="font-mono text-[11px] tracking-[0.2em]">SEARCH</Link>
      </header>
      {open && (
        <div role="dialog" aria-modal className="fixed inset-0 z-[100] flex flex-col bg-ink px-5 py-6 md:px-16">
          <div className="flex items-center justify-between"><button onClick={() => setOpen(false)} className="border border-bone px-4 py-2 font-mono text-[11px] tracking-[0.2em]">✕ CLOSE</button><Logo /><span /></div>
          <nav className="mt-10 flex-1">
            {links.map(([l, h], i) => (
              <Link key={l} href={h} onClick={() => setOpen(false)} className="flex items-baseline gap-4 border-b border-white/10 py-3 font-display text-4xl uppercase transition-colors hover:text-flag md:text-6xl">
                <span className="font-mono text-xs text-flag">0{i + 1}</span>{l}
              </Link>
            ))}
          </nav>
          <p className="font-mono text-xs text-bone/60">Showroom · Your address here · {process.env.NEXT_PUBLIC_PHONE}</p>
        </div>
      )}
    </>
  );
}
