import "dotenv/config";
import fs from "node:fs";
import { pool } from "./db.js";
if (!pool) { console.error("DATABASE_URL is empty in backend/.env (restart after editing it)"); process.exit(1); }
const files = process.argv[2] === "seed" ? ["seed.sql"] : ["schema.sql", "views.sql"];
for (const f of files) { await pool.query(fs.readFileSync(new URL(`../db/${f}`, import.meta.url), "utf8")); console.log("ran", f); }
await pool.end();
