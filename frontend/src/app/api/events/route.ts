import { z } from "zod";
import { forward } from "@/lib/forward";
const schema = z.object({ type: z.enum(["page_view", "call", "whatsapp", "inquiry", "compare"]), path: z.string().max(200).optional(), vehicleSlug: z.string().max(120).optional() });
export async function POST(req: Request) {
  const p = schema.safeParse(JSON.parse((await req.text()) || "null")); if (!p.success) return new Response(null, { status: 400 });
  await forward("/api/events", p.data); return new Response(null, { status: 204 });
}
