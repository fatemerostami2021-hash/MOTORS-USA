import { notFound } from "next/navigation";
import { JournalPost } from "@/components/JournalViews";
import { articles } from "@/data/articles";
export function generateStaticParams() { return articles.map(a => ({ slug: a.slug })); }
export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; if (!articles.some(a => a.slug === slug)) notFound();
  return <JournalPost slug={slug} />;
}
