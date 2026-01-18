"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const userTypes = [
  { id: "all", label: "All Solutions", icon: "🏢" },
  { id: "banks", label: "Banks & NBFCs", icon: "🏦" },
  { id: "developers", label: "Developers", icon: "🏗️" },
  { id: "valuers", label: "Valuers", icon: "📊" },
  { id: "legal", label: "Legal", icon: "⚖️" },
]

const solutionsByType = {
  all: ["e-valuation", "property-search", "project-monitoring", "title-search", "transaction-search", "dashboard"],
  banks: ["e-valuation", "title-search", "transaction-search"],
  developers: ["project-monitoring", "property-search", "dashboard"],
  valuers: ["e-valuation", "property-search", "transaction-search"],
  legal: ["title-search", "transaction-search", "project-monitoring"],
}

interface RoleBasedNavigationProps {
  onFilterChange: (solutions: string[]) => void
}

export function RoleBasedNavigation({ onFilterChange }: RoleBasedNavigationProps) {
  const [activeType, setActiveType] = useState("all")

  const handleTypeChange = (typeId: string) => {
    setActiveType(typeId)
    onFilterChange(solutionsByType[typeId as keyof typeof solutionsByType])
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-12">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Solutions by Role</h3>
        <p className="text-blue-200">Find the perfect data intelligence tools for your specific needs</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {userTypes.map((type) => (
          <Button
            key={type.id}
            variant={activeType === type.id ? "default" : "outline"}
            onClick={() => handleTypeChange(type.id)}
            className={`
              ${
                activeType === type.id
                  ? "bg-gradient-to-r from-indigo-500 to-blue-600 text-white border-transparent"
                  : "bg-white/10 text-white border-white/20 hover:bg-white/20"
              }
              transition-all duration-300 rounded-full px-6 py-2
            `}
          >
            <span className="mr-2">{type.icon}</span>
            {type.label}
            {activeType === type.id && (
              <Badge className="ml-2 bg-white/20 text-white">
                {solutionsByType[type.id as keyof typeof solutionsByType].length}
              </Badge>
            )}
          </Button>
        ))}
      </div>
    </div>
  )
}
