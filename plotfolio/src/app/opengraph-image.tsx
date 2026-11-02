import { ImageResponse } from "next/og"
export const alt = "Plotfolio AI — Join early access"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export default function Image() { return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 90, background: "#28123d", color: "#fff" }}><div style={{ fontSize: 72, fontWeight: 700 }}>Plotfolio AI</div><div style={{ fontSize: 44, color: "#b8f51e", marginTop: 36 }}>Join early access</div><div style={{ fontSize: 28, marginTop: 30 }}>Construction · Collections · Property operations</div></div>, size) }
