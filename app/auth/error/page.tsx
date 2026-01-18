import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AlertCircle } from "lucide-react"
import Image from "next/image"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; error_description?: string }>
}) {
  const params = await searchParams

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
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <CardTitle className="text-2xl">Authentication Error</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {params?.error ? (
                <div className="rounded-lg bg-red-50 dark:bg-red-950/20 p-4">
                  <p className="text-sm font-medium text-red-600 dark:text-red-400">
                    {params.error_description || params.error}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  An unexpected error occurred during authentication.
                </p>
              )}
              <div className="pt-4 space-y-2">
                <Button asChild className="w-full h-11 bg-blue-600 hover:bg-blue-700">
                  <Link href="/auth/login">Try Again</Link>
                </Button>
                <Button asChild variant="outline" className="w-full h-11 bg-transparent">
                  <Link href="/">Go Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
