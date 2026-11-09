import { notFound } from "next/navigation";
import Link from "next/link";
import { vehicles, usd } from "@/data/vehicles";
export function generateStaticParams() { return vehicles.map(v => ({ slug: v.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const v = vehicles.find(x => x.slug === slug); return v ? { title: `${v.year} ${v.make} ${v.model}`, description: v.blurb } : {};
}
export default async function Detail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const v = vehicles.find(x => x.slug === slug); if (!v) notFound();
  const specs = [["Year", v.year], ["Mileage", `${v.mileage.toLocaleString()} mi`], ["Engine", v.engine], ["Power", `${v.hp} hp`], ["Transmission", v.transmission], ["Fuel", v.fuel], ["Body", v.body], ["Color", v.color]];
  const ld = { "@context": "https://schema.org", "@type": "Vehicle", name: `${v.year} ${v.make} ${v.model}`, brand: v.make, vehicleModelDate: v.year, mileageFromOdometer: v.mileage, offers: { "@type": "Offer", price: v.price, priceCurrency: "USD" } };
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:px-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <img src={v.image} alt={`${v.year} ${v.make} ${v.model}`} className="aspect-video w-full rounded-xl object-cover" />
      <div className="mt-8 grid gap-10 md:grid-cols-[1fr_320px]">
        <div><p className="font-mono text-xs tracking-[0.25em] text-bone/50">{v.make.toUpperCase()}</p><h1 className="font-mono text-3xl font-bold md:text-5xl">{v.model} {v.year}</h1><p className="mt-4 text-bone/70">{v.blurb}</p>
          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-white/10">{specs.map(([k, val]) => <div key={k as string} className="bg-card p-4"><dt className="font-mono text-[10px] tracking-widest text-bone/50">{(k as string).toUpperCase()}</dt><dd className="mt-1">{val}</dd></div>)}</dl>
          <p className="mt-4 text-xs text-bone/50">Specifications and availability must be verified before purchase.</p></div>
        <aside className="h-fit rounded-xl bg-card p-6"><p className="font-mono text-2xl">{usd(v.price)}</p><p className="mt-1 text-xs text-bone/50">{v.status === "sold" ? "SOLD" : "Available"}</p>
          <Link href={`/compare?ids=${v.slug}`} className="mt-5 block rounded-full border border-white/20 py-3 text-center font-mono text-[11px] tracking-widest">COMPARE</Link>
          <a href={`tel:${process.env.NEXT_PUBLIC_PHONE}`} className="mt-3 block rounded-full bg-flag py-3 text-center font-mono text-[11px] tracking-widest">CALL / BOOK A VISIT</a></aside>
      </div>
    </div>
  );
}
