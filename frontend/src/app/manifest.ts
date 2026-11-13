import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Motors USA",
    short_name: "Motors USA",
    description: "Luxury supercars & hypercars — buy, sell and compare.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b0c",
    theme_color: "#d7263d",
    icons: [{ src: "/icon", sizes: "512x512", type: "image/png" }],
  };
}
