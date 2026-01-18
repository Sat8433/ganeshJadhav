"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, XCircle, Clock, Zap, Shield, TrendingUp } from "lucide-react"

const comparisonData = [
  {
    category: "Data Collection",
    manual: {
      process: "Manual research across multiple sources",
      time: "2-5 days",
      accuracy: "70-80%",
      cost: "High labor costs",
      icon: <Clock className="w-5 h-5 text-red-500" />,
    },
    automated: {
      process: "AI-powered automated data aggregation",
      time: "Real-time",
      accuracy: "95-98%",
      cost: "Minimal operational cost",
      icon: <Zap className="w-5 h-5 text-green-500" />,
    },
  },
  {
    category: "Property Valuation",
    manual: {
      process: "Site visits and comparable analysis",
      time: "3-7 days",
      accuracy: "75-85%",
      cost: "Travel and expert fees",
      icon: <Clock className="w-5 h-5 text-red-500" />,
    },
    automated: {
      process: "ML algorithms with market data",
      time: "Instant",
      accuracy: "90-95%",
      cost: "Subscription based",
      icon: <TrendingUp className="w-5 h-5 text-green-500" />,
    },
  },
  {
    category: "Due Diligence",
    manual: {
      process: "Document verification by experts",
      time: "5-10 days",
      accuracy: "80-90%",
      cost: "Legal and verification fees",
      icon: <Shield className="w-5 h-5 text-red-500" />,
    },
    automated: {
      process: "Automated document analysis",
      time: "Minutes",
      accuracy: "95-99%",
      cost: "Platform fee only",
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    },
  },
]

export function ComparisonSection() {
  const [activeTab, setActiveTab] = useState<"manual" | "automated">("manual")

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Manual Diligence vs Ganesh Jadhav Automation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how our AI-powered platform transforms traditional real estate processes
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-full p-1 flex">
            <Button
              variant={activeTab === "manual" ? "default" : "ghost"}
              onClick={() => setActiveTab("manual")}
              className={`rounded-full px-6 py-2 ${
                activeTab === "manual" ? "bg-red-500 text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <XCircle className="w-4 h-4 mr-2" />
              Manual Process
            </Button>
            <Button
              variant={activeTab === "automated" ? "default" : "ghost"}
              onClick={() => setActiveTab("automated")}
              className={`rounded-full px-6 py-2 ${
                activeTab === "automated" ? "bg-green-500 text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              GaneshJadhav Automation
            </Button>
          </div>
        </div>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {comparisonData.map((item, index) => (
            <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">{item.category}</h3>

                <div className={`space-y-4 ${activeTab === "manual" ? "block" : "hidden"}`}>
                  <div className="flex items-center gap-3">
                    {item.manual.icon}
                    <div>
                      <p className="font-medium text-gray-900">Process</p>
                      <p className="text-sm text-gray-600">{item.manual.process}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Time:</span> {item.manual.time}
                    </p>
                    <p>
                      <span className="font-medium">Accuracy:</span> {item.manual.accuracy}
                    </p>
                    <p>
                      <span className="font-medium">Cost:</span> {item.manual.cost}
                    </p>
                  </div>
                </div>

                <div className={`space-y-4 ${activeTab === "automated" ? "block" : "hidden"}`}>
                  <div className="flex items-center gap-3">
                    {item.automated.icon}
                    <div>
                      <p className="font-medium text-gray-900">Process</p>
                      <p className="text-sm text-gray-600">{item.automated.process}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Time:</span> {item.automated.time}
                    </p>
                    <p>
                      <span className="font-medium">Accuracy:</span> {item.automated.accuracy}
                    </p>
                    <p>
                      <span className="font-medium">Cost:</span> {item.automated.cost}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white px-8 py-3 rounded-full">
            Experience the Difference - Request Demo
          </Button>
        </div>
      </div>
    </section>
  )
}
