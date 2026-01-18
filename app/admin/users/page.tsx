import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { checkUserRole } from "@/lib/auth/roles"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Shield, Mail, Calendar } from "lucide-react"

export default async function UsersPage() {
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

  // Fetch users with their roles
  const { data: users } = await supabase
    .from("user_roles")
    .select("*, profiles(*)")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground">Manage users and their roles</p>
      </div>

      <div className="grid gap-4">
        {users?.map((userRole) => (
          <Card key={userRole.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{userRole.profiles?.email?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{userRole.profiles?.email}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Mail className="h-3 w-3" />
                      {userRole.profiles?.email}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  {userRole.role}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  Joined {new Date(userRole.created_at).toLocaleDateString()}
                </div>
                <Button variant="outline" size="sm">
                  Edit Role
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
