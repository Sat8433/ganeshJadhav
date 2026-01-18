"use client"
import { useState, useEffect } from "react"
import { Search, FileText, Wrench, LayoutGrid, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { searchContent, type SearchItem } from "@/lib/search-content"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

type Variant = "dark" | "light"

export function CommandSearch({ variant = "dark" }: { variant?: Variant }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchItem[]>([])
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  useEffect(() => {
    if (query.trim().length > 0) {
      const searchResults = searchContent(query)
      setResults(searchResults)
    } else {
      setResults([])
    }
  }, [query])

  const handleSelect = (href: string) => {
    setOpen(false)
    setQuery("")
    router.push(href)
  }

  const getCategoryIcon = (category: SearchItem["category"]) => {
    switch (category) {
      case "service":
        return <LayoutGrid className="h-4 w-4" />
      case "tool":
        return <Wrench className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getCategoryLabel = (category: SearchItem["category"]) => {
    switch (category) {
      case "service":
        return "Service"
      case "tool":
        return "Tool"
      case "section":
        return "Section"
      default:
        return "Page"
    }
  }

  const isDark = variant === "dark"

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={[
          "hidden items-center gap-2 rounded-xl border px-2.5 py-2 backdrop-blur-md md:flex transition-colors",
          isDark ? "border-white/15 bg-white/10 hover:bg-white/15" : "border-slate-200 bg-white/80 hover:bg-slate-100",
        ].join(" ")}
        type="button"
        aria-label="Open search"
      >
        <Search className={["h-4 w-4", isDark ? "text-white/80" : "text-slate-500"].join(" ")} />
        <span className={["w-40 text-left text-sm opacity-70", isDark ? "text-white" : "text-slate-500"].join(" ")}>
          Search...
        </span>
        <kbd
          className={[
            "hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100",
            isDark ? "border-white/20 bg-white/10 text-white" : "border-slate-200 bg-slate-100 text-slate-600",
          ].join(" ")}
        >
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search modules, docs, insights…" value={query} onValueChange={setQuery} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {results.length > 0 && (
            <CommandGroup heading="Results">
              {results.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  onSelect={() => handleSelect(item.href)}
                  className="flex items-center gap-3 px-3 py-3"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                    {getCategoryIcon(item.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{item.title}</div>
                    <div className="text-xs text-muted-foreground truncate">{item.description}</div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="hidden sm:inline">{getCategoryLabel(item.category)}</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {query.trim().length === 0 && (
            <CommandGroup heading="Quick Links">
              <CommandItem onSelect={() => handleSelect("/")}>
                <FileText className="mr-2 h-4 w-4" />
                <span>Home</span>
              </CommandItem>
              <CommandItem onSelect={() => handleSelect("/#services")}>
                <LayoutGrid className="mr-2 h-4 w-4" />
                <span>Solutions</span>
              </CommandItem>
              <CommandItem onSelect={() => handleSelect("/insights")}>
                <FileText className="mr-2 h-4 w-4" />
                <span>Insights</span>
              </CommandItem>
              <CommandItem onSelect={() => handleSelect("/api-docs")}>
                <FileText className="mr-2 h-4 w-4" />
                <span>API Documentation</span>
              </CommandItem>
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
