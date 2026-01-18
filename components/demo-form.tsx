"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { X, CheckCircle, AlertCircle } from "lucide-react"
import { submitDemoRequest } from "@/lib/actions/demo-requests"

interface DemoFormProps {
  isOpen?: boolean
  onClose?: () => void
  title?: string
}

export function DemoForm({ isOpen = true, onClose, title = "Request a Demo" }: DemoFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    country: "",
    message: "",
    consent: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const result = await submitDemoRequest(formData)

    setIsLoading(false)

    if (result.success) {
      console.log("[v0] Demo request submitted successfully")
      setIsSubmitted(true)
    } else {
      console.error("[v0] Demo request submission failed:", result.error)
      setError(result.error || "Failed to submit demo request. Please try again.")
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (error) setError(null)
  }

  const content = (
    <Card
      className={`w-full border-2 border-primary/20 bg-white shadow-2xl ${isOpen !== undefined ? "max-w-2xl max-h-[90vh] overflow-y-auto" : ""}`}
    >
      <CardHeader className="relative bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-primary/10">
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 hover:bg-white/80 text-gray-700 hover:text-gray-900"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <CardTitle className="text-2xl font-bold text-gray-900">{title}</CardTitle>
        <CardDescription className="text-gray-700">
          Get personalized insights into how Ganesh Jadhav&apos;s platform can accelerate your real estate business
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 bg-white">
        {isSubmitted ? (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Thank you for your interest!</h3>
            <p className="text-gray-700 mb-4">
              Our team will contact you within 24 hours to schedule your personalized demo.
            </p>
            <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-900 font-medium">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  className="border-2 border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-900 font-medium">
                  Work Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@company.com"
                  className="border-2 border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-900 font-medium">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  className="border-2 border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-gray-900 font-medium">
                  Company *
                </Label>
                <Input
                  id="company"
                  required
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  placeholder="Your company name"
                  className="border-2 border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role" className="text-gray-900 font-medium">
                  Role *
                </Label>
                <Select onValueChange={(value) => handleInputChange("role", value)} required>
                  <SelectTrigger className="border-2 border-gray-300 bg-white text-gray-900">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-200">
                    <SelectItem value="ceo">CEO/Founder</SelectItem>
                    <SelectItem value="cto">CTO/Tech Lead</SelectItem>
                    <SelectItem value="analyst">Data Analyst</SelectItem>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="banker">Banker/NBFC</SelectItem>
                    <SelectItem value="valuer">Property Valuer</SelectItem>
                    <SelectItem value="legal">Legal Professional</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country" className="text-gray-900 font-medium">
                  Country *
                </Label>
                <Select onValueChange={(value) => handleInputChange("country", value)} required>
                  <SelectTrigger className="border-2 border-gray-300 bg-white text-gray-900">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-200">
                    <SelectItem value="in">India</SelectItem>
                    <SelectItem value="ae">UAE</SelectItem>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="sg">Singapore</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-gray-900 font-medium">
                Tell us about your use case
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="What specific real estate data challenges are you looking to solve?"
                rows={4}
                className="border-2 border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
              />
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="consent"
                checked={formData.consent}
                onCheckedChange={(checked) => handleInputChange("consent", checked as boolean)}
                className="border-2 border-gray-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <Label htmlFor="consent" className="text-sm leading-relaxed text-gray-700 cursor-pointer">
                I agree to receive communications and understand that I can unsubscribe at any time. View our{" "}
                <a href="/privacy" className="text-blue-600 hover:underline font-medium">
                  Privacy Policy
                </a>
                .
              </Label>
            </div>

            <Button
              type="submit"
              disabled={!formData.consent || isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
            >
              {isLoading ? "Scheduling Demo..." : "Request Demo"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )

  if (isOpen !== undefined) {
    if (!isOpen) return null
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
        {content}
      </div>
    )
  }

  return content
}
