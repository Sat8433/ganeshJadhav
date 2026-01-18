"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDistanceToNow } from "date-fns"
import { CreditCard, CheckCircle, XCircle, Clock } from 'lucide-react'

interface Payment {
  id: string
  amount: number
  currency: string
  status: string
  description: string
  created_at: string
}

interface DashboardPaymentsProps {
  payments: Payment[]
}

export function DashboardPayments({ payments }: DashboardPaymentsProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <CreditCard className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "failed":
        return "destructive"
      case "pending":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
        <CardDescription>Recent transactions</CardDescription>
      </CardHeader>
      <CardContent>
        {payments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p className="text-sm">No payment history</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {payments.map((payment) => (
                <div key={payment.id} className="flex items-start justify-between pb-4 border-b last:border-0">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(payment.status)}
                      <p className="text-sm font-medium text-foreground">{payment.description}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(payment.created_at), { addSuffix: true })}
                    </p>
                    <Badge variant={getStatusVariant(payment.status) as any} className="text-xs">
                      {payment.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">
                      {payment.currency.toUpperCase()} {Number(payment.amount).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
