"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { createBrowserClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

const FESTIVAL_TEMPLATES = [
  { name: "Diwali", emoji: "🪔", description: "Festival of Lights special offer" },
  { name: "New Year", emoji: "🎉", description: "New Year celebration discount" },
  { name: "Christmas", emoji: "🎄", description: "Christmas special offer" },
  { name: "Black Friday", emoji: "🛍️", description: "Black Friday mega sale" },
  { name: "Cyber Monday", emoji: "💻", description: "Cyber Monday tech deals" },
  { name: "Holi", emoji: "🎨", description: "Festival of Colors special" },
  { name: "Ganpati", emoji: "🙏", description: "Ganesh Chaturthi celebration" },
  { name: "Navratri", emoji: "💃", description: "Navratri festival special" },
]

export function CouponCreateForm() {
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createBrowserClient()

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    creditAmount: "1000",
    couponType: "promotional",
    maxUsesPerUser: "12",
    validUntil: "",
    isActive: true,
  })

  const handleFestivalTemplate = (festival: (typeof FESTIVAL_TEMPLATES)[0]) => {
    const code = festival.name.toUpperCase().replace(/\s+/g, "")
    setFormData({
      ...formData,
      code,
      description: festival.description,
      couponType: "festival",
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        throw new Error("Not authenticated")
      }

      const { error } = await supabase.from("coupons").insert({
        code: formData.code.toUpperCase(),
        description: formData.description,
        credit_amount: Number.parseInt(formData.creditAmount),
        coupon_type: formData.couponType,
        max_uses_per_user: formData.maxUsesPerUser ? Number.parseInt(formData.maxUsesPerUser) : null,
        valid_until: formData.validUntil || null,
        is_active: formData.isActive,
        created_by: user.id,
      })

      if (error) throw error

      toast({
        title: "Success",
        description: "Coupon created successfully",
      })

      router.push("/admin/coupons")
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Festival Templates */}
      <div>
        <Label>Festival Templates (Quick Create)</Label>
        <div className="gap-2 grid grid-cols-2 mt-2 md:grid-cols-4">
          {FESTIVAL_TEMPLATES.map((festival) => (
            <Button
              key={festival.name}
              type="button"
              variant="outline"
              className="h-auto flex-col py-3 bg-transparent"
              onClick={() => handleFestivalTemplate(festival)}
            >
              <span className="text-2xl">{festival.emoji}</span>
              <span className="text-xs">{festival.name}</span>
            </Button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="code">Coupon Code *</Label>
          <Input
            id="code"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            placeholder="e.g., DIWALI2024"
            required
            className="font-mono uppercase"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe this coupon..."
          />
        </div>

        <div className="gap-4 grid md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="creditAmount">Credit Amount *</Label>
            <Input
              id="creditAmount"
              type="number"
              value={formData.creditAmount}
              onChange={(e) => setFormData({ ...formData, creditAmount: e.target.value })}
              required
              min="1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="couponType">Coupon Type *</Label>
            <Select
              value={formData.couponType}
              onValueChange={(value) => setFormData({ ...formData, couponType: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="promotional">Promotional</SelectItem>
                <SelectItem value="festival">Festival</SelectItem>
                <SelectItem value="superadmin">Superadmin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="gap-4 grid md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="maxUsesPerUser">Max Uses Per User/Year</Label>
            <Input
              id="maxUsesPerUser"
              type="number"
              value={formData.maxUsesPerUser}
              onChange={(e) => setFormData({ ...formData, maxUsesPerUser: e.target.value })}
              placeholder="Leave empty for unlimited"
              min="1"
            />
            <p className="text-muted-foreground text-xs">Leave empty for unlimited uses</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="validUntil">Valid Until</Label>
            <Input
              id="validUntil"
              type="date"
              value={formData.validUntil}
              onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
            />
            <p className="text-muted-foreground text-xs">Leave empty for no expiration</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="isActive"
            checked={formData.isActive}
            onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
          />
          <Label htmlFor="isActive">Active</Label>
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Coupon"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
