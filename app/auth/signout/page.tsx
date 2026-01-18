"use client"

import { useState } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut, Loader2 } from "lucide-react"

export default function SignOutPage() {
  const router = useRouter()
  const supabase = createBrowserClient()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [message, setMessage] = useState("")

  const handleSignOut = async () => {
    setIsSigningOut(true)
    setMessage("Signing out...")

    try {
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut()

      if (error) {
        setMessage(`Error: ${error.message}`)
        setIsSigningOut(false)
        return
      }

      setMessage("Signed out successfully! Redirecting...")

      // Clear all local storage
      if (typeof window !== "undefined") {
        localStorage.clear()
        sessionStorage.clear()
      }

      // Wait a moment then redirect
      setTimeout(() => {
        router.push("/auth/login")
        router.refresh()
      }, 1000)
    } catch (error: any) {
      setMessage(`Error: ${error.message}`)
      setIsSigningOut(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Sign Out</CardTitle>
          <CardDescription>Click the button below to sign out of your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {message && <div className="p-3 rounded-md bg-muted text-sm text-center">{message}</div>}

          <Button onClick={handleSignOut} disabled={isSigningOut} className="w-full" size="lg">
            {isSigningOut ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing Out...
              </>
            ) : (
              <>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out Now
              </>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={() => router.push("/dashboard")}
            disabled={isSigningOut}
            className="w-full"
          >
            Cancel
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
