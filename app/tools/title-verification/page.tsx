import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { checkUserCredits, deductCredit } from "@/lib/credits"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Building2,
  ArrowLeft,
  FileText,
  Coins,
  AlertCircle,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  User,
  Calendar,
  Home,
  IndianRupee,
  Shield,
  Scale,
  Table,
} from "lucide-react"
import { revalidatePath } from "next/cache"
import { TitleVerificationForm } from "@/components/title-verification-form"

type PropertyResult = {
  id: string
  city: string
  project_name: string
  unit_number: string
  owner_name: string
  owner_contact: string
  registration_number: string
  registration_date: string
  property_type: string
  area_sqft: number
  floor_number: number
  title_status: string
  encumbrance_status: string
  legal_disputes: boolean
  dispute_details: string | null
  last_transaction_date: string
  last_transaction_amount: number
}

export default async function TitleVerificationPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect("/auth/login")
  }

  // Check user credits
  const creditCheck = await checkUserCredits(user.id)

  const verificationResult = params.result as string | undefined
  const verificationError = params.error as string | undefined
  let propertyData: PropertyResult | null = null

  if (verificationResult) {
    try {
      propertyData = JSON.parse(decodeURIComponent(verificationResult))
    } catch (e) {
      // Invalid result data
    }
  }

  async function handleVerification(formData: FormData) {
    "use server"

    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect("/auth/login")
    }

    // Check credits before processing
    const creditCheck = await checkUserCredits(user.id)
    if (!creditCheck.hasCredits) {
      redirect("/tools/title-verification?error=no_credits")
    }

    const city = formData.get("city") as string
    const project = formData.get("project") as string
    const unit = formData.get("unit") as string

    const { data: property, error } = await supabase
      .from("properties")
      .select("*")
      .ilike("city", `%${city.trim()}%`)
      .ilike("project_name", `%${project.trim()}%`)
      .ilike("unit_number", `%${unit.trim()}%`)
      .single()

    // Deduct credit (charge for the search regardless of result)
    const deductResult = await deductCredit(user.id, 1)

    if (!deductResult.success) {
      redirect("/tools/title-verification?error=credit_deduction_failed")
    }

    // Revalidate paths
    revalidatePath("/tools/title-verification")
    revalidatePath("/dashboard")

    if (error || !property) {
      redirect("/tools/title-verification?error=not_found")
    }

    // Redirect with result
    const encodedResult = encodeURIComponent(JSON.stringify(property))
    redirect(`/tools/title-verification?result=${encodedResult}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">Ganesh Jadhav</span>
            </Link>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950">
                <Coins className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">{creditCheck.currentCredits} credits</span>
              </div>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Page Title */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Title Verification</h1>
            <p className="text-gray-600 dark:text-gray-400">Verify property ownership and title details instantly</p>
          </div>

          {/* Credit Warning */}
          {!creditCheck.hasCredits && (
            <Card className="border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-600 dark:text-red-400">Out of Credits</h3>
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                      You need credits to perform title verification. Purchase more credits to continue.
                    </p>
                    <Button asChild className="mt-4 bg-red-600 hover:bg-red-700">
                      <Link href="/dashboard">
                        <Coins className="h-4 w-4 mr-2" />
                        Buy Credits
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {verificationError === "not_found" && (
            <Card className="border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-yellow-700 dark:text-yellow-400">Property Not Found</h3>
                    <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                      No property matching your search criteria was found in our database. 1 credit was deducted for the
                      search.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {propertyData && (
            <Card className="border-green-200 dark:border-green-900 bg-green-50/50 dark:bg-green-950/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <CheckCircle2 className="h-5 w-5" />
                  Property Verified Successfully
                </CardTitle>
                <CardDescription>
                  Title verification report for {propertyData.project_name}, Unit {propertyData.unit_number}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Property Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Owner Information */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <User className="h-4 w-4 text-blue-600" />
                      Owner Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Name:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{propertyData.owner_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Contact:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{propertyData.owner_contact}</span>
                      </div>
                    </div>
                  </div>

                  {/* Property Information */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <Home className="h-4 w-4 text-blue-600" />
                      Property Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Type:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{propertyData.property_type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Area:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {propertyData.area_sqft} sq.ft
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Floor:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {propertyData.floor_number === 0 ? "Ground Floor" : `Floor ${propertyData.floor_number}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Registration Details */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      Registration Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Reg. Number:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {propertyData.registration_number}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Reg. Date:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {new Date(propertyData.registration_date).toLocaleDateString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Transaction Details */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <IndianRupee className="h-4 w-4 text-blue-600" />
                      Last Transaction
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Date:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {new Date(propertyData.last_transaction_date).toLocaleDateString("en-IN")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Amount:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          ₹{(propertyData.last_transaction_amount / 10000000).toFixed(2)} Cr
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Title & Legal Status */}
                <div className="border-t pt-6 space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Scale className="h-4 w-4 text-blue-600" />
                    Title & Legal Status
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    {/* Title Status */}
                    <div
                      className={`p-4 rounded-lg ${
                        propertyData.title_status === "Clear"
                          ? "bg-green-100 dark:bg-green-900/30"
                          : "bg-red-100 dark:bg-red-900/30"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {propertyData.title_status === "Clear" ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Title Status</span>
                      </div>
                      <p
                        className={`font-semibold ${
                          propertyData.title_status === "Clear"
                            ? "text-green-700 dark:text-green-400"
                            : "text-red-700 dark:text-red-400"
                        }`}
                      >
                        {propertyData.title_status}
                      </p>
                    </div>

                    {/* Encumbrance Status */}
                    <div
                      className={`p-4 rounded-lg ${
                        propertyData.encumbrance_status === "No Encumbrance"
                          ? "bg-green-100 dark:bg-green-900/30"
                          : "bg-yellow-100 dark:bg-yellow-900/30"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Shield className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Encumbrance</span>
                      </div>
                      <p
                        className={`font-semibold ${
                          propertyData.encumbrance_status === "No Encumbrance"
                            ? "text-green-700 dark:text-green-400"
                            : "text-yellow-700 dark:text-yellow-400"
                        }`}
                      >
                        {propertyData.encumbrance_status}
                      </p>
                    </div>

                    {/* Legal Disputes */}
                    <div
                      className={`p-4 rounded-lg ${
                        !propertyData.legal_disputes
                          ? "bg-green-100 dark:bg-green-900/30"
                          : "bg-red-100 dark:bg-red-900/30"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {!propertyData.legal_disputes ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                        )}
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Legal Disputes</span>
                      </div>
                      <p
                        className={`font-semibold ${
                          !propertyData.legal_disputes
                            ? "text-green-700 dark:text-green-400"
                            : "text-red-700 dark:text-red-400"
                        }`}
                      >
                        {propertyData.legal_disputes ? "Yes - Dispute Pending" : "None"}
                      </p>
                    </div>
                  </div>

                  {/* Dispute Details if any */}
                  {propertyData.legal_disputes && propertyData.dispute_details && (
                    <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
                      <p className="text-sm text-red-700 dark:text-red-400">
                        <strong>Dispute Details:</strong> {propertyData.dispute_details}
                      </p>
                    </div>
                  )}
                </div>

                {/* New Search Button */}
                <div className="border-t pt-6">
                  <Link href="/tools/title-verification">
                    <Button variant="outline" className="w-full bg-transparent">
                      <FileText className="h-4 w-4 mr-2" />
                      Verify Another Property
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Verification Form - Only show when no result */}
          {!propertyData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Verify Title
                </CardTitle>
                <CardDescription>
                  Start typing to see suggestions - no need for exact matches (1 credit per verification)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TitleVerificationForm action={handleVerification} disabled={!creditCheck.hasCredits} />
              </CardContent>
            </Card>
          )}

          {!propertyData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Table className="h-5 w-5 text-blue-600" />
                  Quick Search Examples
                </CardTitle>
                <CardDescription>Type any of these partial names to see autocomplete suggestions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="font-medium text-gray-900 dark:text-white mb-2">City</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Type: <code className="text-blue-600">mum</code>, <code className="text-blue-600">pun</code>,{" "}
                      <code className="text-blue-600">del</code>, <code className="text-blue-600">bang</code>,{" "}
                      <code className="text-blue-600">hyd</code>
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="font-medium text-gray-900 dark:text-white mb-2">Project</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Type: <code className="text-blue-600">lodh</code>, <code className="text-blue-600">god</code>,{" "}
                      <code className="text-blue-600">pres</code>, <code className="text-blue-600">dlf</code>
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="font-medium text-gray-900 dark:text-white mb-2">Unit</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Type: <code className="text-blue-600">A-1</code>, <code className="text-blue-600">B-5</code>,{" "}
                      <code className="text-blue-600">T3</code>, <code className="text-blue-600">Villa</code>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>What You&apos;ll Get</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  Current ownership details with verified contact information
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  Complete property registration information
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  Title clarity status and encumbrance check
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  Legal dispute status with case details if any
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  Last transaction details including amount
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
