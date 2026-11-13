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

const TITLE = "Motors USA | Buy & Sell Luxury Cars, Supercars & Hypercars";
const DESC = "Buy and sell luxury cars, supercars and hypercars. Inspected, documented Ferrari, Lamborghini, Porsche and McLaren with verified specs and a secure process.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: TITLE, template: "%s | Motors USA" },
  description: DESC,
  applicationName: "Motors USA",
  keywords: ["buy luxury cars", "sell luxury cars", "supercars for sale", "hypercars", "Ferrari", "Lamborghini", "Porsche", "McLaren", "collector cars", "Motors USA"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Motors USA", url: "/", title: TITLE, description: DESC, locale: "en_US", alternateLocale: ["fa_IR"] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};
export const viewport: Viewport = { themeColor: "#121110", width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" dir="ltr" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(orgLd()) }} /></head><body suppressHydrationWarning><Prefs><Smooth><ScrollProgress /><Analytics /><Header /><main>{children}</main><Newsletter /><Footer /><Floating /></Smooth></Prefs></body></html>);
}
