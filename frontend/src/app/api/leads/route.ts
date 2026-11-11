import { z } from "zod";
import { forward } from "@/lib/forward";
const schema = z.object({ email: z.string().email(), type: z.string().max(50).default("newsletter") });
export async function POST(req: Request) {
  const json = (req.headers.get("content-type") ?? "").includes("json");
  const raw = json ? await req.json().catch(() => null) : Object.fromEntries(await req.formData());
  const p = schema.safeParse(raw); if (!p.success) return Response.json({ error: "Invalid data" }, { status: 400 });
  await forward("/api/leads", p.data);
  return json ? Response.json({ ok: true }) : Response.redirect(new URL("/?subscribed=1", req.url), 303);
}
