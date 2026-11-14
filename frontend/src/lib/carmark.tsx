// Low, wedge-shaped sports-car silhouette used by the favicon, app icon and social preview card.
export function CarMark({ width = 100, color = "#ffffff", wheel = "#0b0b0c" }: { width?: number; color?: string; wheel?: string }) {
  return (
    <svg width={width} height={width * 0.4} viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 30 L1 27 C1 25.5 3 24.5 7 23.5 L30 19 C37 13.5 47 11 58 11 C67 11 75 14 81 19 L93 22 C97 23 99 25 99 27.5 L99 31 L1 31 Z" fill={color} />
      <path d="M38 19 C43 14.5 50 12.5 58 12.5 C64 12.5 69 15 73 19 Z" fill={wheel} opacity="0.9" />
      <circle cx="24" cy="31" r="8" fill={wheel} />
      <circle cx="24" cy="31" r="4.2" fill={color} />
      <circle cx="77" cy="31" r="8" fill={wheel} />
      <circle cx="77" cy="31" r="4.2" fill={color} />
    </svg>
  );
}
