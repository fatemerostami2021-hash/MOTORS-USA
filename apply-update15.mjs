// Run from the project root (E:\MOTORS-USA):  node apply-update15.mjs
// Makes brand clicks open the brand's official website (new tab) in BrandMarquee.tsx and BrandViews.tsx.
import fs from "node:fs";
const IMP = 'import { brandUrl } from "@/data/brand-links";';
const withImport = (s) => (s.includes("brand-links") ? s : s.replace('"use client";', '"use client";\n' + IMP));
const EXT = ' target="_blank" rel="noopener noreferrer"';

// 1) Home brand strip
const f1 = "frontend/src/components/BrandMarquee.tsx";
if (fs.existsSync(f1)) {
  let s = fs.readFileSync(f1, "utf8");
  const open = "<Link key={i} href={`/brands/${b.slug}`}";
  if (s.includes(open)) {
    s = s.replace(open, "<a key={i} href={brandUrl(b.slug)}" + EXT + " aria-label={`${b.name} - official website`}");
    s = s.replace("</Link>", "</a>");
    if (!s.includes("<Link")) s = s.replace(/import Link from "next\/link";\r?\n/, "");
    fs.writeFileSync(f1, withImport(s));
    console.log("OK  BrandMarquee.tsx updated");
  } else console.log("SKIP BrandMarquee.tsx: pattern not found - send me this file");
} else console.log("SKIP BrandMarquee.tsx not found - run from the project root");

// 2) /brands page grid (the "back to brands" link inside a single brand page stays internal)
const f2 = "frontend/src/components/BrandViews.tsx";
if (fs.existsSync(f2)) {
  let s = fs.readFileSync(f2, "utf8");
  const open = "<Link key={b.slug} href={`/brands/${b.slug}`}";
  const i = s.indexOf(open);
  if (i >= 0) {
    const j = s.indexOf("</Link>", i);
    s = s.slice(0, i) + "<a key={b.slug} href={brandUrl(b.slug)}" + EXT + s.slice(i + open.length, j) + "</a>" + s.slice(j + 7);
    fs.writeFileSync(f2, withImport(s));
    console.log("OK  BrandViews.tsx updated");
  } else console.log("SKIP BrandViews.tsx: pattern not found - send me this file");
} else console.log("SKIP BrandViews.tsx not found - run from the project root");
