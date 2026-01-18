"use client"

import { useEffect } from "react"

export default function PWAReg() {
  useEffect(() => {
    if (typeof window === "undefined") return
    if ("serviceWorker" in navigator) {
      const register = async () => {
        try {
          await navigator.serviceWorker.register("/sw.js", { scope: "/" })
        } catch {
          // silently ignore registration errors to avoid UX disruption
        }
      }
      if (document.readyState === "complete") register()
      else window.addEventListener("load", register, { once: true })
    }
  }, [])
  return null
}
