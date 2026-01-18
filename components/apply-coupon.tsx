"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createBrowserClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Gift, Loader2 } from "lucide-react"

export function ApplyCoupon({ onSuccess }: { onSuccess?: () => void }) {
  const [couponCode, setCouponCode] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const supabase = createBrowserClient()

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!couponCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a coupon code",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        throw new Error("Please log in to apply coupons")
      }

      // Call the apply_coupon function
      const { data, error } = await supabase.rpc("apply_coupon", {
        p_coupon_code: couponCode.toUpperCase(),
        p_user_id: user.id,
      })

      if (error) throw error

      if (data.success) {
        toast({
          title: "Success! 🎉",
          description: `${data.credits_awarded} credits added to your account`,
        })
        setCouponCode("")
        onSuccess?.()
      } else {
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        })
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to apply coupon",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-5 w-5" />
          Apply Coupon
        </CardTitle>
        <CardDescription>Enter a coupon code to get free credits</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleApplyCoupon} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="coupon">Coupon Code</Label>
            <div className="flex gap-2">
              <Input
                id="coupon"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="Enter coupon code"
                className="font-mono uppercase"
                disabled={loading}
              />
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Applying...
                  </>
                ) : (
                  "Apply"
                )}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
