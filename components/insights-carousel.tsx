"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar, ArrowRight, TrendingUp, BarChart3, PieChart } from "lucide-react"
import Link from "next/link"

const insights = [
  {
    id: 1,
    title: "Q4 2024 Real Estate Market Trends",
    excerpt: "Property prices show 12% YoY growth in tier-1 cities with increased demand in suburban areas.",
    category: "Market Analysis",
    date: "Dec 15, 2024",
    readTime: "5 min read",
    image: "/real-estate-trends-chart.png",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    id: 2,
    title: "AI in Property Valuation: 2025 Outlook",
    excerpt: "Machine learning models are achieving 95% accuracy in property valuations, revolutionizing the industry.",
    category: "Technology",
    date: "Dec 10, 2024",
    readTime: "7 min read",
    image: "/ai-property-valuation-2025.png",
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    id: 3,
    title: "Regional Investment Hotspots",
    excerpt: "Emerging markets in tier-2 cities offer 18% higher ROI compared to traditional investment zones.",
    category: "Investment",
    date: "Dec 5, 2024",
    readTime: "6 min read",
    image: "/regional-investment-hotspots.png",
    icon: <PieChart className="w-5 h-5" />,
  },
  {
    id: 4,
    title: "Regulatory Changes Impact Analysis",
    excerpt: "New RERA amendments streamline property transactions, reducing approval times by 40%.",
    category: "Regulatory",
    date: "Nov 28, 2024",
    readTime: "4 min read",
    image: "/regulatory-compliance-dashboard.png",
    icon: <TrendingUp className="w-5 h-5" />,
  },
]

export function InsightsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % insights.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % insights.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + insights.length) % insights.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest Market Insights</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay ahead with data-driven insights and market intelligence 
from Ganesh Jadhav
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main Carousel */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {insights.map((insight) => (
                <div key={insight.id} className="w-full flex-shrink-0">
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-0">
                      <div className="grid md:grid-cols-2 gap-0">
                        <div className="relative h-64 md:h-80">
                          <img
                            src={insight.image || "/placeholder.svg"}
                            alt={insight.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                              {insight.icon}
                              {insight.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-8 flex flex-col justify-center">
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {insight.date}
                            </span>
                            <span>{insight.readTime}</span>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-4">{insight.title}</h3>
                          <p className="text-gray-600 mb-6 leading-relaxed">{insight.excerpt}</p>
                          <Link href={`/insights/${insight.id}`}>
                            <Button
                              variant="outline"
                              className="self-start border-indigo-200 text-indigo-600 hover:bg-indigo-50 bg-transparent"
                            >
                              Read Full Article
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm border-white/20 hover:bg-white z-10 rounded-full w-10 h-10 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm border-white/20 hover:bg-white z-10 rounded-full w-10 h-10 p-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 gap-2">
            {insights.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-indigo-500 w-8" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/insights">
            <Button
              variant="outline"
              className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 px-8 py-3 rounded-full bg-transparent"
            >
              View All Insights
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
