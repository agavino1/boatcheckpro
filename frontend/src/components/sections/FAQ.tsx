'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function FAQ() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  return (
    <section id="faq" className="py-20 bg-base-100">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title">{t.faq.title}</h2>
          <p className="section-subtitle">{t.faq.subtitle}</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {t.faq.questions.map((faqItem, index) => (
            <div
              key={index}
              className="collapse collapse-arrow bg-base-200 border border-base-300"
            >
              <input
                type="radio"
                name="faq-accordion"
                checked={openIndex === index}
                onChange={() => setOpenIndex(openIndex === index ? null : index)}
              />
              <div className="collapse-title font-bold text-base-content text-lg">
                {faqItem.q}
              </div>
              <div className="collapse-content">
                <p className="text-base-content/70 leading-relaxed">{faqItem.a}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 bg-primary/10 rounded-2xl p-12 text-center">
          <h3 className="text-2xl font-bold text-base-content mb-4">{t.faq.stillQ}</h3>
          <p className="text-base-content/60 mb-8">{t.faq.stillDesc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:support@boatcheckpro.com" className="btn btn-primary">{t.faq.email}</a>
            <a href="tel:+1234567890" className="btn btn-outline btn-primary">{t.faq.call}</a>
          </div>
        </div>
      </div>
    </section>
  )
}
