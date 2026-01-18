"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface ActivityEvent {
  id: string
  event_type: string
  created_at: string
}

interface DashboardUsageProps {
  activities: ActivityEvent[]
}

export function DashboardUsage({ activities }: DashboardUsageProps) {
  // Process activities into daily usage data
  const usageData = activities.reduce((acc: any[], activity) => {
    const date = new Date(activity.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
    const existing = acc.find((item) => item.date === date)
    if (existing) {
      existing.searches += 1
    } else {
      acc.push({ date, searches: 1 })
    }
    return acc
  }, [])

  // Fill in missing dates with 0 searches
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  })

  const chartData = last7Days.map((date) => ({
    date,
    searches: usageData.find((item) => item.date === date)?.searches || 0,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage Overview</CardTitle>
        <CardDescription>Your activity over the last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorSearches" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Area
              type="monotone"
              dataKey="searches"
              stroke="hsl(var(--primary))"
              fillOpacity={1}
              fill="url(#colorSearches)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
