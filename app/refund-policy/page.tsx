import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, RefreshCw, Clock, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-[#4F46E5] hover:text-[#4F46E5]/80 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Refund & Cancellation Policy</h1>
          <p className="text-xl text-gray-600">Last updated: January 2025</p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5" />
                Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                At Ganeshjadhav.com, we strive to provide the highest quality real estate data intelligence services.
                This Refund and Cancellation Policy outlines the terms under which refunds may be issued.
              </p>
              <p className="font-semibold text-gray-900">
                Please read this policy carefully before making any purchase or subscribing to our services.
              </p>
            </CardContent>
          </Card>

          {/* Refund Eligibility */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Refund Eligibility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Refunds may be issued under the following circumstances:</p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Technical Issues:</strong> If our platform experiences prolonged downtime (more than 48
                    hours) due to technical failures on our end
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Service Non-Delivery:</strong> If purchased services are not delivered within the promised
                    timeframe
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Duplicate Charges:</strong> If you have been charged multiple times for the same transaction
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Early Cancellation:</strong> Subscription cancellations requested within 7 days of initial
                    purchase may be eligible for partial refund
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Non-Refundable Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                Non-Refundable Items
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-semibold">The following are NOT eligible for refunds:</p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>API Credits:</strong> Once API credits are consumed or data is accessed, no refunds will be
                    issued
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Property Reports:</strong> Generated property reports, valuations, or title verifications
                    that have been delivered
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Partial Month Subscriptions:</strong> Pro-rated refunds for partial months are not provided
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Change of Mind:</strong> Refunds based solely on buyer's remorse or change of preference
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Third-Party Services:</strong> Any third-party integrations or services accessed through our
                    platform
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Refund Process */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Refund Request Process
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>To request a refund, please follow these steps:</p>
              <ol className="space-y-3 text-gray-600 list-decimal list-inside">
                <li>
                  Contact our support team at{" "}
                  <a href="mailto:contact@ganeshjadhav.com" className="text-[#4F46E5] hover:underline">
                    contact@ganeshjadhav.com
                  </a>
                </li>
                <li>Provide your transaction ID, account details, and reason for the refund request</li>
                <li>Our team will review your request within 5-7 business days</li>
                <li>
                  If approved, refunds will be processed within 10-15 business days to the original payment method
                </li>
              </ol>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> Refund requests must be submitted within 30 days of the original
                  transaction date. Requests beyond this period will not be considered.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Cancellation */}
          <Card>
            <CardHeader>
              <CardTitle>Subscription Cancellation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                You may cancel your subscription at any time through your account dashboard or by contacting support.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Cancellations take effect at the end of the current billing cycle</li>
                <li>• You will retain access to services until the end of the paid period</li>
                <li>• No automatic refunds are issued for remaining days in the billing cycle</li>
                <li>• Unused API credits expire upon cancellation and cannot be refunded</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Questions About Refunds?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>If you have any questions about our Refund and Cancellation Policy, please contact us:</p>
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
