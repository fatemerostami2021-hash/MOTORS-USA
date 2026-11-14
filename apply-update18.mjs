// Run from the project root (E:\MOTORS-USA):  node apply-update18.mjs
// Tablet breakpoints for the home page sections + an "Install app" link in the footer.
import fs from "node:fs";

const edits = [
  ["frontend/src/app/page.tsx", [
    ["gap-10 px-6 py-28 md:grid-cols-2 md:px-12", "gap-10 px-6 py-20 md:px-12 md:py-28 lg:grid-cols-2"],
    ["font-display text-5xl font-black md:text-7xl", "font-display text-5xl font-black md:text-6xl lg:text-7xl"],
  ]],
  ["frontend/src/components/Tiles.tsx", [["grid-cols-2 gap-6 px-6 py-24 md:grid-cols-5 md:px-12", "grid-cols-2 gap-6 px-6 py-24 sm:grid-cols-3 md:px-12 lg:grid-cols-5"]]],
  ["frontend/src/components/News.tsx", [["mt-8 grid gap-6 md:grid-cols-3", "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"]]],
  ["frontend/src/components/Newsletter.tsx", [["p-8 md:grid-cols-2 md:p-12", "p-8 md:p-12 lg:grid-cols-2"]]],
  ["frontend/src/components/Footer.tsx", [["md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-12", "sm:grid-cols-2 md:px-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]"]]],
];
for (const [file, pairs] of edits) {
  if (!fs.existsSync(file)) { console.log("SKIP " + file + " not found - run from the project root"); continue; }
  let s = fs.readFileSync(file, "utf8"), done = 0, already = 0, missing = 0;
  for (const [from, to] of pairs) {
    if (s.includes(from)) { s = s.replace(from, to); done++; } else if (s.includes(to)) already++; else missing++;
  }
  fs.writeFileSync(file, s);
  console.log(`${missing ? "WARN" : "OK  "} ${file.split("/").pop()}: ${done} changed, ${already} already done, ${missing} not found`);
}

// Footer: "Install app" link next to "Cookie settings" (hidden inside the installed app itself)
const ff = "frontend/src/components/Footer.tsx";
if (fs.existsSync(ff)) {
  let s = fs.readFileSync(ff, "utf8");
  const btn = '<button type="button" onClick={() => window.dispatchEvent(new Event("open-install"))} className="hover:text-flag [@media(display-mode:standalone)]:hidden">{lang === "fa" ? "نصب اپلیکیشن" : "Install app"}</button>';
  const cookieEnd = '{lang === "fa" ? "تنظیمات کوکی" : "Cookie settings"}</button>';
  const rights = '<p className="font-mono">{t.rights}</p>';
  if (s.includes("open-install")) console.log("OK   Footer.tsx already has the install link");
  else if (s.includes(cookieEnd)) { s = s.replace(cookieEnd, cookieEnd + btn); fs.writeFileSync(ff, s); console.log("OK   Footer.tsx: install link added"); }
  else if (s.includes(rights)) { s = s.replace(rights, rights + btn); fs.writeFileSync(ff, s); console.log("OK   Footer.tsx: install link added (cookie link not found, run apply-update17 too)"); }
  else console.log("WARN Footer.tsx: place for the install link not found");
}
