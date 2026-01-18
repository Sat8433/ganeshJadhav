"use client"

export default function DataAggregation() {
  return (
    <section className="py-20 bg-gradient-to-br from-secondary to-accent relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-muted/40 rounded-full"></div>
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-muted/30 rounded-full"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 max-w-4xl mx-auto leading-tight">
          Your Single Source of Truth for <span className="text-primary font-bold">Property Registration Data</span>
        </h2>
        <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
          Instantly verify property purchases, sales, and lease agreements from official records, all in one place.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-card hover:bg-muted border border-border text-card-foreground font-semibold py-4 px-8 rounded-lg transition-colors shadow-sm">
            View Sample Documents
          </button>
          <button className="bg-card hover:bg-muted border border-border text-card-foreground font-semibold py-4 px-8 rounded-lg transition-colors shadow-sm">
            Read FAQ
          </button>
        </div>
      </div>
    </section>
  )
}
