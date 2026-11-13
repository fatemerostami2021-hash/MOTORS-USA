import { fileURLToPath } from "node:url";
const dir = fileURLToPath(new URL(".", import.meta.url));
const security = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];
export default {
  output: "standalone",
  poweredByHeader: false,
  outputFileTracingRoot: dir,
  turbopack: { root: dir },
  allowedDevOrigins: ["192.168.1.3", "localhost", "127.0.0.1"],
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [
      { source: "/:path*", headers: security },
      { source: "/(cars|video|brands|about)/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }] },
    ];
  },
};
