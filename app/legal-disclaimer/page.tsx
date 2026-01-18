import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, AlertTriangle, Shield, Gavel, Bot } from "lucide-react"
import Link from "next/link"

export default function LegalDisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-[#4F46E5] hover:text-[#4F46E5]/80 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Legal & AI Use Disclaimer</h1>
          <p className="text-xl text-gray-600">Last updated: January 2025</p>
        </div>

        <div className="space-y-8">
          {/* General Legal Disclaimer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gavel className="w-5 h-5" />
                General Legal Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-semibold text-gray-900">
                BY USING GANESHJADHAV.COM SERVICES, YOU ACKNOWLEDGE AND AGREE TO THE FOLLOWING:
              </p>
              <p>
                The information provided through Ganeshjadhav.com ("the Service") is for informational purposes only and
                should not be considered as professional advice. We make no representations or warranties of any kind,
                express or implied, about the completeness, accuracy, reliability, suitability, or availability of the
                information, products, services, or related graphics contained on the Service.
              </p>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <p className="text-sm text-red-800">
                  <strong>IMPORTANT:</strong> Any reliance you place on information from Ganeshjadhav.com is strictly at
                  your own risk. We shall not be liable for any loss or damage arising from the use of our services.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Property Data Disclaimer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Property Data & Valuation Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-semibold">Real Estate Information Accuracy:</p>
              <ul className="space-y-3 text-gray-600">
                <li>• Property valuations are estimates based on AI algorithms and historical data</li>
                <li>• Property information may be outdated, incomplete, or inaccurate</li>
                <li>• We do not guarantee the accuracy of property ownership, title, or legal status</li>
                <li>• Property valuations should not be used as the sole basis for financial decisions</li>
                <li>• Always conduct independent due diligence and consult with licensed professionals</li>
              </ul>
              <p className="mt-4 text-sm text-gray-700">
                <strong>Professional Verification Required:</strong> Before making any property transaction, you must
                verify all information with licensed real estate agents, lawyers, surveyors, and other qualified
                professionals.
              </p>
            </CardContent>
          </Card>

          {/* AI Use Disclaimer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                AI-Generated Content Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-semibold">Use of Artificial Intelligence:</p>
              <p>
                Our Service uses artificial intelligence and machine learning algorithms to generate property
                valuations, market insights, and recommendations. You acknowledge and agree that:
              </p>
              <ul className="space-y-3 text-gray-600">
                <li>• AI-generated content may contain errors, inaccuracies, or biases</li>
                <li>• AI models are trained on historical data which may not reflect current market conditions</li>
                <li>• AI predictions are probabilistic and should not be treated as certainties</li>
                <li>• AI-generated valuations are estimates and not professional appraisals</li>
                <li>• We continuously improve our AI models but cannot guarantee error-free results</li>
                <li>• AI outputs should be used as guidance, not as definitive financial or legal advice</li>
              </ul>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
                <p className="text-sm text-blue-800">
                  <strong>No Substitute for Professional Advice:</strong> AI-generated insights do not replace the need
                  for professional consultation with real estate agents, financial advisors, lawyers, or other licensed
                  professionals.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Limitation of Liability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-semibold">TO THE MAXIMUM EXTENT PERMITTED BY LAW:</p>
              <ul className="space-y-3 text-gray-600">
                <li>
                  • Ganeshjadhav.com shall not be liable for any direct, indirect, incidental, special, consequential,
                  or punitive damages
                </li>
                <li>
                  • This includes damages for loss of profits, revenue, data, business opportunities, or property
                  transactions
                </li>
                <li>• We are not liable for decisions made based on information provided by our Service</li>
                <li>
                  • We are not responsible for financial losses resulting from property valuations, market predictions,
                  or title verifications
                </li>
                <li>
                  • Our total liability shall not exceed the amount you paid for the Service in the 12 months preceding
                  the claim
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* No Professional Relationship */}
          <Card>
            <CardHeader>
              <CardTitle>No Professional Relationship</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Use of Ganeshjadhav.com does not create any professional relationship between you and us, including but
                not limited to:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Real estate agent-client relationship</li>
                <li>• Attorney-client relationship</li>
                <li>• Financial advisor-client relationship</li>
                <li>• Surveyor-client relationship</li>
                <li>• Appraiser-client relationship</li>
              </ul>
              <p className="mt-4 text-sm text-gray-700">
                You acknowledge that no licensed professional at Ganeshjadhav.com has reviewed your specific
                circumstances, and our Service provides general information only.
              </p>
            </CardContent>
          </Card>

          {/* Third-Party Content */}
          <Card>
            <CardHeader>
              <CardTitle>Third-Party Data Sources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Our Service aggregates data from various third-party sources. We do not control or verify the accuracy
                of third-party data and disclaim all liability for:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Errors or omissions in third-party data</li>
                <li>• Delays or interruptions in third-party data feeds</li>
                <li>• Changes to third-party data sources</li>
                <li>• Unavailability of third-party services</li>
              </ul>
            </CardContent>
          </Card>

          {/* Jurisdiction */}
          <Card>
            <CardHeader>
              <CardTitle>Governing Law and Jurisdiction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                This Legal Disclaimer shall be governed by and construed in accordance with the laws of India. Any
                disputes arising from or relating to the use of our Service shall be subject to the exclusive
                jurisdiction of the courts located in Mumbai, Maharashtra, India.
              </p>
              <p className="text-sm text-gray-600 mt-4">
                By using Ganeshjadhav.com, you consent to the exclusive jurisdiction and venue of courts in Mumbai,
                Maharashtra, India for all disputes.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>For questions regarding this Legal Disclaimer, please contact us:</p>
              <div className="space-y-2 text-gray-600">
                <p>
                  Email:{" "}
                  <a href="mailto:contact@ganeshjadhav.com" className="text-[#4F46E5] hover:underline">
                    contact@ganeshjadhav.com
                  </a>
                </p>
                <p>Address: Ganeshjadhav.com, Mumbai, Maharashtra, India</p>
                <p>Phone: +91-XXX-XXX-XXXX</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
