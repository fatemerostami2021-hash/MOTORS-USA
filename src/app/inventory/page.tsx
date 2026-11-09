import VehicleCard from "@/components/VehicleCard";
import { vehicles, makes } from "@/data/vehicles";
import Link from "next/link";
export const metadata = { title: "Inventory" };
export default async function Inventory({ searchParams }: { searchParams: Promise<{ make?: string; status?: string; max?: string }> }) {
  const q = await searchParams; const status = q.status === "sold" ? "sold" : "available";
  const list = vehicles.filter(v => v.status === status && (!q.make || v.make === q.make) && (!q.max || v.price <= +q.max));
  const pill = "rounded-full border border-white/20 px-4 py-1.5 font-mono text-[11px] hover:border-flag";
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:px-16">
      <h1 className="font-display text-3xl md:text-4xl">{status === "sold" ? "SOLD CARS" : "AVAILABLE CARS"}</h1>
      <nav aria-label="Filter by make" className="mt-6 flex flex-wrap gap-2">
        <Link href={`/inventory?status=${status}`} className={pill}>All</Link>
        {makes.map(m => <Link key={m} href={`/inventory?status=${status}&make=${m}`} className={pill}>{m}</Link>)}
      </nav>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map(v => <VehicleCard key={v.slug} v={v} />)}</div>
      {!list.length && <p className="mt-10 text-bone/60">No cars match these filters.</p>}
    </div>
  );
}
