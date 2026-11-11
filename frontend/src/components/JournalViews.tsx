"use client";
import Link from "next/link";
import { usePrefs } from "./Prefs";
import { articles } from "@/data/articles";
export function JournalList() {
  const { t, lang, bn } = usePrefs();
  return (<div className="mx-auto max-w-4xl px-6 py-14"><h1 className="font-heading text-4xl font-bold md:text-6xl">{t.journalTitle}</h1><div className="mt-10 divide-y divide-bone/10">{articles.map(a => <Link key={a.slug} href={`/journal/${a.slug}`} className="block py-6 hover:text-flag"><p className="font-mono text-xs text-bone/60">{a.date} · <bdi dir="ltr">{bn(a.brand)}</bdi></p><h2 className="mt-1 font-heading text-2xl font-bold">{lang === "fa" ? a.titleFa : a.title}</h2><p className="mt-2 text-bone/70">{lang === "fa" ? a.excerptFa : a.excerpt}</p></Link>)}</div></div>);
}
export function JournalPost({ slug }: { slug: string }) {
  const { lang, bn } = usePrefs(); const a = articles.find(x => x.slug === slug)!;
  return (<article className="mx-auto max-w-3xl px-6 py-14"><p className="font-mono text-xs text-bone/60">{a.date} · <bdi dir="ltr">{bn(a.brand)}</bdi></p><h1 className="mt-2 font-heading text-4xl font-bold md:text-5xl">{lang === "fa" ? a.titleFa : a.title}</h1>{(lang === "fa" ? a.bodyFa : a.body).map((p, i) => <p key={i} className="mt-6 text-lg text-bone/80">{p}</p>)}</article>);
}
