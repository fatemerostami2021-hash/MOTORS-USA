"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { socials } from "@/data/logos";
import { site } from "@/data/site";
import { reply, Reply } from "@/lib/assistant";
import { usePrefs } from "./Prefs";
type Msg = { from: "me" | "bot"; text: string; links?: Reply["links"] };
const Ic = ({ d, c = "#fff", s = 22 }: { d: string; c?: string; s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d={d} /></svg>;
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
  const others: [string, string, string][] = [["telegram", "#26A5E4", "Telegram"], ["instagram", "#E4405F", "Instagram"]];
  return (
    <div className="fixed bottom-5 end-5 z-[90] flex flex-col items-end gap-3" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {open && (
        <div role="dialog" aria-label="Chat" className="flex h-[min(520px,70vh)] w-[min(360px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-bone/15 bg-coal shadow-2xl">
          <div className="flex items-center justify-between bg-flag px-4 py-3 text-white"><span className="font-bold"><span className="me-2 inline-block h-2 w-2 rounded-full bg-emerald-300" /><bdi dir="ltr">Motors USA</bdi> {fa ? "· آنلاین" : "· online"}</span><button onClick={() => setOpen(false)} aria-label="Close" className="text-xl">×</button></div>
          <div ref={box} className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
            <p className="max-w-[85%] rounded-2xl rounded-ss-sm bg-card p-3">{hello}</p>
            {msgs.map((m, i) => (<div key={i} className={m.from === "me" ? "flex justify-end" : ""}><div className={`max-w-[85%] rounded-2xl p-3 ${m.from === "me" ? "rounded-ee-sm bg-flag text-white" : "rounded-ss-sm bg-card"}`}><p>{m.text}</p>{m.links && m.links.length > 0 && <div className="mt-2 flex flex-wrap gap-2">{m.links.map(l => l.href.startsWith("http") ? <a key={l.label + l.href} href={l.href} target="_blank" rel="noreferrer" className="rounded-full border border-bone/30 px-3 py-1 text-xs hover:border-flag">{l.label} ↗</a> : <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-full border border-bone/30 px-3 py-1 text-xs hover:border-flag">{l.label}</Link>)}</div>}</div></div>))}
            {msgs.length === 0 && <div className="flex flex-wrap gap-2">{chips.map(c => <button key={c} onClick={() => ask(c)} className="rounded-full border border-bone/30 px-3 py-1 text-xs hover:border-flag">{c}</button>)}</div>}
          </div>
          <div className="flex gap-2 border-t border-bone/10 p-3"><input value={val} onChange={e => setVal(e.target.value)} onKeyDown={e => e.key === "Enter" && ask(val)} placeholder={fa ? "سؤال خود را بنویسید…" : "Type your question…"} className="min-w-0 flex-1 rounded-full border border-bone/20 bg-ink px-4 py-2 outline-none focus:border-flag" /><button onClick={() => ask(val)} aria-label="Send" className="grid h-10 w-10 place-items-center rounded-full bg-flag text-white">➤</button></div>
        </div>)}
      {others.map(([k, bg, n]) => <a key={k} href={site.socials[k]} target="_blank" rel="noreferrer" aria-label={n} className={`${fab} ${hover ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`} style={{ background: bg }}><Ic d={socials[k]} /></a>)}
      <a href={site.socials.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp" className={`${fab} hover:scale-105`} style={{ background: "#25D366" }}><Ic d={socials.whatsapp} /></a>
      <button onClick={() => setOpen(!open)} aria-label="Chat" aria-expanded={open} className="grid h-14 w-14 place-items-center rounded-full bg-flag text-2xl text-white shadow-[0_6px_30px_rgba(215,38,61,.5)] transition hover:scale-105">{open ? "×" : <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" /></svg>}</button>
    </div>
  );
}
