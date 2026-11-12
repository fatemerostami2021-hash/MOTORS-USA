"use client";
import Link from "next/link";
import { usePrefs } from "./Prefs";
export default function ErrorView({ kind, reset }: { kind: "error" | "notfound"; reset?: () => void }) {
  const { t } = usePrefs();
  return (
    <div className="mx-auto max-w-xl px-6 py-28 text-center">
      <h1 className="font-heading text-4xl font-bold">{kind === "error" ? t.errTitle : t.nfTitle}</h1>
      <p className="mt-4 text-bone/70">{kind === "error" ? t.errText : t.nfText}</p>
      <div className="mt-8 flex justify-center gap-3">{reset && <button onClick={reset} className="rounded-full bg-flag px-6 py-3 text-sm font-bold text-white">{t.retry}</button>}<Link href="/" className="rounded-full border border-bone/30 px-6 py-3 text-sm font-bold">{t.goHome}</Link></div>
    </div>
  );
}
