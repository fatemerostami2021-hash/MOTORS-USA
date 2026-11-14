// Run from the project root (E:\MOTORS-USA):
//   node apply-update17.mjs                 -> adds the "Cookie settings" link to the footer
//   node apply-update17.mjs YOUR_USERNAME   -> also sets your Telegram link to https://t.me/YOUR_USERNAME
import fs from "node:fs";

const footer = "frontend/src/components/Footer.tsx";
if (fs.existsSync(footer)) {
  let s = fs.readFileSync(footer, "utf8");
  const anchor = '<p className="font-mono">{t.rights}</p>';
  if (s.includes("open-cookie-settings")) console.log("OK  Footer.tsx already has the cookie link");
  else if (s.includes(anchor)) {
    s = s.replace(anchor, anchor + '<button type="button" onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))} className="hover:text-flag">{lang === "fa" ? "تنظیمات کوکی" : "Cookie settings"}</button>');
    fs.writeFileSync(footer, s);
    console.log("OK  Footer.tsx: cookie settings link added");
  } else console.log("SKIP Footer.tsx: pattern not found - send me this file");
} else console.log("SKIP Footer.tsx not found - run from the project root");

const user = (process.argv[2] || "").replace(/^@/, "").trim();
if (user) {
  const f = "frontend/src/data/site.ts";
  if (fs.existsSync(f)) {
    const src = fs.readFileSync(f, "utf8");
    const re = /(telegram\s*:\s*)(["'`])[^"'`]*\2/;
    if (re.test(src)) { fs.writeFileSync(f, src.replace(re, `$1"https://t.me/${user}"`)); console.log(`OK  site.ts: Telegram -> https://t.me/${user}`); }
    else console.log("SKIP site.ts: telegram key not found");
  }
}
