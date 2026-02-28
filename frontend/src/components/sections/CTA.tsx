'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-900 to-secondary-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-700 rounded-full opacity-10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-700 rounded-full opacity-10 blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Inspect Your Boat?</h2>
          <p className="text-xl text-white/80 mb-12 leading-relaxed">
            Book a professional inspection today and get a detailed report within 24 hours. Trusted
            by boat owners, insurance companies, and marinas worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/register" className="px-8 py-4 bg-white text-primary-600 rounded-lg font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-lg">
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="#pricing" className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition-colors text-lg">
              View Pricing
            </a>
          </div>

          <div className="grid grid-cols-3 gap-8 text-center">
            {[['50+', 'Certified Experts'], ['2000+', 'Happy Customers'], ['98%', 'Satisfaction Rate']].map(([num, label], i) => (
              <div key={label} className={i === 1 ? 'border-l border-r border-white/20' : ''}>
                <div className="text-4xl font-bold mb-2">{num}</div>
                <p className="text-white/70 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
