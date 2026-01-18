"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Building, MapPin } from "lucide-react"
import { DemoForm } from "@/components/demo-form"

export function PropertyRatesDashboard() {
  const [isDemoFormOpen, setIsDemoFormOpen] = useState(false)

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* In Numbers Section - matching the attachment design */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#163B6E] mb-12">In Numbers</h2>

          <div className="flex justify-center items-center gap-16 md:gap-24 lg:gap-32">
            <div className="text-center">
              <div className="text-6xl md:text-7xl font-bold text-[#4F46E5] mb-2">
                8.6<span className="text-4xl">mn+</span>
              </div>
              <div className="text-gray-600 font-medium text-lg">Transaction Records</div>
            </div>
            <div className="text-center">
              <div className="text-6xl md:text-7xl font-bold text-[#14B8A6] mb-2">
                140<span className="text-4xl">k+</span>
              </div>
              <div className="text-gray-600 font-medium text-lg">Projects Covered</div>
            </div>
            <div className="text-center">
              <div className="text-6xl md:text-7xl font-bold text-[#163B6E] mb-2">11</div>
              <div className="text-gray-600 font-medium text-lg">Cities</div>
            </div>
          </div>
        </div>

        {/* Property Rates in Maharashtra Cities */}
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-[#163B6E] mb-4">Property Rates in Maharashtra Cities</h3>
          <p className="text-xl text-gray-600 mb-8">Real-time market data from government registry records</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-[#163B6E]">₹18,324</div>
              <div className="text-sm text-gray-600 font-medium">Mumbai</div>
              <div className="text-xs text-green-600">+1.9%</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-[#163B6E]">₹13,881</div>
              <div className="text-sm text-gray-600 font-medium">Navi Mumbai</div>
              <div className="text-xs text-green-600">+1.5%</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-[#163B6E]">₹8,916</div>
              <div className="text-sm text-gray-600 font-medium">Thane</div>
              <div className="text-xs text-green-600">+1.5%</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-[#163B6E]">₹7,086</div>
              <div className="text-sm text-gray-600 font-medium">Pune</div>
              <div className="text-xs text-green-600">+3.6%</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-[#163B6E]">₹4,568</div>
              <div className="text-sm text-gray-600 font-medium">Palghar</div>
              <div className="text-xs text-green-600">+4.1%</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-[#163B6E]">₹3,245</div>
              <div className="text-sm text-gray-600 font-medium">Raigad</div>
              <div className="text-xs text-green-600">+3.1%</div>
            </div>
          </div>
        </div>

        {/* Market Value Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-[#163B6E] mb-4">Check Current Market Value of any Property</h3>
          <p className="text-xl text-gray-600 mb-8">Buy, Lease or Sell with Confidence</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#4F46E5] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-[#163B6E] mb-3">For Home Buyers</h4>
                <p className="text-gray-600 text-sm">
                  Pick a building or locality of your interest and see last 10 actual transactions before you negotiate
                  with a broker or a builder.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#14B8A6] rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-[#163B6E] mb-3">For Renters</h4>
                <p className="text-gray-600 text-sm">
                  Get accurate value of recent lease deeds of the locality that you are planning to rent. Our users can
                  save 5-10% by referring to actual transactions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#F59E0B] rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-[#163B6E] mb-3">For Owners</h4>
                <p className="text-gray-600 text-sm">
                  See your building's or project's sale and lease transaction history to get realistic valuation of your
                  property.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button
            onClick={() => setIsDemoFormOpen(true)}
            size="lg"
            className="bg-[#163B6E] hover:bg-[#163B6E]/90 text-white px-8 py-4 text-lg"
          >
            Get Started with GaneshJadhav.com →
          </Button>
        </div>
      </div>

      <DemoForm
        isOpen={isDemoFormOpen}
        onClose={() => setIsDemoFormOpen(false)}
        title="Schedule a Demo - Property Intelligence Platform"
      />
    </section>
  )
}
