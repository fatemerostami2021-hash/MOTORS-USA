import { logos, logoColors } from "@/data/logos";
// Real logo shapes in each brand's own colour, on a white chip so dark logos stay visible in both themes.
export default function BrandIcon({ slug, name, size = 64 }: { slug: string; name: string; size?: number }) {
  const d = logos[slug], c = logoColors[slug] ?? "#1f1f1f", pad = Math.round(size * 0.18), inner = size - pad * 2;
  return (
    <span className="inline-grid shrink-0 place-items-center rounded-full bg-white shadow-sm" style={{ width: size, height: size }}>
      {d ? <svg width={inner} height={inner} viewBox="0 0 24 24" role="img" aria-label={name} fill={c}><path d={d} /></svg>
        : <svg width={inner} height={inner} viewBox="0 0 64 64" role="img" aria-label={name} fill="none" stroke={c} strokeWidth="3"><circle cx="32" cy="32" r="28" /><path d="M32 6v26L9 45M32 32l23 13" /></svg>}
    </span>
  );
}
