import type { MetadataRoute } from "next"
import { landing } from "@/lib/landing-config"
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: landing.url, changeFrequency: "monthly", priority: 1 }]
}
