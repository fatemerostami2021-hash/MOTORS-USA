// Forward a validated payload to the Express/PostgreSQL backend when BACKEND_URL is set.
// Without it (e.g. a frontend-only Vercel deploy) the request is accepted in demo mode.
export async function forward(path: string, body: unknown) {
  const base = process.env.BACKEND_URL; if (!base) return true;
  try { const r = await fetch(base + path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), signal: AbortSignal.timeout(5000) }); return r.ok; } catch { return false; }
}
