// Searchable content index for the site
export interface SearchItem {
  id: string
  title: string
  description: string
  href: string
  keywords: string[]
  category: "page" | "service" | "tool" | "section"
}

export const searchableContent: SearchItem[] = [
  // Main Pages
  {
    id: "home",
    title: "Home",
    description: "Welcome to Ganesh Jadhav - Real Estate Solutions",
    href: "/",
    keywords: ["home", "main", "landing", "welcome"],
    category: "page",
  },
  {
    id: "about",
    title: "About",
    description: "Learn about our company and team",
    href: "/about",
    keywords: ["about", "team", "company", "story", "mission"],
    category: "page",
  },
  {
    id: "insights",
    title: "Insights",
    description: "Latest news, articles, and industry insights",
    href: "/insights",
    keywords: ["insights", "blog", "news", "articles", "updates"],
    category: "page",
  },
  {
    id: "api-docs",
    title: "API Documentation",
    description: "Developer documentation and API reference",
    href: "/api-docs",
    keywords: ["api", "docs", "documentation", "developer", "reference", "integration"],
    category: "page",
  },
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Your personal dashboard",
    href: "/dashboard",
    keywords: ["dashboard", "account", "overview"],
    category: "page",
  },
  {
    id: "profile",
    title: "Profile",
    description: "Manage your profile and settings",
    href: "/profile",
    keywords: ["profile", "account", "settings", "user"],
    category: "page",
  },

  // Services/Solutions
  {
    id: "services",
    title: "Solutions",
    description: "Explore our real estate solutions and services",
    href: "/#services",
    keywords: ["solutions", "services", "modules", "products"],
    category: "section",
  },
  {
    id: "e-valuation",
    title: "E-Valuation",
    description: "Automated property valuation service",
    href: "/#service-e-valuation",
    keywords: ["valuation", "e-valuation", "property value", "appraisal", "estimate"],
    category: "service",
  },
  {
    id: "property-search",
    title: "Property Assets Search",
    description: "Search and discover property assets",
    href: "/#service-property-search",
    keywords: ["property", "search", "assets", "find", "discover"],
    category: "service",
  },
  {
    id: "project-monitoring",
    title: "Project Monitoring",
    description: "Monitor real estate projects and developments",
    href: "/#service-project-monitoring",
    keywords: ["project", "monitoring", "tracking", "development", "progress"],
    category: "service",
  },
  {
    id: "title-search",
    title: "Title Search",
    description: "Comprehensive title search and verification",
    href: "/#service-title-search",
    keywords: ["title", "search", "verification", "ownership", "legal"],
    category: "service",
  },
  {
    id: "transaction-search",
    title: "Transaction Search",
    description: "Search property transaction history",
    href: "/#service-transaction-search",
    keywords: ["transaction", "history", "sales", "deals", "records"],
    category: "service",
  },
  {
    id: "dashboard-service",
    title: "Real Estate Dashboard",
    description: "Comprehensive real estate analytics dashboard",
    href: "/#service-dashboard",
    keywords: ["dashboard", "analytics", "insights", "data", "metrics"],
    category: "service",
  },

  // Tools
  {
    id: "property-search-tool",
    title: "Property Search Tool",
    description: "Advanced property search tool",
    href: "/tools/property-search",
    keywords: ["tool", "property", "search", "advanced"],
    category: "tool",
  },
  {
    id: "title-verification-tool",
    title: "Title Verification Tool",
    description: "Verify property titles and ownership",
    href: "/tools/title-verification",
    keywords: ["tool", "title", "verification", "check", "validate"],
    category: "tool",
  },

  // Sections
  {
    id: "benefits",
    title: "Benefits",
    description: "Benefits and ROI of our solutions",
    href: "/#benefits",
    keywords: ["benefits", "roi", "value", "advantages", "why"],
    category: "section",
  },
  {
    id: "demo",
    title: "Book a Demo",
    description: "Schedule a demo with our team",
    href: "/#demo",
    keywords: ["demo", "contact", "book", "schedule", "meeting"],
    category: "section",
  },
  {
    id: "rates",
    title: "Property Rates",
    description: "Current property rates and market data",
    href: "/#rates",
    keywords: ["rates", "prices", "market", "data", "trends"],
    category: "section",
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    description: "Our privacy policy and data protection",
    href: "/privacy",
    keywords: ["privacy", "policy", "data", "protection", "gdpr"],
    category: "page",
  },
  {
    id: "terms",
    title: "Terms of Service",
    description: "Terms and conditions of service",
    href: "/terms",
    keywords: ["terms", "conditions", "service", "legal", "agreement"],
    category: "page",
  },
]

// Search function with fuzzy matching
export function searchContent(query: string): SearchItem[] {
  if (!query || query.trim().length === 0) {
    return []
  }

  const normalizedQuery = query.toLowerCase().trim()
  const words = normalizedQuery.split(/\s+/)

  const results = searchableContent
    .map((item) => {
      let score = 0

      // Exact title match (highest priority)
      if (item.title.toLowerCase() === normalizedQuery) {
        score += 100
      }

      // Title contains query
      if (item.title.toLowerCase().includes(normalizedQuery)) {
        score += 50
      }

      // Description contains query
      if (item.description.toLowerCase().includes(normalizedQuery)) {
        score += 30
      }

      // Keywords match
      const keywordMatches = item.keywords.filter((keyword) =>
        words.some((word) => keyword.toLowerCase().includes(word)),
      )
      score += keywordMatches.length * 20

      // Word-by-word matching
      words.forEach((word) => {
        if (item.title.toLowerCase().includes(word)) score += 10
        if (item.description.toLowerCase().includes(word)) score += 5
      })

      return { item, score }
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8) // Limit to top 8 results
    .map((result) => result.item)

  return results
}
