"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "./SafeImage";
import Stagger from "./Stagger";
import { Fade } from "./Reveal";
import { usePrefs } from "./Prefs";
import { site } from "@/data/site";
import { socials } from "@/data/logos";
import { vehicles, mediaVideos } from "@/data/vehicles";
const wrap = "mx-auto w-full max-w-6xl px-5 md:px-12";
const Crumb = ({ here }: { here: string }) => { const { t } = usePrefs(); return <p className="font-mono text-xs tracking-widest text-bone/70"><Link href="/" className="hover:text-flag">{t.home}</Link> — <span className="text-bone">{here}</span></p>; };
function PageHero({ title, sub, img, here }: { title: string; sub: string; img: string; here: string }) {
  return (
    <section className="relative isolate flex min-h-[46svh] items-end overflow-hidden md:min-h-[56svh]">
      <Image src={img} alt="" fill priority sizes="100vw" className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
      <div className={`${wrap} pb-10 pt-28`}><Crumb here={here} /><h1 className="mt-4 font-heading text-4xl font-bold uppercase leading-tight md:text-7xl">{title}</h1><p className="mt-3 text-sm tracking-[0.2em] text-bone/80 md:text-base">{sub}</p></div>
    </section>
  );
}
const card = "rounded-2xl border border-bone/10 bg-card p-6 md:p-8";
export function ContactView() {
  const { lang } = usePrefs(); const fa = lang === "fa";
  const T = fa ? { h: "تماس با ما", s: "نمایشگاه منتخب خودروهای پرقدرت", here: "تماس", reach: "راه‌های ارتباطی", det: "اطلاعات تماس", addr: "آدرس", em: "ایمیل", ph: "تلفن", soc: "شبکه‌های اجتماعی", hrs: "ساعات کاری", inq: "درخواست", send: "ارسال پیام", sub: "بگویید دنبال چه هستید؛ تیم ما به‌زودی پاسخ می‌دهد.", name: "نام", mail: "ایمیل", phone: "تلفن", msg: "پیام", phn: "نام و نام خانوادگی", mph: "چطور می‌توانیم کمک کنیم؟", btn: "ارسال", ok: "پیام شما ارسال شد. به‌زودی تماس می‌گیریم.", bad: "لطفاً فرم را بررسی کنید و دوباره تلاش کنید." } : { h: "Get in touch", s: "Premier curated performance car showroom", here: "Contact", reach: "Reach us", det: "Contact details", addr: "Address", em: "Email", ph: "Phone", soc: "Socials", hrs: "Showroom hours", inq: "Inquiry", send: "Send a message", sub: "Tell us what you are looking for. Our team will get back to you shortly.", name: "Name", mail: "Email", phone: "Phone", msg: "Message", phn: "Your full name", mph: "Tell us how we can help you…", btn: "Send inquiry", ok: "Thank you! Your message was sent. We will contact you shortly.", bad: "Please check the form and try again." };
  const [st, setSt] = useState<"idle" | "busy" | "ok" | "bad">("idle");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setSt("busy"); const d = Object.fromEntries(new FormData(e.currentTarget));
    try { const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) }); setSt(r.ok ? "ok" : "bad"); if (r.ok) e.currentTarget.reset(); } catch { setSt("bad"); }
  }
  const input = "mt-1 w-full rounded-lg border border-bone/20 bg-ink px-4 py-3 outline-none focus:border-flag";
  const lbl = "block text-xs tracking-widest text-bone/70";
  return (
    <>
      <PageHero title={T.h} sub={T.s} img="/cars/brands.webp" here={T.here} />
      <div className={`${wrap} grid gap-6 pb-20 pt-6 lg:grid-cols-[1fr_1.4fr]`}>
        <div className="space-y-6">
          <Fade className={card}>
            <p className="text-xs tracking-[0.25em] text-flag">{T.reach}</p><h2 className="mt-1 font-heading text-2xl font-bold uppercase">{T.det}</h2>
            <dl className="mt-6 space-y-5">
              <div><dt className={lbl}>{T.addr}</dt><dd className="mt-1 text-lg">{site.address[lang]}</dd></div>
              <div><dt className={lbl}>{T.em}</dt><dd className="mt-1 break-all text-lg"><a href={`mailto:${site.email}`} className="hover:text-flag">{site.email}</a></dd></div>
              <div><dt className={lbl}>{T.ph}</dt><dd className="mt-1 text-lg"><a dir="ltr" href={`tel:${site.phoneIntl}`} className="hover:text-flag">{site.phone}</a></dd></div>
            </dl>
            <p className={`${lbl} mt-6 border-t border-bone/10 pt-5`}>{T.soc}</p>
            <div className="mt-3 flex gap-3">{Object.entries(socials).map(([k, d]) => <a key={k} href={site.socials[k]} target="_blank" rel="noreferrer" aria-label={k} className="grid h-10 w-10 place-items-center rounded-full bg-bone/10 hover:bg-flag hover:text-white"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d={d} /></svg></a>)}</div>
          </Fade>
          <Fade className={card}><p className={lbl}>{T.hrs}</p><ul className="mt-4 divide-y divide-bone/10">{site.hours[lang].map(([d, h]) => <li key={d} className="flex justify-between gap-4 py-2"><span>{d}</span><span dir="ltr" className="text-bone/80">{h}</span></li>)}</ul></Fade>
        </div>
        <Fade className={card}>
          <p className="text-xs tracking-[0.25em] text-flag">{T.inq}</p><h2 className="mt-1 font-heading text-2xl font-bold uppercase">{T.send}</h2><p className="mt-3 text-bone/70">{T.sub}</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2"><label className={lbl}>{T.name}<input name="name" required minLength={2} maxLength={120} placeholder={T.phn} autoComplete="name" className={input} /></label><label className={lbl}>{T.mail}<input name="email" type="email" required maxLength={160} placeholder="name@email.com" autoComplete="email" className={input} /></label></div>
            <label className={`${lbl} block`}>{T.phone}<input name="phone" type="tel" maxLength={40} autoComplete="tel" className={input} dir="ltr" /></label>
            <label className={`${lbl} block`}>{T.msg}<textarea name="message" required minLength={5} maxLength={2000} rows={5} placeholder={T.mph} className={input} /></label>
            <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
            <button disabled={st === "busy"} className="rounded-full bg-flag px-8 py-3 text-sm font-bold tracking-widest text-white disabled:opacity-60">{T.btn}</button>
            {st === "ok" && <p role="status" className="text-emerald-400">{T.ok}</p>}{st === "bad" && <p role="alert" className="text-flag">{T.bad}</p>}
          </form>
        </Fade>
      </div>
    </>
  );
}
export function AboutView() {
  const { lang } = usePrefs(); const fa = lang === "fa";
  const T = fa ? { h: "درباره ما", s: "نمایشگاه منتخب خودروهای پرقدرت و کلکسیونی", here: "درباره ما", p: "موتورز یو‌اس‌ای نمایشگاهی منتخب برای سوپراسپورت، هایپرکار و خودروهای کلکسیونی است. مجموعه ما نمونه‌های برجسته‌ای از شاهکارهای خودرو را در بر می‌گیرد. هر خودرو با مدارک و مشخصات دقیق ارائه می‌شود تا خرید و فروش با اطمینان انجام شود.", mv: "ماموریت و چشم‌انداز", mvp: "هدف ما این است که مقصد اول علاقه‌مندان به خودروهای لوکس باشیم؛ جایی که ظرافت، عملکرد و خدمات بی‌نظیر کنار هم قرار می‌گیرند. می‌خواهیم در هر تعامل از انتظارات شما فراتر برویم.", team: "تیم ما", tp: "ما معتقدیم خرید یک خودروی لوکس باید تجربه‌ای دلپذیر باشد. تیم باتجربه ما همیشه در کنار شماست تا خودروی مناسب نیازتان را پیدا کنید؛ چه سوپراسپورت امروزی بخواهید و چه یک کلاسیک ماندگار.", facts: "آمار موتورز یو‌اس‌ای", car: "فرصت‌های شغلی", cp: "اگر عاشق خودرو هستید و می‌خواهید در تیم ما کار کنید، رزومه‌تان را برایمان بفرستید.", apply: "ارسال رزومه", roles: ["مشاور فروش", "کارشناس بازرسی خودرو", "تولیدکننده محتوا"] } : { h: "About us.", s: "A curated showroom for performance and collector cars", here: "About us", p: "Motors USA is a curated showroom for supercars, hypercars and collector vehicles. Our collection represents the finest examples of automotive excellence. Every car comes with documents and verified specifications so buying and selling happens with confidence.", mv: "Mission - Vision", mvp: "Our vision is to be the leading destination for luxury cars, synonymous with elegance, performance and unrivalled service. We want to exceed expectations in every interaction.", team: "Our team", tp: "We believe that purchasing a luxury vehicle should be an exhilarating and delightful experience. Our knowledgeable team is always at your service to help you find the ideal car, whether you want a cutting-edge supercar or a timeless classic.", facts: "Motors USA facts", car: "Careers", cp: "If you love cars and want to work with our team, send us your CV.", apply: "Send your CV", roles: ["Sales consultant", "Vehicle inspector", "Content creator"] };
  const fan = ["/cars/ferrari-812-gts.webp", "/cars/mclaren-senna.webp", "/cars/hero-poster.webp", "/cars/lamborghini-aventador-svj.webp", "/cars/ferrari-488-pista-spider.webp"];
  return (
    <>
      <section className={`${wrap} grid items-center gap-10 py-14 md:py-24 lg:grid-cols-2`}>
        <div><Crumb here={T.here} /><h1 className="mt-6 font-heading text-5xl font-bold md:text-6xl">{T.h}</h1><p className="mt-6 text-lg text-bone/80">{T.p}</p></div>
        <div dir="ltr" className="flex items-center justify-center">{fan.map((src, i) => (<div key={src} className="relative -ms-6 aspect-[3/5] w-[22%] overflow-hidden rounded-xl border border-bone/20 shadow-2xl first:ms-0" style={{ transform: `translateY(${[18, 0, -16, 0, 18][i]}px) scale(${i === 2 ? 1.12 : 1})`, zIndex: i === 2 ? 2 : 1 }}><Image src={src} alt="" fill sizes="20vw" className="object-cover" /></div>))}</div>
      </section>
      <section className="bg-coal py-14 md:py-20"><div className={`${wrap} grid items-center gap-8 md:grid-cols-2`}><div className="relative aspect-[16/9] overflow-hidden rounded-2xl"><Image src="/cars/mclaren-speedtail.webp" alt="" fill sizes="(min-width:768px) 45vw, 90vw" className="object-cover" /></div><div><h2 className="font-heading text-3xl font-bold uppercase">{T.mv}</h2><p className="mt-4 text-lg text-bone/80">{T.mvp}</p></div></div></section>
      <section className={`${wrap} py-14 md:py-20`}><h2 className="font-heading text-2xl font-bold uppercase">{T.team}</h2><div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl bg-card"><Image src={site.teamImage} alt={T.team} fill sizes="(min-width:1024px) 72vw, 100vw" className="object-cover" /></div><p className="mx-auto mt-6 max-w-3xl text-center text-bone/80">{T.tp}</p></section>
      <section className="bg-coal py-14"><div className={wrap}><h2 className="font-heading text-xl font-bold uppercase">{T.facts}</h2><Stagger className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">{site.facts.map(f => <div key={f.en} className="rounded-xl bg-card p-5"><p className="font-mono text-3xl font-bold">{f.n}</p><p className="mt-1 text-sm text-bone/70">{f[lang]}</p></div>)}</Stagger></div></section>
      <section id="careers" className={`${wrap} py-14 md:py-20`}><h2 className="font-heading text-3xl font-bold uppercase">{T.car}</h2><p className="mt-3 max-w-2xl text-bone/80">{T.cp}</p><ul className="mt-6 grid gap-3 sm:grid-cols-3">{T.roles.map(r => <li key={r} className="rounded-xl border border-bone/15 p-5 font-semibold">{r}</li>)}</ul><a href={`mailto:${site.email}?subject=Careers`} className="mt-6 inline-block rounded-full bg-flag px-7 py-3 text-sm font-bold tracking-widest text-white">{T.apply}</a></section>
    </>
  );
}
export function ShopView() {
  const { lang, money } = usePrefs(); const fa = lang === "fa";
  const T = fa ? { h: "فروشگاه", s: "قاب‌های کلکسیونی از خودروهای محبوب", here: "فروشگاه", note: "قیمت‌ها نمونه هستند. سفارش از طریق واتس‌اپ ثبت می‌شود.", order: "سفارش در واتس‌اپ", print: "قاب کلکسیونی" } : { h: "Shop", s: "Collector prints of iconic cars", here: "Shop", note: "Demo prices. Orders are placed via WhatsApp.", order: "Order on WhatsApp", print: "Collector print" };
  const items = vehicles.filter(v => v.status === "available").slice(0, 8);
  return (
    <>
      <PageHero title={T.h} sub={T.s} img="/cars/sell-your-car.webp" here={T.here} />
      <div className={`${wrap} py-12`}><p className="text-sm text-bone/60">{T.note}</p>
        <Stagger className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">{items.map(v => (
          <div key={v.slug} className="overflow-hidden rounded-2xl border border-bone/10 bg-card"><div className="relative aspect-[4/5]"><Image src={v.image} alt={`${T.print} ${v.make} ${v.model}`} fill sizes="(min-width:1024px) 22vw, 45vw" className="object-cover" /></div>
            <div className="p-4"><p className="text-xs text-bone/60">{T.print}</p><h3 className="mt-1 truncate font-mono font-bold"><bdi dir="ltr">{v.make} {v.model}</bdi></h3><p className="mt-1 font-mono">{money(49)}</p><a href={`${site.socials.whatsapp}?text=${encodeURIComponent(`${T.print}: ${v.make} ${v.model}`)}`} target="_blank" rel="noreferrer" className="mt-3 block rounded-full bg-flag py-2 text-center text-xs font-bold tracking-widest text-white">{T.order}</a></div></div>))}</Stagger></div>
    </>
  );
}
export function MediaView() {
  const { lang } = usePrefs(); const fa = lang === "fa";
  return (
    <>
      <PageHero title={fa ? "رسانه" : "Media"} sub={fa ? "ویدیوهای خودروهای ما" : "Videos from our collection"} img="/cars/compare.webp" here={fa ? "رسانه" : "Media"} />
      <div className={`${wrap} py-12`}><Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{mediaVideos.map(m => (
        <figure key={m.file} className="overflow-hidden rounded-2xl border border-bone/10 bg-card"><video src={`/video/${m.file}#t=0.5`} controls playsInline preload="metadata" aria-label={m.title} className="aspect-video w-full bg-black object-cover" /><figcaption className="p-4 font-mono font-bold"><bdi dir="ltr">{m.title}</bdi></figcaption></figure>))}</Stagger></div>
    </>
  );
}
