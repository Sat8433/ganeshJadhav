import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Shield, Eye, Lock, Users } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-[#4F46E5] hover:text-[#4F46E5]/80 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600">Last updated: January 2025</p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Ganeshjadhav.com ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your information when you use our real estate data
                intelligence platform.
              </p>
              <p>
                By using our services, you agree to the collection and use of information in accordance with this
                policy.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Personal Information</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Name, email address, and contact information</li>
                  <li>• Company name and job title</li>
                  <li>• Account credentials and authentication data</li>
                  <li>• Payment and billing information</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Usage Information</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• API usage patterns and frequency</li>
                  <li>• Search queries and property interests</li>
                  <li>• Platform interaction data and preferences</li>
                  <li>• Device information and IP addresses</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Property Data</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Property search and valuation requests</li>
                  <li>• Saved properties and watchlists</li>
                  <li>• Custom reports and analytics preferences</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>We use the collected information for the following purposes:</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Provide and maintain our real estate data intelligence services</li>
                <li>• Process transactions and manage your account</li>
                <li>• Improve our AI algorithms and data accuracy</li>
                <li>• Send you technical notices and support messages</li>
                <li>• Provide customer support and respond to inquiries</li>
                <li>• Analyze usage patterns to enhance user experience</li>
                <li>• Comply with legal obligations and prevent fraud</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>We implement industry-standard security measures to protect your personal information:</p>
              <ul className="space-y-2 text-gray-600">
                <li>• End-to-end encryption for data transmission</li>
                <li>• Secure data storage with regular backups</li>
                <li>• Multi-factor authentication for account access</li>
                <li>• Regular security audits and vulnerability assessments</li>
                <li>• Employee access controls and training programs</li>
                <li>• Compliance with SOC 2 Type II standards</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Sharing */}
          <Card>
            <CardHeader>
              <CardTitle>Information Sharing and Disclosure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share information in
                the following circumstances:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• With your explicit consent</li>
                <li>• To comply with legal obligations or court orders</li>
                <li>• To protect our rights, property, or safety</li>
                <li>• With trusted service providers under strict confidentiality agreements</li>
                <li>• In connection with a merger, acquisition, or sale of assets</li>
              </ul>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle>Your Privacy Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>You have the following rights regarding your personal information:</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Access and review your personal data</li>
                <li>• Request correction of inaccurate information</li>
                <li>• Request deletion of your personal data</li>
                <li>• Object to processing of your information</li>
                <li>• Request data portability</li>
                <li>• Withdraw consent at any time</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at{" "}
                <a href="mailto:contact@ganeshjadhav.com" className="text-[#4F46E5] hover:underline">
                  contact@ganeshjadhav.com
                </a>
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>If you have any questions about this Privacy Policy, please contact us:</p>
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
