"use client";
import { useState } from "react";
export default function Heart({ label }: { label: string }) {
  const [on, setOn] = useState(false);
  return <button type="button" aria-pressed={on} aria-label={label} onClick={() => setOn(!on)} className={`relative z-10 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-lg backdrop-blur transition ${on ? "text-flag" : "text-white"}`}>{on ? "♥" : "♡"}</button>;
}
