import { z } from "zod";
const schema = z.object({ make: z.string().min(1), model: z.string().min(1), year: z.coerce.number().int().min(1900).max(2100), mileage: z.coerce.number().min(0), desiredPrice: z.coerce.number().optional(), contactName: z.string().min(2), contactPhone: z.string().min(5) });
export async function POST(req: Request) {
  const p = schema.safeParse(await req.json().catch(() => null));
  if (!p.success) return Response.json({ error: "Invalid data" }, { status: 400 });
  // TODO: save with Prisma (SellSubmission) + notify by email/WhatsApp (server-side only)
  console.log("sell-submission", p.data);
  return Response.json({ ok: true });
}
