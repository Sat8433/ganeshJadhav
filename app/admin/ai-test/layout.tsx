import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Configuration Test",
  description: "Test AI providers and verify fallback system",
}

export default function AITestLayout({ children }: { children: React.ReactNode }) {
  return children
}
