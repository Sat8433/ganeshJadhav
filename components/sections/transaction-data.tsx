"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

type City = "Mumbai" | "Pune" | "Bengaluru" | "Hyderabad" | "Delhi NCR"

export default function TransactionDataSection() {
  const [city, setCity] = useState<City | "">("")
  const [query, setQuery] = useState("")

  const handleView = () => {
    const params = new URLSearchParams()
    if (city) params.set("city", city)
    if (query) params.set("q", query)
    window.location.href = `/insights?${params.toString()}`
  }

  return (
    <section id="transactions" aria-labelledby="transactions-title" className="relative isolate">
      {/* Soft background that works in light/dark */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 to-white dark:from-[#0B1220] dark:to-[#0F172A]" />

      
    </section>
  )
}
