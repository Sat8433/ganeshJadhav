import { createClient } from "@/lib/supabase/server"

export type UserRole = "user" | "admin" | "superadmin"

export async function getUserRole(userId: string): Promise<UserRole | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", userId).single()

  if (error || !data) {
    return null
  }

  return data.role as UserRole
}

export async function isAdmin(userId: string): Promise<boolean> {
  const role = await getUserRole(userId)
  return role === "admin" || role === "superadmin"
}

export async function isSuperAdmin(userId: string): Promise<boolean> {
  const role = await getUserRole(userId)
  return role === "superadmin"
}

export async function requireAdmin() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  const admin = await isAdmin(user.id)
  if (!admin) {
    throw new Error("Forbidden: Admin access required")
  }

  return user
}

export async function requireSuperAdmin() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  const superAdmin = await isSuperAdmin(user.id)
  if (!superAdmin) {
    throw new Error("Forbidden: Superadmin access required")
  }

  return user
}

export async function checkUserRole(userId: string, allowedRoles: UserRole[]): Promise<boolean> {
  const role = await getUserRole(userId)
  if (!role) {
    return false
  }
  return allowedRoles.includes(role)
}
