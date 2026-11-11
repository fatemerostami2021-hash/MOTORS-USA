import { notFound } from "next/navigation";
import { BrandView } from "@/components/BrandViews";
import { brands } from "@/data/brands";
export function generateStaticParams() { return brands.map(b => ({ slug: b.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const b = brands.find(x => x.slug === slug); return b ? { title: `${b.name} cars`, description: b.desc } : {}; }
export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; if (!brands.some(x => x.slug === slug)) notFound();
  return <BrandView slug={slug} />;
}
