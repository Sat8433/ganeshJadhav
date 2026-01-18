import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  BarChart3,
  PieChart,
  Building,
  Users,
  DollarSign,
  FileText,
  Shield,
  Target,
} from "lucide-react"
import Link from "next/link"

const allInsights = [
  {
    id: 1,
    title: "Q4 2024 Real Estate Market Trends",
    excerpt:
      "Property prices show 12% YoY growth in tier-1 cities with increased demand in suburban areas. Comprehensive analysis of market dynamics, pricing trends, and investment opportunities across major metropolitan areas.",
    category: "Market Analysis",
    date: "Dec 15, 2024",
    readTime: "5 min read",
    image: "/real-estate-trends-chart.png",
    icon: <TrendingUp className="w-5 h-5" />,
    featured: true,
  },
  {
    id: 2,
    title: "AI in Property Valuation: 2025 Outlook",
    excerpt:
      "Machine learning models are achieving 95% accuracy in property valuations, revolutionizing the industry. Deep dive into AI algorithms, predictive analytics, and automated valuation models transforming real estate assessment.",
    category: "Technology",
    date: "Dec 10, 2024",
    readTime: "7 min read",
    image: "/ai-property-valuation-2025.png",
    icon: <BarChart3 className="w-5 h-5" />,
    featured: true,
  },
  {
    id: 3,
    title: "Regional Investment Hotspots",
    excerpt:
      "Emerging markets in tier-2 cities offer 18% higher ROI compared to traditional investment zones. Detailed analysis of upcoming regions, infrastructure development, and investment potential across India's growing cities.",
    category: "Investment",
    date: "Dec 5, 2024",
    readTime: "6 min read",
    image: "/regional-investment-hotspots.png",
    icon: <PieChart className="w-5 h-5" />,
    featured: true,
  },
  {
    id: 4,
    title: "Regulatory Changes Impact Analysis",
    excerpt:
      "New RERA amendments streamline property transactions, reducing approval times by 40%. Comprehensive guide to regulatory compliance and its impact on real estate operations.",
    category: "Regulatory",
    date: "Nov 28, 2024",
    readTime: "4 min read",
    image: "/regulatory-impact-graph.png",
    icon: <Shield className="w-5 h-5" />,
  },
  {
    id: 5,
    title: "Commercial Real Estate Recovery Patterns",
    excerpt:
      "Office spaces see 25% occupancy increase as hybrid work models stabilize across major cities. Analysis of post-pandemic commercial real estate trends and future outlook.",
    category: "Commercial",
    date: "Nov 20, 2024",
    readTime: "6 min read",
    image: "/commercial-recovery-data.png",
    icon: <Building className="w-5 h-5" />,
  },
  {
    id: 6,
    title: "PropTech Investment Surge",
    excerpt:
      "Real estate technology startups raised $2.3B in funding, focusing on AI and blockchain solutions. Deep dive into PropTech innovations and market disruption.",
    category: "Technology",
    date: "Nov 15, 2024",
    readTime: "5 min read",
    image: "/proptech-funding-chart.png",
    icon: <DollarSign className="w-5 h-5" />,
  },
  {
    id: 7,
    title: "Demographic Shifts in Housing Demand",
    excerpt:
      "Millennials now represent 43% of home buyers, driving demand for smart home features. Analysis of generational preferences and housing market evolution.",
    category: "Demographics",
    date: "Nov 8, 2024",
    readTime: "4 min read",
    image: "/demographic-housing-trends.png",
    icon: <Users className="w-5 h-5" />,
  },
  {
    id: 8,
    title: "ESG Impact on Property Valuations",
    excerpt:
      "Green buildings command 15% premium as sustainability becomes key valuation factor. Comprehensive analysis of environmental impact on real estate values.",
    category: "Sustainability",
    date: "Oct 30, 2024",
    readTime: "6 min read",
    image: "/esg-property-impact.png",
    icon: <Target className="w-5 h-5" />,
  },
  {
    id: 9,
    title: "Cross-Border Real Estate Investments",
    excerpt:
      "International property investments increase 28% with focus on emerging Asian markets. Global investment trends and cross-border transaction analysis.",
    category: "Global Markets",
    date: "Oct 22, 2024",
    readTime: "7 min read",
    image: "/global-investment-map.png",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    id: 10,
    title: "Legal Tech in Property Transactions",
    excerpt:
      "Smart contracts reduce property transaction time by 60% while ensuring compliance. Revolutionary impact of blockchain and legal technology on real estate.",
    category: "Legal Tech",
    date: "Oct 15, 2024",
    readTime: "5 min read",
    image: "/legal-tech-dashboard.png",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: 11,
    title: "Affordable Housing Policy Impact 2025",
    excerpt:
      "Government's new affordable housing scheme targets 10 million homes by 2027. Analysis of policy changes, funding mechanisms, and market opportunities in affordable housing sector.",
    category: "Policy",
    date: "Dec 20, 2024",
    readTime: "6 min read",
    image: "/affordable-housing-policy.png",
    icon: <Shield className="w-5 h-5" />,
  },
  {
    id: 12,
    title: "Smart Cities Infrastructure Development",
    excerpt:
      "₹2.4 trillion investment in smart city projects drives real estate growth in 100 cities. Comprehensive analysis of infrastructure development impact on property values and urban planning.",
    category: "Infrastructure",
    date: "Dec 18, 2024",
    readTime: "8 min read",
    image: "/smart-cities-development.png",
    icon: <Building className="w-5 h-5" />,
  },
  {
    id: 13,
    title: "Rental Market Dynamics Post-COVID",
    excerpt:
      "Co-living spaces see 35% growth as rental preferences shift towards flexible housing. Deep dive into rental market evolution, pricing trends, and tenant behavior changes.",
    category: "Rental Market",
    date: "Dec 12, 2024",
    readTime: "5 min read",
    image: "/rental-market-trends.png",
    icon: <Users className="w-5 h-5" />,
  },
  {
    id: 14,
    title: "Real Estate Investment Trusts (REITs) Performance",
    excerpt:
      "Indian REITs deliver 14.2% average returns in 2024, outperforming traditional investments. Comprehensive analysis of REIT market performance, dividend yields, and future prospects.",
    category: "Investment",
    date: "Dec 8, 2024",
    readTime: "7 min read",
    image: "/reits-performance-analysis.png",
    icon: <PieChart className="w-5 h-5" />,
  },
  {
    id: 15,
    title: "Construction Technology Revolution",
    excerpt:
      "3D printing and modular construction reduce building costs by 30% while improving quality. Analysis of construction technology adoption and its impact on real estate development.",
    category: "Construction Tech",
    date: "Dec 3, 2024",
    readTime: "6 min read",
    image: "/construction-tech-innovation.png",
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    id: 16,
    title: "Luxury Real Estate Market Outlook",
    excerpt:
      "Ultra-luxury segment grows 22% with international buyers driving demand in Mumbai and Delhi. Exclusive analysis of luxury property trends, pricing, and buyer demographics.",
    category: "Luxury Market",
    date: "Nov 25, 2024",
    readTime: "5 min read",
    image: "/luxury-real-estate-trends.png",
    icon: <DollarSign className="w-5 h-5" />,
  },
  {
    id: 17,
    title: "Warehouse and Logistics Real Estate Boom",
    excerpt:
      "E-commerce growth drives 40% increase in warehouse demand across tier-2 cities. Comprehensive analysis of logistics real estate, investment opportunities, and market dynamics.",
    category: "Industrial",
    date: "Nov 18, 2024",
    readTime: "6 min read",
    image: "/warehouse-logistics-growth.png",
    icon: <Building className="w-5 h-5" />,
  },
  {
    id: 18,
    title: "Climate Change Impact on Real Estate",
    excerpt:
      "Rising sea levels and extreme weather events reshape coastal property valuations. Analysis of climate risk assessment, insurance implications, and adaptive real estate strategies.",
    category: "Climate Risk",
    date: "Nov 12, 2024",
    readTime: "8 min read",
    image: "/climate-real-estate-impact.png",
    icon: <Target className="w-5 h-5" />,
  },
  {
    id: 19,
    title: "Digital Marketing in Real Estate",
    excerpt:
      "Virtual tours and AR technology increase property sales conversion by 45%. Deep dive into digital marketing strategies, virtual reality adoption, and customer engagement trends.",
    category: "Digital Marketing",
    date: "Nov 5, 2024",
    readTime: "5 min read",
    image: "/digital-marketing-realestate.png",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    id: 20,
    title: "Real Estate Financing Evolution",
    excerpt:
      "Alternative financing models and fintech partnerships transform property purchase options. Analysis of innovative financing solutions, digital lending, and market accessibility improvements.",
    category: "Fintech",
    date: "Oct 28, 2024",
    readTime: "7 min read",
    image: "/real-estate-financing-trends.png",
    icon: <FileText className="w-5 h-5" />,
  },
]

