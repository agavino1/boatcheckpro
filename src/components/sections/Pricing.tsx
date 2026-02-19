'use client'

import { Check } from 'lucide-react'
import Link from 'next/link'

export default function Pricing() {
  const plans = [
    {
      name: 'Basic Inspection',
      price: 299,
      description: 'Perfect for smaller vessels',
      features: [
        'Complete hull inspection',
        'Engine & mechanical check',
        'Safety equipment review',
        'Digital PDF report',
        'Photo documentation',
        'Email support',
      ],
      cta: 'Book Now',
      popular: false,
    },
    {
      name: 'Premium Inspection',
      price: 499,
      description: 'Most popular for sailing yachts',
      features: [
        'Everything in Basic',
        'Detailed rigging inspection',
        'Electrical systems audit',
        'Plumbing systems check',
        'Damage assessment',
        'Priority scheduling',
        'Phone support',
        'Free follow-up consultation',
      ],
      cta: 'Book Now',
      popular: true,
    },
    {
      name: 'Expert Inspection',
      price: 749,
      description: 'Comprehensive for larger vessels',
      features: [
        'Everything in Premium',
        'Underwater hull survey (with diver)',
        'Expert structural analysis',
        'Engine lab testing',
        'Marine surveyor report',
        'Insurance valuation letter',
        'Dedicated inspector',
        'Lifetime report access',
      ],
      cta: 'Book Now',
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title">Transparent Pricing</h2>
          <p className="section-subtitle">
            No hidden fees, no surprises. Simple, fair pricing for every vessel
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`card relative transition-transform hover:scale-105 ${
                plan.popular ? 'md:scale-105 shadow-2xl ring-2 ring-primary-600' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-xs font-bold rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Plan Info */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 text-sm mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="text-gray-600">per inspection</span>
                  </div>
                  <p className="text-gray-500 text-xs mt-2">No recurring charges</p>
                </div>

                {/* CTA Button */}
                <Link
                  href="/request-inspection"
                  className={`w-full py-3 rounded-lg font-medium text-center transition-colors mb-8 ${
                    plan.popular
                      ? 'btn-primary'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </Link>

                {/* Features */}
                <div className="space-y-4">
                  {plan.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-20 bg-gray-50 rounded-2xl p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">24h</div>
              <p className="text-gray-700">Average report delivery time</p>
            </div>
            <div className="text-center border-l border-r border-gray-300">
              <div className="text-4xl font-bold text-primary-600 mb-2">100%</div>
              <p className="text-gray-700">Upfront transparent pricing</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">0%</div>
              <p className="text-gray-700">Hidden or surprise fees</p>
            </div>
          </div>
        </div>

        {/* FAQ Mini */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Questions About Pricing?
          </h3>
          <div className="space-y-6">
            {[
              {
                q: 'Do you offer discounts for multiple inspections?',
                a: 'Yes! We offer 10% discount on bulk bookings and loyalty discounts for repeat customers.'
              },
              {
                q: 'What if I need an urgent inspection?',
                a: 'Contact our support team for rush inspections. We offer next-day service with a 25% surcharge.'
              },
              {
                q: 'Is travel included in the price?',
                a: 'Yes, for locations within 30 miles of our ports. Additional travel fees apply beyond that.'
              },
            ].map((item, index) => (
              <div key={index} className="border-l-4 border-primary-600 pl-6 py-2">
                <p className="font-bold text-gray-900 mb-2">{item.q}</p>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
