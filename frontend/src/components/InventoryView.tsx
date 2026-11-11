"use client";
import Link from "next/link";
import Stagger from "./Stagger";
import VehicleCard from "./VehicleCard";
import { usePrefs } from "./Prefs";
import { vehicles, makes } from "@/data/vehicles";
export default function InventoryView({ status, make }: { status: "available" | "sold"; make?: string }) {
  const { t, bn } = usePrefs();
  const list = vehicles.filter(v => v.status === status && (!make || v.make === make));
  const pill = "rounded-full border border-bone/20 px-4 py-1.5 text-sm hover:border-flag";
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:px-12">
      <h1 className="font-heading text-4xl font-bold md:text-6xl">{status === "sold" ? t.titleSold : t.titleAvail}</h1>
      <nav aria-label="Filter" className="mt-6 flex flex-wrap gap-2">
        <Link href={`/inventory?status=${status}`} className={pill}>{t.all}</Link>
        {makes.map(m => <Link key={m} href={`/inventory?status=${status}&make=${m}`} className={pill}>{bn(m)}</Link>)}
      </nav>
      <Stagger key={status + make} className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map(v => <VehicleCard key={v.slug} v={v} />)}</Stagger>
      {!list.length && <p className="mt-10 text-bone/60">{t.noMatch}</p>}
    </div>
  );
}
