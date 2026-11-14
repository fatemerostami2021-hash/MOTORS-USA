// Edit contact details and links here (footer, contact page, floating buttons, chat assistant).
export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://motors-usa.vercel.app",
  name: "Motors USA",
  newsletterImage: "/cars/hero-poster.webp",
  teamImage: "/about/team.webp",
  // Demo showroom hours: replace with the real ones.
  hours: { en: [["Mon – Thu", "10:00 – 21:00"], ["Friday", "14:00 – 21:00"], ["Saturday", "10:00 – 21:00"], ["Sunday", "Closed"]], fa: [["دوشنبه تا پنجشنبه", "۱۰:۰۰ – ۲۱:۰۰"], ["جمعه", "۱۴:۰۰ – ۲۱:۰۰"], ["شنبه", "۱۰:۰۰ – ۲۱:۰۰"], ["یکشنبه", "تعطیل"]] } as { en: string[][]; fa: string[][] },
  // Demo numbers: replace with real, provable figures before launch.
  facts: [{ n: "+250", en: "Cars sold", fa: "خودروی فروخته‌شده" }, { n: "14", en: "Cars in stock", fa: "خودرو در نمایشگاه" }, { n: "11", en: "World-class brands", fa: "برند معتبر" }, { n: "2026", en: "Established", fa: "سال تأسیس" }],
  phone: "09177892994", phoneIntl: "+989177892994",
  email: "fatimarostami963369@gmail.com",
  address: { en: "Shiraz, Zargari Street", fa: "شیراز، خیابان زرگری" },
  credit: { name: { en: "Fatemeh Rostami", fa: "فاطمه رستمی" }, role: { en: "Web Developer", fa: "وب دیولوپر" }, url: "https://luxrious-watches-orcin.vercel.app/portfolio" },
  // Hero text (over the video). Set the exact car shown in public/hero.mp4. Leave model empty to show a collection title.
  hero: { brand: "Ferrari", model: "SF90 Stradale", year: 0, href: "/inventory/ferrari-sf90-stradale-2022" },
  // Replace "#" / generic links with your real accounts.
  socials: { whatsapp: "https://wa.me/989177892994", telegram: "https://t.me/", instagram: "https://www.instagram.com/f.rostamii_web", youtube: "#", tiktok: "#", facebook: "#", x: "#" } as Record<string, string>,
};
