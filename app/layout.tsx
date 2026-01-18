import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import Script from "next/script"
import PWAReg from "@/components/pwa-reg"
import { Navbar } from "@/components/navbar" // add navbar

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Ganesh Jadhav - Real Estate Data Intelligence for faster, smarter deals",
  description:
    "Powered by authenticated, AI‑orchestrated data infrastructure. Access valuations, market analytics, and comprehensive real estate data.",
  keywords:
    "real estate data, property valuation, market analytics, real estate intelligence, property search, title search, RERA data, AI real estate",
  generator: "v0.app",
  metadataBase: new URL("https://your-domain.example"),
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    url: "https://your-domain.example",
    siteName: "Ganesh Jadhav",
    title: "Ganesh Jadhav - Real Estate Data Intelligence",
    description:
      "AI‑orchestrated, authenticated real estate data for faster, smarter deals. Valuations, title diligence, transactions, and dashboards.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ganesh Jadhav" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ganesh Jadhav - Real Estate Data Intelligence",
    description:
      "AI‑orchestrated, authenticated real estate data for faster, smarter deals. Valuations, title diligence, transactions, and dashboards.",
    images: ["/og-image.png"],
  },
  alternates: { canonical: "/" },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="antialiased">
      <body className="font-sans">
        <PWAReg />
        <Navbar />
        <div>{children}</div>

        <Script strategy="lazyOnload" data-domain="your-domain.example" src="https://plausible.io/js/script.js" />
        <Script
          id="ld-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Ganesh Jadhav",
              url: "https://your-domain.example",
              logo: "https://your-domain.example/android-chrome-192x192.png",
            }),
          }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: "https://your-domain.example",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://your-domain.example/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </body>
    </html>
  )
}
