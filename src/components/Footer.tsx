import Link from "next/link";
import { Logo } from "./Header";
export default function Footer() {
  return (
    <footer id="contact" className="bg-gradient-to-br from-[#1d1311] to-ink px-6 py-16 md:px-16">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
        <div><Logo /><p className="mt-4 text-sm text-bone/60">Curated performance & collector cars. Demo content — replace with your real details.</p><p className="mt-4 font-mono text-xs">{process.env.NEXT_PUBLIC_PHONE}</p></div>
        {[["Cars", [["Available", "/inventory"], ["Sold", "/inventory?status=sold"], ["Compare", "/compare"], ["Sell my car", "/sell-your-car"]]], ["Company", [["About", "/"], ["Contact", "/#contact"]]], ["Legal", [["Privacy", "#"], ["Terms", "#"]]]].map(([t, ls]) => (
          <div key={t as string}><h3 className="font-display text-[10px] tracking-[0.25em] text-flag">{(t as string).toUpperCase()}</h3>
            <ul className="mt-4 space-y-2 text-sm text-bone/70">{(ls as string[][]).map(([l, h]) => <li key={l}><Link href={h} className="hover:text-bone">{l}</Link></li>)}</ul></div>
        ))}
      </div>
      <p className="mx-auto mt-12 max-w-6xl border-t border-white/10 pt-6 font-mono text-[10px] tracking-widest text-bone/40">© 2026 MOTORS USA. ALL RIGHTS RESERVED.</p>
    </footer>
  );
}
