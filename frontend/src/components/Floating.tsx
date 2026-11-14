"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import type { CSSProperties } from "react";
import { socials } from "@/data/logos";
import { site } from "@/data/site";
import { reply, Reply } from "@/lib/assistant";
import { usePrefs } from "./Prefs";
type Msg = { from: "me" | "bot"; text: string; links?: Reply["links"] };

const INSTAGRAM_URL = "https://www.instagram.com/f.rostamii_web";
const LINKEDIN_URL = "https://www.linkedin.com/in/fatemeh-rostami963";
const LINKEDIN_PATH = "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

const Headset = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <rect x="2.5" y="14" width="4.5" height="6" rx="1.5" fill="currentColor" />
    <rect x="17" y="14" width="4.5" height="6" rx="1.5" fill="currentColor" />
    <path d="M19.5 20c0 1.5-1.5 2-4 2h-2" />
  </svg>
);

export default function Floating() {
  const { lang } = usePrefs(); const [open, setOpen] = useState(false), [msgs, setMsgs] = useState<Msg[]>([]), [val, setVal] = useState(""); const box = useRef<HTMLDivElement>(null);
  const fa = lang === "fa";
  const hello = fa ? "سلام! من دستیار Motors USA هستم. درباره قیمت، مشخصات، موجودی یا فروش خودرو بپرسید." : "Hi! I'm the Motors USA assistant. Ask me about prices, specs, availability or selling your car.";
  const chips = fa ? ["خودروهای موجود", "فروش خودرو", "اطلاعات تماس"] : ["Available cars", "Sell my car", "Contact info"];
  const ask = (text: string) => {
    if (!text.trim()) return; setMsgs(m => [...m, { from: "me", text }]); setVal("");
    setTimeout(() => { setMsgs(m => [...m, { from: "bot", ...reply(text, lang) }]); box.current?.scrollTo({ top: 99999, behavior: "smooth" }); }, 450);
  };
  const s = site.socials as Record<string, string>;
  const sp = socials as Record<string, string>;
  // [key, label, url, svg path, hover colour]
  const items: [string, string, string, string, string][] = [
    ["whatsapp", "WhatsApp", s.whatsapp, sp.whatsapp, "#25D366"],
    ["telegram", "Telegram", s.telegram, sp.telegram, "#26A5E4"],
    ["instagram", "Instagram", INSTAGRAM_URL, sp.instagram, "#E4405F"],
    ["linkedin", "LinkedIn", LINKEDIN_URL, LINKEDIN_PATH, "#0A66C2"],
  ];
  return (
    <>
      {open && (
        <div role="dialog" aria-label="Chat" className="fixed inset-x-3 bottom-[4.5rem] z-[90] flex h-[min(480px,calc(100dvh-6.5rem))] flex-col overflow-hidden rounded-2xl border border-bone/15 bg-coal shadow-2xl sm:inset-x-auto sm:bottom-20 sm:end-5 sm:w-[360px]">
          <div className="flex items-center justify-between bg-flag px-4 py-3 text-white"><span className="flex items-center text-sm font-bold"><span className="relative me-2 inline-flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" /></span><bdi dir="ltr">Motors USA</bdi>&nbsp;{fa ? "· آنلاین" : "· online"}</span><button onClick={() => setOpen(false)} aria-label="Close" className="px-1 text-xl leading-none">×</button></div>
          <div ref={box} className="flex-1 space-y-3 overflow-y-auto overscroll-contain p-4 text-sm">
            <p className="max-w-[88%] rounded-2xl rounded-ss-sm bg-card p-3">{hello}</p>
            {msgs.map((m, i) => (<div key={i} className={m.from === "me" ? "flex justify-end" : ""}><div className={`max-w-[88%] rounded-2xl p-3 ${m.from === "me" ? "rounded-ee-sm bg-flag text-white" : "rounded-ss-sm bg-card"}`}><p>{m.text}</p>{m.links && m.links.length > 0 && <div className="mt-2 flex flex-wrap gap-2">{m.links.map(l => l.href.startsWith("http") ? <a key={l.label + l.href} href={l.href} target="_blank" rel="noreferrer" className="rounded-full border border-bone/30 px-3 py-1 text-xs hover:border-flag">{l.label} ↗</a> : <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-full border border-bone/30 px-3 py-1 text-xs hover:border-flag">{l.label}</Link>)}</div>}</div></div>))}
            {msgs.length === 0 && <div className="flex flex-wrap gap-2">{chips.map(c => <button key={c} onClick={() => ask(c)} className="rounded-full border border-bone/30 px-3 py-1 text-xs hover:border-flag">{c}</button>)}</div>}
          </div>
          <div className="flex gap-2 border-t border-bone/10 p-3"><input value={val} onChange={e => setVal(e.target.value)} onKeyDown={e => e.key === "Enter" && ask(val)} placeholder={fa ? "سؤال خود را بنویسید…" : "Type your question…"} className="min-w-0 flex-1 rounded-full border border-bone/20 bg-ink px-4 py-2 text-base outline-none focus:border-flag sm:text-sm" /><button onClick={() => ask(val)} aria-label="Send" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-flag text-white">➤</button></div>
        </div>)}

      <div className="fixed bottom-3 end-3 z-[80] flex flex-col items-center gap-2.5 sm:bottom-5 sm:end-5">
        {/* Small, quiet social pill (hidden on phones while the chat is open) */}
        <nav aria-label="Social" className={`${open ? "hidden sm:flex" : "flex"} flex-col items-center gap-0.5 rounded-full border border-bone/15 bg-coal/80 p-1 shadow-lg backdrop-blur`}>
          {items.filter(([, , href, path]) => !!path && !!href && href !== "#" && !/^https?:\/\/(www\.)?(t\.me|instagram\.com|linkedin\.com)\/?$/.test(href)).map(([k, n, href, path, c]) => (
            <a key={k} href={href} target="_blank" rel="noopener noreferrer" aria-label={n} title={n} style={{ "--c": c } as CSSProperties} className="grid h-8 w-8 place-items-center rounded-full text-bone/60 transition duration-200 hover:bg-bone/10 hover:text-[var(--c)]">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={path} /></svg>
            </a>
          ))}
        </nav>
        <button onClick={() => setOpen(!open)} aria-label={fa ? "گفتگوی آنلاین" : "Live chat"} aria-expanded={open} className="relative grid h-12 w-12 place-items-center rounded-full bg-flag text-xl text-white shadow-[0_6px_24px_rgba(215,38,61,.45)] transition hover:scale-105 sm:h-14 sm:w-14">
          {open ? "×" : <Headset />}
          {!open && (
            <span className="absolute -end-0.5 -top-0.5 flex h-3.5 w-3.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400" />
            </span>
          )}
        </button>
      </div>
    </>
  );
}
