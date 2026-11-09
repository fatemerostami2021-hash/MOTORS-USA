import Link from "next/link";
import { Vehicle, usd } from "@/data/vehicles";
export default function VehicleCard({ v }: { v: Vehicle }) {
  return (
    <Link href={`/inventory/${v.slug}`} className="group block overflow-hidden rounded-xl bg-card">
      <div className="aspect-[4/3] overflow-hidden"><img src={v.image} alt={`${v.year} ${v.make} ${v.model}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
      <div className="p-4">
        <p className="font-mono text-[10px] tracking-[0.25em] text-bone/50">{v.make.toUpperCase()}{v.status === "sold" && " · SOLD"}</p>
        <h3 className="mt-1 text-lg">{v.model} {v.year}</h3>
        <p className="mt-1 font-mono text-xs text-bone/50">{v.mileage.toLocaleString()} miles</p>
        <p className="mt-3 border-t border-white/10 pt-3 font-mono text-sm">{usd(v.price)}</p>
      </div>
    </Link>
  );
}
