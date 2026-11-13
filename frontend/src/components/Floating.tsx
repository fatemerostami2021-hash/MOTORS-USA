"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { socials } from "@/data/logos";
import { site } from "@/data/site";
import { reply, Reply } from "@/lib/assistant";
import { usePrefs } from "./Prefs";
type Msg = { from: "me" | "bot"; text: string; links?: Reply["links"] };
const Ic = ({ d, c = "#fff", s = 22 }: { d: string; c?: string; s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d={d} /></svg>;

const INSTAGRAM_URL = "https://www.instagram.com/f.rostamii_web";
const LINKEDIN_URL = "https://www.linkedin.com/in/fatemeh-rostami963";
const LINKEDIN_PATH = "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

const Headset = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <rect x="2.5" y="14" width="4.5" height="6" rx="1.5" fill="currentColor" />
    <rect x="17" y="14" width="4.5" height="6" rx="1.5" fill="currentColor" />
    <path d="M19.5 20c0 1.5-1.5 2-4 2h-2" />
  </svg>
);

export default function Floating() {
  const { lang } = usePrefs(); const [open, setOpen] = useState(false), [hover, setHover] = useState(false), [msgs, setMsgs] = useState<Msg[]>([]), [val, setVal] = useState(""); const box = useRef<HTMLDivElement>(null);
  const fa = lang === "fa";
  const hello = fa ? "سلام! من دستیار Motors USA هستم. درباره قیمت، مشخصات، موجودی یا فروش خودرو بپرسید." : "Hi! I'm the Motors USA assistant. Ask me about prices, specs, availability or selling your car.";
  const chips = fa ? ["خودروهای موجود", "فروش خودرو", "اطلاعات تماس"] : ["Available cars", "Sell my car", "Contact info"];
  const ask = (text: string) => {
    if (!text.trim()) return; setMsgs(m => [...m, { from: "me", text }]); setVal("");
    setTimeout(() => { setMsgs(m => [...m, { from: "bot", ...reply(text, lang) }]); box.current?.scrollTo({ top: 99999, behavior: "smooth" }); }, 450);
  };
  const fab = "grid h-12 w-12 place-items-center rounded-full shadow-lg transition duration-300";
  const s = site.socials as Record<string, string>;
  const sp = socials as Record<string, string>;
  const others: [string, string, string, string, string][] = [
    ["telegram", "#26A5E4", "Telegram", s.telegram, sp.telegram],
    ["instagram", "#E4405F", "Instagram", INSTAGRAM_URL, sp.instagram],
    ["linkedin", "#0A66C2", "LinkedIn", LINKEDIN_URL, LINKEDIN_PATH],
  ];
  return (
    <div className="fixed bottom-5 end-5 z-[90] flex flex-col items-end gap-3" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {open && (
        <div role="dialog" aria-label="Chat" className="flex h-[min(520px,70vh)] w-[min(360px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-bone/15 bg-coal shadow-2xl">
          <div className="flex items-center justify-between bg-flag px-4 py-3 text-white"><span className="flex items-center font-bold"><span className="relative me-2 inline-flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" /></span><bdi dir="ltr">Motors USA</bdi>&nbsp;{fa ? "· آنلاین" : "· online"}</span><button onClick={() => setOpen(false)} aria-label="Close" className="text-xl">×</button></div>
          <div ref={box} className="flex-1 space-y-3 overflow-y-auto overscroll-contain p-4 text-sm">
            <p className="max-w-[85%] rounded-2xl rounded-ss-sm bg-card p-3">{hello}</p>
            {msgs.map((m, i) => (<div key={i} className={m.from === "me" ? "flex justify-end" : ""}><div className={`max-w-[85%] rounded-2xl p-3 ${m.from === "me" ? "rounded-ee-sm bg-flag text-white" : "rounded-ss-sm bg-card"}`}><p>{m.text}</p>{m.links && m.links.length > 0 && <div className="mt-2 flex flex-wrap gap-2">{m.links.map(l => l.href.startsWith("http") ? <a key={l.label + l.href} href={l.href} target="_blank" rel="noreferrer" className="rounded-full border border-bone/30 px-3 py-1 text-xs hover:border-flag">{l.label} ↗</a> : <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-full border border-bone/30 px-3 py-1 text-xs hover:border-flag">{l.label}</Link>)}</div>}</div></div>))}
            {msgs.length === 0 && <div className="flex flex-wrap gap-2">{chips.map(c => <button key={c} onClick={() => ask(c)} className="rounded-full border border-bone/30 px-3 py-1 text-xs hover:border-flag">{c}</button>)}</div>}
          </div>
          <div className="flex gap-2 border-t border-bone/10 p-3"><input value={val} onChange={e => setVal(e.target.value)} onKeyDown={e => e.key === "Enter" && ask(val)} placeholder={fa ? "سؤال خود را بنویسید…" : "Type your question…"} className="min-w-0 flex-1 rounded-full border border-bone/20 bg-ink px-4 py-2 outline-none focus:border-flag" /><button onClick={() => ask(val)} aria-label="Send" className="grid h-10 w-10 place-items-center rounded-full bg-flag text-white">➤</button></div>
        </div>)}
      {others.filter(([, , , href, path]) => !!href && !!path).map(([k, bg, n, href, path]) => <a key={k} href={href} target="_blank" rel="noopener noreferrer" aria-label={n} className={`${fab} ${hover ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`} style={{ background: bg }}><Ic d={path} /></a>)}
      <a href={site.socials.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp" className={`${fab} hover:scale-105`} style={{ background: "#25D366" }}><Ic d={socials.whatsapp} /></a>
      <button onClick={() => setOpen(!open)} aria-label={fa ? "گفتگوی آنلاین" : "Live chat"} aria-expanded={open} className="relative grid h-14 w-14 place-items-center rounded-full bg-flag text-2xl text-white shadow-[0_6px_30px_rgba(215,38,61,.5)] transition hover:scale-105">
        {open ? "×" : <Headset />}
        {!open && (
          <span className="absolute -end-0.5 -top-0.5 flex h-4 w-4" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-white bg-emerald-400" />
          </span>
        )}
      </button>
    </div>
  );
}
