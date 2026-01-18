"use client"

import { useEffect, useState } from "react"

export function AnimatedBeam() {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setPhase((p) => (p + 8) % 120), 50)
    return () => clearInterval(id)
  }, [])

  const items = [
    { label: "Public Records" },
    { label: "Transactions" },
    { label: "Mortgages" },
    { label: "Projects" },
    { label: "GIS Layers" },
    { label: "RERA" },
  ]

  return (
    <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-lg">
      {/* subtle radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.12),rgba(20,184,166,0.06),transparent_70%)]"
      />
      <div className="relative grid grid-cols-2 gap-4 p-6 sm:grid-cols-3">
        {items.map((it, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-200/70 bg-white/80 p-4 text-center shadow-sm backdrop-blur-sm transition-colors hover:border-indigo-300"
          >
            <div className="mx-auto mb-2 h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-teal-500" />
            <div className="text-sm font-medium text-slate-700">{it.label}</div>
          </div>
        ))}
      </div>
      {/* center node */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 to-teal-500 shadow-xl" />
      </div>

      {/* orbit nodes */}
      {[
        { x: "15%", y: "25%" },
        { x: "20%", y: "70%" },
        { x: "85%", y: "25%" },
        { x: "80%", y: "70%" },
        { x: "50%", y: "10%" },
      ].map((p, i) => (
        <div key={i} className="absolute" style={{ left: p.x, top: p.y }}>
          <div className="h-10 w-10 rounded-full bg-white shadow-md" />
        </div>
      ))}
    </div>
  )
}
