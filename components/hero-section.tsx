"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DemoForm } from "@/components/demo-form"
import { PropertySearchHero } from "@/components/property-search-hero"

export function HeroSection() {
  const [isDemoFormOpen, setIsDemoFormOpen] = useState(false)

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#0B1220] via-[#163B6E] to-[#2563EB] overflow-hidden pb-24">
      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-32 pb-32">
        <div className="max-w-3xl">
          <p className="text-[#60A5FA] text-lg mb-4 font-inter">
            Powered by authenticated, AI-orchestrated data infrastructure
          </p>
          <h1 className="text-white text-5xl lg:text-7xl font-bold leading-tight mb-8 font-poppins">
            Real Estate
            <br />
            Data Intelligence
            <br />
            <span className="text-[#14B8A6]">for faster, smarter deals</span>
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button
              size="lg"
              onClick={() => setIsDemoFormOpen(true)}
              className="bg-[#4F46E5] hover:bg-[#4F46E5]/90 text-white px-8 py-4 text-lg font-semibold"
            >
              Request a Demo →
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-[#163B6E] bg-transparent px-8 py-4 text-lg"
            >
              Explore Modules
            </Button>
          </div>

          {/* Animated stat chips */}
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm animate-float">
              46M+ Property Records
            </div>
            <div
              className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm animate-float"
              style={{ animationDelay: "0.5s" }}
            >
              AI-Powered Valuations
            </div>
            <div
              className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm animate-float"
              style={{ animationDelay: "1s" }}
            >
              Real-time Analytics
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced 3D Isometric Buildings Illustration */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 h-full">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Building structures with enhanced 3D effect */}
          <div className="relative">
            {/* Main building cluster */}
            <div className="absolute top-20 right-20">
              <div className="w-28 h-36 bg-gradient-to-b from-[#14B8A6] to-[#0891B2] transform rotate-12 skew-y-12 shadow-2xl rounded-t-lg"></div>
              <div className="w-24 h-32 bg-gradient-to-b from-[#4F46E5] to-[#3730A3] transform -rotate-6 skew-y-6 shadow-xl absolute -left-8 top-4 rounded-t-lg"></div>
            </div>

            {/* Secondary buildings */}
            <div className="absolute top-32 right-40">
              <div className="w-20 h-28 bg-gradient-to-b from-[#2563EB] to-[#1D4ED8] transform rotate-6 skew-y-3 shadow-lg rounded-t-lg"></div>
            </div>

            {/* Data visualization elements */}
            <div className="absolute top-16 right-32 w-10 h-10 bg-[#14B8A6] rounded-full animate-pulse flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <div className="absolute top-40 right-16 w-8 h-8 bg-[#4F46E5] rounded-full animate-bounce flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>

            {/* Enhanced chart elements */}
            <div className="absolute top-24 right-8 w-16 h-12 bg-white/20 backdrop-blur-sm rounded-lg transform rotate-12 flex items-center justify-center">
              <div className="w-8 h-6 bg-[#14B8A6] rounded opacity-80"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced floating data elements */}
      <div className="absolute top-1/4 right-1/4 w-6 h-6 bg-[#14B8A6] rounded-full animate-ping"></div>
      <div className="absolute top-3/4 right-1/3 w-4 h-4 bg-[#4F46E5] rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-1/5 w-5 h-5 bg-[#2563EB] rounded-full animate-bounce"></div>

      <div className="relative z-30 container mx-auto px-6 lg:px-12 -mt-8">
        <PropertySearchHero />
      </div>

      <DemoForm
        isOpen={isDemoFormOpen}
        onClose={() => setIsDemoFormOpen(false)}
        title="Request a Demo - Ganesh Jadhav"
      />
    </section>
  )
}
