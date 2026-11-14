"use client";
import { useEffect, useRef, useState } from "react";
import { usePrefs } from "./Prefs";

type BIP = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };
const DISMISS = "mu-install-dismissed";
const CONSENT = "mu-consent";
const DAYS = 14 * 864e5;

export default function InstallPrompt() {
  const { lang } = usePrefs(); const fa = lang === "fa";
  const evtRef = useRef<BIP | null>(null);
  const [evt, setEvt] = useState<BIP | null>(null);
  const [ios, setIos] = useState(false);
  const [ready, setReady] = useState(false);
  const [show, setShow] = useState(false);
  const [standalone, setStandalone] = useState(false);

  useEffect(() => {
    const sa = matchMedia("(display-mode: standalone)").matches || (navigator as unknown as { standalone?: boolean }).standalone === true;
    if (sa) { setStandalone(true); return; }
    const ua = navigator.userAgent;
    const ipadOS = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1; // iPads report themselves as a Mac
    if ((/iphone|ipad|ipod/i.test(ua) || ipadOS) && /safari/i.test(ua) && !/crios|fxios|edgios/i.test(ua)) setIos(true);
    const onPrompt = (e: Event) => { e.preventDefault(); evtRef.current = e as BIP; setEvt(e as BIP); };
    const onInstalled = () => { evtRef.current = null; setEvt(null); setShow(false); };
    const check = () => { try { if (localStorage.getItem(CONSENT)) setReady(true); } catch {} };
    const onOpen = async () => {
      const e = evtRef.current;
      if (!e) { setShow(true); return; }
      await e.prompt(); await e.userChoice.catch(() => null); evtRef.current = null; setEvt(null); setShow(false);
    };
    check();
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    window.addEventListener("consent-change", check);
    window.addEventListener("open-install", onOpen);
    return () => { window.removeEventListener("beforeinstallprompt", onPrompt); window.removeEventListener("appinstalled", onInstalled); window.removeEventListener("consent-change", check); window.removeEventListener("open-install", onOpen); };
  }, []);

  // Automatic hint: only after the cookie choice is made, a few seconds later, and not if it was dismissed recently.
  useEffect(() => {
    if (standalone || !ready || (!evt && !ios)) return;
    let dismissed = 0; try { dismissed = Number(localStorage.getItem(DISMISS) || 0); } catch {}
    if (Date.now() - dismissed < DAYS) return;
    const id = setTimeout(() => setShow(true), 6000);
    return () => clearTimeout(id);
  }, [ready, evt, ios, standalone]);

  const dismiss = () => { setShow(false); try { localStorage.setItem(DISMISS, String(Date.now())); } catch {} };
  const install = async () => { const e = evtRef.current; if (!e) return; await e.prompt(); await e.userChoice.catch(() => null); evtRef.current = null; setEvt(null); setShow(false); };
  if (!show) return null;
  const text = evt
    ? (fa ? "Motors USA را به‌عنوان اپلیکیشن روی دستگاه خود نصب کنید." : "Install Motors USA as an app on your device.")
    : ios
      ? (fa ? "برای نصب: دکمه‌ی اشتراک‌گذاری را بزنید و «افزودن به صفحه‌ی اصلی» را انتخاب کنید." : "To install: tap the Share button, then “Add to Home Screen”.")
      : (fa ? "برای نصب، منوی مرورگر را باز کنید و «نصب اپلیکیشن» یا «افزودن به صفحه‌ی اصلی» را انتخاب کنید." : "To install, open your browser menu and choose “Install app” or “Add to Home screen”.");
  return (
    <div role="dialog" aria-label={fa ? "نصب اپلیکیشن" : "Install app"} className="fixed bottom-3 start-3 z-[70] max-w-[calc(100vw-5.5rem)] rounded-2xl border border-bone/15 bg-coal/95 p-3 text-sm text-bone shadow-xl backdrop-blur sm:bottom-5 sm:start-5 sm:max-w-xs">
      <div className="flex items-start gap-3">
        <p className="flex-1 leading-snug">{text}</p>
        <button onClick={dismiss} aria-label={fa ? "بستن" : "Close"} className="px-1 text-lg leading-none text-bone/60 hover:text-flag">×</button>
      </div>
      {evt && <button onClick={install} className="mt-3 w-full rounded-full bg-flag px-4 py-2 text-xs font-bold tracking-wide text-white">{fa ? "نصب اپلیکیشن" : "Install app"}</button>}
    </div>
  );
}
