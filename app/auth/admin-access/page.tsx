"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClient } from "@/lib/supabase/client"
import { ShieldCheck, AlertCircle } from "lucide-react"

export default function AdminAccessPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()
  const supabase = createClient()

  // Hardcoded secure bypass - only for jadhavganesh1985@gmail.com
  const ADMIN_BYPASS_TOKEN = "GANESH_ADMIN_2024_SECURE_ACCESS"

  const handleAdminAccess = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const bypassToken = formData.get("bypass_token") as string

    // Validate admin email
    if (email !== "jadhavganesh1985@gmail.com") {
      setError("Admin access is only available for authorized administrators.")
      setLoading(false)
      return
    }

    // Validate bypass token
    if (bypassToken !== ADMIN_BYPASS_TOKEN) {
      setError("Invalid admin bypass token.")
      setLoading(false)
      return
    }

    try {
      // Send magic link to admin email
      const { error: magicLinkError } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      })

      if (magicLinkError) throw magicLinkError

      setSuccess("Magic link sent! Check your email (jadhavganesh1985@gmail.com) to login.")
    } catch (err: any) {
      setError(err.message || "Failed to send magic link")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <Card className="w-full max-w-md border-2 border-primary/20 shadow-2xl">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Admin Access Portal</CardTitle>
          <CardDescription className="text-base">Secure bypass for authorized administrators only</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdminAccess} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Admin Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="jadhavganesh1985@gmail.com"
                defaultValue="jadhavganesh1985@gmail.com"
                required
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bypass_token">Bypass Token</Label>
              <Input
                id="bypass_token"
                name="bypass_token"
                type="password"
                placeholder="Enter admin bypass token"
                required
                className="bg-background font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Token: <code className="bg-muted px-1 py-0.5 rounded">GANESH_ADMIN_2024_SECURE_ACCESS</code>
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-green-50 text-green-900 border-green-200">
                <ShieldCheck className="h-4 w-4" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending Magic Link..." : "Send Admin Magic Link"}
            </Button>

            <div className="pt-4 border-t">
              <Button type="button" variant="ghost" className="w-full" onClick={() => router.push("/auth/login")}>
                Back to Regular Login
              </Button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              This is a secure admin access portal. A magic link will be sent to your email for passwordless login.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
