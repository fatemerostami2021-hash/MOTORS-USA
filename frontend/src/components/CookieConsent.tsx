"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePrefs } from "./Prefs";

const KEY = "mu-consent";
const TX = {
  en: {
    title: "Cookie policy",
    text: "We use cookies and similar technologies to keep the site working, remember your language and theme and, only with your permission, understand how the site is used so we can improve it. You can accept all, reject non-essential cookies or choose in settings. You can change your choice at any time.",
    more: "Read our privacy policy",
    acceptAll: "Accept all cookies", settings: "Cookie settings", reject: "Reject non-essential",
    sTitle: "Cookie settings",
    necessary: "Strictly necessary", necessaryText: "Keeps the site working and remembers your language and theme.", always: "Always on",
    analytics: "Analytics", analyticsText: "Anonymous page views and button clicks, such as inquiries and calls, so we can see which cars interest visitors. No personal data.",
    save: "Save my choices", back: "Back",
  },
  fa: {
    title: "سیاست کوکی",
    text: "ما از کوکی‌ها و فناوری‌های مشابه برای عملکرد درست سایت، به‌خاطر سپردن زبان و تم شما و، فقط با اجازه‌ی شما، فهمیدن نحوه‌ی استفاده از سایت برای بهبود آن استفاده می‌کنیم. می‌توانید همه را بپذیرید، کوکی‌های غیرضروری را رد کنید یا در تنظیمات انتخاب کنید. هر زمان می‌توانید انتخاب خود را تغییر دهید.",
    more: "مطالعه‌ی سیاست حریم خصوصی",
    acceptAll: "پذیرفتن همه‌ی کوکی‌ها", settings: "تنظیمات کوکی", reject: "رد کوکی‌های غیرضروری",
    sTitle: "تنظیمات کوکی",
    necessary: "کاملاً ضروری", necessaryText: "برای کار کردن سایت و به‌خاطر سپردن زبان و تم شما لازم است.", always: "همیشه فعال",
    analytics: "آمار و تحلیل", analyticsText: "بازدید صفحه‌ها و کلیک روی دکمه‌ها، مثل درخواست اطلاعات و تماس، به‌صورت ناشناس تا بفهمیم بازدیدکنندگان به کدام خودروها علاقه دارند. بدون اطلاعات شخصی.",
    save: "ذخیره‌ی انتخاب‌ها", back: "بازگشت",
  },
};
const read = (): { analytics: boolean } | null => { try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch { return null; } };

export default function CookieConsent() {
  const { lang } = usePrefs(); const x = TX[lang];
  const [view, setView] = useState<null | "banner" | "settings">(null);
  const [analytics, setAnalytics] = useState(false);
  useEffect(() => {
    const c = read();
    if (!c) setView("banner"); else setAnalytics(!!c.analytics);
    const open = () => { setAnalytics(!!read()?.analytics); setView("settings"); };
    window.addEventListener("open-cookie-settings", open);
    return () => window.removeEventListener("open-cookie-settings", open);
  }, []);
  const decide = (a: boolean) => {
    try { localStorage.setItem(KEY, JSON.stringify({ analytics: a, ts: Date.now() })); } catch {}
    setAnalytics(a); setView(null); window.dispatchEvent(new Event("consent-change"));
  };
  if (!view) return null;
  const primary = "w-full rounded-full bg-flag px-6 py-3 text-sm font-bold tracking-wide text-white transition hover:brightness-110";
  const secondary = "w-full rounded-full border border-bone/30 px-6 py-3 text-sm font-bold tracking-wide transition hover:border-flag";
  const Row = ({ title, text, children }: { title: string; text: string; children: React.ReactNode }) => (
    <div className="flex items-start justify-between gap-4 border-t border-bone/10 py-4">
      <div><p className="font-semibold">{title}</p><p className="mt-1 text-sm text-bone/70">{text}</p></div>
      <div className="shrink-0 pt-0.5">{children}</div>
    </div>
  );
  return (
    <>
      {view === "settings" && <div className="fixed inset-0 z-[105] bg-black/60" onClick={() => setView(read() ? null : "banner")} aria-hidden="true" />}
      <div role="dialog" aria-modal={view === "settings"} aria-label={x.title} className="fixed inset-x-0 bottom-0 z-[110] mx-auto max-h-[88dvh] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-t-2xl border border-bone/15 bg-coal p-5 text-bone shadow-2xl sm:bottom-4 sm:rounded-2xl sm:p-6">
        {view === "banner" ? (
          <>
            <h2 className="font-heading text-sm font-bold uppercase tracking-[0.2em]">{x.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-bone/80">{x.text} <Link href="/privacy" className="underline hover:text-flag">{x.more}</Link></p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => decide(true)} className={primary}>{x.acceptAll}</button>
              <button onClick={() => setView("settings")} className={secondary}>{x.settings}</button>
            </div>
            <button onClick={() => decide(false)} className="mt-3 w-full text-center text-sm text-bone/60 underline hover:text-flag">{x.reject}</button>
          </>
        ) : (
          <>
            <h2 className="font-heading text-sm font-bold uppercase tracking-[0.2em]">{x.sTitle}</h2>
            <div className="mt-3">
              <Row title={x.necessary} text={x.necessaryText}>
                <span className="flex items-center gap-2 text-xs text-bone/60">{x.always}<span aria-hidden="true" className="relative h-6 w-11 rounded-full bg-bone/40"><span className="absolute start-[1.375rem] top-0.5 h-5 w-5 rounded-full bg-white" /></span></span>
              </Row>
              <Row title={x.analytics} text={x.analyticsText}>
                <button type="button" role="switch" aria-checked={analytics} aria-label={x.analytics} onClick={() => setAnalytics(!analytics)} className={`relative h-6 w-11 rounded-full transition ${analytics ? "bg-flag" : "bg-bone/25"}`}><span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${analytics ? "start-[1.375rem]" : "start-0.5"}`} /></button>
              </Row>
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => decide(analytics)} className={primary}>{x.save}</button>
              <button onClick={() => decide(true)} className={secondary}>{x.acceptAll}</button>
            </div>
            {!read() && <button onClick={() => setView("banner")} className="mt-3 w-full text-center text-sm text-bone/60 underline hover:text-flag">{x.back}</button>}
          </>
        )}
      </div>
    </>
  );
}
