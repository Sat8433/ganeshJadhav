"use client"

import { useState, useEffect } from "react"

export function TrustedBySection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const companies = [
    { name: "HDFC Bank", logo: "/hdfc-bank-logo.png", description: "India's largest private sector bank by assets" },
    {
      name: "ICICI Bank",
      logo: "/icici-bank-logo.png",
      description: "Leading private sector bank with real estate focus",
    },
    { name: "Axis Bank", logo: "/axis-bank-logo.png", description: "Major private bank with home loan expertise" },
    { name: "Bajaj Finserv", logo: "/bajaj-finserv-logo.png", description: "Leading NBFC for property financing" },
    { name: "Godrej Properties", logo: "/godrej-properties-logo.png", description: "Premium real estate developer" },
    { name: "DLF Limited", logo: "/dlf-logo.png", description: "India's largest real estate company" },
    { name: "Prestige Group", logo: "/prestige-group-logo.png", description: "Leading South Indian developer" },
    { name: "Brigade Group", logo: "/brigade-group-logo.png", description: "Diversified real estate conglomerate" },
    {
      name: "Mahindra Lifespace",
      logo: "/mahindra-lifespace-logo.png",
      description: "Sustainable real estate developer",
    },
    { name: "Sobha Limited", logo: "/sobha-limited-logo.png", description: "Luxury residential developer" },
    { name: "Tata Housing", logo: "/tata-housing-logo.png", description: "Tata Group's real estate arm" },
    { name: "L&T Realty", logo: "/lt-realty-logo.png", description: "Engineering-driven real estate company" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(companies.length / 4))
    }, 3000)
    return () => clearInterval(interval)
  }, [companies.length])

  return (
    <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-poppins">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join 500+ leading organizations who rely on Ganesh Jadhav for their real estate intelligence needs
          </p>
          <div className="flex justify-center items-center gap-8 text-sm text-gray-500 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#4F46E5] rounded-full"></div>
              <span>500+ Enterprise Clients</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#14B8A6] rounded-full"></div>
              <span>99.9% Uptime SLA</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#2563EB] rounded-full"></div>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {Array.from({ length: Math.ceil(companies.length / 4) }).map((_, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
                  {companies.slice(slideIndex * 4, (slideIndex + 1) * 4).map((company, index) => (
                    <div
                      key={index}
                      className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                    >
                      <div className="w-24 h-24 mb-4 flex items-center justify-center bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#163B6E] to-[#4F46E5] rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {company.name
                              .split(" ")
                              .map((word) => word[0])
                              .join("")
                              .slice(0, 2)}
                          </span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-900 text-center mb-2 group-hover:text-[#163B6E] transition-colors">
                        {company.name}
                      </h3>
                      <p className="text-xs text-gray-500 text-center leading-relaxed">{company.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: Math.ceil(companies.length / 4) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "bg-[#163B6E] scale-110" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-[#163B6E] mb-2">₹2.5T+</div>
            <div className="text-gray-600">Property Value Analyzed</div>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-[#4F46E5] mb-2">50M+</div>
            <div className="text-gray-600">Data Points Processed</div>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-[#14B8A6] mb-2">99.8%</div>
            <div className="text-gray-600">Data Accuracy Rate</div>
          </div>
        </div>
      </div>
    </section>
  )
}
