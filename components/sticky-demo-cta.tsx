"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Phone, X } from "lucide-react"
import { DemoForm } from "@/components/demo-form"

export function StickyDemoCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling past hero section (approximately 100vh)
      setIsVisible(window.scrollY > window.innerHeight)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-4 right-4 z-50 md:hidden">
        <Button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white rounded-full shadow-lg px-6 py-3 flex items-center gap-2 animate-pulse"
        >
          <Phone className="w-4 h-4" />
          Book Demo
        </Button>
      </div>

      {/* Desktop Sticky Rail */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
        <div className="bg-gradient-to-b from-indigo-500 to-blue-600 rounded-full p-1 shadow-lg">
          <Button
            onClick={() => setShowForm(true)}
            className="bg-white text-indigo-600 hover:bg-gray-50 rounded-full px-4 py-8 flex flex-col items-center gap-2 text-sm font-semibold"
          >
            <Phone className="w-5 h-5" />
            <span className="writing-mode-vertical-rl text-orientation-mixed">Schedule Demo</span>
          </Button>
        </div>
      </div>

      {/* Demo Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <Button
              onClick={() => setShowForm(false)}
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 z-10"
            >
              <X className="w-4 h-4" />
            </Button>
            <DemoForm title="Schedule Your Demo" onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </>
  )
}
