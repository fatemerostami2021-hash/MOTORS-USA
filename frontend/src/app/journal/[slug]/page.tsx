import { notFound } from "next/navigation";
import { JournalPost } from "@/components/JournalViews";
import { articles } from "@/data/articles";
import { abs, jsonLd } from "@/lib/seo";
export function generateStaticParams() { return articles.map(a => ({ slug: a.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const a = articles.find(x => x.slug === slug); if (!a) return {};
  return { title: a.title, description: a.excerpt, alternates: { canonical: `/journal/${a.slug}` }, openGraph: { type: "article", title: a.title, description: a.excerpt, images: [{ url: a.image }], publishedTime: a.date } };
}
export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const a = articles.find(x => x.slug === slug); if (!a) notFound();
  const ld = { "@context": "https://schema.org", "@type": "Article", headline: a.title, datePublished: a.date, image: abs(a.image), author: { "@type": "Organization", name: "Motors USA" }, mainEntityOfPage: abs(`/journal/${a.slug}`) };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(ld) }} /><JournalPost slug={slug} /></>);
}
