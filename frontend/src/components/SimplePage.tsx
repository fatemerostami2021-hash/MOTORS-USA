"use client";
import { usePrefs } from "./Prefs";
export default function SimplePage({ kind }: { kind: "privacy" | "terms" }) {
  const { t } = usePrefs();
  const title = kind === "privacy" ? t.privacyTitle : t.termsTitle, paras = kind === "privacy" ? t.privacyParas : t.termsParas;
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-14 md:px-6"><h1 className="font-heading text-4xl font-bold md:text-6xl">{title}</h1>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-bone/80">{paras.map((p, i) => <p key={i}>{p}</p>)}</div></div>
  );
}
