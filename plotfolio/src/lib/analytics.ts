import { track as vercelTrack } from "@vercel/analytics"

// Enable only after Web Analytics is enabled for the Vercel project.
export const analyticsEnabled = process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ENABLED === "true"
export function track(event: string, properties?: Record<string, string | number | boolean>) {
  if (analyticsEnabled) vercelTrack(event, properties)
}
