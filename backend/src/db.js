import pg from "pg";
export const pool = process.env.DATABASE_URL ? new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.PGSSL === "false" || process.env.DATABASE_URL.includes("localhost") ? false : { rejectUnauthorized: false } }) : null;
export async function query(text, params) {
  if (!pool) { console.log("[dev, no DATABASE_URL]", text.split("\n")[0], params); return null; }
  return pool.query(text, params);
}
