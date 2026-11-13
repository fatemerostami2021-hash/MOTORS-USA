// Fixes the Instagram address in frontend/src/data/site.ts (used by the footer).
import fs from "node:fs";
const f = "frontend/src/data/site.ts";
const NEW = "https://www.instagram.com/f.rostamii_web";
if (!fs.existsSync(f)) { console.log("site.ts not found - run this from the project root (E:\\MOTORS-USA)"); process.exit(0); }
const src = fs.readFileSync(f, "utf8");
const re = /(instagram\s*:\s*)(["'`])[^"'`]*\2/;
if (!re.test(src)) { console.log("instagram key not found in site.ts - send me this file and I will fix it"); process.exit(0); }
fs.writeFileSync(f, src.replace(re, `$1"${NEW}"`));
console.log("OK: Instagram link updated in site.ts");
