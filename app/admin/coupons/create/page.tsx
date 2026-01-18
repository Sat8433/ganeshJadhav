import { createServerClient } from "@/lib/supabase/server"
import { checkUserRole } from "@/lib/auth/roles"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CouponCreateForm } from "@/components/admin/coupon-create-form"

export default async function CreateCouponPage() {
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

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-bold text-3xl">Create Coupon</h1>
        <p className="text-muted-foreground">Create a new discount coupon or festival campaign</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coupon Details</CardTitle>
          <CardDescription>Fill in the details for your new coupon</CardDescription>
        </CardHeader>
        <CardContent>
          <CouponCreateForm />
        </CardContent>
      </Card>
    </div>
  )
}
