"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, BarChart3, Search, FileText, Shield, TrendingUp, Layout } from "lucide-react"
import { DemoForm } from "@/components/demo-form"

interface ServicesSectionProps {
  filteredSolutions?: string[]
}

export function ServicesSection({ filteredSolutions = [] }: ServicesSectionProps) {
  const [expandedService, setExpandedService] = useState<number | null>(null)
  const [isDemoFormOpen, setIsDemoFormOpen] = useState(false)
  const [selectedService, setSelectedService] = useState("")

  const services = [
    {
      id: "e-valuation",
      title: "E-Valuation",
      icon: <BarChart3 className="w-6 h-6" />,
      description: "AI-driven Real Estate Valuation for fast understanding and profitable risk management",
      features: [
        "Automated Valuation Model (AVM) for instant property pricing",
        "Risk assessment and market trend analysis",
        "Comparative market analysis with similar properties",
        "Historical price trend visualization",
      ],
      benefits: [
        "Reduce valuation time by 90%",
        "Increase accuracy with AI algorithms",
        "Access to 46M+ property records",
        "Real-time market insights",
      ],
      useCases: [
        "Banks & NBFCs: Instant loan approvals",
        "Developers: Market positioning strategy",
        "Valuers: Automated report generation",
        "Investors: Portfolio optimization",
      ],
      mockup: "/property-valuation-dashboard.png",
    },
    {
      id: "property-search",
      title: "Property Assets Search",
      icon: <Search className="w-6 h-6" />,
      description:
        "Comprehensive Property Registry to search properties, details, risk and identify operating opportunities",
      features: [
        "Advanced property search with multiple filters",
        "Detailed property information and documentation",
        "Risk assessment and legal verification",
        "Investment opportunity identification",
      ],
      benefits: [
        "Search across 1M+ active listings",
        "Verified property documentation",
        "Legal risk assessment included",
        "Investment ROI calculations",
      ],
      useCases: [
        "Investors: Due diligence automation",
        "Brokers: Client matching optimization",
        "Legal teams: Property verification",
        "Developers: Land acquisition research",
      ],
      mockup: "/property-search-interface.png",
    },
    {
      id: "project-monitoring",
      title: "Project Monitoring Report",
      icon: <TrendingUp className="w-6 h-6" />,
      description: "Project monitoring and tracking reports, access and understand project progress monthly",
      features: [
        "Real-time project progress tracking",
        "Monthly progress reports and analytics",
        "Construction milestone monitoring",
        "Delivery timeline predictions",
      ],
      benefits: [
        "Track 150K+ active projects",
        "Predictive delivery analytics",
        "Risk mitigation alerts",
        "Stakeholder transparency",
      ],
      useCases: [
        "Buyers: Investment progress tracking",
        "Lenders: Construction loan monitoring",
        "Developers: Portfolio oversight",
        "Regulators: RERA compliance tracking",
      ],
      mockup: "/project-dashboard.png",
    },
    {
      id: "title-search",
      title: "Title Search",
      icon: <Shield className="w-6 h-6" />,
      description:
        "One-Stop Real Estate Title Search, Verify title and ownership details and property building history",
      features: [
        "Complete title verification and history",
        "Ownership chain documentation",
        "Legal encumbrance checking",
        "Property building history tracking",
      ],
      benefits: [
        "Access 1.49M title records",
        "Automated legal verification",
        "Historical ownership chain",
        "Encumbrance certificate generation",
      ],
      useCases: [
        "Legal firms: Due diligence automation",
        "Banks: Loan security verification",
        "Buyers: Title clarity assurance",
        "Developers: Land acquisition validation",
      ],
      mockup: "/title-search-interface.png",
    },
    {
      id: "transaction-search",
      title: "Transaction Search",
      icon: <FileText className="w-6 h-6" />,
      description:
        "One-Stop Real Estate Transaction Search and property sales and purchase data and property sales history",
      features: [
        "Historical transaction data access",
        "Property sales and purchase records",
        "Market transaction trends analysis",
        "Comparable sales information",
      ],
      benefits: [
        "120K+ transaction records",
        "Market trend analysis",
        "Comparable sales data",
        "Price discovery insights",
      ],
      useCases: [
        "Valuers: Comparable sales analysis",
        "Investors: Market research",
        "Brokers: Price benchmarking",
        "Analysts: Market trend studies",
      ],
      mockup: "/sales-history-table.png",
    },
    {
      id: "dashboard",
      title: "Real Estate Dashboard",
      icon: <Layout className="w-6 h-6" />,
      description:
        "Real-time comprehensive insights to understand and develop a framework and identify profitable opportunities",
      features: [
        "Comprehensive market analytics dashboard",
        "Real-time market insights and trends",
        "Investment opportunity framework",
        "Portfolio performance tracking",
      ],
      benefits: [
        "360-degree market view",
        "AI-powered insights",
        "Custom analytics framework",
        "Performance benchmarking",
      ],
      useCases: [
        "C-suite: Strategic decision making",
        "Analysts: Market intelligence",
        "Fund managers: Portfolio optimization",
        "Consultants: Client advisory services",
      ],
      mockup: "/real-estate-dashboard.png",
    },
  ]

  const displayedServices =
    filteredSolutions.length > 0 ? services.filter((service) => filteredSolutions.includes(service.id)) : services

  const handleRequestDemo = (serviceName: string) => {
    setSelectedService(serviceName)
    setIsDemoFormOpen(true)
  }

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-[#4F46E5] text-white">Our Solutions</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-poppins">
            Comprehensive Solution Suite
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Accelerate your real estate business with Ganesh Jadahv's AI-orchestrated data intelligence platform
          </p>
          {filteredSolutions.length > 0 && (
            <div className="mt-4">
              <Badge variant="outline" className="text-indigo-600 border-indigo-200">
                Showing {displayedServices.length} solutions for your role
              </Badge>
            </div>
          )}
        </div>

        <div className="space-y-8">
          {displayedServices.map((service, index) => (
            <Card id={`service-${service.id}`} key={service.id} className="card-hover bg-white border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#4F46E5] to-[#14B8A6] rounded-xl flex items-center justify-center text-white">
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 font-poppins">{service.title}</h3>
                        <p className="text-gray-600 mt-1">{service.description}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 text-lg">Key Features:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-[#4F46E5] rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={() => handleRequestDemo(service.title)}
                        className="bg-[#163B6E] hover:bg-[#163B6E]/90 text-white"
                      >
                        Request Demo
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setExpandedService(expandedService === index ? null : index)}
                        className="border-[#4F46E5] text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white"
                      >
                        Learn More{" "}
                        {expandedService === index ? (
                          <ChevronUp className="ml-2 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-2 h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    {expandedService === index && (
                      <div className="space-y-6 pt-6 border-t border-gray-200">
                        <div>
                          <h4 className="font-semibold text-gray-900 text-lg mb-3">Benefits:</h4>
                          <ul className="space-y-2">
                            {service.benefits.map((benefit, benefitIndex) => (
                              <li key={benefitIndex} className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-[#14B8A6] rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-600">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 text-lg mb-3">Use Cases by Role:</h4>
                          <ul className="space-y-2">
                            {service.useCases.map((useCase, useCaseIndex) => (
                              <li key={useCaseIndex} className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-[#2563EB] rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-600">{useCase}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center">
                    <img
                      src={service.mockup || "/placeholder.svg"}
                      alt={`${service.title} interface mockup`}
                      className="rounded-xl shadow-lg max-w-full h-auto border border-gray-200"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <DemoForm
        isOpen={isDemoFormOpen}
        onClose={() => setIsDemoFormOpen(false)}
        title={`${selectedService ? `${selectedService} - ` : ""}Request Demo - Ganesh Jadhav`}
      />
    </section>
  )
}
