"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Key, Briefcase, FileText, Calendar } from "lucide-react"

interface Transaction {
  id: string
  unit_number: string
  property_type: string
  area_sqft: number
  registration_number: string
  registration_date: string
  last_transaction_amount: number
  owner_name: string
}

interface PropertyTransactionResultsProps {
  transactions: Transaction[]
  projectName: string
  city: string
}

export function PropertyTransactionResults({ transactions, projectName, city }: PropertyTransactionResultsProps) {
  const [sortBy, setSortBy] = useState<"date" | "amount">("date")

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.registration_date).getTime() - new Date(a.registration_date).getTime()
    }
    return b.last_transaction_amount - a.last_transaction_amount
  })

  const formatAmount = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`
    }
    return `₹${amount.toLocaleString("en-IN")}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 space-y-4">
      {/* Results Header */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Showing {transactions.length} transaction{transactions.length !== 1 ? "s" : ""}
            </h2>
            <p className="text-sm text-white/70">
              {projectName}, {city}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/70">Sort by:</span>
            <Button
              variant={sortBy === "date" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("date")}
              className="text-xs"
            >
              Date
            </Button>
            <Button
              variant={sortBy === "amount" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("amount")}
              className="text-xs"
            >
              Amount
            </Button>
          </div>
        </div>
      </div>

      {/* Transaction Cards */}
      <div className="space-y-3">
        {sortedTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-5 hover:bg-white/15 transition-all"
          >
            {/* Transaction Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={transaction.property_type === "Sale" ? "default" : "secondary"} className="text-xs">
                    {transaction.property_type}
                  </Badge>
                  <span className="text-xs text-white/50">{transaction.registration_number}</span>
                </div>
                <h3 className="text-white font-medium">#{transaction.unit_number}</h3>
              </div>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                <Key className="h-3 w-3 mr-1" />
                Unlock
              </Button>
            </div>

            {/* Transaction Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="flex items-center gap-1 text-xs text-white/50 mb-1">
                  <FileText className="h-3 w-3" />
                  Amount
                </div>
                <div className="text-white font-medium">{formatAmount(transaction.last_transaction_amount)}</div>
              </div>

              <div>
                <div className="flex items-center gap-1 text-xs text-white/50 mb-1">
                  <FileText className="h-3 w-3" />
                  Area (sqft)
                </div>
                <div className="text-white font-medium">{transaction.area_sqft.toLocaleString("en-IN")}</div>
              </div>

              <div>
                <div className="flex items-center gap-1 text-xs text-white/50 mb-1">
                  <Calendar className="h-3 w-3" />
                  Date
                </div>
                <div className="text-white font-medium">{formatDate(transaction.registration_date)}</div>
              </div>

              <div>
                <div className="flex items-center gap-1 text-xs text-white/50 mb-1">
                  <Briefcase className="h-3 w-3" />
                  SRO
                </div>
                <div className="text-white font-medium text-sm">
                  {transaction.registration_number.split("/")[2] || "N/A"}
                </div>
              </div>
            </div>

            {/* Owner/Buyer Section */}
            <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-xs text-white">👤</span>
                </div>
                <div>
                  <div className="text-xs text-white/50">
                    {transaction.property_type === "Sale" ? "Seller" : "Owner"}
                  </div>
                  <div className="text-white text-sm font-medium blur-sm select-none">{transaction.owner_name}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-xs text-white">💼</span>
                </div>
                <div>
                  <div className="text-xs text-white/50">
                    {transaction.property_type === "Sale" ? "Buyer" : "Tenant"}
                  </div>
                  <div className="text-white text-sm font-medium blur-sm select-none">Hidden Name</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="bg-orange-500/20 backdrop-blur-md rounded-lg border border-orange-500/30 p-4 text-center">
        <p className="text-white mb-2">
          🔥 <span className="font-semibold">Unlock transaction details with Free Views on Signup</span>
        </p>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">Sign Up for Free →</Button>
      </div>
    </div>
  )
}
