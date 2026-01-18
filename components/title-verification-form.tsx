"use client"

import { useState } from "react"
import { PropertyAutocomplete } from "./property-autocomplete"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

interface TitleVerificationFormProps {
  action: (formData: FormData) => void
  disabled?: boolean
}

export function TitleVerificationForm({ action, disabled = false }: TitleVerificationFormProps) {
  const [city, setCity] = useState("")
  const [project, setProject] = useState("")

  return (
    <form action={action} className="space-y-6">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="city">City</Label>
          <PropertyAutocomplete
            field="city"
            name="city"
            placeholder="Type city (e.g., Mum, Pun, Bang, Del, Hyd...)"
            required
            disabled={disabled}
            onSelect={(value) => setCity(value)}
          />
          <p className="text-xs text-gray-500">Start typing to see matching cities</p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="project">Project Name</Label>
          <PropertyAutocomplete
            field="project"
            name="project"
            placeholder="Type project (e.g., Lodha, Godrej, Prestige...)"
            required
            disabled={disabled}
            cityFilter={city}
            onSelect={(value) => setProject(value)}
          />
          <p className="text-xs text-gray-500">Filters by selected city</p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="unit">Unit Number</Label>
          <PropertyAutocomplete
            field="unit"
            name="unit"
            placeholder="Type unit (e.g., A-1, B-5, T3...)"
            required
            disabled={disabled}
            cityFilter={city}
            projectFilter={project}
          />
          <p className="text-xs text-gray-500">Filters by city and project</p>
        </div>
      </div>
      <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700" disabled={disabled}>
        <FileText className="h-4 w-4 mr-2" />
        Verify Title (1 Credit)
      </Button>
    </form>
  )
}
