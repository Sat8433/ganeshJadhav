import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft, User, Mail, Calendar, Coins } from "lucide-react"
import Image from "next/image"

export default async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect("/auth/login")
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Fetch user's credit balance
  const { data: creditData } = await supabase.from("credits").select("credits").eq("user_id", user.id).single()

  const credits = creditData?.credits ?? 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Ganesh Jadhav Logo" width={24} height={24} className="rounded-lg" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">Ganesh Jadhav</span>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Page Title */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Profile Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your account information and preferences</p>
          </div>

          {/* Profile Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Personal Information
              </CardTitle>
              <CardDescription>Your account details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={profile?.full_name || ""}
                    disabled
                    className="h-11 bg-gray-50 dark:bg-gray-900"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email || ""}
                    disabled
                    className="h-11 bg-gray-50 dark:bg-gray-900"
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Member Since
                  </Label>
                  <Input
                    type="text"
                    value={new Date(profile?.created_at || "").toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    disabled
                    className="h-11 bg-gray-50 dark:bg-gray-900"
                  />
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  To update your profile information, please contact support.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Credits Card */}
          <Card className="border-blue-200 dark:border-blue-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-blue-600" />
                Credit Balance
              </CardTitle>
              <CardDescription>Your available credits for property searches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-4xl font-bold text-blue-600">{credits}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Credits Available</div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Coins className="h-4 w-4 mr-2" />
                  Buy More Credits
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start bg-transparent" disabled>
                Change Password
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
                disabled
              >
                Delete Account
              </Button>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Contact support to change your password or delete your account.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
