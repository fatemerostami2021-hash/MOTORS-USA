import { fileURLToPath } from "node:url";
export default {
  poweredByHeader: false,
  turbopack: { root: fileURLToPath(new URL(".", import.meta.url)) },
  allowedDevOrigins: ["192.168.1.3", "localhost", "127.0.0.1"],
  images: { formats: ["image/avif", "image/webp"] },
};
