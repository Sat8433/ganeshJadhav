import { Card, CardContent } from "@/components/ui/card"
import { Coins, Ticket, TrendingUp, Zap } from 'lucide-react'

interface DashboardStatsProps {
  credits: number
  couponUsage: number
  isSuperAdmin: boolean
}

export function DashboardStats({ credits, couponUsage, isSuperAdmin }: DashboardStatsProps) {
  const maxCouponsPerYear = isSuperAdmin ? Infinity : 12
  const remainingCoupons = isSuperAdmin ? "Unlimited" : Math.max(0, maxCouponsPerYear - couponUsage)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Available Credits</p>
              <h3 className="text-3xl font-bold text-foreground mt-2">{credits}</h3>
              <p className="text-xs text-muted-foreground mt-1">1 credit per search</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Coins className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Coupon Uses</p>
              <h3 className="text-3xl font-bold text-foreground mt-2">
                {typeof remainingCoupons === "number" ? remainingCoupons : "∞"}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">Remaining this year</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
              <Ticket className="h-6 w-6 text-secondary-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Searches</p>
              <h3 className="text-3xl font-bold text-foreground mt-2">0</h3>
              <p className="text-xs text-muted-foreground mt-1">All-time queries</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-accent-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Quick Access</p>
              <h3 className="text-3xl font-bold text-foreground mt-2">4</h3>
              <p className="text-xs text-muted-foreground mt-1">Active tools</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
              <Zap className="h-6 w-6 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
