import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        },
      },
    },
  )

  await supabase.auth.getSession()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Public routes that don't require authentication
  const publicRoutes = [
    "/",
    "/about",
    "/privacy",
    "/terms",
    "/api-docs",
    "/insights",
    "/auth/login",
    "/auth/sign-up",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/auth/admin-access",
    "/auth/signout",
    "/refund-policy",
    "/legal-disclaimer",
    "/dashboard", // Temporarily public for testing
    "/profile", // Temporarily public for testing
  ]

  const isPublicRoute =
    publicRoutes.some(
      (route) =>
        request.nextUrl.pathname === route ||
        request.nextUrl.pathname.startsWith(route + "/") ||
        request.nextUrl.pathname.startsWith("/api") ||
        request.nextUrl.pathname.startsWith("/_next"),
    ) || request.nextUrl.pathname.includes(".")

  // Allow public routes
  if (isPublicRoute) {
    return response
  }

  // Redirect to login if no user on protected routes
  if (!user) {
    console.log("[v0] No authenticated user in middleware, redirecting to login from:", request.nextUrl.pathname)
    const url = request.nextUrl.clone()
    url.pathname = "/auth/login"
    return NextResponse.redirect(url)
  }

  console.log("[v0] Middleware: User authenticated:", user.email)
  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
}
