"use client"
import { useRef, useState } from "react"
import { track } from "@vercel/analytics"
import type { Conversation } from "@elevenlabs/client"
export function VoiceAssistant() {
  const session = useRef<Conversation | null>(null)
  const [status, setStatus] = useState("idle")
  const [error, setError] = useState("")
  async function start() {
    track("cta_click", { cta: "voice_assistant" })
    setStatus("sending"); setError("")
    try {
      const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID
      if (!agentId) throw new Error("The voice assistant is unavailable. Please email us.")
      const { Conversation } = await import("@elevenlabs/client")
      session.current = await Conversation.startSession({ agentId, connectionType: "webrtc", onDisconnect: () => setStatus("idle"), onError: () => { setError("Voice connection interrupted. Please try again or email us."); setStatus("idle") } })
      setStatus("connected")
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to access your microphone. Please email us."); setStatus("idle") }
  }
  return <div className="text-white"><button type="button" disabled={status === "sending"} className="rounded-full bg-lime px-6 py-3 text-sm font-semibold text-plum" onClick={status === "connected" ? async () => { await session.current?.endSession(); setStatus("idle") } : start}>{status === "connected" ? "End call" : status === "sending" ? "Connecting…" : "Talk to our voice assistant"}</button><p className="mt-3 text-xs">Uses your microphone</p><a className="mt-3 inline-block text-sm underline" href="mailto:hello@plotfolioai.com">Email us instead</a><p role="alert" className="mt-2 max-w-xs text-sm">{error}</p></div>
}
