"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, TrendingUp, Loader2 } from "lucide-react"
import { PropertySearchResultsModal } from "@/components/property-search-results-modal"
import { createClient } from "@/lib/supabase/client"

interface Transaction {
  id: string
  unit_number: string
  property_type: string
  area_sqft: number
  registration_number: string
  registration_date: string
  last_transaction_amount: number
  owner_name: string
}

export function PropertySearchHero() {
  const [city, setCity] = useState("Mumbai")
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [totalCount, setTotalCount] = useState(0)

  const supabase = createClient()

  const handleSearch = async () => {
    if (!address.trim()) {
      console.log("[v0] Search aborted: No address provided")
      return
    }

    if (address.trim().length < 3) {
      console.log("[v0] Search aborted: Minimum 3 characters required")
      return
    }

    console.log("[v0] Starting search for:", { city, address })
    setLoading(true)

    try {
      const searchTerm = address.trim()

      console.log("[v0] Search query:", {
        city,
        searchTerm,
      })

      const { data, error, count } = await supabase
        .from("properties")
        .select("*", { count: "exact" })
        .eq("city", city)
        .filter("project_name", "ilike", `%${searchTerm}%`)
        .or(`unit_number.ilike.%${searchTerm}%`)
        .order("registration_date", { ascending: false })
        .limit(20)

      console.log("[v0] Search results:", {
        data,
        error,
        count: data?.length,
        totalCount: count,
      })

      if (error) {
        console.error("[v0] Search error:", error.message)
        setResults([])
        setTotalCount(0)
        setIsModalOpen(true)
        return
      }

      console.log("[v0] Opening modal with", data?.length || 0, "results")
      setResults(data || [])
      setTotalCount(count || 0)
      setIsModalOpen(true)
    } catch (error) {
      console.error("[v0] Search exception:", error)
      setResults([])
      setTotalCount(0)
      setIsModalOpen(true)
    } finally {
      setLoading(false)
    }
  }

  const quickLinks = [
    { text: "A 5503, Lodha Marquise", icon: "🔥" },
    { text: "Lodha Marquise" },
    { text: "Lower Parel" },
    { text: "Senapati Bapat Marg" },
  ]

  const handleQuickLink = (linkText: string) => {
    const searchAddress = linkText.replace("🔥", "").trim()
    console.log("[v0] Quick link clicked:", searchAddress)
    setAddress(searchAddress)
    setTimeout(() => {
      handleSearchWithAddress(searchAddress)
    }, 100)
  }

  const handleSearchWithAddress = async (searchAddress: string) => {
    if (!searchAddress.trim()) return

    if (searchAddress.trim().length < 3) {
      console.log("[v0] Quick search aborted: Minimum 3 characters required")
      return
    }

    console.log("[v0] Quick search for:", { city, address: searchAddress })
    setLoading(true)

    try {
      const searchTerm = searchAddress.trim()

      console.log("[v0] Quick search query:", {
        city,
        searchTerm,
      })

      const { data, error, count } = await supabase
        .from("properties")
        .select("*", { count: "exact" })
        .eq("city", city)
        .filter("project_name", "ilike", `%${searchTerm}%`)
        .or(`unit_number.ilike.%${searchTerm}%`)
        .order("registration_date", { ascending: false })
        .limit(20)

      console.log("[v0] Quick search results:", {
        data,
        error,
        count: data?.length,
        totalCount: count,
      })

      if (error) {
        console.error("[v0] Search error:", error.message)
        setResults([])
        setTotalCount(0)
        setIsModalOpen(true)
        return
      }

      console.log("[v0] Opening modal with", data?.length || 0, "results")
      setResults(data || [])
      setTotalCount(count || 0)
      setIsModalOpen(true)
    } catch (error) {
      console.error("[v0] Search exception:", error)
      setResults([])
      setTotalCount(0)
      setIsModalOpen(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Search Form */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-white/30 p-8 max-w-5xl mx-auto -mt-16 relative z-30">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-white/70">For the 1st time in India!</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            <h3 className="text-lg font-semibold">
              <span className="text-orange-400">AI Powered Search.</span>{" "}
              <span className="text-white">Unlimited Free Searches.</span>
            </h3>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Find transactions for any address instantly</h2>
          <p className="text-white/80">Property transactions as per government registry records</p>
        </div>

        {/* Search Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* City Selector */}
            <div className="md:col-span-3">
              <label className="text-sm font-medium text-white mb-2 block">City</label>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="w-full h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-white/70" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                  <SelectItem value="Pune">Pune</SelectItem>
                  <SelectItem value="Thane">Thane</SelectItem>
                  <SelectItem value="Palghar">Palghar</SelectItem>
                  <SelectItem value="Raigad">Raigad</SelectItem>
                  <SelectItem value="Navi Mumbai">Navi Mumbai</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Property Address Input */}
            <div className="md:col-span-7">
              <label className="text-sm font-medium text-white mb-2 block">Property Address</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70" />
                <Input
                  type="text"
                  placeholder="Try searching your home address..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-10 h-12 text-base bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50"
                />
              </div>
              {address.length > 0 && address.length < 3 && (
                <p className="text-xs text-orange-400 mt-1">Type at least 3 characters to search</p>
              )}
            </div>

            {/* Search Button */}
            <div className="md:col-span-2 flex items-end">
              <Button
                onClick={handleSearch}
                disabled={loading || address.trim().length < 3}
                className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {quickLinks.map((link, index) => (
              <span
                key={index}
                onClick={() => handleQuickLink(link.text)}
                className="text-sm text-white/70 hover:text-orange-400 cursor-pointer transition-colors inline-flex items-center gap-1"
              >
                {link.icon && <span className="text-orange-400">{link.icon}</span>}
                <span>{link.text}</span>
                {index < quickLinks.length - 1 && <span className="text-white/40">→</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      <PropertySearchResultsModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
        }}
        transactions={results}
        totalCount={totalCount}
        searchCity={city}
        searchAddress={address}
      />
    </div>
  )
}
