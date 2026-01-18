"use client"

import type React from "react"

import { useState, createContext, useContext } from "react"
import { Button } from "@/components/ui/button"
import { Globe, ChevronDown } from "lucide-react"

interface LocalizationContextType {
  currency: string
  unit: string
  region: string
  setCurrency: (currency: string) => void
  setUnit: (unit: string) => void
  setRegion: (region: string) => void
  formatCurrency: (amount: number) => string
  formatArea: (area: number) => string
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined)

export function useLocalization() {
  const context = useContext(LocalizationContext)
  if (!context) {
    throw new Error("useLocalization must be used within LocalizationProvider")
  }
  return context
}

const regions = [
  { id: "in", name: "India", currency: "INR", unit: "sq ft", flag: "🇮🇳" },
  { id: "ae", name: "UAE", currency: "AED", unit: "sq ft", flag: "🇦🇪" },
  { id: "us", name: "USA", currency: "USD", unit: "sq ft", flag: "🇺🇸" },
  { id: "uk", name: "UK", currency: "GBP", unit: "sq m", flag: "🇬🇧" },
]

export function LocalizationProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState("INR")
  const [unit, setUnit] = useState("sq ft")
  const [region, setRegion] = useState("in")

  const formatCurrency = (amount: number) => {
    const formatters = {
      INR: new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }),
      AED: new Intl.NumberFormat("en-AE", { style: "currency", currency: "AED", maximumFractionDigits: 0 }),
      USD: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }),
      GBP: new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }),
    }
    return formatters[currency as keyof typeof formatters]?.format(amount) || `${currency} ${amount.toLocaleString()}`
  }

  const formatArea = (area: number) => {
    if (unit === "sq m") {
      return `${(area * 0.092903).toFixed(0)} sq m`
    }
    return `${area.toLocaleString()} sq ft`
  }

  return (
    <LocalizationContext.Provider
      value={{
        currency,
        unit,
        region,
        setCurrency,
        setUnit,
        setRegion,
        formatCurrency,
        formatArea,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  )
}

export function RegionalSwitcher() {
  const { region, setRegion, setCurrency, setUnit } = useLocalization()
  const [isOpen, setIsOpen] = useState(false)

  const handleRegionChange = (regionId: string) => {
    const selectedRegion = regions.find((r) => r.id === regionId)
    if (selectedRegion) {
      setRegion(regionId)
      setCurrency(selectedRegion.currency)
      setUnit(selectedRegion.unit)
      setIsOpen(false)
    }
  }

  const currentRegion = regions.find((r) => r.id === region)

  return (
    <div className="relative">
      

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border z-50 min-w-[200px]">
          {regions.map((regionOption) => (
            <button
              key={regionOption.id}
              onClick={() => handleRegionChange(regionOption.id)}
              className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 ${
                region === regionOption.id ? "bg-blue-50 text-blue-600" : "text-gray-700"
              } first:rounded-t-lg last:rounded-b-lg`}
            >
              <span className="text-lg">{regionOption.flag}</span>
              <div>
                <div className="font-medium">{regionOption.name}</div>
                <div className="text-sm text-gray-500">
                  {regionOption.currency} • {regionOption.unit}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export { RegionalSwitcher as RegionalLocalization }
