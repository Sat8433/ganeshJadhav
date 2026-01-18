import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { checkUserCredits, deductCredit } from "@/lib/credits"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Building2,
  ArrowLeft,
  Search,
  Coins,
  AlertCircle,
  CheckCircle,
  MapPin,
  Home,
  Calendar,
  User,
  FileText,
  Table,
} from "lucide-react"
import { revalidatePath } from "next/cache"
import { PropertySearchForm } from "@/components/property-search-form"

interface PropertyResult {
  id: string
  city: string
  project_name: string
  unit_number: string
  owner_name: string
  owner_contact: string | null
  registration_number: string | null
  registration_date: string | null
  property_type: string | null
  area_sqft: number | null
  floor_number: number | null
  title_status: string
  encumbrance_status: string
  legal_disputes: boolean
  dispute_details: string | null
  last_transaction_date: string | null
  last_transaction_amount: number | null
}

export default async function PropertySearchPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string; project?: string; searched?: string; error?: string }>
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

  let searchResults: PropertyResult[] = []
  if (params.searched === "true" && params.city) {
    const query = supabase.from("properties").select("*").ilike("city", `%${params.city}%`)

    if (params.project) {
      query.ilike("project_name", `%${params.project}%`)
    }

    const { data } = await query.order("project_name", { ascending: true })
    searchResults = (data as PropertyResult[]) || []
  }

  async function handleSearch(formData: FormData) {
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
      redirect("/tools/property-search?error=no_credits")
    }

    // Deduct credit
    const deductResult = await deductCredit(user.id, 1)

    if (!deductResult.success) {
      redirect("/tools/property-search?error=deduct_failed")
    }

    const city = formData.get("city") as string
    const project = formData.get("project") as string

    // Revalidate to update credit display
    revalidatePath("/tools/property-search")
    revalidatePath("/dashboard")

    const searchParams = new URLSearchParams({
      searched: "true",
      city: city || "",
      project: project || "",
    })
    redirect(`/tools/property-search?${searchParams.toString()}`)
  }

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`
    }
    return `₹${amount.toLocaleString("en-IN")}`
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
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Page Title */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Property Search</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Search property transactions and ownership records across multiple cities
            </p>
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
                      You need credits to perform property searches. Purchase more credits to continue.
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

          {/* Search Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-blue-600" />
                Search Properties
              </CardTitle>
              <CardDescription>
                Start typing to see suggestions - no need for exact matches (1 credit per search)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PropertySearchForm
                action={handleSearch}
                disabled={!creditCheck.hasCredits}
                defaultCity={params.city || ""}
                defaultProject={params.project || ""}
              />
            </CardContent>
          </Card>

          {params.searched === "true" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Search Results
                </CardTitle>
                <CardDescription>
                  Found {searchResults.length} properties in {params.city}
                  {params.project && ` matching "${params.project}"`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {searchResults.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Properties Found</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      No properties match your search criteria. Try a different city or project name.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {searchResults.map((property) => (
                      <div
                        key={property.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          {/* Property Info */}
                          <div className="flex-1 space-y-3">
                            <div className="flex items-start gap-3">
                              <Home className="h-5 w-5 text-blue-600 mt-0.5" />
                              <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                  {property.project_name} - {property.unit_number}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                  <MapPin className="h-3.5 w-3.5" />
                                  {property.city}
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                              <div>
                                <span className="text-gray-500 dark:text-gray-400">Type</span>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {property.property_type || "N/A"}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-500 dark:text-gray-400">Area</span>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {property.area_sqft ? `${property.area_sqft.toLocaleString()} sq.ft` : "N/A"}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-500 dark:text-gray-400">Floor</span>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {property.floor_number !== null
                                    ? property.floor_number === 0
                                      ? "Ground"
                                      : property.floor_number
                                    : "N/A"}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-500 dark:text-gray-400">Last Transaction</span>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {property.last_transaction_amount
                                    ? formatCurrency(property.last_transaction_amount)
                                    : "N/A"}
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-600 dark:text-gray-400">Owner:</span>
                                <span className="font-medium text-gray-900 dark:text-white">{property.owner_name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-600 dark:text-gray-400">Registered:</span>
                                <span className="font-medium text-gray-900 dark:text-white">
                                  {property.registration_date
                                    ? new Date(property.registration_date).toLocaleDateString("en-IN")
                                    : "N/A"}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Status Badges */}
                          <div className="flex flex-row md:flex-col gap-2">
                            <div
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                                property.title_status === "Clear"
                                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                              }`}
                            >
                              {property.title_status === "Clear" ? (
                                <CheckCircle className="h-3.5 w-3.5" />
                              ) : (
                                <AlertCircle className="h-3.5 w-3.5" />
                              )}
                              {property.title_status}
                            </div>
                            <div
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                                property.encumbrance_status === "No Encumbrance"
                                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                  : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                              }`}
                            >
                              {property.encumbrance_status === "No Encumbrance" ? "Clear" : "Mortgage"}
                            </div>
                            {property.legal_disputes && (
                              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                                <AlertCircle className="h-3.5 w-3.5" />
                                Dispute
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Table className="h-5 w-5 text-blue-600" />
                Available Demo Data
              </CardTitle>
              <CardDescription>Type any of these partial names to see autocomplete suggestions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2 px-3 font-medium text-gray-900 dark:text-white">Try Typing</th>
                      <th className="text-left py-2 px-3 font-medium text-gray-900 dark:text-white">Will Show</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    <tr>
                      <td className="py-2 px-3 font-medium text-blue-600">mum</td>
                      <td className="py-2 px-3 text-gray-600 dark:text-gray-400">Mumbai properties</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium text-blue-600">god</td>
                      <td className="py-2 px-3 text-gray-600 dark:text-gray-400">
                        Godrej Infinity, Godrej South Estate
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium text-blue-600">lodh</td>
                      <td className="py-2 px-3 text-gray-600 dark:text-gray-400">Lodha Bellissimo</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium text-blue-600">pres</td>
                      <td className="py-2 px-3 text-gray-600 dark:text-gray-400">
                        Prestige Lakeside Habitat, Prestige High Fields
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium text-blue-600">del</td>
                      <td className="py-2 px-3 text-gray-600 dark:text-gray-400">Delhi properties</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>What You&apos;ll Get</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  Property ownership details with owner contact
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  Registration information and transaction history
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  Title status, encumbrance, and legal dispute flags
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  Property type, area, and floor information
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
