'use client'

import { Calendar, Clipboard, CheckCircle, FileCheck } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      icon: Calendar,
      number: 1,
      title: 'Book Your Inspection',
      description: 'Select your boat type, location, and preferred inspection date. Our availability calendar shows real-time openings.',
    },
    {
      icon: Clipboard,
      number: 2,
      title: 'Technician Visit',
      description: 'A certified marine technician visits your boat and conducts a comprehensive inspection using latest technology and equipment.',
    },
    {
      icon: CheckCircle,
      number: 3,
      title: 'Digital Report',
      description: 'Receive a detailed PDF report within 24 hours with photos, findings, and recommendations for any maintenance.',
    },
    {
      icon: FileCheck,
      number: 4,
      title: 'Complete & Verified',
      description: 'Your inspection is official and can be used for insurance, sales, financing, or personal peace of mind.',
    },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Simple, transparent, and hassle-free boat inspections
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-20 left-[60%] right-[-100%] h-0.5 bg-gradient-to-r from-primary-600 to-transparent" />
                )}

                {/* Card */}
                <div className="card p-8 relative z-10">
                  {/* Step Number Circle */}
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 text-center mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-center text-sm leading-relaxed">
                    {step.description}
                  </p>

                  {/* Step Badge */}
                  <div className="mt-6 text-center">
                    <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">
                      Step {step.number}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Benefits Section */}
        <div className="mt-20 bg-primary-50 rounded-2xl p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Why Choose BoatCheckPro?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Fast Turnaround', desc: 'Reports delivered within 24 hours' },
              { title: 'Expert Technicians', desc: 'Certified marine professionals with 10+ years experience' },
              { title: 'Transparent Pricing', desc: 'No hidden fees, clear upfront pricing' },
              { title: 'Digital Reports', desc: 'Cloud-based access anytime, anywhere' },
              { title: 'Insurance Ready', desc: 'Reports accepted by major insurers' },
              { title: '24/7 Support', desc: 'Dedicated customer success team' },
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <h4 className="font-bold text-gray-900 mb-2">{benefit.title}</h4>
                <p className="text-gray-600 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
