import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { checkUserRole } from "@/lib/auth/roles"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, CreditCard, TrendingUp } from "lucide-react"

export default async function PaymentsPage() {
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

  // Fetch payments
  const { data: payments } = await supabase.from("payments").select("*").order("created_at", { ascending: false })

  // Calculate stats
  const totalRevenue = payments?.reduce((acc, p) => acc + p.amount, 0) || 0
  const successfulPayments = payments?.filter((p) => p.status === "completed").length || 0
  const pendingPayments = payments?.filter((p) => p.status === "pending").length || 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payment Management</h1>
        <p className="text-muted-foreground">Track and manage all transactions</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successfulPayments}</div>
            <p className="text-xs text-muted-foreground">{payments?.length || 0} total transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingPayments}</div>
            <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest payment activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments?.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between border-b pb-4">
                <div className="space-y-1">
                  <p className="font-medium">{payment.description}</p>
                  <p className="text-sm text-muted-foreground">Transaction ID: {payment.transaction_id}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-bold">₹{payment.amount.toLocaleString()}</p>
                  <Badge variant={payment.status === "completed" ? "default" : "secondary"}>{payment.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
