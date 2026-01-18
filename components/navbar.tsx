"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CommandSearch } from "./nav/command-search"
import { ChevronDown, Home, LayoutGrid, FileCode2, Newspaper, User2 } from "lucide-react"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const isActive = (href: string) => pathname === href

  const isHome = pathname === "/"
  const isTransparent = isHome && !scrolled

  const containerCls = isTransparent
    ? "border-white/10 bg-white/10 text-white shadow-[0_0_30px_rgba(79,70,229,0.35)]"
    : "border-slate-200/60 bg-white/80 text-slate-900 shadow-lg"

  const linkBase = isTransparent ? "text-white hover:bg-white/15" : "text-slate-900 hover:bg-slate-900/5"

  const activeLink = isTransparent
    ? "bg-white/15 shadow-inner shadow-indigo-500/20"
    : "bg-slate-900/5 shadow-inner"

  return (
    <>
      {/* Top bar (desktop/tablet) */}
      <nav className="fixed top-0 left-0 right-0 z-50 hidden md:block">
        <div className="mx-auto max-w-7xl px-4">
          <div className={cn("rounded-2xl border backdrop-blur-lg", containerCls)}>
            <div className="flex items-center justify-between px-4 py-2">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.png" alt="Ganesh Jadhav Logo" width={32} height={32} className="rounded-lg" />
                <span
                  className={cn(
                    "font-poppins font-semibold tracking-tight",
                    !isTransparent ? "text-slate-900" : "text-white",
                  )}
                >
                  Ganesh Jadhav
                </span>
              </Link>

              <div className="hidden items-center gap-2 lg:flex">
                <NavLink href="/" active={isActive("/")} cls={{ linkBase, activeLink }}>
                  <Home className="h-4 w-4" />
                  Home
                </NavLink>

                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className={cn("rounded-xl gap-2", linkBase, open && activeLink)}>
                      <LayoutGrid className="h-4 w-4" />
                      Solutions
                      <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className={cn(
                      "min-w-[300px] rounded-2xl p-1 backdrop-blur-md",
                      !isTransparent ? "bg-white/90 border-slate-200" : "bg-slate-900/80 border-white/10",
                      "border shadow-2xl transition-[opacity,transform] duration-200 data-[state=open]:opacity-100 data-[state=open]:translate-y-0 data-[state=closed]:opacity-0 data-[state=closed]:-translate-y-1 relative",
                    )}
                  >
                    <div
                      className={cn("rounded-xl p-1", !isTransparent ? "ring-1 ring-slate-200/70" : "ring-1 ring-white/10")}
                    >
                      <DropdownMenuLabel
                        className={cn("px-2 py-1.5 text-xs", !isTransparent ? "text-slate-500" : "text-slate-300/90")}
                      >
                        Explore Modules
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {[
                        ["#service-e-valuation", "E‑Valuation"],
                        ["#service-property-search", "Property Assets Search"],
                        ["#service-project-monitoring", "Project Monitoring"],
                        ["#service-title-search", "Title Search"],
                        ["#service-transaction-search", "Transaction Search"],
                        ["#service-dashboard", "Real Estate Dashboard"],
                      ].map(([href, label]) => (
                        <DropdownMenuItem key={label} asChild className="my-0.5 rounded-lg">
                          <a
                            href={href}
                            className={cn(
                              "block w-full rounded-lg px-3 py-2",
                              !isTransparent ? "text-slate-900 hover:bg-slate-900/5" : "text-white hover:bg-white/10",
                            )}
                          >
                            {label}
                          </a>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                <NavLink href="/insights" active={isActive("/insights")} cls={{ linkBase, activeLink }}>
                  <Newspaper className="h-4 w-4" />
                  Insights
                </NavLink>
                <NavLink href="/api-docs" active={isActive("/api-docs")} cls={{ linkBase, activeLink }}>
                  <FileCode2 className="h-4 w-4" />
                  API Docs
                </NavLink>
                <NavLink href="/about" active={isActive("/about")} cls={{ linkBase, activeLink }}>
                  <User2 className="h-4 w-4" />
                  About
                </NavLink>
              </div>

              <div className="flex items-center gap-3">
                <CommandSearch variant={!isTransparent ? "light" : "dark"} />
                <Link href="/auth/sign-up">
                  <Button
                    variant="outline"
                    className={cn(
                      "rounded-xl",
                      !isTransparent
                        ? "border-slate-300 text-slate-900 hover:bg-slate-100"
                        : "border-white/20 text-white hover:bg-white/10",
                    )}
                  >
                    Sign Up
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button
                    className={cn(
                      "rounded-xl text-white",
                      !isTransparent ? "bg-slate-900 hover:bg-slate-800" : "bg-indigo-600 hover:bg-indigo-500",
                    )}
                  >
                    Log in
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Glow Menu (mobile) */}
      <div className="fixed inset-x-0 bottom-4 z-50 px-4 md:hidden">
        <div
          className={cn(
            "mx-auto flex max-w-md items-center justify-around rounded-2xl border px-3 py-2 backdrop-blur-lg",
            !isTransparent
              ? "bg-white/80 border-slate-200 shadow-lg"
              : "bg-white/10 border-white/10 shadow-[0_0_30px_rgba(79,70,229,0.35)]",
          )}
        >
          <MobileLink href="/" active={isActive("/")} dark={isTransparent}>
            <Home className="h-5 w-5" />
          </MobileLink>
          <MobileLink href="/insights" active={isActive("/insights")} dark={isTransparent}>
            <Newspaper className="h-5 w-5" />
          </MobileLink>
          <MobileLink href="/api-docs" active={isActive("/api-docs")} dark={isTransparent}>
            <FileCode2 className="h-5 w-5" />
          </MobileLink>
          <MobileLink href="/about" active={isActive("/about")} dark={isTransparent}>
            <User2 className="h-5 w-5" />
          </MobileLink>
        </div>
      </div>
    </>
  )
}

function NavLink({
  href,
  active,
  children,
  cls,
}: {
  href: string
  active?: boolean
  children: React.ReactNode
  cls: { linkBase: string; activeLink: string }
}) {
  return (
    <Link
      href={href}
      className={cn("inline-flex items-center gap-2 rounded-xl px-3 py-2", cls.linkBase, active && cls.activeLink)}
    >
      {children}
    </Link>
  )
}

function MobileLink({
  href,
  active,
  children,
  dark,
}: {
  href: string
  active?: boolean
  children: React.ReactNode
  dark?: boolean
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-xl",
        dark ? "text-white" : "text-slate-900",
        active ? "bg-white/20" : "hover:bg-white/10",
      )}
      aria-current={active ? "page" : undefined}
    >
      {active && (
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-3 rounded-full bg-gradient-to-r from-indigo-500/40 via-purple-500/30 to-teal-400/40 blur-xl"
        />
      )}
      <span className="relative">{children}</span>
    </Link>
  )
}