export default function InsightsPage() {
  const featuredInsights = allInsights.filter((insight) => insight.featured)
  const regularInsights = allInsights.filter((insight) => !insight.featured)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 lg:px-12 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-poppins">Market Insights & Analysis</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay ahead with comprehensive real estate market intelligence, trends, and data-driven insights from Ganesh
            Jadhav
          </p>
        </div>

        {/* Featured Insights */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Insights</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredInsights.map((insight) => (
              <Card key={insight.id} className="card-hover bg-white border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="relative h-48">
                    <img
                      src={insight.image || "/placeholder.svg"}
                      alt={insight.title}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-indigo-500 text-white flex items-center gap-1">
                        {insight.icon}
                        {insight.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {insight.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {insight.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{insight.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{insight.excerpt}</p>
                    <Link href={`/insights/${insight.id}`}>
                      <Button
                        variant="outline"
                        className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 bg-transparent"
                      >
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Insights */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">All Insights</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularInsights.map((insight) => (
              <Card key={insight.id} className="card-hover bg-white border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="relative h-48">
                    <img
                      src={insight.image || "/placeholder.svg"}
                      alt={insight.title}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-indigo-500 text-white flex items-center gap-1">
                        {insight.icon}
                        {insight.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {insight.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {insight.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{insight.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{insight.excerpt}</p>
                    <Link href={`/insights/${insight.id}`}>
                      <Button
                        variant="outline"
                        className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 bg-transparent"
                      >
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
