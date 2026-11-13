// Run from the project root (E:\MOTORS-USA):  node apply-update13.mjs
// 1) Replaces the placeholder About / Privacy / Terms texts in Prefs.tsx
// 2) Replaces the "Demo article" bodies in articles.ts with real articles (EN + FA)
import fs from "node:fs";

const STR = '"(?:[^"\\\\]|\\\\.)*"';

// ---------- 1) Prefs.tsx ----------
const prefsFile = "frontend/src/components/Prefs.tsx";
const texts = {
  aboutText: [
    "Motors USA is a curated showroom for supercars, hypercars and collector vehicles. Every car we list is inspected, its documents are verified and its specifications are checked against manufacturer data before it reaches you. Whether you are buying, selling or placing a car on consignment, our team guides you through each step, from the first conversation to the final handover.",
    "موتورز یو‌اس‌ای یک نمایشگاه منتخب برای سوپراسپورت‌ها، هایپرکارها و خودروهای کلکسیونی است. هر خودرویی که ثبت می‌کنیم بازرسی می‌شود، مدارکش بررسی می‌شود و مشخصاتش با داده‌های سازنده تطبیق داده می‌شود. چه بخرید، چه بفروشید و چه خودروی خود را به‌صورت امانی بسپارید، تیم ما در تمام مراحل، از اولین گفتگو تا تحویل نهایی، همراه شماست.",
  ],
  privacyText: [
    "We collect only the information you give us through our forms, such as your name, phone number, email and details of the car you want to sell, and we use it solely to respond to your enquiry. We do not sell your personal data. We use basic analytics to understand how the site is used, and you can contact us at any time to ask what information we hold about you or to have it deleted.",
    "ما فقط اطلاعاتی را جمع‌آوری می‌کنیم که خودتان از طریق فرم‌ها در اختیارمان می‌گذارید، مانند نام، شماره تلفن، ایمیل و مشخصات خودرویی که می‌خواهید بفروشید، و تنها برای پاسخ به درخواست شما از آن استفاده می‌کنیم. اطلاعات شخصی شما را نمی‌فروشیم. برای فهمیدن نحوه‌ی استفاده از سایت از تحلیل‌های ساده بهره می‌گیریم و هر زمان که بخواهید می‌توانید با ما تماس بگیرید تا بدانید چه اطلاعاتی از شما داریم یا آن را حذف کنیم.",
  ],
  termsText: [
    "The information on this website, including prices, specifications and availability, is provided for guidance and may change without notice. Listings are not a binding offer; every sale is confirmed in writing after the vehicle has been inspected and its documents verified. Images are illustrative. By using this site you agree to these terms.",
    "اطلاعات این وب‌سایت، از جمله قیمت، مشخصات و موجودی، جنبه‌ی راهنما دارد و ممکن است بدون اطلاع قبلی تغییر کند. آگهی‌ها پیشنهاد قطعی محسوب نمی‌شوند و هر فروش پس از بازرسی خودرو و بررسی مدارک، به‌صورت کتبی تأیید می‌شود. تصاویر جنبه‌ی نمایشی دارند. با استفاده از این سایت، این شرایط را می‌پذیرید.",
  ],
};
if (fs.existsSync(prefsFile)) {
  let p = fs.readFileSync(prefsFile, "utf8");
  for (const [key, [en, fa]] of Object.entries(texts)) {
    let n = 0;
    p = p.replace(new RegExp(key + "\\s*:\\s*" + STR, "g"), () => `${key}: ${JSON.stringify(n++ === 0 ? en : fa)}`);
    console.log(`Prefs.tsx ${key}: ${n} replaced (expected 2)`);
  }
  fs.writeFileSync(prefsFile, p);
} else console.log("Prefs.tsx not found - run from the project root");

