"use client";
import { useState } from "react";
import { usePrefs } from "@/components/Prefs";
export default function Sell() {
  const { t, nf } = usePrefs();
  const [step, setStep] = useState(0); const [d, setD] = useState<Record<string, string>>({}); const [msg, setMsg] = useState("");
  const steps = [t.s1, t.s2, t.s3];
  const f = (k: string, label: string, type = "text") => (<label className="block"><span className="text-xs tracking-widest text-bone/60">{label}</span><input type={type} value={d[k] ?? ""} onChange={e => setD({ ...d, [k]: e.target.value })} className="mt-1 w-full rounded-md border border-bone/20 bg-transparent p-3" /></label>);
  async function submit() {
    const r = await fetch("/api/sell-submissions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) });
    setMsg(r.ok ? t.okMsg : t.failMsg);
  }
  return (
    <div className="mx-auto max-w-xl px-6 py-12"><h1 className="font-heading text-4xl font-bold">{t.sellTitle}</h1>
      <p className="mt-2 font-mono text-sm text-bone/60">{t.step} {nf(step + 1)} / {nf(3)} — {steps[step]}</p>
      <div className="mt-6 space-y-4">
        {step === 0 && <>{f("make", t.fMake)}{f("model", t.fModel)}{f("year", t.fYear, "number")}{f("mileage", t.fMileage, "number")}</>}
        {step === 1 && <><p className="text-sm text-bone/60">{t.upNote}</p>{f("desiredPrice", t.fPrice, "number")}</>}
        {step === 2 && <>{f("contactName", t.fName)}{f("contactPhone", t.fPhone, "tel")}</>}
      </div>
      <div className="mt-8 flex gap-3">
        {step > 0 && <button onClick={() => setStep(step - 1)} className="rounded-full border border-bone/20 px-6 py-3 text-sm font-bold">{t.back}</button>}
        {step < 2 ? <button onClick={() => setStep(step + 1)} className="rounded-full bg-bone px-6 py-3 text-sm font-bold text-ink">{t.next}</button> : <button onClick={submit} className="rounded-full bg-flag px-6 py-3 text-sm font-bold text-white">{t.submit}</button>}
      </div>
      {msg && <p role="status" className="mt-6">{msg}</p>}
    </div>
  );
}
