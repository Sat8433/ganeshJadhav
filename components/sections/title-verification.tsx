"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function TitleVerificationSection() {
  const [city, setCity] = useState("Mumbai")
  const [project, setProject] = useState("")
  const [unit, setUnit] = useState("")
  const [tower, setTower] = useState("")

  const onSearch = () => {
    const params = new URLSearchParams()
    params.set("city", city)
    if (project) params.set("project", project)
    if (unit) params.set("unit", unit)
    if (tower) params.set("tower", tower)
    window.location.href = `/insights?${params.toString()}`
  }

  return (
    <section id="title-verification" aria-labelledby="tv-title" className="relative isolate">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white to-slate-50 dark:from-[#0B1220] dark:to-[#0F172A]" />
      
    </section>
  )
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-white">
        ✓
      </span>
      <p className="text-slate-700 dark:text-slate-300">{text}</p>
    </div>
  )
}
