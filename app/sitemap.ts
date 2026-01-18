import type { MetadataRoute } from "next"

// If you have a central insights source, import it. Fallback to static list:
const insights = [
  "/insights",
  "/insights/ai-property-valuation-2025",
  "/insights/regional-investment-hotspots",
  "/insights/title-diligence-automation",
  "/insights/rera-coverage-explained",
  "/insights/mortgage-and-liens-insights",
  "/insights/developer-risk-signals",
  "/insights/market-transparency-benefits",
  "/insights/nbfc-credit-risk-framework",
  "/insights/city-price-index-trends",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://your-domain.example"
  const now = new Date().toISOString()

  const core = ["/", "/login", "/signup", "/api-docs", "/privacy", "/terms"].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "/" ? 1.0 : 0.6,
  }))

  const posts = insights.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }))

  return [...core, ...posts]
}
