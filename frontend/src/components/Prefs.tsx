"use client";
import { createContext, useContext, useEffect, useState } from "react";
export type Lang = "en" | "fa"; export type Theme = "dark" | "light";
type OV = { year: string; make: string; model: string; body: string; engine: string; hp: string; transmission: string; accel: string | null; top: string | null };
const en = {
  menu: "MENU", close: "CLOSE", search: "SEARCH", cars: "Cars", brands: "Brands", compare: "Compare", sell: "Sell", sold: "Sold", contact: "Contact", journal: "Journal", about2: "About us", privacy: "Privacy", terms: "Terms",
  viewMore: "VIEW MORE →", latest: "LATEST NEWS", readArticle: "READ ARTICLE →", viewAll: "VIEW ALL →", newsBadge: "CAR NEWS", errTitle: "Something went wrong", errText: "The page could not be shown. Please try again.", retry: "TRY AGAIN", goHome: "HOME", nfTitle: "Page not found", nfText: "This page does not exist or has moved.", heroCollection: "THE COLLECTION", availSub: (n: number) => `${n} cars ready for delivery`, soldSub: (n: number) => `${n} cars sold, with history`, cmpSub: "Compare up to 4 cars side by side", brandsSub: (n: number) => `${n} world-class brands`, sellSub: "Get your car valued and listed", heroBrand: "PORSCHE", searchPh: "Search any car: Porsche, 918, Ferrari…", noRes: "No cars found",
  about: "CURATED PERFORMANCE CARS", aboutP1: "Motors USA is a curated showroom for supercars, hypercars and collector vehicles. Every car is inspected, documented and presented with honest specs.", aboutP2: "Buy direct, sell your car, or place it on consignment, with a clear, tracked process from first enquiry to handover.",
  sold2: "CARS SOLD", stock: "IN STOCK", est: "ESTABLISHED", finest: "THE WORLD'S FINEST BRANDS", featured: "FEATURED STOCK",
  news: "Stay Ahead of the Curve", newsText: "Stay up to date with the latest trends in luxury automobiles, exclusive brand features and insider news from the world of high-end vehicles.", email: "Enter your email",
  available: "Available Cars", soldCars: "Sold Cars", all: "All", noMatch: "No cars match these filters.", featuredBadge: "Featured", save: "Save", soldBadge: "SOLD", mi: "mi",
  rights: "© 2026 MOTORS USA. ALL RIGHTS RESERVED.", visit: "VISIT", discover: "DISCOVER", company: "COMPANY", footAbout: "Curated inventory of automotive excellence.",
  brandsTitle: "BRANDS", carsCount: "cars", noBrandCars: "No cars from this brand right now.", backBrands: "← Brands", titleAvail: "AVAILABLE CARS", titleSold: "SOLD CARS",
  home: "HOME", collection: "COLLECTION", price: "PRICE", availableTxt: "Available", hp: "HP", acc: "0–100 KM/H", top: "TOP SPEED KM/H", year: "YEAR", inquiry: "INQUIRY", whatsapp: "WHATSAPP", call: "CALL", articleBadge: "ARTICLE", maybe: "MAYBE YOU WILL LIKE IT",
  condHistory: "Condition & history", condText: "Demo text: describe the exact car here: colour and trim, options, service history, ownership, documents, warranty and any modifications.", tech: "Technical details", verify: "Specifications and availability must be verified before purchase.",
  lDisp: "Displacement", lBattery: "Battery capacity", lSeats: "Seats", lDrive: "Drivetrain", lIce: "Petrol engine power", lMotors: "Electric motors", lMileage: "Mileage", lEngine: "Engine", lTrans: "Transmission", lFuel: "Fuel", lBody: "Body",
  overview: (o: OV) => `The ${o.year} ${o.make} ${o.model} is a ${o.body.toLowerCase()} powered by a ${o.engine} producing ${o.hp} hp, paired with a ${o.transmission} transmission${o.accel ? ` and reaching 100 km/h in ${o.accel} seconds` : ""}${o.top ? `, with a top speed of ${o.top} km/h` : ""}.`,
  cmpTitle: "COMPARE", carN: "Car", rPrice: "Price", rYear: "Year", rMileage: "Mileage", rPower: "Power", rEngine: "Engine", rTrans: "Transmission", rFuel: "Fuel", rAcc: "0–100 km/h", rTop: "Top speed",
  sellTitle: "SELL MY CAR", step: "STEP", s1: "Vehicle details", s2: "Documents & photos", s3: "Contact", fMake: "Make", fModel: "Model", fYear: "Year", fMileage: "Mileage", fPrice: "Desired price (USD)", fName: "Full name", fPhone: "Phone",
  upNote: "Photo and document upload will connect to cloud storage in the next version.", next: "NEXT", back: "BACK", submit: "SUBMIT", okMsg: "Thank you, we will contact you shortly.", failMsg: "Please check the form and try again.",
  aboutTitle: "ABOUT", aboutText: "Motors USA is a curated showroom for performance and collector cars. Replace this text with your real story, team and numbers.", contactTitle: "CONTACT", phone: "Phone", emailL: "Email",
  privacyTitle: "PRIVACY", privacyText: "Placeholder privacy policy: replace with a policy reviewed for your market before launch.", termsTitle: "TERMS", termsText: "Placeholder terms of use: replace before launch.", journalTitle: "JOURNAL",
  terms2: {} as Record<string, string>,
};
export type Dict = typeof en;
const fa: Dict = {
  menu: "منو", close: "بستن", search: "جستجو", cars: "خودروها", brands: "برندها", compare: "مقایسه", sell: "فروش", sold: "فروخته‌شده", contact: "تماس", journal: "مجله", about2: "درباره ما", privacy: "حریم خصوصی", terms: "شرایط استفاده",
  viewMore: "مشاهده بیشتر ←", latest: "آخرین اخبار", readArticle: "خواندن مقاله ←", viewAll: "مشاهده همه ←", newsBadge: "اخبار خودرو", errTitle: "مشکلی پیش آمد", errText: "صفحه نمایش داده نشد. لطفاً دوباره تلاش کنید.", retry: "تلاش دوباره", goHome: "خانه", nfTitle: "صفحه پیدا نشد", nfText: "این صفحه وجود ندارد یا جابه‌جا شده است.", heroCollection: "مجموعه خودروها", availSub: (n: number) => `${n} خودروی آماده تحویل`, soldSub: (n: number) => `${n} خودروی فروخته‌شده با سابقه`, cmpSub: "مقایسه تا ۴ خودرو در کنار هم", brandsSub: (n: number) => `${n} برند معتبر جهان`, sellSub: "خودروی خود را ارزیابی و ثبت کنید", heroBrand: "PORSCHE", searchPh: "جستجوی هر خودرو: پورشه، ۹۱۸، فراری…", noRes: "خودرویی پیدا نشد",
  about: "خودروهای منتخب و پرقدرت", aboutP1: "موتورز یو‌اس‌ای یک نمایشگاه منتخب برای سوپراسپورت، هایپرکار و خودروهای کلکسیونی است. هر خودرو بازرسی و مستند می‌شود و با مشخصات واقعی ارائه می‌شود.", aboutP2: "مستقیم بخرید، خودروی خود را بفروشید یا به‌صورت امانی بسپارید؛ با روندی روشن و قابل پیگیری از اولین درخواست تا تحویل.",
  sold2: "خودروی فروخته‌شده", stock: "موجود در نمایشگاه", est: "سال تأسیس", finest: "بهترین برندهای جهان", featured: "خودروهای ویژه",
  news: "همیشه یک قدم جلوتر", newsText: "از آخرین روندهای خودروهای لوکس، ویژگی‌های انحصاری برندها و اخبار دنیای خودروهای گران‌قیمت باخبر بمانید.", email: "ایمیل خود را وارد کنید",
  available: "خودروهای موجود", soldCars: "خودروهای فروخته‌شده", all: "همه", noMatch: "خودرویی با این فیلتر پیدا نشد.", featuredBadge: "ویژه", save: "ذخیره", soldBadge: "فروخته شد", mi: "مایل",
  rights: "© ۲۰۲۶ موتورز یو‌اس‌ای. تمامی حقوق محفوظ است.", visit: "نمایشگاه", discover: "کشف کنید", company: "شرکت", footAbout: "مجموعه‌ای منتخب از برترین خودروها.",
  brandsTitle: "برندها", carsCount: "خودرو", noBrandCars: "فعلاً خودرویی از این برند موجود نیست.", backBrands: "→ برندها", titleAvail: "خودروهای موجود", titleSold: "خودروهای فروخته‌شده",
  home: "خانه", collection: "مجموعه", price: "قیمت", availableTxt: "موجود", hp: "اسب بخار", acc: "۰ تا ۱۰۰ کیلومتر", top: "حداکثر سرعت (کیلومتر بر ساعت)", year: "سال ساخت", inquiry: "درخواست اطلاعات", whatsapp: "واتس‌اپ", call: "تماس", articleBadge: "مقاله", maybe: "شاید خوشتان بیاید",
  condHistory: "وضعیت و سابقه", condText: "متن نمونه: اینجا مشخصات دقیق همین خودرو را بنویسید: رنگ و تریم، آپشن‌ها، سابقه سرویس، مالکیت، مدارک، گارانتی و هرگونه تغییرات.", tech: "مشخصات فنی", verify: "مشخصات و موجودی قبل از خرید باید تأیید شود.",
  lDisp: "حجم موتور", lBattery: "ظرفیت باتری", lSeats: "تعداد سرنشین", lDrive: "سیستم انتقال قدرت", lIce: "قدرت موتور بنزینی", lMotors: "موتورهای الکتریکی", lMileage: "کارکرد", lEngine: "موتور", lTrans: "گیربکس", lFuel: "سوخت", lBody: "نوع بدنه",
  overview: (o: OV) => `${o.make} ${o.model} مدل ${o.year} یک خودروی ${o.body} با موتور ${o.engine} و قدرت ${o.hp} اسب بخار است که با گیربکس ${o.transmission} ارائه می‌شود${o.accel ? `، در ${o.accel} ثانیه به ۱۰۰ کیلومتر بر ساعت می‌رسد` : ""}${o.top ? ` و حداکثر سرعت آن ${o.top} کیلومتر بر ساعت است` : ""}.`,
  cmpTitle: "مقایسه", carN: "خودرو", rPrice: "قیمت", rYear: "سال", rMileage: "کارکرد", rPower: "قدرت", rEngine: "موتور", rTrans: "گیربکس", rFuel: "سوخت", rAcc: "۰ تا ۱۰۰ کیلومتر", rTop: "حداکثر سرعت",
  sellTitle: "فروش خودرو", step: "مرحله", s1: "مشخصات خودرو", s2: "مدارک و عکس‌ها", s3: "اطلاعات تماس", fMake: "برند", fModel: "مدل", fYear: "سال ساخت", fMileage: "کارکرد", fPrice: "قیمت مدنظر (دلار)", fName: "نام و نام خانوادگی", fPhone: "تلفن",
  upNote: "آپلود عکس و مدارک در نسخه بعدی به فضای ابری وصل می‌شود.", next: "بعدی", back: "قبلی", submit: "ثبت", okMsg: "سپاسگزاریم، به‌زودی با شما تماس می‌گیریم.", failMsg: "لطفاً فرم را بررسی کنید و دوباره تلاش کنید.",
  aboutTitle: "درباره ما", aboutText: "موتورز یو‌اس‌ای یک نمایشگاه منتخب برای خودروهای پرقدرت و کلکسیونی است. این متن را با داستان، تیم و اعداد واقعی خود جایگزین کنید.", contactTitle: "تماس با ما", phone: "تلفن", emailL: "ایمیل",
  privacyTitle: "حریم خصوصی", privacyText: "متن نمونه: پیش از راه‌اندازی، آن را با سیاست‌نامه‌ای متناسب با بازار خود جایگزین کنید.", termsTitle: "شرایط استفاده", termsText: "متن نمونه: پیش از راه‌اندازی جایگزین شود.", journalTitle: "مجله",
  terms2: { Coupe: "کوپه", Roadster: "رودستر", SUV: "شاسی‌بلند", Convertible: "کروک", Sedan: "سدان", Gasoline: "بنزین", Hybrid: "هیبریدی", Automatic: "اتوماتیک", Manual: "دستی", Italy: "ایتالیا", Germany: "آلمان", "United Kingdom": "بریتانیا", Sweden: "سوئد", France: "فرانسه", USA: "آمریکا" },
};
const dict = { en, fa };
type C = { lang: Lang; theme: Theme; t: Dict; setLang: (l: Lang) => void; setTheme: (t: Theme) => void; nf: (n: number) => string; money: (n: number) => string; bn: (make: string) => string; tr: (s: string) => string };
const Ctx = createContext<C>(null!);
export const usePrefs = () => useContext(Ctx);
export default function Prefs({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en"); const [theme, setTheme] = useState<Theme>("dark");
  useEffect(() => { const l = localStorage.getItem("lang") as Lang | null, t = localStorage.getItem("theme") as Theme | null; if (l) setLang(l); if (t) setTheme(t); }, []);
  useEffect(() => { const h = document.documentElement; h.lang = lang; h.dir = lang === "fa" ? "rtl" : "ltr"; h.classList.toggle("light", theme === "light"); localStorage.setItem("lang", lang); localStorage.setItem("theme", theme); }, [lang, theme]);
  const loc = lang === "fa" ? "fa-IR" : "en-US"; const t = dict[lang];
  const value: C = {
    lang, theme, t, setLang, setTheme, nf: n => n.toLocaleString(loc), money: n => new Intl.NumberFormat(loc, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n),
    bn: make => make, tr: s => (lang === "fa" ? t.terms2[s] ?? s : s),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
