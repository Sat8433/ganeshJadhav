import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { checkUserRole } from "@/lib/auth/roles"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"

export default async function BlogsPage() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const hasAccess = await checkUserRole(user.id, ["superadmin", "admin", "editor"])

  if (!hasAccess) {
    redirect("/dashboard")
  }

  // Fetch blogs
  const { data: blogs } = await supabase.from("blogs").select("*").order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground">Create and manage blog posts</p>
        </div>
        <Link href="/admin/blogs/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {blogs?.map((blog) => (
          <Card key={blog.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle>{blog.title}</CardTitle>
                  <CardDescription>{blog.excerpt}</CardDescription>
                </div>
                <Badge variant={blog.status === "published" ? "default" : "secondary"}>{blog.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">{new Date(blog.created_at).toLocaleDateString()}</div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