// ---------- 2) articles.ts ----------
const bodies = {
  "why-v12-still-matters": {
    en: [
      "Twelve cylinders, no turbochargers, and an engine that keeps pulling long after most road cars have run out of breath. For collectors, the naturally aspirated V12 is the closest thing the modern car world has to a mechanical orchestra, and it is becoming rarer every year.",
      "Part of the appeal is how it behaves. A V12 is inherently balanced, which is why it feels so smooth, and without turbochargers the throttle response is immediate and linear. Ferrari's 6.5-litre V12 in the 812 GTS and the Purosangue is a modern example: high-revving, loud, and engineered to be enjoyed at the top of the rev range.",
      "Regulations and electrification are changing the picture. The Lamborghini Revuelto keeps a 6.5-litre V12 but pairs it with three electric motors, a sign that the future of the twelve-cylinder is hybrid rather than extinct. The pure, unassisted V12 cars that came before are becoming reference points for what an engine can feel like.",
      "That is why buyers still chase them. Cars with a documented history and careful ownership keep their appeal because they cannot be built again in the same way. If you are considering a V12 car, ask for its full service record and an independent inspection before you decide.",
    ],
    fa: [
      "دوازده سیلندر، بدون توربو، و موتوری که حتی وقتی بیشتر خودروهای جاده‌ای نفس‌شان بند می‌آید همچنان می‌کشد. برای کلکسیونرها، V12 بدون شارژ نزدیک‌ترین چیز به یک ارکستر مکانیکی در دنیای خودروی امروز است و هر سال کمیاب‌تر می‌شود.",
      "بخشی از جذابیت آن به رفتارش برمی‌گردد. V12 ذاتاً متعادل است و برای همین بسیار نرم کار می‌کند؛ بدون توربو هم پاسخ گاز فوری و خطی است. موتور ۶٫۵ لیتری V12 فراری در ۸۱۲ GTS و پوروسانگوه نمونه‌ای امروزی است: پردور، پرصدا و طراحی‌شده برای لذت بردن در دورهای بالا.",
      "مقررات و برقی‌سازی تصویر را عوض می‌کنند. لامبورگینی رووِلتو هنوز موتور ۶٫۵ لیتری V12 دارد، اما آن را با سه موتور الکتریکی ترکیب کرده است؛ نشانه‌ای از اینکه آینده‌ی دوازده‌سیلندر هیبریدی است، نه منقرض. خودروهای V12 خالص و بدون کمک الکتریکی که پیش از این ساخته شدند، حالا مرجعی برای حس واقعی یک موتور هستند.",
      "به همین دلیل خریداران هنوز دنبال آن‌ها هستند. خودروهایی با تاریخچه‌ی مستند و مالکیت دقیق جذابیت خود را حفظ می‌کنند، چون دیگر نمی‌توان آن‌ها را به همان شکل ساخت. اگر به یک خودروی V12 فکر می‌کنید، پیش از تصمیم، سوابق کامل سرویس و یک بازرسی مستقل را درخواست کنید.",
    ],
  },
  "hybrid-hypercars-explained": {
    en: [
      "Hybrid hypercars use electric motors for something very different from a family hybrid: not to save fuel, but to go faster. An electric motor delivers its torque instantly, filling the gap while a petrol engine builds revs or turbo boost, so the car feels sharp from the first touch of the throttle.",
      "The Porsche 918 Spyder, built from 2013 to 2015 in a run of 918 cars, showed what was possible. A 4.6-litre V8 and two electric motors produced a combined 887 hp, and it could be plugged in and driven in electric mode. It set the template that other manufacturers followed.",
      "Today's cars take the idea further. The Ferrari SF90 Stradale pairs a twin-turbo V8 with three electric motors, two of them at the front axle, giving 986 hp, all-wheel drive and a pure-electric mode. The Lamborghini Revuelto combines a V12 with three motors, and the Mercedes-AMG ONE uses a 1.6-litre V6 derived from Formula 1 together with four motors for 1,063 hp.",
      "For buyers, a hybrid hypercar needs a little extra care. The battery and electronics need specialist attention, so ask for a battery health report, confirm that software updates have been carried out by an authorised workshop, and have the car inspected by someone who knows the model.",
    ],
    fa: [
      "هایپرکارهای هیبریدی از موتور الکتریکی برای کاری کاملاً متفاوت از یک هیبرید خانوادگی استفاده می‌کنند: نه صرفه‌جویی در سوخت، بلکه سریع‌تر رفتن. موتور الکتریکی گشتاورش را فوراً می‌دهد و خلأ زمانی را که موتور بنزینی در حال بالا بردن دور یا فشار توربو است پر می‌کند؛ برای همین خودرو از اولین لمس گاز تیز و واکنش‌گراست.",
      "پورشه ۹۱۸ اسپایدر که بین ۲۰۱۳ تا ۲۰۱۵ در تیراژ ۹۱۸ دستگاه ساخته شد، نشان داد چه چیزی ممکن است. موتور ۴٫۶ لیتری V8 و دو موتور الکتریکی روی هم ۸۸۷ اسب بخار قدرت تولید می‌کردند و خودرو را می‌شد به برق زد و در حالت الکتریکی راند. این خودرو الگویی شد که سازندگان دیگر دنبال کردند.",
      "خودروهای امروزی این ایده را جلوتر برده‌اند. فراری SF90 استرادله یک V8 دو توربو را با سه موتور الکتریکی، دو موتور در محور جلو، ترکیب می‌کند و ۹۸۶ اسب بخار، چهارچرخ‌محرک و حالت تمام‌الکتریکی دارد. لامبورگینی رووِلتو یک V12 را با سه موتور ترکیب می‌کند و مرسدس-AMG وان از موتور ۱٫۶ لیتری V6 برگرفته از فرمول ۱ به‌همراه چهار موتور برای رسیدن به ۱٬۰۶۳ اسب بخار استفاده می‌کند.",
      "برای خریداران، هایپرکار هیبریدی کمی توجه بیشتر می‌خواهد. باتری و سیستم الکترونیکی به تخصص ویژه نیاز دارند؛ پس گزارش سلامت باتری را بخواهید، مطمئن شوید به‌روزرسانی‌های نرم‌افزاری در نمایندگی مجاز انجام شده و خودرو را نزد کسی که مدل را می‌شناسد بازرسی کنید.",
    ],
  },
  "buying-your-first-supercar": {
    en: [
      "Buying your first supercar is exciting, and the best way to protect that excitement is to start with the whole cost, not just the price. Insurance, tyres, servicing, storage and the occasional specialist repair all add up, so set a yearly running budget before you set a purchase budget.",
      "Start with the paperwork. Check that the registration and ownership documents match the car, run a chassis-number (VIN) history check, and ask for the full service book and any accident or repair records. If the car was imported, ask for the import and customs papers as well. A car with a complete, consistent file is always easier to trust and easier to resell.",
      "Then inspect the car itself. Look at the condition of the tyres, brakes and clutch, check the paint for signs of repair, and listen for anything unusual on a cold start and a proper test drive. Arrange an independent pre-purchase inspection by a specialist who knows the marque, because they will find things a first-time buyer cannot.",
      "Finally, put the agreement in writing. Confirm the price, what is included, the conditions of any deposit and the handover date before you pay anything. At Motors USA we inspect and document each car and are happy to share the reports, so you can decide with the facts in front of you.",
    ],
    fa: [
      "خرید اولین سوپراسپورت هیجان‌انگیز است و بهترین راه برای حفظ این هیجان، شروع از کل هزینه است، نه فقط قیمت خودرو. بیمه، لاستیک، سرویس، پارکینگ و تعمیرات تخصصی گاه‌به‌گاه روی هم جمع می‌شوند؛ پس پیش از بودجه‌ی خرید، بودجه‌ی سالانه‌ی نگهداری را مشخص کنید.",
      "از مدارک شروع کنید. مطمئن شوید مدارک ثبت و مالکیت با خودرو مطابقت دارد، سابقه‌ی شماره‌ی شاسی (VIN) را استعلام کنید و دفترچه‌ی کامل سرویس و هر سابقه‌ی تصادف یا تعمیر را بخواهید. اگر خودرو وارداتی است، مدارک واردات و گمرک را هم درخواست کنید. خودرویی با پرونده‌ی کامل و هماهنگ، هم راحت‌تر قابل اعتماد است و هم راحت‌تر فروخته می‌شود.",
      "سپس خود خودرو را بررسی کنید. وضعیت لاستیک‌ها، ترمزها و کلاچ را ببینید، رنگ را از نظر نشانه‌های تعمیر وارسی کنید و هنگام استارت سرد و یک تست‌درایو درست به صداهای غیرعادی گوش دهید. یک بازرسی مستقل پیش از خرید را نزد متخصصی که برند را می‌شناسد هماهنگ کنید؛ او چیزهایی را می‌بیند که یک خریدار تازه‌کار نمی‌بیند.",
      "در پایان، توافق را کتبی کنید. پیش از پرداخت هر مبلغی، قیمت، آنچه شامل خرید است، شرایط بیعانه و تاریخ تحویل را مشخص کنید. در موتورز یو‌اس‌ای هر خودرو را بازرسی و مستند می‌کنیم و با کمال میل گزارش‌ها را در اختیارتان می‌گذاریم تا با اطلاعات کامل تصمیم بگیرید.",
    ],
  },
};
const artFile = "frontend/src/data/articles.ts";
if (fs.existsSync(artFile)) {
  let a = fs.readFileSync(artFile, "utf8");
  const arr = (k) => new RegExp("\\b" + k + ":\\s*\\[(?:[^\\]\"]|" + STR + ")*\\]");
  for (const [slug, b] of Object.entries(bodies)) {
    const i = a.indexOf(`slug:"${slug}"`) >= 0 ? a.indexOf(`slug:"${slug}"`) : a.indexOf(`slug: "${slug}"`);
    if (i < 0) { console.log(`articles.ts: slug ${slug} not found - skipped`); continue; }
    let j = a.indexOf("slug:", i + 6); if (j < 0) j = a.length;
    let seg = a.slice(i, j);
    const before = seg;
    seg = seg.replace(arr("bodyFa"), () => `bodyFa:${JSON.stringify(b.fa)}`);
    seg = seg.replace(arr("body"), () => `body:${JSON.stringify(b.en)}`);
    console.log(`articles.ts ${slug}: ${seg !== before ? "updated" : "NO CHANGE (pattern not found)"}`);
    a = a.slice(0, i) + seg + a.slice(j);
  }
  fs.writeFileSync(artFile, a);
} else console.log("articles.ts not found - run from the project root");
