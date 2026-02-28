'use client'

import { Check } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Basic Inspection', price: 299, description: 'Perfect for smaller vessels',
    features: ['Complete hull inspection', 'Engine & mechanical check', 'Safety equipment review', 'Digital PDF report', 'Photo documentation', 'Email support'],
    popular: false,
  },
  {
    name: 'Premium Inspection', price: 499, description: 'Most popular for sailing yachts',
    features: ['Everything in Basic', 'Detailed rigging inspection', 'Electrical systems audit', 'Plumbing systems check', 'Damage assessment', 'Priority scheduling', 'Phone support', 'Free follow-up consultation'],
    popular: true,
  },
  {
    name: 'Expert Inspection', price: 749, description: 'Comprehensive for larger vessels',
    features: ['Everything in Premium', 'Underwater hull survey (with diver)', 'Expert structural analysis', 'Engine lab testing', 'Marine surveyor report', 'Insurance valuation letter', 'Dedicated inspector', 'Lifetime report access'],
    popular: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title">Transparent Pricing</h2>
          <p className="section-subtitle">No hidden fees, no surprises. Simple, fair pricing for every vessel</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.name} className={`card relative transition-transform hover:scale-105 ${plan.popular ? 'md:scale-105 shadow-2xl ring-2 ring-primary-600' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-xs font-bold rounded-full">MOST POPULAR</span>
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-6">{plan.description}</p>
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-600">per inspection</span>
                  </div>
                  <p className="text-gray-500 text-xs mt-2">No recurring charges</p>
                </div>
                <Link href="/request-inspection" className={`w-full py-3 rounded-lg font-medium text-center transition-colors mb-8 block ${plan.popular ? 'btn-primary' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                  Book Now
                </Link>
                <div className="space-y-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gray-50 rounded-2xl p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[['24h', 'Average report delivery time'], ['100%', 'Upfront transparent pricing'], ['0%', 'Hidden or surprise fees']].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">{num}</div>
                <p className="text-gray-700">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
