"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { createBrowserClient } from "@/lib/supabase/client"
import { MapPin, Building, Home } from "lucide-react"

interface Suggestion {
  id: string
  city: string
  project_name: string
  unit_number: string
}

interface PropertyAutocompleteProps {
  field: "city" | "project" | "unit"
  name: string
  placeholder: string
  required?: boolean
  disabled?: boolean
  defaultValue?: string
  cityFilter?: string
  projectFilter?: string
  onSelect?: (value: string, suggestion?: Suggestion) => void
}

export function PropertyAutocomplete({
  field,
  name,
  placeholder,
  required = false,
  disabled = false,
  defaultValue = "",
  cityFilter,
  projectFilter,
  onSelect,
}: PropertyAutocompleteProps) {
  const [value, setValue] = useState(defaultValue)
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loading, setLoading] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const supabase = createBrowserClient()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (value.length < 1) {
        setSuggestions([])
        return
      }

      setLoading(true)

      let query = supabase.from("properties").select("id, city, project_name, unit_number")

      if (field === "city") {
        query = query.ilike("city", `%${value}%`)
      } else if (field === "project") {
        query = query.ilike("project_name", `%${value}%`)
        if (cityFilter) {
          query = query.ilike("city", `%${cityFilter}%`)
        }
      } else if (field === "unit") {
        query = query.ilike("unit_number", `%${value}%`)
        if (cityFilter) {
          query = query.ilike("city", `%${cityFilter}%`)
        }
        if (projectFilter) {
          query = query.ilike("project_name", `%${projectFilter}%`)
        }
      }

      const { data, error } = await query.limit(10)

      if (!error && data) {
        const uniqueValues = new Map<string, Suggestion>()
        data.forEach((item) => {
          let key: string
          if (field === "city") {
            key = item.city.toLowerCase()
          } else if (field === "project") {
            key = item.project_name.toLowerCase()
          } else {
            key = `${item.project_name}-${item.unit_number}`.toLowerCase()
          }
          if (!uniqueValues.has(key)) {
            uniqueValues.set(key, item)
          }
        })
        setSuggestions(Array.from(uniqueValues.values()))
      }
      setLoading(false)
    }

    const debounce = setTimeout(fetchSuggestions, 200)
    return () => clearTimeout(debounce)
  }, [value, field, cityFilter, projectFilter, supabase])

  const handleSelect = (suggestion: Suggestion) => {
    let selectedValue: string
    if (field === "city") {
      selectedValue = suggestion.city
    } else if (field === "project") {
      selectedValue = suggestion.project_name
    } else {
      selectedValue = suggestion.unit_number
    }
    setValue(selectedValue)
    setShowSuggestions(false)
    onSelect?.(selectedValue, suggestion)
  }

  const getIcon = () => {
    if (field === "city") return <MapPin className="h-4 w-4 text-gray-400" />
    if (field === "project") return <Building className="h-4 w-4 text-gray-400" />
    return <Home className="h-4 w-4 text-gray-400" />
  }

  const getDisplayText = (suggestion: Suggestion) => {
    if (field === "city") {
      return suggestion.city
    } else if (field === "project") {
      return (
        <span>
          <span className="font-medium">{suggestion.project_name}</span>
          <span className="text-gray-400 text-xs ml-2">({suggestion.city})</span>
        </span>
      )
    } else {
      return (
        <span>
          <span className="font-medium">{suggestion.unit_number}</span>
          <span className="text-gray-400 text-xs ml-2">
            {suggestion.project_name}, {suggestion.city}
          </span>
        </span>
      )
    }
  }

  return (
    <div ref={wrapperRef} className="relative">
      <Input
        id={name}
        name={name}
        type="text"
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          setShowSuggestions(true)
        }}
        onFocus={() => value.length >= 1 && setShowSuggestions(true)}
        className="h-11"
        autoComplete="off"
      />

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
          {loading ? (
            <div className="p-3 text-sm text-gray-500">Searching...</div>
          ) : (
            suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                type="button"
                onClick={() => handleSelect(suggestion)}
                className="w-full px-3 py-2.5 text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center gap-2 text-sm border-b border-gray-100 dark:border-gray-800 last:border-b-0"
              >
                {getIcon()}
                {getDisplayText(suggestion)}
              </button>
            ))
          )}
        </div>
      )}

      {showSuggestions && value.length >= 1 && suggestions.length === 0 && !loading && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 text-sm text-gray-500">
          No matching properties found
        </div>
      )}
    </div>
  )
}
