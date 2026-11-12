"use client";
import Image, { ImageProps } from "next/image";
import { useState } from "react";
// next/image that shows a tidy placeholder instead of a broken-image icon when a file is missing.
export default function SafeImage(props: ImageProps) {
  const [bad, setBad] = useState(false);
  if (bad) return <span className="absolute inset-0 grid place-items-center bg-gradient-to-br from-card to-coal p-3 text-center text-sm text-bone/50">{props.alt}</span>;
  return <Image {...props} onError={() => setBad(true)} />;
}
