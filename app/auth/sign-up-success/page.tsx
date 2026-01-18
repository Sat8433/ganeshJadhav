import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail } from "lucide-react"
import Image from "next/image"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          {/* Logo and Brand */}
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Ganesh Jadhav Logo" width={32} height={32} className="rounded-lg" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">Ganesh Jadhav</span>
            </div>
          </div>

          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Check Your Email</CardTitle>
              <CardDescription>We&apos;ve sent you a confirmation link</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Please check your email and click the confirmation link to activate your account. Once confirmed,
                you&apos;ll receive 5 free credits to get started.
              </p>
              <div className="pt-4">
                <Button asChild className="w-full h-11 bg-blue-600 hover:bg-blue-700">
                  <Link href="/auth/login">Go to Sign In</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
