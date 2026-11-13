// Converts every JPG/PNG in public/cars to WebP (max width 1600, quality 80), normalises all file names
// (lowercase, hyphens, no spaces) and moves the originals to frontend/images-source/ (not served).
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "public", "cars"), keep = path.join(root, "images-source");
const fix = { "available-carsi": "available-cars", "wh-the-v12-still-matters": "why-the-v12-still-matters" };
fs.mkdirSync(keep, { recursive: true });
const norm = f => { const n = f.replace(/\.[^.]+$/, "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); return fix[n] ?? n; };
let n = 0;
for (const f of fs.readdirSync(dir)) {
  const from = path.join(dir, f), name = norm(f);
  if (/\.(jpe?g|png)$/i.test(f)) {
    await sharp(from).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(dir, name + ".webp"));
    fs.renameSync(from, path.join(keep, f)); n++; console.log("converted", f, "->", name + ".webp");
  } else if (/\.webp$/i.test(f) && f !== name + ".webp") {
    const tmp = path.join(dir, "__tmp_" + name + ".webp"); fs.renameSync(from, tmp); fs.renameSync(tmp, path.join(dir, name + ".webp")); n++; console.log("renamed  ", f, "->", name + ".webp");
  }
}
console.log(n, "files fixed. Originals (if any) are in frontend/images-source/");
