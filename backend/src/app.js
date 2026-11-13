import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { query } from "./db.js";
const lead = z.object({ email: z.string().email(), type: z.string().max(50).default("newsletter") });
const sell = z.object({ make: z.string().min(1).max(80), model: z.string().min(1).max(80), year: z.coerce.number().int().min(1900).max(2100), mileage: z.coerce.number().min(0), desiredPrice: z.coerce.number().optional(), contactName: z.string().min(2).max(120), contactPhone: z.string().min(5).max(40) });
const inq = z.object({ name: z.string().trim().min(2).max(120), email: z.string().trim().email().max(160), phone: z.string().trim().max(40).optional(), message: z.string().trim().min(5).max(2000) });
const evt = z.object({ type: z.enum(["page_view","call","whatsapp","inquiry","compare"]), path: z.string().max(200).optional(), vehicleSlug: z.string().max(120).optional() });
export function createApp() {
  const app = express(); const front = process.env.FRONTEND_URL || "http://localhost:3100";
  app.disable("x-powered-by"); app.use(helmet());
  app.use(cors({ origin: [front, "http://localhost:3100", "http://127.0.0.1:3100"] }));
  app.use(express.json({ limit: "100kb", type: ["application/json", "text/plain"] })); app.use(express.urlencoded({ extended: false, limit: "100kb" }));
  app.use("/api", rateLimit({ windowMs: 15 * 60 * 1000, limit: 100, standardHeaders: true, legacyHeaders: false }));
  app.get("/api/health", (_q, r) => r.json({ ok: true }));
  app.post("/api/leads", async (req, res, next) => { try {
    const p = lead.safeParse(req.body); if (!p.success) return res.status(400).json({ error: "Invalid data" });
    await query("INSERT INTO leads (type, email) VALUES ($1, lower($2))", [p.data.type, p.data.email]);
    return req.is("json") ? res.json({ ok: true }) : res.redirect(303, `${front}/?subscribed=1`);
  } catch (e) { next(e); } });
  app.post("/api/sell-submissions", async (req, res, next) => { try {
    const p = sell.safeParse(req.body); if (!p.success) return res.status(400).json({ error: "Invalid data" });
    const d = p.data;
    await query("INSERT INTO sell_submissions (make, model, year, mileage, desired_price, contact_name, contact_phone) VALUES ($1,$2,$3,$4,$5,$6,$7)", [d.make, d.model, d.year, d.mileage, d.desiredPrice ?? null, d.contactName, d.contactPhone]);
    res.json({ ok: true });
  } catch (e) { next(e); } });
  app.post("/api/inquiries", async (req, res, next) => { try {
    const p = inq.safeParse(req.body); if (!p.success) return res.status(400).json({ error: "Invalid data" });
    await query("INSERT INTO inquiries (name, email, phone, message) VALUES ($1, lower($2), $3, $4)", [p.data.name, p.data.email, p.data.phone ?? null, p.data.message]);
    res.json({ ok: true });
  } catch (e) { next(e); } });
  app.post("/api/events", async (req, res, next) => { try {
    const p = evt.safeParse(req.body); if (!p.success) return res.status(400).json({ error: "Invalid data" });
    await query("INSERT INTO events (type, path, vehicle_slug) VALUES ($1,$2,$3)", [p.data.type, p.data.path ?? null, p.data.vehicleSlug ?? null]);
    res.status(204).end();
  } catch (e) { next(e); } });
  app.get("/api/vehicles", async (_q, res, next) => { try {
    const r = await query("SELECT * FROM vehicles WHERE status IN ('available','sold') ORDER BY created_at DESC");
    res.json(r ? r.rows : []);
  } catch (e) { next(e); } });
  app.use((_q, r) => r.status(404).json({ error: "Not found" }));
  app.use((err, _q, r, _n) => { console.error(err); r.status(500).json({ error: "Server error" }); });
  return app;
}
