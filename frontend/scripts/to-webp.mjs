// Converts every JPG/PNG in public/cars to WebP (max width 1600, quality 80), fixes file names,
// and moves the originals to frontend/images-source/ (not served by the website).
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "public", "cars"), keep = path.join(root, "images-source");
const fix = { "available-carsi": "available-cars" };
fs.mkdirSync(keep, { recursive: true });
let n = 0;
for (const f of fs.readdirSync(dir)) {
  if (!/\.(jpe?g|png)$/i.test(f)) continue;
  let name = f.replace(/\.[^.]+$/, "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  name = fix[name] ?? name;
  const from = path.join(dir, f);
  await sharp(from).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(dir, name + ".webp"));
  fs.renameSync(from, path.join(keep, f)); n++;
  console.log("ok", f, "->", name + ".webp");
}
console.log(n, "images converted. Originals are in frontend/images-source/");
