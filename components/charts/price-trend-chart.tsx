"use client"
import { useMemo } from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"

type Props = {
  series?: { month: string; price: number }[]
  currency?: "INR" | "AED" | "USD"
}

const defaultSeries = [
  { month: "Jan", price: 105 },
  { month: "Feb", price: 108 },
  { month: "Mar", price: 112 },
  { month: "Apr", price: 110 },
  { month: "May", price: 116 },
  { month: "Jun", price: 118 },
]

const currencyFmt = (cur: Props["currency"]) => (v: number) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency: cur || "INR", maximumFractionDigits: 0 }).format(
    v * 100000,
  )

export default function PriceTrendChart({ series = defaultSeries, currency = "INR" }: Props) {
  const format = useMemo(() => currencyFmt(currency), [currency])
  return (
    <div className="w-full rounded-xl border bg-card p-4">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground/80">Price Trend (Last 6 months)</h3>
        <span className="text-xs text-muted-foreground">Tap points for values</span>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={series}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(v) => format(v)} />
            <Tooltip formatter={(v) => format(Number(v))} contentStyle={{ borderRadius: 8 }} />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#2563EB"
              strokeWidth={2}
              dot={{ r: 2 }}
              isAnimationActive={
                typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
              }
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
