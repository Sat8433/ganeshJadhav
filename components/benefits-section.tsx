import { CheckCircle2, Rocket, ShieldCheck, BarChart3, Zap, Layers } from "lucide-react"

export function BenefitsSection() {
  const metrics = [
    { value: "25%", label: "Faster Decision Making", color: "bg-purple-500" },
    { value: "15%", label: "Cost Reduction", color: "bg-orange-500" },
    { value: "20%", label: "Revenue Growth", color: "bg-pink-500" },
    { value: "15%", label: "Risk Mitigation", color: "bg-green-500" },
  ]

  const benefits = [
    {
      icon: <Layers className="h-6 w-6 text-indigo-600" />,
      title: "Access to authenticated data at scale",
      description:
        "Get access to comprehensive and verified real estate data from multiple authenticated sources for informed decision making.",
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-indigo-600" />,
      title: "Streamline your workflows",
      description:
        "Optimize your real estate operations with automated processes and integrated data workflows that save time and resources.",
    },
    {
      icon: <Rocket className="h-6 w-6 text-indigo-600" />,
      title: "Higher Conversion at Reduced Costs",
      description:
        "Achieve better conversion rates while reducing operational costs through data-driven insights and targeted strategies.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-indigo-600" />,
      title: "Reduce Risk & Ensure Compliance",
      description:
        "Minimize investment risks and ensure regulatory compliance with comprehensive due diligence and verification tools.",
    },
    {
      icon: <Zap className="h-6 w-6 text-indigo-600" />,
      title: "Speed up your Business",
      description:
        "Accelerate your business growth with real-time data access, automated valuations, and instant market insights.",
    },
    {
      icon: <CheckCircle2 className="h-6 w-6 text-indigo-600" />,
      title: "Enterprise-grade Support",
      description:
        "Priority support, SLAs, and solution architects to help you integrate, launch, and scale confidently.",
    },
  ]

  return (
    <section id="benefits" className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Benefits</h2>
          <p className="text-xl text-gray-600 mb-12">
            Achieve measurable business outcomes with our comprehensive data intelligence platform
          </p>

          {/* Performance Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {metrics.map((metric, index) => (
              <div key={index} className={`${metric.color} text-white p-6 rounded-2xl`}>
                <div className="text-3xl font-bold mb-2">{metric.value}</div>
                <div className="text-sm font-medium">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="rounded-2xl bg-gray-50 p-8 transition-shadow hover:shadow-lg">
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="mb-4 text-xl font-bold text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
