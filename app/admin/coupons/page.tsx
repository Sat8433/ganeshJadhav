import { createServerClient } from "@/lib/supabase/server"
import { checkUserRole } from "@/lib/auth/roles"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Gift, Calendar, TrendingUp } from "lucide-react"
import Link from "next/link"

export default async function CouponsPage() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const hasAccess = await checkUserRole(user.id, ["admin", "superadmin"])

  if (!hasAccess) {
    redirect("/dashboard")
  }

  // Fetch all coupons
  const { data: coupons } = await supabase.from("coupons").select("*").order("created_at", { ascending: false })

  // Fetch coupon usage statistics
  const { data: usageStats } = await supabase.from("coupon_usage").select("coupon_id, credits_awarded")

  // Calculate stats
  const totalCoupons = coupons?.length || 0
  const activeCoupons = coupons?.filter((c) => c.is_active).length || 0
  const totalCreditsAwarded = usageStats?.reduce((sum, u) => sum + u.credits_awarded, 0) || 0
  const totalRedemptions = usageStats?.length || 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl">Coupon Management</h1>
          <p className="text-muted-foreground">Create and manage discount coupons</p>
        </div>
        <Link href="/admin/coupons/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Coupon
          </Button>
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="gap-4 grid md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Total Coupons</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{totalCoupons}</div>
            <p className="text-muted-foreground text-xs">{activeCoupons} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Total Redemptions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{totalRedemptions}</div>
            <p className="text-muted-foreground text-xs">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Credits Awarded</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{totalCreditsAwarded.toLocaleString()}</div>
            <p className="text-muted-foreground text-xs">Total credits given</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Active Campaigns</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{activeCoupons}</div>
            <p className="text-muted-foreground text-xs">Currently running</p>
          </CardContent>
        </Card>
      </div>

      {/* Coupons List */}
      <Card>
        <CardHeader>
          <CardTitle>All Coupons</CardTitle>
          <CardDescription>Manage your coupon codes and campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {coupons?.map((coupon) => (
              <div key={coupon.id} className="flex items-center justify-between border-b p-4 last:border-0">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold text-lg">{coupon.code}</span>
                    <Badge variant={coupon.is_active ? "default" : "secondary"}>
                      {coupon.is_active ? "Active" : "Inactive"}
                    </Badge>
                    <Badge variant="outline">{coupon.coupon_type}</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">{coupon.description}</p>
                  <div className="flex gap-4 text-muted-foreground text-xs">
                    <span>Credits: {coupon.credit_amount}</span>
                    {coupon.max_uses_per_user && <span>Max uses: {coupon.max_uses_per_user}/year</span>}
                    {coupon.valid_until && <span>Expires: {new Date(coupon.valid_until).toLocaleDateString()}</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/coupons/${coupon.id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}

            {!coupons ||
              (coupons.length === 0 && (
                <div className="py-8 text-center text-muted-foreground">
                  No coupons found. Create your first coupon to get started.
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
