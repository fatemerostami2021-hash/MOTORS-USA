import { z } from "zod";
import { forward } from "@/lib/forward";
import { limited } from "@/lib/ratelimit";
const schema = z.object({ name: z.string().trim().min(2).max(120), email: z.string().trim().email().max(160), phone: z.string().trim().max(40).optional(), message: z.string().trim().min(5).max(2000), company: z.string().max(0).optional() }); // "company" = honeypot, must stay empty
export async function POST(req: Request) {
  if (limited(req, 5)) return Response.json({ error: "Too many requests" }, { status: 429 });
  const p = schema.safeParse(await req.json().catch(() => null)); if (!p.success) return Response.json({ error: "Invalid data" }, { status: 400 });
  const { company: _c, ...d } = p.data; await forward("/api/inquiries", d); return Response.json({ ok: true });
}
