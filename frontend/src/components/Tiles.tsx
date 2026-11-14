"use client";
import Link from "next/link";
import Image from "./SafeImage";
import { useRef } from "react";
import Stagger from "./Stagger";
import { usePrefs } from "./Prefs";
import { vehicles } from "@/data/vehicles";
import { brands } from "@/data/brands";
function Tile({ href, img, title, sub, n }: { href: string; img: string; title: string; sub: string; n: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { nf } = usePrefs();
  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 18}deg) scale(1.05)`;
  };
  return (
    <div className="[perspective:900px]">
      <Link ref={ref} href={href} onPointerMove={move} onPointerLeave={() => { if (ref.current) ref.current.style.transform = ""; }} style={{ transformStyle: "preserve-3d" }}
        className="group relative block aspect-[3/4] rounded-2xl border border-bone/25 shadow-[0_35px_60px_-18px_rgba(0,0,0,.8)] transition-transform duration-200 will-change-transform">
        <span className="absolute inset-0 overflow-hidden rounded-2xl">
          <Image src={`/cars/${img}.webp`} alt="" fill sizes="(min-width:768px) 20vw, 45vw" className="object-cover transition duration-700 group-hover:scale-125" />
          <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
        </span>
        <span className="absolute start-4 top-4 font-mono text-sm text-white/80" style={{ transform: "translateZ(30px)" }}>{nf(n).padStart(2, "0")}</span>
        <span className="absolute inset-x-4 bottom-4 text-white" style={{ transform: "translateZ(55px)" }}>
          <span className="block text-2xl font-bold leading-tight drop-shadow-lg">{title}</span>
          <span className="mt-1 block text-sm text-white/80">{sub}</span>
          <span className="mt-3 grid h-10 w-10 place-items-center rounded-full bg-flag text-lg transition group-hover:scale-110">→</span>
        </span>
      </Link>
    </div>
  );
}
export default function Tiles() {
  const { t, nf } = usePrefs();
  const a = vehicles.filter(v => v.status === "available").length, s = vehicles.filter(v => v.status === "sold").length;
  const items: [string, string, string, string][] = [[t.available, "/inventory", "available-cars", t.availSub(a)], [t.soldCars, "/inventory?status=sold", "sold", t.soldSub(s)], [t.compare, "/compare", "compare", t.cmpSub], [t.brands, "/brands", "brands", t.brandsSub(brands.length)], [t.sell, "/sell-your-car", "sell-your-car", t.sellSub]];
  return (
    <Stagger className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-24 sm:grid-cols-3 md:px-12 lg:grid-cols-5">
      {items.map(([title, href, img, sub], i) => <Tile key={href} href={href} img={img} title={title} sub={sub} n={i + 1} />)}
    </Stagger>
  );
}
