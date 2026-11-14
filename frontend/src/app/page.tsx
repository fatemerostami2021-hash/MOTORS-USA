"use client";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import Wheel3D from "@/components/Wheel3D";
import BrandMarquee from "@/components/BrandMarquee";
import Tiles from "@/components/Tiles";
import News from "@/components/News";
import { usePrefs } from "@/components/Prefs";
import { Fade, SplitHeading, Counter } from "@/components/Reveal";
import { vehicles } from "@/data/vehicles";
export default function Home() {
  const { t, lang } = usePrefs();
  const avail = vehicles.filter(v => v.status === "available");
  return (
    <>
      <Hero />
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:px-12 md:py-28 lg:grid-cols-2">
        <div>
          <p className="font-mono text-sm tracking-[0.3em] text-bone/60">— {t.about}</p>
          <SplitHeading as="h2" text="MOTORS USA" className="mt-4 font-display text-5xl font-black md:text-6xl lg:text-7xl" />
          <Fade className="mt-6 space-y-4 text-lg text-bone/80"><p>{t.aboutP1}</p><p>{t.aboutP2}</p></Fade>
          {/* DEMO numbers: replace with real, provable figures */}
          <div className="mt-8 flex gap-10 border-t border-bone/10 pt-6 font-mono">
            <div><p className="text-3xl font-bold text-flag"><Counter to={250} suffix="+" /></p><p className="text-xs tracking-widest text-bone/60">{t.sold2}</p></div>
            <div><p className="text-3xl font-bold text-flag"><Counter to={avail.length} /></p><p className="text-xs tracking-widest text-bone/60">{t.stock}</p></div>
            <div><p className="text-3xl font-bold text-flag"><Counter to={2026} raw /></p><p className="text-xs tracking-widest text-bone/60">{t.est}</p></div>
          </div>
        </div>
        <Wheel3D />
      </section>
      <BrandMarquee />
      <Featured items={avail} />
      <Tiles />
      <News />
    </>
  );
}
