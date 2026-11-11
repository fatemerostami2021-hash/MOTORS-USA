"use client";
import Link from "next/link";
import { brands } from "@/data/brands";
import BrandIcon from "./BrandIcon";
import { usePrefs } from "./Prefs";
// dir="ltr" on the whole section: identical direction and speed in English and Persian
// (in RTL the track used to sit off-screen, which made the strip look empty).
export default function BrandMarquee() {
  const { t } = usePrefs();
  const items = [...brands, ...brands, ...brands, ...brands];
  return (
    <section dir="ltr" className="overflow-hidden border-y border-bone/10 py-12" aria-label={t.finest}>
      <p dir="auto" className="mb-8 text-center font-mono text-sm tracking-[0.3em] text-bone/60">{t.finest}</p>
      <div className="flex w-max animate-[marquee_45s_linear_infinite] hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
        {items.map((b, i) => (
          <Link key={i} href={`/brands/${b.slug}`} className="mx-6 flex w-40 shrink-0 flex-col items-center gap-3 transition hover:scale-110 md:mx-10 md:w-48">
            <BrandIcon slug={b.slug} name={b.name} size={88} />
            <span className="font-display text-xs font-bold tracking-widest">{b.name.toUpperCase()}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
