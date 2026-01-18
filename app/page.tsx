"use client"

import { useState } from "react"
import { HeroSection } from "@/components/hero-section"
import { TrustedBySection } from "@/components/trusted-by-section"
import { DataInfrastructureSection } from "@/components/data-infrastructure-section"
import { RoleBasedNavigation } from "@/components/role-based-navigation"
import { ServicesSection } from "@/components/services-section"
import { PropertyRatesDashboard } from "@/components/property-rates-dashboard"
import { BenefitsSection } from "@/components/benefits-section"
import { ComparisonSection } from "@/components/comparison-section"
import { DataScaleSection } from "@/components/data-scale-section"
import { ApiFrameworkSection } from "@/components/api-framework-section"
import { InsightsCarousel } from "@/components/insights-carousel"
import { SpeedUpBusinessSection } from "@/components/speed-up-business-section"
import { Footer } from "@/components/footer"
import { StickyDemoCTA } from "@/components/sticky-demo-cta"
import { LocalizationProvider, RegionalSwitcher } from "@/components/regional-localization"
import { AboutSection } from "@/components/about-section"
import TransactionDataSection from "@/components/sections/transaction-data"
import TitleVerificationSection from "@/components/sections/title-verification"
import DataAggregation from "@/components/sections/data-aggregation"

export default function Home() {
  const [filteredSolutions, setFilteredSolutions] = useState<string[]>([])

  return (
    <LocalizationProvider>
      <main className="min-h-screen">
        <div className="fixed top-4 right-4 z-40">
          <RegionalSwitcher />
        </div>

        <HeroSection />

        <DataAggregation />

        <TrustedBySection />
        <DataInfrastructureSection />

        <section id="solutions" className="py-12 bg-gradient-to-b from-blue-900 to-indigo-900">
          <div className="container mx-auto px-4">
            <RoleBasedNavigation onFilterChange={setFilteredSolutions} />
          </div>
        </section>

        <section id="services">
          <ServicesSection filteredSolutions={filteredSolutions} />
        </section>

        <TransactionDataSection />
        <TitleVerificationSection />

        <PropertyRatesDashboard />
        <BenefitsSection />
        <ComparisonSection />
        <DataScaleSection />
        <ApiFrameworkSection />
        <InsightsCarousel />

        <AboutSection />

        <SpeedUpBusinessSection />
        <Footer />
        <StickyDemoCTA />
      </main>
    </LocalizationProvider>
  )
}
