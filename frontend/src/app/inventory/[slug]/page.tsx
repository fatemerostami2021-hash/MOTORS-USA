import { notFound } from "next/navigation";
import VehicleView from "@/components/VehicleView";
import { vehicles } from "@/data/vehicles";
import { articles } from "@/data/articles";
import { abs, crumbs, jsonLd } from "@/lib/seo";
export function generateStaticParams() { return vehicles.map(v => ({ slug: v.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const v = vehicles.find(x => x.slug === slug); if (!v) return {};
  const title = `${v.year} ${v.make} ${v.model}`, description = `${title}: ${v.hp} hp, ${v.engine}${v.accel ? `, 0-100 km/h in ${v.accel}s` : ""}${v.top ? `, top speed ${v.top} km/h` : ""}. ${v.status === "sold" ? "Sold." : "Available now at Motors USA."}`;
  return { title, description, alternates: { canonical: `/inventory/${v.slug}` }, openGraph: { type: "website", title, description, images: [{ url: v.image }] }, twitter: { card: "summary_large_image", title, description, images: [v.image] } };
}
export default async function Detail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const v = vehicles.find(x => x.slug === slug); if (!v) notFound();
  const same = vehicles.filter(x => x.make === v.make && x.slug !== v.slug && x.status === "available").slice(0, 3);
  const art = articles.find(a => a.brand === v.make) ?? articles[0];
  const ld = { "@context": "https://schema.org", "@type": "Car", name: `${v.year} ${v.make} ${v.model}`, brand: { "@type": "Brand", name: v.make }, model: v.model, vehicleModelDate: String(v.year), image: abs(v.image), url: abs(`/inventory/${v.slug}`), mileageFromOdometer: { "@type": "QuantitativeValue", value: v.mileage, unitCode: "SMI" }, vehicleEngine: { "@type": "EngineSpecification", name: v.engine }, vehicleTransmission: v.transmission, bodyType: v.body, offers: { "@type": "Offer", price: v.price, priceCurrency: "USD", availability: v.status === "sold" ? "https://schema.org/SoldOut" : "https://schema.org/InStock", url: abs(`/inventory/${v.slug}`) } };
  const bc = crumbs([["Home", "/"], ["Cars", "/inventory"], [`${v.make} ${v.model}`, `/inventory/${v.slug}`]]);
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd([ld, bc]) }} /><VehicleView v={v} same={same} art={art} /></>);
}
