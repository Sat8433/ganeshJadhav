import { Button } from "@/components/ui/button"

export function ApiFrameworkSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">API Framework And Technical Infrastructure</h2>
          <p className="text-xl text-gray-600">
            Get API access to create, integrate, build, and customize solutions directly into your tech stack
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* API Features */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="w-6 h-6 bg-blue-600 rounded"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Plug-and-Play Architecture</h3>
                <p className="text-gray-600">
                  Seamlessly integrate our APIs into your existing systems with minimal development effort and maximum
                  compatibility.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="w-6 h-6 bg-green-600 rounded"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Universal Compatibility</h3>
                <p className="text-gray-600">
                  Compatible with all major programming languages, frameworks, and platforms for maximum flexibility.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="w-6 h-6 bg-purple-600 rounded"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">White-labeling Options</h3>
                <p className="text-gray-600">
                  Customize and brand our solutions to match your company's identity and user experience requirements.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="w-6 h-6 bg-red-600 rounded"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Enterprise Security</h3>
                <p className="text-gray-600">
                  Bank-grade security protocols, encryption, and compliance standards to protect your data and
                  operations.
                </p>
              </div>
            </div>

            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              View Documentation
            </Button>
          </div>

          {/* API Visualization */}
          <div className="relative">
            <div className="bg-gray-900 rounded-2xl p-8 text-white">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>

                <div className="font-mono text-sm space-y-2">
                  <div className="text-blue-400">// API Integration Example</div>
                  <div className="text-white">
                    <span className="text-purple-400">const</span> response ={" "}
                    <span className="text-purple-400">await</span> <span className="text-yellow-400">fetch</span>(
                  </div>
                  <div className="text-green-400 ml-4">'https://api.squareyards.com/v1/property/valuation'</div>
                  <div className="text-white">);</div>
                  <div className="text-white">
                    <span className="text-purple-400">const</span> data = <span className="text-purple-400">await</span>{" "}
                    response.<span className="text-yellow-400">json</span>();
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
