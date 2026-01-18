"use client"

import { AnimatedBeam } from "./animated-beam"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function AboutSection() {
  return (
    <section id="about" className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="container mx-auto grid items-center gap-12 px-6 lg:grid-cols-2 lg:px-12">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-poppins">About Ganesh Jadhav</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Building data‑driven real estate experiences with an obsessive focus on accuracy, speed, and delightful UX.
            The platform combines authenticated records, AI‑orchestrated intelligence, and scalable APIs to empower
            lenders, developers, valuers, and advisors.
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-6">
            <li>Authenticated, multi‑layer data infrastructure</li>
            <li>Modular APIs and dashboards for rapid integration</li>
            <li>Accessibility‑first design and strong performance baselines</li>
          </ul>

          <Link href="/about">
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl">Learn more</Button>
          </Link>
        </div>
        <AnimatedBeam />
      </div>
    </section>
  )
}
