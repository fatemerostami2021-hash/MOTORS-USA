import { vehicles, usd } from "@/data/vehicles";
export const metadata = { title: "Compare cars" };
export default async function Compare({ searchParams }: { searchParams: Promise<{ ids?: string }> }) {
  const ids = ((await searchParams).ids ?? "").split(",").filter(Boolean);
  const picked = ids.length ? vehicles.filter(v => ids.includes(v.slug)).slice(0, 4) : vehicles.filter(v => v.status === "available").slice(0, 3);
  const rows: [string, (v: typeof vehicles[0]) => string | number][] = [["Price", v => usd(v.price)], ["Year", v => v.year], ["Mileage", v => v.mileage.toLocaleString() + " mi"], ["Power", v => v.hp + " hp"], ["Engine", v => v.engine], ["Transmission", v => v.transmission], ["Fuel", v => v.fuel]];
  return (
    <div className="mx-auto max-w-6xl overflow-x-auto px-6 py-12 md:px-16"><h1 className="font-display text-3xl">COMPARE CARS</h1>
      <p className="mt-2 text-sm text-bone/60">Use <code>?ids=slug1,slug2</code> (max 4). Demo shows the first three cars.</p>
      <table className="mt-8 w-full min-w-[640px] text-left text-sm"><thead><tr><th />{picked.map(v => <th key={v.slug} className="p-3 font-mono">{v.make} {v.model}</th>)}</tr></thead>
        <tbody>{rows.map(([l, f]) => <tr key={l} className="border-t border-white/10"><td className="p-3 font-mono text-[10px] tracking-widest text-bone/50">{l.toUpperCase()}</td>{picked.map(v => <td key={v.slug} className="p-3">{f(v)}</td>)}</tr>)}</tbody></table></div>
  );
}
