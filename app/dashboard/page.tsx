import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { DashboardTools } from "@/components/dashboard/dashboard-tools"
import { DashboardActivity } from "@/components/dashboard/dashboard-activity"
import { DashboardPayments } from "@/components/dashboard/dashboard-payments"
import { DashboardUsage } from "@/components/dashboard/dashboard-usage"
import { ApplyCoupon } from "@/components/apply-coupon"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    console.log("[v0] No authenticated user, redirecting to login from: /dashboard")
    redirect("/auth/login")
  }

  let credits = 0
  let profile = null
  let userRole = "user"
  let isSuperAdmin = false
  let payments: any[] = []
  let activities: any[] = []
  let couponCount = 0

  try {
    // Fetch credit balance
    const { data: creditData } = await supabase.from("credits").select("balance").eq("user_id", user.id).maybeSingle()

    credits = creditData?.balance ?? 0
  } catch (error) {
    console.error("[v0] Credits query failed, using default:", error)
  }

  try {
    // Fetch user profile
    const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle()

    profile = profileData
  } catch (error) {
    console.error("[v0] Profile query failed:", error)
  }

  try {
    // Fetch user role - if this fails, user still gets access as regular user
    const { data: roleData } = await supabase.from("user_roles").select("role").eq("user_id", user.id).maybeSingle()

    if (roleData) {
      userRole = roleData.role
      isSuperAdmin = userRole === "superadmin"
    }
  } catch (error) {
    console.error("[v0] Role query failed, defaulting to regular user:", error)
  }

  try {
    // Fetch recent payments
    const { data: paymentData } = await supabase
      .from("payments")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5)

    payments = paymentData || []
  } catch (error) {
    console.error("[v0] Payments query failed:", error)
  }

  try {
    // Fetch recent analytics events
    const { data: activityData } = await supabase
      .from("analytics_events")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10)

    activities = activityData || []
  } catch (error) {
    console.error("[v0] Activities query failed:", error)
  }

  try {
    // Fetch coupon usage
    const currentYear = new Date().getFullYear()
    const { count } = await supabase
      .from("coupon_usage")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("year", currentYear)

    couponCount = count ?? 0
  } catch (error) {
    console.error("[v0] Coupon usage query failed:", error)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} profile={profile} role={userRole} />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">
            Welcome back, {profile?.full_name || user.email?.split("@")[0] || "User"}!
          </h1>
          <p className="text-muted-foreground text-lg">
            {isSuperAdmin
              ? "Manage your platform with superadmin access"
              : "Access property intelligence and transaction data"}
          </p>
        </div>

        {/* Stats Overview */}
        <DashboardStats credits={credits} couponUsage={couponCount} isSuperAdmin={isSuperAdmin} />

        {/* Coupon Section */}
        <ApplyCoupon />

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tools Section */}
            <DashboardTools credits={credits} />

            {/* Usage Chart */}
            <DashboardUsage activities={activities} />

            {/* Recent Activity */}
            <DashboardActivity activities={activities} />
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-8">
            {/* Recent Payments */}
            <DashboardPayments payments={payments} />
          </div>
        </div>
      </main>
    </div>
  )
}
