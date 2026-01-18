import { Button } from "@/components/ui/button"

export function SpeedUpBusinessSection() {
  return (
    <section className="py-20 bg-blue-900">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Speed up your Business</h2>
          <p className="text-xl text-blue-200 mb-8">
            Transform your real estate operations with our comprehensive data intelligence platform
          </p>
          <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
            Schedule a Demo
          </Button>
        </div>

        {/* Illustration */}
        <div className="flex justify-center">
          
        </div>
      </div>
    </section>
  )
}
