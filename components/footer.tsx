import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-[#0B1220] text-white py-16">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Image src="/logo.png" alt="Ganesh Jadhav Logo" width={40} height={40} className="rounded-lg" />
              <div>
                <div className="font-bold text-xl font-poppins">Ganesh Jadhav</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Accelerate your real estate business with AI-orchestrated data intelligence. Powered by authenticated data
              infrastructure for faster, smarter deals.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-[#4F46E5] rounded-full flex items-center justify-center hover:bg-[#4F46E5]/80 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#14B8A6] rounded-full flex items-center justify-center hover:bg-[#14B8A6]/80 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#2563EB] rounded-full flex items-center justify-center hover:bg-[#2563EB]/80 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg font-poppins">Solutions</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-[#14B8A6] transition-colors">
                  E-Valuation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#14B8A6] transition-colors">
                  Property Assets Search
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#14B8A6] transition-colors">
                  Project Monitoring
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#14B8A6] transition-colors">
                  Title Search
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#14B8A6] transition-colors">
                  Transaction Search
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#14B8A6] transition-colors">
                  Analytics Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg font-poppins">Industries</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-[#14B8A6] transition-colors">
                  Banks & NBFCs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#14B8A6] transition-colors">
                  Developers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#14B8A6] transition-colors">
                  Property Valuers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#14B8A6] transition-colors">
                  Legal Professionals
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#14B8A6] transition-colors">
                  Real Estate Investors
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#14B8A6] transition-colors">
                  Consultants
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg font-poppins">Contact</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#14B8A6]" />
                <a href="mailto:contact@ganeshjadhav.com" className="text-sm hover:text-[#14B8A6]">
                  contact@ganeshjadhav.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#14B8A6]" />
                <span className="text-sm">+91 93720 22746</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="mt-0.5 w-4 h-4 text-[#14B8A6]" />
                <span className="text-sm">
                  Global Headquarters
                  <br />
                  Mumbai, IN
                </span>
              </div>
            </div>
            <div className="pt-4">
              <h4 className="font-semibold text-sm mb-2">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link href="/api-docs" className="hover:text-[#14B8A6] transition-colors">
                    API Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-[#14B8A6] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-[#14B8A6] transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Ganesh Jadhav. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
