import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Code, Database, Key, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-[#4F46E5] hover:text-[#4F46E5]/80 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">API Documentation</h1>
          <p className="text-xl text-gray-600">
            Integrate Ganeshjadhav.com data intelligence into your applications with our comprehensive REST API
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Quick Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <a href="#authentication" className="block text-sm text-[#4F46E5] hover:underline">
                  Authentication
                </a>
                <a href="#endpoints" className="block text-sm text-[#4F46E5] hover:underline">
                  API Endpoints
                </a>
                <a href="#rate-limits" className="block text-sm text-[#4F46E5] hover:underline">
                  Rate Limits
                </a>
                <a href="#examples" className="block text-sm text-[#4F46E5] hover:underline">
                  Code Examples
                </a>
                <a href="#sdks" className="block text-sm text-[#4F46E5] hover:underline">
                  SDKs
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Getting Started */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  Getting Started
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Welcome to the Ganeshjadhav.com API. Our RESTful API provides access to comprehensive real estate data
                  intelligence.
                </p>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Base URL:</p>
                  <code className="text-sm bg-white px-2 py-1 rounded">https://api.ganeshjadhav.com/v1</code>
                </div>
              </CardContent>
            </Card>

            {/* Authentication */}
            <Card id="authentication">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Authentication
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  All API requests require authentication using API keys. Include your API key in the request header:
                </p>
                <div className="bg-gray-900 text-white p-4 rounded-lg">
                  <code className="text-sm">
                    curl -H "Authorization: Bearer YOUR_API_KEY" \<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;https://api.ganeshjadhav.com/v1/properties
                  </code>
                </div>
                <Button className="bg-[#4F46E5] hover:bg-[#4F46E5]/90">Get API Key</Button>
              </CardContent>
            </Card>

            {/* API Endpoints */}
            <Card id="endpoints">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  API Endpoints
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Property Valuation */}
                <div className="border-l-4 border-[#4F46E5] pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-green-100 text-green-800">GET</Badge>
                    <code className="text-sm">/valuation/{"{property_id}"}</code>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Get AI-powered property valuation</p>
                  <div className="bg-gray-100 p-3 rounded text-sm">
                    <strong>Response:</strong> Property value, confidence score, comparable properties
                  </div>
                </div>

                {/* Property Search */}
                <div className="border-l-4 border-[#14B8A6] pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-blue-100 text-blue-800">POST</Badge>
                    <code className="text-sm">/properties/search</code>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Search properties with advanced filters</p>
                  <div className="bg-gray-100 p-3 rounded text-sm">
                    <strong>Parameters:</strong> location, price_range, property_type, amenities
                  </div>
                </div>

                {/* Transaction History */}
                <div className="border-l-4 border-[#2563EB] pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-purple-100 text-purple-800">GET</Badge>
                    <code className="text-sm">/transactions/{"{property_id}"}</code>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Get property transaction history</p>
                  <div className="bg-gray-100 p-3 rounded text-sm">
                    <strong>Response:</strong> Sale dates, prices, buyer/seller details
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rate Limits */}
            <Card id="rate-limits">
              <CardHeader>
                <CardTitle>Rate Limits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-100 rounded-lg">
                    <div className="text-2xl font-bold text-[#4F46E5]">1,000</div>
                    <div className="text-sm text-gray-600">Requests/hour</div>
                    <div className="text-xs text-gray-500 mt-1">Free Tier</div>
                  </div>
                  <div className="text-center p-4 bg-gray-100 rounded-lg">
                    <div className="text-2xl font-bold text-[#14B8A6]">10,000</div>
                    <div className="text-sm text-gray-600">Requests/hour</div>
                    <div className="text-xs text-gray-500 mt-1">Pro Tier</div>
                  </div>
                  <div className="text-center p-4 bg-gray-100 rounded-lg">
                    <div className="text-2xl font-bold text-[#2563EB]">Unlimited</div>
                    <div className="text-sm text-gray-600">Requests</div>
                    <div className="text-xs text-gray-500 mt-1">Enterprise</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Code Examples */}
            <Card id="examples">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Code Examples
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">JavaScript/Node.js</h4>
                  <div className="bg-gray-900 text-white p-4 rounded-lg text-sm">
                    <code>
                      const response = await fetch('https://api.ganeshjadhav.com/v1/valuation/12345', {"{"}
                      <br />
                      &nbsp;&nbsp;headers: {"{"}
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;'Authorization': 'Bearer YOUR_API_KEY',
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;'Content-Type': 'application/json'
                      <br />
                      &nbsp;&nbsp;{"}"}
                      <br />
                      {"}"});
                      <br />
                      const data = await response.json();
                    </code>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Python</h4>
                  <div className="bg-gray-900 text-white p-4 rounded-lg text-sm">
                    <code>
                      import requests
                      <br />
                      <br />
                      headers = {"{"}
                      <br />
                      &nbsp;&nbsp;'Authorization': 'Bearer YOUR_API_KEY',
                      <br />
                      &nbsp;&nbsp;'Content-Type': 'application/json'
                      <br />
                      {"}"}
                      <br />
                      <br />
                      response = requests.get('https://api.ganeshjadhav.com/v1/valuation/12345', headers=headers)
                      <br />
                      data = response.json()
                    </code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
