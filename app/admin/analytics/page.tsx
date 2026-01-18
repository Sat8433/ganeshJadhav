import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { checkUserRole } from "@/lib/auth/roles"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Users, Eye } from "lucide-react"

export default async function AnalyticsPage() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const hasAccess = await checkUserRole(user.id, ["superadmin", "admin"])

  if (!hasAccess) {
    redirect("/dashboard")
  }

  // Fetch analytics data
  const { data: analytics } = await supabase
    .from("analytics")
    .select("*")
    .order("timestamp", { ascending: false })
    .limit(100)

  // Calculate stats
  const totalPageViews = analytics?.length || 0
  const uniqueVisitors = new Set(analytics?.map((a) => a.user_id)).size
  const avgSessionDuration =
    analytics?.reduce((acc, a) => acc + (a.session_duration || 0), 0) / (analytics?.length || 1)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Track website performance and user behavior</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPageViews}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueVisitors}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(avgSessionDuration)}s</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest page views and user interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics?.slice(0, 10).map((event) => (
              <div key={event.id} className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{event.page_url}</p>
                  <p className="text-sm text-muted-foreground">{event.event_type}</p>
                </div>
                <div className="text-sm text-muted-foreground">{new Date(event.timestamp).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
