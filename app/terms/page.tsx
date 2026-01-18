import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileText, Scale, AlertTriangle, CreditCard } from "lucide-react"
import Link from "next/link"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-[#4F46E5] hover:text-[#4F46E5]/80 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-600">Last updated: January 2025</p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Agreement to Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                These Terms of Service ("Terms") govern your use of Ganeshjadhav.com's real estate data intelligence
                platform ("Service") operated by Ganeshjadhav.com ("us", "we", or "our").
              </p>
              <p>
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part
                of these terms, then you may not access the Service.
              </p>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card>
            <CardHeader>
              <CardTitle>Service Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Ganeshjadhav.com provides AI-powered real estate data intelligence services including:</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Property valuation and market analysis</li>
                <li>• Comprehensive property search and filtering</li>
                <li>• Transaction history and market trends</li>
                <li>• Title search and verification services</li>
                <li>• Project monitoring and analytics</li>
                <li>• API access for data integration</li>
              </ul>
            </CardContent>
          </Card>

          {/* User Accounts */}
          <Card>
            <CardHeader>
              <CardTitle>User Accounts and Registration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>To access certain features of our Service, you must register for an account. You agree to:</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Provide accurate, current, and complete information</li>
                <li>• Maintain and update your account information</li>
                <li>• Keep your password secure and confidential</li>
                <li>• Accept responsibility for all activities under your account</li>
                <li>• Notify us immediately of any unauthorized use</li>
              </ul>
            </CardContent>
          </Card>

          {/* Acceptable Use */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="w-5 h-5" />
                Acceptable Use Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>You agree not to use the Service to:</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Violate any applicable laws or regulations</li>
                <li>• Infringe on intellectual property rights</li>
                <li>• Transmit malicious code or harmful content</li>
                <li>• Attempt to gain unauthorized access to our systems</li>
                <li>• Interfere with or disrupt the Service</li>
                <li>• Use automated tools to scrape or harvest data</li>
                <li>• Resell or redistribute our data without permission</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Usage and API Terms */}
          <Card>
            <CardHeader>
              <CardTitle>Data Usage and API Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>When using our API and data services:</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Respect rate limits and usage quotas</li>
                <li>• Use data only for legitimate business purposes</li>
                <li>• Do not attempt to reverse engineer our algorithms</li>
                <li>• Maintain data security and confidentiality</li>
                <li>• Comply with all applicable data protection laws</li>
                <li>• Provide proper attribution when required</li>
              </ul>
            </CardContent>
          </Card>

          {/* Payment Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment and Billing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>For paid services:</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Fees are charged in advance on a recurring basis</li>
                <li>• All fees are non-refundable unless otherwise stated</li>
                <li>• You authorize us to charge your payment method</li>
                <li>• Price changes will be communicated 30 days in advance</li>
                <li>• Accounts may be suspended for non-payment</li>
                <li>• You're responsible for all taxes and fees</li>
              </ul>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The Service and its original content, features, and functionality are owned by Ganeshjadhav.com and are
                protected by international copyright, trademark, patent, trade secret, and other intellectual property
                laws.
              </p>
              <p>
                You retain ownership of any content you provide, but grant us a license to use it in connection with the
                Service.
              </p>
            </CardContent>
          </Card>

          {/* Disclaimers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Disclaimers and Limitations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>The Service is provided "as is" without warranties of any kind. We do not guarantee:</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Accuracy or completeness of data</li>
                <li>• Uninterrupted or error-free service</li>
                <li>• Specific results or outcomes</li>
                <li>• Compatibility with all systems</li>
              </ul>
              <p className="mt-4 text-sm text-gray-500">
                Our liability is limited to the maximum extent permitted by law. We are not liable for indirect,
                incidental, or consequential damages.
              </p>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card>
            <CardHeader>
              <CardTitle>Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We may terminate or suspend your account and access to the Service immediately, without prior notice,
                for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
              </p>
              <p>
                You may terminate your account at any time by contacting us. Upon termination, your right to use the
                Service will cease immediately.
              </p>
            </CardContent>
          </Card>

          {/* Governing Law and Jurisdiction */}
          <Card>
            <CardHeader>
              <CardTitle>Governing Law and Jurisdiction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to
                its conflict of law provisions.
              </p>
              <p>
                Any disputes arising out of or relating to these Terms or the Service shall be subject to the exclusive
                jurisdiction of the courts located in Mumbai, Maharashtra, India.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>If you have any questions about these Terms of Service, please contact us:</p>
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
