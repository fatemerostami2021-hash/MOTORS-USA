import "@fontsource/orbitron/700.css";
import "@fontsource/orbitron/900.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/700.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/700.css";
import "./globals.css";
import type { Metadata } from "next";
import Prefs from "@/components/Prefs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Floating from "@/components/Floating";
import Analytics from "@/components/Analytics";
import Newsletter from "@/components/Newsletter";
import Smooth from "@/components/Smooth";
import ScrollProgress from "@/components/ScrollProgress";
export const metadata: Metadata = { title: { default: "Motors USA — Curated Performance & Collector Cars", template: "%s | Motors USA" }, description: "Buy, sell and compare curated supercars, hypercars and collector vehicles at Motors USA." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" dir="ltr" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} /></head><body suppressHydrationWarning><Prefs><Smooth><ScrollProgress /><Analytics /><Header /><main>{children}</main><Newsletter /><Footer /><Floating /></Smooth></Prefs></body></html>);
}
