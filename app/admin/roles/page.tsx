import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { checkUserRole } from "@/lib/auth/roles"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Lock } from "lucide-react"

export default async function RolesPage() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const hasAccess = await checkUserRole(user.id, ["superadmin"])

  if (!hasAccess) {
    redirect("/dashboard")
  }

  // Fetch role statistics
  const { data: roleStats } = await supabase.from("user_roles").select("role")

  const roleCounts =
    roleStats?.reduce(
      (acc, { role }) => {
        acc[role] = (acc[role] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    ) || {}

  const roles = [
    {
      name: "superadmin",
      description: "Full system access with all permissions",
      permissions: ["All Permissions"],
      color: "destructive",
      icon: Shield,
      count: roleCounts["superadmin"] || 0,
    },
    {
      name: "admin",
      description: "Administrative access to manage users and content",
      permissions: ["User Management", "Content Management", "Analytics", "Payments"],
      color: "default",
      icon: Lock,
      count: roleCounts["admin"] || 0,
    },
    {
      name: "editor",
      description: "Can create and edit blog posts",
      permissions: ["Blog Management", "Content Creation"],
      color: "secondary",
      icon: Users,
      count: roleCounts["editor"] || 0,
    },
    {
      name: "user",
      description: "Standard user with basic access",
      permissions: ["View Content", "Use Tools"],
      color: "outline",
      icon: Users,
      count: roleCounts["user"] || 0,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Role & Permissions</h1>
        <p className="text-muted-foreground">Manage user roles and access control</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {roles.map((role) => {
          const Icon = role.icon
          return (
            <Card key={role.name}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="capitalize">{role.name}</CardTitle>
                      <CardDescription>{role.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={role.color as any}>{role.count} users</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Permissions:</p>
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((permission) => (
                      <Badge key={permission} variant="outline" className="text-xs">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
