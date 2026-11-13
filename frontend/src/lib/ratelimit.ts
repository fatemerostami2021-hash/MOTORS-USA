// Best-effort per-IP limiter (in-memory; on serverless each instance has its own counter). Helmet/rate-limit on the backend is the strict layer.
const hits = new Map<string, { n: number; t: number }>();
export function limited(req: Request, max = 8, windowMs = 60_000) {
  const ip = (req.headers.get("x-forwarded-for") ?? "local").split(",")[0].trim(), now = Date.now(), h = hits.get(ip);
  if (hits.size > 5000) hits.clear();
  if (!h || now - h.t > windowMs) { hits.set(ip, { n: 1, t: now }); return false; }
  return ++h.n > max;
}
