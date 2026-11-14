import { vehicles, Vehicle } from "@/data/vehicles";
import { brands } from "@/data/brands";
import { site } from "@/data/site";
// Rule-based site assistant (no external service, instant, free). Answers from the same data the site shows.
export type Reply = { text: string; links: { label: string; href: string }[] };
const fa = (s: string) => /[\u0600-\u06FF]/.test(s);
const digits = (s: string) => s.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
const has = (q: string, words: string[]) => words.some(w => q.includes(w));
export function reply(input: string, uiLang: "en" | "fa"): Reply {
  const q = digits(input.toLowerCase()); const f = fa(input) || (uiLang === "fa" && !/[a-z]{3}/.test(q)); const L = (en: string, p: string) => (f ? p : en);
  const money = (n: number) => new Intl.NumberFormat(f ? "fa-IR" : "en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
  const car = vehicles.find(v => q.includes(v.model.toLowerCase()) && (q.includes(v.make.toLowerCase()) || !vehicles.some(o => o !== v && o.model === v.model))) ?? vehicles.find(v => q.includes(`${v.make} ${v.model}`.toLowerCase()));
  const brand = brands.find(b => q.includes(b.name.toLowerCase()) || input.includes(b.fa));
  const link = (v: Vehicle) => ({ label: `${v.make} ${v.model}`, href: `/inventory/${v.slug}` });
  const wa = { label: "WhatsApp", href: site.socials.whatsapp };
  if (has(q, ["hi", "hello", "hey", "سلام", "درود"]) && q.length < 20) return { text: L("Hello! I can help with prices, specs, availability, selling your car and contact details. What would you like to know?", "سلام! درباره قیمت، مشخصات، موجودی، فروش خودرو و اطلاعات تماس می‌توانم کمک کنم. چه می‌خواهید بدانید؟"), links: [] };
  if (car && has(q, ["price", "cost", "how much", "قیمت", "چند", "هزینه"])) return { text: L(`${car.make} ${car.model} ${car.year}: ${money(car.price)} (${car.status === "sold" ? "sold" : "available"}). Contact the team to confirm availability and arrange a viewing.`, `${car.make} ${car.model} مدل ${car.year}: ${money(car.price)} (${car.status === "sold" ? "فروخته شده" : "موجود"}). برای تأیید موجودی و هماهنگی بازدید با تیم تماس بگیرید.`), links: [link(car), wa] };
  if (car && has(q, ["hp", "power", "speed", "engine", "specs", "spec", "قدرت", "سرعت", "موتور", "مشخصات"])) return { text: L(`${car.make} ${car.model}: ${car.hp} hp, ${car.engine}${car.accel ? `, 0-100 km/h in ${car.accel}s` : ""}${car.top ? `, top speed ${car.top} km/h` : ""}.`, `${car.make} ${car.model}: ${car.hp} اسب بخار، موتور ${car.engine}${car.accel ? `، ۰ تا ۱۰۰ در ${car.accel} ثانیه` : ""}${car.top ? `، حداکثر سرعت ${car.top} کیلومتر بر ساعت` : ""}.`), links: [link(car)] };
  if (car) return { text: L(`Here is the ${car.make} ${car.model}. Ask me about its price or specs.`, `این هم ${car.make} ${car.model}. درباره قیمت یا مشخصاتش بپرسید.`), links: [link(car)] };
  if (has(q, ["sell", "consign", "trade", "بفروش", "فروش خودرو", "فروش ماشین"])) return { text: L("You can submit your car in three short steps: details, photos and contact. We reply after reviewing it.", "می‌توانید خودروی خود را در سه مرحله کوتاه ثبت کنید: مشخصات، عکس‌ها و تماس. پس از بررسی با شما تماس می‌گیریم."), links: [{ label: L("Sell my car", "فروش خودرو"), href: "/sell-your-car" }] };
  if (has(q, ["compare", "مقایسه"])) return { text: L("You can compare up to four cars side by side.", "می‌توانید تا چهار خودرو را کنار هم مقایسه کنید."), links: [{ label: L("Compare", "مقایسه"), href: "/compare" }] };
  if (has(q, ["sold", "فروخته"])) return { text: L("Our sold cars are listed here.", "خودروهای فروخته‌شده اینجا هستند."), links: [{ label: L("Sold cars", "فروخته‌شده"), href: "/inventory?status=sold" }] };
  if (brand || has(q, ["available", "stock", "inventory", "cars", "موجود", "خودرو", "ماشین"])) { const list = vehicles.filter(v => v.status === "available" && (!brand || v.make === brand.name)); return { text: list.length ? L(`${list.length} available${brand ? ` from ${brand.name}` : ""}:`, `${list.length} خودرو موجود${brand ? ` از ${brand.name}` : ""}:`) : L("No cars from that brand right now.", "فعلاً خودرویی از این برند موجود نیست."), links: list.slice(0, 4).map(link).concat([{ label: L("All cars", "همه خودروها"), href: brand ? `/brands/${brand.slug}` : "/inventory" }]) }; }
  if (has(q, ["phone", "call", "contact", "address", "where", "location", "email", "تماس", "تلفن", "آدرس", "کجا", "ایمیل"])) return { text: L(`${site.address.en}. Phone: ${site.phone}. Email: ${site.email}.`, `${site.address.fa}. تلفن: ${site.phone}. ایمیل: ${site.email}.`), links: [wa, { label: L("Contact page", "صفحه تماس"), href: "/contact" }] };
  if (has(q, ["test drive", "visit", "appointment", "بازدید", "تست"])) return { text: L("To book a visit, message us on WhatsApp or call.", "برای هماهنگی بازدید، در واتس‌اپ پیام دهید یا تماس بگیرید."), links: [wa] };
  return { text: L("I could not find that. Try the search (top of the page) or ask our team on WhatsApp.", "این مورد را پیدا نکردم. از جستجوی بالای صفحه استفاده کنید یا در واتس‌اپ از تیم ما بپرسید."), links: [wa] };
}
