export function DataScaleSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Authenticated Data at Scale</h2>
          <p className="text-xl text-gray-600">
            Comprehensive data coverage across multiple levels for complete market intelligence
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Data Hierarchy */}
          <div className="space-y-8">
            <div className="relative">
              {/* 3D Layered Visualization */}
              <div className="relative flex justify-center">
                <div className="space-y-4">
                  {/* Country Level */}
                  <div className="w-80 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg transform rotate-1">
                    Country Level Analytics
                  </div>

                  {/* City Level */}
                  <div className="w-72 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg transform -rotate-1">
                    City Level Insights
                  </div>

                  {/* Location Level */}
                  <div className="w-64 h-16 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg transform rotate-1">
                    Location Level Data
                  </div>

                  {/* Project Level */}
                  <div className="w-56 h-16 bg-gradient-to-r from-green-600 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg transform -rotate-1">
                    Project Level Details
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Points */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                <h3 className="text-xl font-bold text-gray-900">Country Level</h3>
              </div>
              <p className="text-gray-600">
                National real estate trends, policy impacts, and macro-economic indicators affecting property markets
                across India.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <h3 className="text-xl font-bold text-gray-900">City Level</h3>
              </div>
              <p className="text-gray-600">
                Metropolitan area analysis, infrastructure development, and city-specific market dynamics and growth
                patterns.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-3 h-3 bg-cyan-600 rounded-full"></div>
                <h3 className="text-xl font-bold text-gray-900">Location Level</h3>
              </div>
              <p className="text-gray-600">
                Micro-market insights, neighborhood analytics, and locality-specific pricing trends and development
                activities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <h3 className="text-xl font-bold text-gray-900">Project Level</h3>
              </div>
              <p className="text-gray-600">
                Individual project tracking, construction progress, developer profiles, and unit-level pricing and
                availability data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
