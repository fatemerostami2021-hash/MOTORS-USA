import type { Metadata } from "next";
export const metadata: Metadata = { title: "Offline", robots: { index: false, follow: false } };
export default function Offline() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <h1 className="font-heading text-3xl font-bold md:text-5xl">You are offline</h1>
      <p className="mt-4 text-bone/70">Check your internet connection and try again. Pages you have already opened may still work.</p>
      <h2 className="mt-10 font-heading text-2xl font-bold">شما آفلاین هستید</h2>
      <p className="mt-3 text-bone/70" dir="rtl">اتصال اینترنت خود را بررسی کنید و دوباره تلاش کنید. صفحه‌هایی که قبلاً باز کرده‌اید ممکن است همچنان کار کنند.</p>
    </div>
  );
}
