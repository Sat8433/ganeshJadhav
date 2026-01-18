"use client"

import { useState } from "react"
import { PropertyAutocomplete } from "./property-autocomplete"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface PropertySearchFormProps {
  action: (formData: FormData) => void
  disabled?: boolean
  defaultCity?: string
  defaultProject?: string
}

export function PropertySearchForm({
  action,
  disabled = false,
  defaultCity = "",
  defaultProject = "",
}: PropertySearchFormProps) {
  const [city, setCity] = useState(defaultCity)
  const [project, setProject] = useState(defaultProject)

  return (
    <form action={action} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="city">City *</Label>
          <PropertyAutocomplete
            field="city"
            name="city"
            placeholder="Type city name (e.g., Mum, Pun, Del...)"
            required
            disabled={disabled}
            defaultValue={defaultCity}
            onSelect={(value) => setCity(value)}
          />
          <p className="text-xs text-gray-500">Start typing to see suggestions</p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="project">Project Name (Optional)</Label>
          <PropertyAutocomplete
            field="project"
            name="project"
            placeholder="Type project name (e.g., Lodha, Godrej...)"
            disabled={disabled}
            defaultValue={defaultProject}
            cityFilter={city}
            onSelect={(value) => setProject(value)}
          />
          <p className="text-xs text-gray-500">Filters by selected city</p>
        </div>
      </div>
      <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700" disabled={disabled}>
        <Search className="h-4 w-4 mr-2" />
        Search Properties (1 Credit)
      </Button>
    </form>
  )
}
