// Sports-car silhouette used by the favicon, app icon and social preview card.
export function CarMark({ width = 100, color = "#ffffff", wheel = "#0b0b0c" }: { width?: number; color?: string; wheel?: string }) {
  return (
    <svg width={width} height={width / 2} viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 37 C3 33 7 31 13 30 L29 25 C35 17 44 13 55 13 C65 13 73 18 79 25 L90 28 C95 29 98 32 98 37 L98 40 L3 40 Z" fill={color} />
      <path d="M34 25 C39 19 46 16 55 16 C62 16 67 20 71 25 Z" fill={wheel} opacity="0.85" />
      <circle cx="24" cy="40" r="8" fill={wheel} />
      <circle cx="24" cy="40" r="4" fill={color} />
      <circle cx="77" cy="40" r="8" fill={wheel} />
      <circle cx="77" cy="40" r="4" fill={color} />
    </svg>
  );
}
