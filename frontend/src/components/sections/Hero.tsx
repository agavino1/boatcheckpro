'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function Hero() {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-gray-50 via-white to-primary-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium">
                  ✨ The future of boat inspections
                </span>
              </div>
              <h1 className="section-title">
                Professional Boat Inspections,{' '}
                <span className="gradient-text">Simplified</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Get comprehensive, detailed boat inspection reports in 24 hours. Our certified
                technicians use cutting-edge technology to ensure your vessel is in perfect condition.
              </p>
            </div>

            <div className="space-y-3">
              {['Certified marine technicians', 'Detailed digital reports', 'Real-time scheduling'].map(
                (feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                )
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/register" className="btn-primary flex items-center justify-center gap-2">
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="#how-it-works" className="btn-outline">
                Watch Demo
              </Link>
            </div>

            <p className="text-sm text-gray-500">
              ✓ 2000+ boats inspected • 98% customer satisfaction • ISO 9001 certified
            </p>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-400 to-secondary-400 opacity-10 absolute inset-0" />
            <div className="relative aspect-square bg-white rounded-2xl shadow-xl border border-gray-200 p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <span className="text-5xl">⛵</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Your boat,
                  <br />
                  fully checked
                </h3>
                <p className="text-gray-600 text-sm">
                  Get peace of mind with professional inspections
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
