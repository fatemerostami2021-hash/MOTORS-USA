"use client";
import { useState } from "react";
const steps = ["Vehicle details", "Documents & photos", "Contact"];
export default function Sell() {
  const [step, setStep] = useState(0); const [d, setD] = useState<Record<string, string>>({}); const [msg, setMsg] = useState("");
  const f = (k: string, label: string, type = "text") => (<label className="block"><span className="font-mono text-[10px] tracking-widest text-bone/60">{label.toUpperCase()}</span><input type={type} value={d[k] ?? ""} onChange={e => setD({ ...d, [k]: e.target.value })} className="mt-1 w-full rounded-md border border-white/20 bg-transparent p-3" /></label>);
  async function submit() {
    const r = await fetch("/api/sell-submissions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) });
    setMsg(r.ok ? "Thank you — we will contact you shortly." : "Please check the form and try again.");
  }
  return (
    <div className="mx-auto max-w-xl px-6 py-12"><h1 className="font-display text-3xl">SELL MY CAR</h1>
      <p className="mt-2 font-mono text-xs text-bone/60">STEP {step + 1} / 3 — {steps[step]}</p>
      <div className="mt-6 space-y-4">
        {step === 0 && <>{f("make", "Make")}{f("model", "Model")}{f("year", "Year", "number")}{f("mileage", "Mileage", "number")}</>}
        {step === 1 && <><p className="text-sm text-bone/60">Photo/document upload connects to S3/R2 via presigned URLs (see README).</p>{f("desiredPrice", "Desired price (USD)", "number")}</>}
        {step === 2 && <>{f("contactName", "Full name")}{f("contactPhone", "Phone", "tel")}</>}
      </div>
      <div className="mt-8 flex gap-3">
        {step > 0 && <button onClick={() => setStep(step - 1)} className="rounded-full border border-white/20 px-6 py-3 font-mono text-[11px]">BACK</button>}
        {step < 2 ? <button onClick={() => setStep(step + 1)} className="rounded-full bg-bone px-6 py-3 font-mono text-[11px] text-ink">NEXT</button> : <button onClick={submit} className="rounded-full bg-flag px-6 py-3 font-mono text-[11px]">SUBMIT</button>}
      </div>
      {msg && <p role="status" className="mt-6">{msg}</p>}
    </div>
  );
}
