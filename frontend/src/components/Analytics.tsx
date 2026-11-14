"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
// Sends lightweight events to the backend (events table) for Power BI. No personal data.
// Nothing is sent until the visitor allows analytics in the cookie banner.
const allowed = () => { try { return JSON.parse(localStorage.getItem("mu-consent") || "null")?.analytics === true; } catch { return false; } };
const slugOf = (p: string) => (p.startsWith("/inventory/") ? p.split("/")[2] : undefined);
const send = (type: string, path: string, vehicleSlug?: string) => { if (!allowed()) return; try { navigator.sendBeacon("/api/events", JSON.stringify({ type, path, vehicleSlug })); } catch {} };
export default function Analytics() {
  const path = usePathname();
  useEffect(() => { send("page_view", path, slugOf(path)); }, [path]);
  useEffect(() => {
    const onConsent = () => send("page_view", location.pathname, slugOf(location.pathname));
    window.addEventListener("consent-change", onConsent);
    const h = (e: MouseEvent) => { const el = (e.target as HTMLElement).closest("[data-track]") as HTMLElement | null; if (el) send(el.dataset.track!, location.pathname, el.dataset.slug); };
    document.addEventListener("click", h);
    return () => { window.removeEventListener("consent-change", onConsent); document.removeEventListener("click", h); };
  }, []);
  return null;
}
