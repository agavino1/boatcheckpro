'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { question: 'How long does a typical inspection take?', answer: "Most inspections take between 3-6 hours depending on the vessel size and complexity. We'll provide a specific timeframe when you book." },
  { question: 'Are your technicians certified?', answer: 'Yes, all our inspectors are ABYC certified with a minimum of 10 years of professional marine experience.' },
  { question: 'What if I need an underwater inspection?', answer: 'We offer specialized underwater surveys with certified SCUBA divers. Available through our Expert Inspection plan.' },
  { question: 'Can I use the report for insurance?', answer: 'Absolutely! Our reports are accepted by all major marine insurance companies and satisfy their valuation requirements.' },
  { question: 'What if issues are found during inspection?', answer: 'We provide a detailed findings report with recommendations and cost estimates for any repairs or maintenance needed.' },
  { question: 'Can I reschedule or cancel?', answer: 'Yes, you can reschedule or cancel up to 48 hours before your appointment for a full refund. Rush fees are non-refundable.' },
  { question: 'Do you offer fleet inspections?', answer: 'Yes! We offer special pricing for fleet inspections. Contact our sales team for custom quotes.' },
  { question: 'How long is the report valid?', answer: 'Our reports are typically valid for 6-12 months depending on the specific insurance or financing requirements.' },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Everything you need to know about BoatCheckPro</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <button
              key={index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-left card p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 text-lg">{faq.question}</h3>
                <ChevronDown className={`w-5 h-5 text-primary-600 transition-transform flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`} />
              </div>
              {openIndex === index && <p className="text-gray-600 mt-4 leading-relaxed">{faq.answer}</p>}
            </button>
          ))}
        </div>

        <div className="mt-16 bg-primary-50 rounded-2xl p-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h3>
          <p className="text-gray-600 mb-8">Our support team is available 24/7 to help you</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:support@boatcheckpro.com" className="btn-primary">Email Us</a>
            <a href="tel:+1234567890" className="btn-outline">Call: (123) 456-7890</a>
          </div>
        </div>
      </div>
    </section>
  )
}
