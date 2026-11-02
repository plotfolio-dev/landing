/** Browser submissions must originate from the same host, including its port. */
export function isSameOrigin(request: Request) {
  try {
    const origin = new URL(request.headers.get("origin") || "")
    return ["http:", "https:"].includes(origin.protocol) && origin.host === request.headers.get("host")
  } catch { return false }
}
