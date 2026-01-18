"use client"

import { useState } from "react"
import { X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"

interface Transaction {
  id: number
  project_name: string
  unit_number: string
  city: string
  property_type: string
  area_sqft: number
  last_transaction_amount: number
  registration_date: string
  registration_number: string
  owner_name: string
}

interface PropertySearchResultsModalProps {
  isOpen: boolean
  onClose: () => void
  transactions: Transaction[]
  totalCount: number
  searchCity: string
  searchAddress: string
}

export function PropertySearchResultsModal({
  isOpen,
  onClose,
  transactions,
  totalCount,
  searchCity,
  searchAddress,
}: PropertySearchResultsModalProps) {
  const [transactionType, setTransactionType] = useState<string>("all")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [minArea, setMinArea] = useState("")
  const [maxArea, setMaxArea] = useState("")
  const [minAmount, setMinAmount] = useState("")
  const [maxAmount, setMaxAmount] = useState("")

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)}Cr`
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)}L`
    }
    return `₹${amount.toLocaleString("en-IN")}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getTransactionTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "sale":
        return "bg-emerald-100 text-emerald-700 border-emerald-300"
      case "rent":
        return "bg-blue-100 text-blue-700 border-blue-300"
      case "mortgage":
        return "bg-amber-100 text-amber-700 border-amber-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-300"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[98vw] w-full h-[95vh] p-0 gap-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 border-2 border-white/20">
        {/* Gradient overlay for glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-teal-500/20 pointer-events-none" />

        {/* Signup Banner */}
        <div className="relative z-10 bg-amber-100/90 backdrop-blur-md border-b border-amber-300/50 px-6 py-3 flex items-center justify-center gap-2">
          <span className="text-amber-900 text-sm font-medium">
            🔥 Unlock transaction details with Free Views on Signup
          </span>
          <Button asChild size="sm" className="bg-orange-600 hover:bg-orange-700 text-white ml-4">
            <Link href="/auth/sign-up">Signup →</Link>
          </Button>
        </div>

        <div className="relative z-10 flex h-full overflow-hidden">
          {/* Filters Sidebar with glassmorphism */}
          <div className="w-64 border-r border-white/10 bg-white/10 backdrop-blur-xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">Filters</h3>
              <button
                className="text-sm text-orange-400 hover:text-orange-300"
                onClick={() => {
                  setTransactionType("all")
                  setStartDate("")
                  setEndDate("")
                  setMinArea("")
                  setMaxArea("")
                  setMinAmount("")
                  setMaxAmount("")
                }}
              >
                Clear All
              </button>
            </div>

            {/* Transaction Type */}
            <div className="mb-6">
              <Label className="text-sm font-medium text-white/90 mb-3 block">TRANSACTION TYPE</Label>
              <RadioGroup value={transactionType} onValueChange={setTransactionType}>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="all" id="all" className="border-white/50 text-white" />
                  <Label htmlFor="all" className="text-sm cursor-pointer text-white/80">
                    All
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="sale" id="sale" className="border-white/50 text-white" />
                  <Label htmlFor="sale" className="text-sm cursor-pointer text-white/80">
                    Sale
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="rent" id="rent" className="border-white/50 text-white" />
                  <Label htmlFor="rent" className="text-sm cursor-pointer text-white/80">
                    Rent
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mortgage" id="mortgage" className="border-white/50 text-white" />
                  <Label htmlFor="mortgage" className="text-sm cursor-pointer text-white/80">
                    Mortgage
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Registration Date */}
            <div className="mb-6">
              <Label className="text-sm font-medium text-white/90 mb-3 block">REGISTRATION DATE</Label>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="startDate" className="text-xs text-white/70">
                    Start Date
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <Label htmlFor="endDate" className="text-xs text-white/70">
                    End Date
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              </div>
            </div>

            {/* Area (SQFT) */}
            <div className="mb-6">
              <Label className="text-sm font-medium text-white/90 mb-3 block">AREA (SQFT)</Label>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="minArea" className="text-xs text-white/70">
                    Min Area
                  </Label>
                  <Input
                    id="minArea"
                    type="number"
                    placeholder="Min Area"
                    value={minArea}
                    onChange={(e) => setMinArea(e.target.value)}
                    className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <Label htmlFor="maxArea" className="text-xs text-white/70">
                    Max Area
                  </Label>
                  <Input
                    id="maxArea"
                    type="number"
                    placeholder="Max Area"
                    value={maxArea}
                    onChange={(e) => setMaxArea(e.target.value)}
                    className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              </div>
            </div>

            {/* Amount (INR) */}
            <div className="mb-6">
              <Label className="text-sm font-medium text-white/90 mb-3 block">AMOUNT (INR)</Label>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="minAmount" className="text-xs text-white/70">
                    Min Amount
                  </Label>
                  <Input
                    id="minAmount"
                    type="number"
                    placeholder="Min Amount"
                    value={minAmount}
                    onChange={(e) => setMinAmount(e.target.value)}
                    className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <Label htmlFor="maxAmount" className="text-xs text-white/70">
                    Max Amount
                  </Label>
                  <Input
                    id="maxAmount"
                    type="number"
                    placeholder="Max Amount"
                    value={maxAmount}
                    onChange={(e) => setMaxAmount(e.target.value)}
                    className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              </div>
            </div>

            <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">Apply Filters</Button>
          </div>

          {/* Results Area with glassmorphism */}
          <div className="flex-1 flex flex-col overflow-hidden bg-white/5 backdrop-blur-xl">
            {/* Results Header */}
            <div className="border-b border-white/10 p-6 bg-white/5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Showing {transactions.length} of {totalCount} transactions
                  </h2>
                  <p className="text-sm text-white/70 mt-1">
                    Can't see what you're looking for? Try refining your search
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    Sort by: Date <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/10">
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Transaction Cards */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {transactions.map((transaction, index) => (
                <div
                  key={transaction.id}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 hover:border-orange-400/50 hover:bg-white/15 transition-all"
                >
                  {/* Transaction Type Badge & Title */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={`px-3 py-1 rounded text-xs font-medium border ${getTransactionTypeColor(
                            transaction.property_type,
                          )}`}
                        >
                          {transaction.property_type}
                        </span>
                        <span className="text-xs text-white/60">{formatDate(transaction.registration_date)}</span>
                      </div>
                      <h3 className="text-base font-semibold text-white">
                        #{index + 1} {transaction.unit_number}, {transaction.project_name}, {transaction.city}
                      </h3>
                    </div>
                    <Button
                      size="sm"
                      className="bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-2"
                      asChild
                    >
                      <Link href="/auth/sign-up">
                        <span className="text-lg">🔓</span> Unlock
                      </Link>
                    </Button>
                  </div>

                  {/* Transaction Details (Blurred) */}
                  <div className="grid grid-cols-4 gap-6 mb-4">
                    <div>
                      <p className="text-xs text-white/60 mb-1">Amount</p>
                      <p className="text-sm font-medium text-white/50 blur-sm select-none">
                        {formatCurrency(transaction.last_transaction_amount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-white/60 mb-1">Area (sft)</p>
                      <p className="text-sm font-medium text-white/50 blur-sm select-none">{transaction.area_sqft}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/60 mb-1">Document No.</p>
                      <p className="text-sm font-medium text-white/50 blur-sm select-none">
                        {transaction.registration_number}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-white/60 mb-1">SRO</p>
                      <p className="text-sm font-medium text-white/50 blur-sm select-none">{transaction.city}</p>
                    </div>
                  </div>

                  {/* Parties Involved (Blurred) */}
                  <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center">
                        <span className="text-white text-lg">🏢</span>
                      </div>
                      <div>
                        <p className="text-xs text-white/60">
                          {transaction.property_type === "Sale" ? "Seller" : "Owner"}
                        </p>
                        <p className="text-sm font-medium text-white/50 blur-sm select-none">
                          {transaction.owner_name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center">
                        <span className="text-white text-lg">👤</span>
                      </div>
                      <div>
                        <p className="text-xs text-white/60">
                          {transaction.property_type === "Sale" ? "Buyer" : "Tenant"}
                        </p>
                        <p className="text-sm font-medium text-white/50 blur-sm select-none">Private Party</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {transactions.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-white/70">No transactions found matching your search.</p>
                  <p className="text-white/50 text-sm mt-2">
                    Try searching for properties like "Lodha Bellissimo", "Oberoi", or "Godrej"
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
