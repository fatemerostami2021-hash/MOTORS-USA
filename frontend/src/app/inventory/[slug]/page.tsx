import { notFound } from "next/navigation";
import VehicleView from "@/components/VehicleView";
import { vehicles } from "@/data/vehicles";
import { articles } from "@/data/articles";
export function generateStaticParams() { return vehicles.map(v => ({ slug: v.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const v = vehicles.find(x => x.slug === slug); return v ? { title: `${v.year} ${v.make} ${v.model}`, description: `${v.year} ${v.make} ${v.model}: ${v.hp} hp, ${v.engine}.` } : {};
}
export default async function Detail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const v = vehicles.find(x => x.slug === slug); if (!v) notFound();
  const same = vehicles.filter(x => x.make === v.make && x.slug !== v.slug && x.status === "available").slice(0, 3);
  const art = articles.find(a => a.brand === v.make) ?? articles[0];
  const ld = { "@context": "https://schema.org", "@type": "Vehicle", name: `${v.year} ${v.make} ${v.model}`, brand: v.make, vehicleModelDate: v.year, mileageFromOdometer: v.mileage, offers: { "@type": "Offer", price: v.price, priceCurrency: "USD" } };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} /><VehicleView v={v} same={same} art={art} /></>);
}
