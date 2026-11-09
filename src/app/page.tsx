import Link from "next/link";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import Wheel3D from "@/components/Wheel3D";
import { Fade, SplitHeading, Counter } from "@/components/Reveal";
import { vehicles, makes } from "@/data/vehicles";
const tiles = [["Available Cars", "/inventory"], ["Sold Cars", "/inventory?status=sold"], ["Compare Cars", "/compare"], ["Car Specs", "/inventory"], ["Sell My Car", "/sell-your-car"]];
export default function Home() {
  const avail = vehicles.filter(v => v.status === "available");
  return (
    <>
      <Hero />
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-24 md:grid-cols-2 md:px-16">
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] text-bone/50">— CURATED PERFORMANCE CARS</p>
          <SplitHeading as="h2" text="MOTORS USA" className="mt-4 font-display text-4xl md:text-5xl" />
          <Fade className="mt-6 space-y-4 text-sm leading-relaxed text-bone/70">
            <p>Motors USA is a curated showroom for supercars, hypercars and collector vehicles. Every car is inspected, documented and presented with honest specs.</p>
            <p>Buy direct, sell your car, or place it on consignment — with a clear, tracked process from first enquiry to handover.</p>
          </Fade>
          {/* DEMO numbers — replace with real, provable figures */}
          <div className="mt-8 flex gap-8 border-t border-white/10 pt-6 font-mono">
            <div><p className="text-xl font-bold text-flag"><Counter to={250} suffix="+" /></p><p className="text-[10px] tracking-widest text-bone/50">CARS SOLD</p></div>
            <div><p className="text-xl font-bold text-flag"><Counter to={12} /></p><p className="text-[10px] tracking-widest text-bone/50">IN STOCK</p></div>
            <div><p className="text-xl font-bold text-flag"><Counter to={2026} /></p><p className="text-[10px] tracking-widest text-bone/50">ESTABLISHED</p></div>
          </div>
        </div>
        <Wheel3D />
      </section>
      <section className="border-y border-white/5 py-10"><p className="mb-6 text-center font-mono text-[10px] tracking-[0.3em] text-bone/50">THE WORLD&apos;S FINEST BRANDS</p>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 px-6 font-display text-xs tracking-widest text-bone/40">{makes.map(m => <span key={m}>{m.toUpperCase()}</span>)}</div></section>
      <Featured items={avail} />
      <section className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-6 py-20 md:grid-cols-5 md:px-16">
        {tiles.map(([l, h]) => (<Fade key={l}><Link href={h} className="group relative flex aspect-[3/4] items-end overflow-hidden rounded-xl bg-card p-4"><img src="/cars/car-3.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-50 transition duration-700 group-hover:scale-110 group-hover:opacity-70" /><span className="relative text-xl font-semibold leading-tight">{l}</span></Link></Fade>))}
      </section>
      <section className="px-6 pb-24 md:px-16"><div className="mx-auto max-w-4xl rounded-2xl bg-coal p-10">
        <p className="font-mono text-[10px] tracking-[0.3em] text-flag">THE NEWSLETTER</p>
        <h2 className="mt-2 font-mono text-2xl font-bold md:text-3xl">STAY AHEAD OF THE CURVE</h2>
        <form action="/api/leads" method="post" className="mt-6 flex max-w-md border-b border-white/30"><input name="email" type="email" required aria-label="Email" placeholder="Enter your email" className="flex-1 bg-transparent py-2 outline-none" /><input type="hidden" name="type" value="newsletter" /><button className="px-3" aria-label="Subscribe">→</button></form>
      </div></section>
    </>
  );
}
