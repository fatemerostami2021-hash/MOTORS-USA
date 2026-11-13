import "@fontsource/orbitron/700.css";
import "@fontsource/orbitron/900.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/700.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/700.css";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { site } from "@/data/site";
import { jsonLd, orgLd } from "@/lib/seo";
import Prefs from "@/components/Prefs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Floating from "@/components/Floating";
import Analytics from "@/components/Analytics";
import Newsletter from "@/components/Newsletter";
import Smooth from "@/components/Smooth";
import ScrollProgress from "@/components/ScrollProgress";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Motors USA | Curated Performance & Collector Cars", template: "%s | Motors USA" },
  description: "Buy, sell and compare curated supercars, hypercars and collector vehicles at Motors USA. Verified specs, honest history, clear process.",
  applicationName: "Motors USA", alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Motors USA", url: "/", title: "Motors USA | Curated Performance & Collector Cars", description: "Buy, sell and compare curated supercars, hypercars and collector vehicles." },
  twitter: { card: "summary_large_image", title: "Motors USA", description: "Curated performance and collector cars." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};
export const viewport: Viewport = { themeColor: "#121110", width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" dir="ltr" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(orgLd()) }} /></head><body suppressHydrationWarning><Prefs><Smooth><ScrollProgress /><Analytics /><Header /><main>{children}</main><Newsletter /><Footer /><Floating /></Smooth></Prefs></body></html>);
}
