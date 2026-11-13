import { z } from "zod";
import { forward } from "@/lib/forward";
import { limited } from "@/lib/ratelimit";
const schema = z.object({ make: z.string().min(1).max(80), model: z.string().min(1).max(80), year: z.coerce.number().int().min(1900).max(2100), mileage: z.coerce.number().min(0), desiredPrice: z.coerce.number().optional(), contactName: z.string().min(2).max(120), contactPhone: z.string().min(5).max(40) });
export async function POST(req: Request) {
  if (limited(req)) return Response.json({ error: "Too many requests" }, { status: 429 });
  const p = schema.safeParse(await req.json().catch(() => null)); if (!p.success) return Response.json({ error: "Invalid data" }, { status: 400 });
  await forward("/api/sell-submissions", p.data); return Response.json({ ok: true });
}
