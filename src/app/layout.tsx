import "@fontsource/michroma/400.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/700.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/600.css";
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Smooth from "@/components/Smooth";
export const metadata: Metadata = {
  title: { default: "Motors USA — Curated Performance & Collector Cars", template: "%s | Motors USA" },
  description: "Buy, sell and compare curated supercars, hypercars and collector vehicles at Motors USA.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body><Smooth><Header /><main>{children}</main><Footer /></Smooth></body></html>);
}
