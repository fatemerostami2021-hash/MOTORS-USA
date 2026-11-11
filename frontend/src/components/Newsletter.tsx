"use client";
import Image from "next/image";
import { usePrefs } from "./Prefs";
import { Fade } from "./Reveal";
export default function Newsletter() {
  const { t } = usePrefs();
  return (
    <section className="bg-ink px-6 py-16 md:px-12">
      <Fade className="mx-auto grid max-w-6xl items-center gap-8 border border-bone/15 bg-coal p-8 md:grid-cols-2 md:p-12">
        <div>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">{t.news}</h2>
          <p className="mt-4 text-bone/80">{t.newsText}</p>
          <form action="/api/leads" method="post" className="mt-6 flex max-w-md items-center rounded-full border border-bone/20 bg-ink p-1.5 ps-5">
            <input name="email" type="email" required aria-label="Email" placeholder={t.email} className="min-w-0 flex-1 bg-transparent py-2 outline-none" />
            <input type="hidden" name="type" value="newsletter" />
            <button aria-label="Subscribe" className="grid h-11 w-11 place-items-center rounded-full bg-flag text-white">›</button>
          </form>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl"><Image src="/cars/lamborghini-revuelto.webp" alt="" fill sizes="(min-width:768px) 40vw, 90vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" /></div>
      </Fade>
    </section>
  );
}
