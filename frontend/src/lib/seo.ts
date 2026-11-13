import { site } from "@/data/site";
export const abs = (path = "/") => new URL(path, site.url).toString();
// Safe JSON-LD string (escapes "<" so it cannot break out of the script tag).
export const jsonLd = (o: unknown) => JSON.stringify(o).replace(/</g, "\\u003c");
export const orgLd = () => ({ "@context": "https://schema.org", "@type": "AutoDealer", name: site.name, url: site.url, image: abs("/opengraph-image"), telephone: site.phoneIntl, email: site.email, address: { "@type": "PostalAddress", streetAddress: site.address.en, addressCountry: "IR" }, sameAs: Object.values(site.socials).filter(u => u.startsWith("http") && u.length > 25) });
export const crumbs = (items: [string, string][]) => ({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(path) })) });
