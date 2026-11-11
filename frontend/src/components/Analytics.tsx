"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
// Sends lightweight events to the backend (events table) for Power BI. No personal data.
const send = (type: string, path: string, vehicleSlug?: string) => { try { navigator.sendBeacon("/api/events", JSON.stringify({ type, path, vehicleSlug })); } catch {} };
export default function Analytics() {
  const path = usePathname();
  useEffect(() => { send("page_view", path, path.startsWith("/inventory/") ? path.split("/")[2] : undefined); }, [path]);
  useEffect(() => {
    const h = (e: MouseEvent) => { const el = (e.target as HTMLElement).closest("[data-track]") as HTMLElement | null; if (el) send(el.dataset.track!, location.pathname, el.dataset.slug); };
    document.addEventListener("click", h); return () => document.removeEventListener("click", h);
  }, []);
  return null;
}
