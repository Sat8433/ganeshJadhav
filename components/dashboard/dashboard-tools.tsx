import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Search, FileText, BarChart3, MapPin } from 'lucide-react'

interface DashboardToolsProps {
  credits: number
}

export function DashboardTools({ credits }: DashboardToolsProps) {
  const tools = [
    {
      icon: Search,
      title: "Property Search",
      description: "Search property transactions and ownership records across multiple cities",
      href: "/tools/property-search",
      cost: 1,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
    },
    {
      icon: FileText,
      title: "Title Verification",
      description: "Verify property ownership and get detailed title information",
      href: "/tools/title-verification",
      cost: 1,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
    },
    {
      icon: BarChart3,
      title: "Market Analytics",
      description: "Get insights on property trends, pricing, and market analysis",
      href: "/tools/market-analytics",
      cost: 2,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      comingSoon: true,
    },
    {
      icon: MapPin,
      title: "Location Intelligence",
      description: "Explore neighborhood data, amenities, and development projects",
      href: "/tools/location-intelligence",
      cost: 2,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-950/20",
      comingSoon: true,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Tools</CardTitle>
        <CardDescription>Property intelligence tools at your fingertips</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <div
                key={tool.title}
                className={`relative rounded-lg border p-4 hover:shadow-md transition-shadow ${tool.bgColor}`}
              >
                {tool.comingSoon && (
                  <Badge variant="secondary" className="absolute top-4 right-4">
                    Coming Soon
                  </Badge>
                )}
                <div className="flex items-start gap-4">
                  <div className={`h-10 w-10 rounded-lg ${tool.bgColor} flex items-center justify-center shrink-0`}>
                    <Icon className={`h-5 w-5 ${tool.color}`} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-foreground">{tool.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{tool.description}</p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-muted-foreground">
                        {tool.cost} {tool.cost === 1 ? "credit" : "credits"}
                      </span>
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        disabled={credits < tool.cost || tool.comingSoon}
                      >
                        <Link href={tool.href}>
                          {tool.comingSoon ? "Coming Soon" : "Launch"}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
