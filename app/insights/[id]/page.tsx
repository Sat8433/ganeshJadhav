import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft, Share2, BookmarkPlus, TrendingUp, BarChart3, PieChart } from "lucide-react"
import Link from "next/link"

const insightDetails = {
  1: {
    title: "Q4 2024 Real Estate Market Trends",
    category: "Market Analysis",
    date: "Dec 15, 2024",
    readTime: "5 min read",
    image: "/real-estate-trends-chart.png",
    icon: <TrendingUp className="w-5 h-5" />,
    content: `
      <p>The fourth quarter of 2024 has shown remarkable growth in the real estate sector, with property prices experiencing a significant 12% year-over-year increase across tier-1 cities. This growth pattern reflects a fundamental shift in buyer preferences and market dynamics.</p>
      
      <h3>Key Market Drivers</h3>
      <p>Several factors have contributed to this robust growth:</p>
      <ul>
        <li>Increased demand for suburban properties as remote work becomes permanent</li>
        <li>Infrastructure development in peripheral areas</li>
        <li>Government incentives for first-time homebuyers</li>
        <li>Low interest rates maintaining affordability</li>
      </ul>
      
      <h3>Regional Performance</h3>
      <p>Mumbai leads the growth with 15% YoY increase, followed by Bangalore at 13% and Delhi NCR at 11%. The suburban markets in these cities have outperformed central locations by 3-4 percentage points.</p>
      
      <h3>Future Outlook</h3>
      <p>Market analysts predict continued growth through 2025, with suburban areas expected to maintain their momentum. However, supply constraints may moderate price increases in the second half of the year.</p>
    `,
  },
  2: {
    title: "AI in Property Valuation: 2025 Outlook",
    category: "Technology",
    date: "Dec 10, 2024",
    readTime: "7 min read",
    image: "/ai-property-valuation-2025.png",
    icon: <BarChart3 className="w-5 h-5" />,
    content: `
      <p>Artificial Intelligence is revolutionizing property valuation with machine learning models now achieving 95% accuracy rates. This technological advancement is transforming how real estate professionals assess property values and make investment decisions.</p>
      
      <h3>AI Valuation Advantages</h3>
      <p>Modern AI systems offer several key benefits:</p>
      <ul>
        <li>Real-time market data integration</li>
        <li>Comprehensive comparable analysis</li>
        <li>Predictive market trend modeling</li>
        <li>Risk assessment automation</li>
      </ul>
      
      <h3>Technology Implementation</h3>
      <p>Leading platforms like ClearProps by GanAI utilize advanced algorithms that process millions of data points including transaction history, neighborhood trends, property characteristics, and economic indicators to deliver precise valuations.</p>
      
      <h3>Industry Impact</h3>
      <p>The adoption of AI valuation tools has reduced assessment time by 80% while improving accuracy. Banks and financial institutions are increasingly relying on these systems for loan approvals and risk management.</p>
      
      <h3>2025 Predictions</h3>
      <p>Experts forecast that AI-powered valuations will become the industry standard, with 90% of property assessments utilizing machine learning by the end of 2025.</p>
    `,
  },
  3: {
    title: "Regional Investment Hotspots",
    category: "Investment",
    date: "Dec 5, 2024",
    readTime: "6 min read",
    image: "/regional-investment-hotspots.png",
    icon: <PieChart className="w-5 h-5" />,
    content: `
      <p>Emerging markets in tier-2 cities are offering exceptional investment opportunities, with returns averaging 18% higher than traditional tier-1 investment zones. This shift represents a fundamental change in India's real estate investment landscape.</p>
      
      <h3>Top Performing Cities</h3>
      <p>Our analysis identifies the following tier-2 cities as prime investment destinations:</p>
      <ul>
        <li>Coimbatore - 22% average annual returns</li>
        <li>Kochi - 20% average annual returns</li>
        <li>Indore - 19% average annual returns</li>
        <li>Bhubaneswar - 18% average annual returns</li>
      </ul>
      
      <h3>Investment Drivers</h3>
      <p>Several factors make these markets attractive:</p>
      <ul>
        <li>Lower entry costs compared to tier-1 cities</li>
        <li>Rapid infrastructure development</li>
        <li>Growing IT and service sector presence</li>
        <li>Government policy support</li>
      </ul>
      
      <h3>Risk Considerations</h3>
      <p>While returns are attractive, investors should consider liquidity constraints and longer holding periods typical in tier-2 markets. Due diligence on local regulations and market dynamics is essential.</p>
      
      <h3>Investment Strategy</h3>
      <p>Successful tier-2 investment requires a long-term perspective, local market knowledge, and diversification across multiple cities to mitigate regional risks.</p>
    `,
  },
}

export default function InsightDetailPage({ params }: { params: { id: string } }) {
  const insight = insightDetails[Number.parseInt(params.id) as keyof typeof insightDetails]

  if (!insight) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <Link href="/insights">
            <Button>Back to Insights</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 lg:px-12 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/insights">
            <Button variant="outline" className="mb-8 bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Insights
            </Button>
          </Link>

          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Badge className="bg-indigo-500 text-white flex items-center gap-1">
                {insight.icon}
                {insight.category}
              </Badge>
              <span className="flex items-center gap-1 text-gray-500">
                <Calendar className="w-4 h-4" />
                {insight.date}
              </span>
              <span className="flex items-center gap-1 text-gray-500">
                <Clock className="w-4 h-4" />
                {insight.readTime}
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-poppins">{insight.title}</h1>
            <div className="flex gap-4">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <BookmarkPlus className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <img
              src={insight.image || "/placeholder.svg"}
              alt={insight.title}
              className="w-full h-64 lg:h-96 object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* Article Content */}
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-8 lg:p-12">
              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: insight.content }} />
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Get More Market Insights</h3>
                <p className="text-gray-600 mb-6">
                  Access comprehensive real estate data and analytics with Ganesh Jadhav
                </p>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Request a Demo</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
