import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, BarChart3, CreditCard, TrendingUp, Eye } from "lucide-react"

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Fetch statistics
  const [
    { count: totalUsers },
    { count: totalBlogs },
    { count: publishedBlogs },
    { count: totalPayments },
    { data: recentPayments },
    { data: recentBlogs },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("blogs").select("*", { count: "exact", head: true }),
    supabase.from("blogs").select("*", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("payments").select("*", { count: "exact", head: true }),
    supabase.from("payments").select("*").order("created_at", { ascending: false }).limit(5),
    supabase.from("blogs").select("*").order("created_at", { ascending: false }).limit(5),
  ])

  const stats = [
    {
      title: "Total Users",
      value: totalUsers || 0,
      icon: Users,
      description: "Registered users",
      trend: "+12%",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Total Blogs",
      value: totalBlogs || 0,
      icon: FileText,
      description: `${publishedBlogs || 0} published`,
      trend: "+8%",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Total Payments",
      value: totalPayments || 0,
      icon: CreditCard,
      description: "All transactions",
      trend: "+23%",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      title: "Analytics Events",
      value: "12.5K",
      icon: BarChart3,
      description: "This month",
      trend: "+15%",
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Welcome to your admin panel. Manage your platform from here.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {stat.trend}
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-400">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Blogs</CardTitle>
            <CardDescription>Latest blog posts created</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBlogs && recentBlogs.length > 0 ? (
                recentBlogs.map((blog) => (
                  <div key={blog.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{blog.title}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {blog.status} • {new Date(blog.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                      <Eye className="h-3 w-3" />
                      {blog.views}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600 dark:text-gray-400">No blogs yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
            <CardDescription>Latest payment transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPayments && recentPayments.length > 0 ? (
                recentPayments.map((payment) => (
                  <div key={payment.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                    <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
                      <CreditCard className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        ${payment.amount} {payment.currency}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {payment.status} • {new Date(payment.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600 dark:text-gray-400">No payments yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
