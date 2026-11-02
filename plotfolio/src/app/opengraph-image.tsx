import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { landing } from "@/lib/landing-config"
export const alt = "Plotfolio AI — Construction collections and property operations, with a sample dashboard preview"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export default async function Image() {
  const crop = await readFile(join(process.cwd(), "public/images/social/dashboard-crop.png"))
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", gap: 44, padding: 60, background: "#28123d", color: "#fff" }}>
      <div style={{ display: "flex", flexDirection: "column", width: 500 }}>
        <div style={{ fontSize: 30, color: "#b8f51e" }}>Plotfolio AI</div>
        <div style={{ fontSize: 50, fontWeight: 700, lineHeight: 1.1, marginTop: 28 }}>{landing.headline}</div>
        <div style={{ fontSize: 25, color: "#b8f51e", marginTop: 28 }}>Join early access</div>
        <div style={{ fontSize: 20, marginTop: 20 }}>Construction · Collections · Operations</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: 536, alignItems: "center" }}>
        {/* Screenshot cropped directly from the landing page's dashboard mock. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/png;base64,${crop.toString("base64")}`} width={536} height={372} alt="Sample product dashboard" style={{ borderRadius: 24 }} />
        <div style={{ fontSize: 18, color: "#d9d2df", marginTop: 18 }}>Sample data</div>
      </div>
    </div>, size,
  )
}
