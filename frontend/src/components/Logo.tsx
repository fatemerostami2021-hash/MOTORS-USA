"use client";
import Image from "next/image";
// Blinking logo mark + site name whose letters hop up and down on hover.
export default function Logo() {
  const word = "MOTORS", usa = "USA";
  return (
    <span dir="ltr" className="group inline-flex items-center gap-2 md:gap-3">
      <Image src="/logo-website.png" alt="" width={0} height={0} sizes="120px" priority className="logo-blink h-7 w-auto md:h-9" />
      <span className="wave font-display text-lg font-black tracking-[0.12em] md:text-2xl" aria-label="Motors USA">
        {[...word].map((c, i) => <span key={i} style={{ ["--i" as string]: i }}>{c}</span>)}
        <span className="ms-2 text-flag">{[...usa].map((c, i) => <span key={i} style={{ ["--i" as string]: i + word.length }}>{c}</span>)}</span>
      </span>
    </span>
  );
}
