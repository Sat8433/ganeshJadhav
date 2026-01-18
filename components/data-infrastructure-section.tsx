"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"

export function DataInfrastructureSection() {
  const [counters, setCounters] = useState({
    propertyRecords: 0,
    projects: 0,
    reraRecords: 0,
    titleRecords: 0,
    listings: 0,
    visitors: 0,
    partners: 0,
    transactions: 0,
  })

  useEffect(() => {
    const targets = {
      propertyRecords: 46.12,
      projects: 150,
      reraRecords: 1.16,
      titleRecords: 1.49,
      listings: 1,
      visitors: 8,
      partners: 50,
      transactions: 120,
    }

    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps

      setCounters({
        propertyRecords: Math.min(targets.propertyRecords * progress, targets.propertyRecords),
        projects: Math.min(targets.projects * progress, targets.projects),
        reraRecords: Math.min(targets.reraRecords * progress, targets.reraRecords),
        titleRecords: Math.min(targets.titleRecords * progress, targets.titleRecords),
        listings: Math.min(targets.listings * progress, targets.listings),
        visitors: Math.min(targets.visitors * progress, targets.visitors),
        partners: Math.min(targets.partners * progress, targets.partners),
        transactions: Math.min(targets.transactions * progress, targets.transactions),
      })

      if (step >= steps) {
        clearInterval(timer)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-[#14B8A6] text-white">Data Infrastructure</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-poppins">
            Powering Real Estate With Comprehensive &<br />
            Authenticated Data Infrastructure
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built on authenticated, AI-orchestrated data infrastructure spanning government databases and the Ganesh
            Jadhav network
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* Public Records */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-[#4F46E5] to-[#2563EB] text-white px-6 py-3 rounded-xl inline-block">
              <span className="text-sm font-semibold">Public Records</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl text-center border border-gray-200 card-hover">
                <div className="text-3xl font-bold text-[#163B6E] mb-2">{counters.propertyRecords.toFixed(2)}M</div>
                <div className="text-sm text-gray-600 font-medium">Property Registration Records</div>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl text-center border border-gray-200 card-hover">
                <div className="text-3xl font-bold text-[#163B6E] mb-2">{Math.round(counters.projects)}K</div>
                <div className="text-sm text-gray-600 font-medium">Real Estate Projects Tracked</div>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl text-center border border-gray-200 card-hover">
                <div className="text-3xl font-bold text-[#163B6E] mb-2">{counters.reraRecords.toFixed(2)}M</div>
                <div className="text-sm text-gray-600 font-medium">RERA Records</div>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl text-center border border-gray-200 card-hover">
                <div className="text-3xl font-bold text-[#163B6E] mb-2">{counters.titleRecords.toFixed(2)}M</div>
                <div className="text-sm text-gray-600 font-medium">Title Records</div>
              </div>
            </div>
          </div>

          {/* Enhanced Data Layer Visualization */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-[#4F46E5] via-[#2563EB] to-[#14B8A6] flex items-center justify-center text-white shadow-2xl">
                <div className="text-center p-8">
                  <div className="text-2xl font-bold mb-4 font-poppins">AI DATA LAYER</div>
                  <div className="space-y-3 text-sm">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                      <div className="font-semibold">Visualization Layer</div>
                      <div className="text-xs opacity-90">Heatmaps, Price Trends, Analytics</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                      <div className="font-semibold">Intelligence Layer</div>
                      <div className="text-xs opacity-90">AVM, Risk Assessment, Predictions</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                      <div className="font-semibold">Authentication Layer</div>
                      <div className="text-xs opacity-90">Verified Records, Legal Validation</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#14B8A6] rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#4F46E5] rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Ganesh Jadhav Network */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-[#14B8A6] to-[#0891B2] text-white px-6 py-3 rounded-xl inline-block">
              <span className="text-sm font-semibold">Ganesh Jadhav Network</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl text-center border border-gray-200 card-hover">
                <div className="text-3xl font-bold text-[#163B6E] mb-2">{Math.round(counters.listings)}M+</div>
                <div className="text-sm text-gray-600 font-medium">Active Listings (Supply)</div>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl text-center border border-gray-200 card-hover">
                <div className="text-3xl font-bold text-[#163B6E] mb-2">{Math.round(counters.visitors)}M+</div>
                <div className="text-sm text-gray-600 font-medium">Monthly Visitors (Demand)</div>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl text-center border border-gray-200 card-hover">
                <div className="text-3xl font-bold text-[#163B6E] mb-2">{Math.round(counters.partners)}K</div>
                <div className="text-sm text-gray-600 font-medium">Verified Partners</div>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl text-center border border-gray-200 card-hover">
                <div className="text-3xl font-bold text-[#163B6E] mb-2">{Math.round(counters.transactions)}K</div>
                <div className="text-sm text-gray-600 font-medium">Property Transactions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
