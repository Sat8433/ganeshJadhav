// --- SVG Icon Components (for better visual separation and clarity) ---

const ShieldCheckIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

const BrainCircuitIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 5a3 3 0 1 0-5.993.142" />
    <path d="M18 5a3 3 0 1 0-5.993.142" />
    <path d="M12 12a3 3 0 1 0-5.993.142" />
    <path d="M18 12a3 3 0 1 0-5.993.142" />
    <path d="M12 19a3 3 0 1 0-5.993.142" />
    <path d="M18 19a3 3 0 1 0-5.993.142" />
    <path d="M6 5h.01" />
    <path d="M18 5h.01" />
    <path d="M6 12h.01" />
    <path d="M18 12h.01" />
    <path d="M6 19h.01" />
    <path d="M18 19h.01" />
    <path d="M9 7.857A3.001 3.001 0 0 0 9 9h6a3 3 0 0 0 0-1.857" />
    <path d="M9 14.857A3.001 3.001 0 0 0 9 16h6a3 3 0 0 0 0-1.857" />
  </svg>
)

const CodeXmlIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m18 16 4-4-4-4" />
    <path d="m6 8-4 4 4 4" />
    <path d="m14.5 4-5 16" />
  </svg>
)

// --- Main Page Component ---

export default function App() {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans">
      <main>
        {/* --- Hero Section --- */}
        <section className="bg-white py-20 sm:py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
              Re-engineering Property Due Diligence
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-600">
              Bringing transparency, trust, and fairness to the Indian real estate market through data-driven
              intelligence.
            </p>
          </div>
        </section>

        {/* --- Our Story Section --- */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Story</h2>
              <p className="mt-4 text-gray-600">
                Our journey began with a simple observation: the growth of affordable housing and seamless property
                transactions in India was hampered by a fundamental lack of transparency. We saw how the absence of
                clear title and valuation information locked away 'dead' capital, preventing households from leveraging
                their most valuable assets.
              </p>
              <p className="mt-4 text-gray-600">
                Ganeshjadhav.com was born from this challenge. We are dedicated to creating the largest centralized
                repository of real estate data in India, using technology to bring clarity where there was once
                uncertainty.
              </p>
            </div>
          </div>
        </section>

        {/* --- Mission & Vision Section --- */}
        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                <p className="mt-4 text-lg text-gray-600">
                  To craft high-fidelity, performant web experiences that transform raw real estate data into actionable
                  intelligence. We empower lenders, developers, valuers, and advisors with an obsessive focus on
                  accuracy, speed, and delightful user experience.
                </p>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                <p className="mt-4 text-lg text-gray-600">
                  To remove the uncertainty of title and provide clear, undeniable property rights for a billion people.
                  We aim to unlock India's real estate potential and build a foundation of trust for future generations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Our Approach Section --- */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Platform</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                We combine authenticated records, advanced AI, and scalable technology to deliver unparalleled insights.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 mx-auto">
                  <ShieldCheckIcon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">Authenticated Data</h3>
                <p className="mt-2 text-gray-600">
                  A multi-layered data infrastructure built on verified public records ensures the highest level of
                  accuracy and reliability.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 mx-auto">
                  <BrainCircuitIcon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">AI-Orchestrated Intelligence</h3>
                <p className="mt-2 text-gray-600">
                  We use big data and machine learning to clean, structure, and analyze complex land records, turning
                  noise into clear signals.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 mx-auto">
                  <CodeXmlIcon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">Scalable APIs & Dashboards</h3>
                <p className="mt-2 text-gray-600">
                  Modular APIs and intuitive dashboards are designed for rapid integration, empowering our partners to
                  build better products, faster.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Call to Action Section --- */}
        <section className="bg-indigo-700">
          <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Building the Future of Indian Real Estate.</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-indigo-200">
              Join us in creating a more transparent and trustworthy property ecosystem.
            </p>
            <a
              href="#"
              className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
            >
              Contact Us
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">&copy; 2024 Ganeshjadhav.com. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
