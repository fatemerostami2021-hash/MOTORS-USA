import { z } from "zod";
const schema = z.object({ email: z.string().email(), type: z.string().default("newsletter") });
export async function POST(req: Request) {
  const ct = req.headers.get("content-type") ?? "";
  const raw = ct.includes("json") ? await req.json().catch(() => null) : Object.fromEntries(await req.formData());
  const p = schema.safeParse(raw);
  if (!p.success) return Response.json({ error: "Invalid data" }, { status: 400 });
  // TODO: save Lead with Prisma
  console.log("lead", p.data);
  return ct.includes("json") ? Response.json({ ok: true }) : Response.redirect(new URL("/", req.url), 303);
}
