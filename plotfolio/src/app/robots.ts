import type { MetadataRoute } from "next"
import { landing } from "@/lib/landing-config"
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/privacy", "/terms"] }, sitemap: `${landing.url}/sitemap.xml` }
}
