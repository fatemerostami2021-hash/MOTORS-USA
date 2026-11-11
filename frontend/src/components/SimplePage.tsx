"use client";
import { usePrefs, Dict } from "./Prefs";
import { site } from "@/data/site";
export default function SimplePage({ kind }: { kind: "about" | "contact" | "privacy" | "terms" }) {
  const { t, lang } = usePrefs();
  const title: Record<string, keyof Dict> = { about: "aboutTitle", contact: "contactTitle", privacy: "privacyTitle", terms: "termsTitle" };
  const body: Record<string, keyof Dict> = { about: "aboutText", privacy: "privacyText", terms: "termsText", contact: "contactTitle" };
  return (
    <div className="mx-auto max-w-3xl px-6 py-14"><h1 className="font-heading text-4xl font-bold md:text-6xl">{t[title[kind]] as string}</h1>
      {kind === "contact" ? <div className="mt-6 space-y-2 text-lg text-bone/80"><p>{t.phone}: <span dir="ltr">{site.phone}</span></p><p>{t.emailL}: {site.email}</p><p>{site.address[lang]}</p></div> : <p className="mt-6 text-lg text-bone/80">{t[body[kind]] as string}</p>}
    </div>
  );
}
