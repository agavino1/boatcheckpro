'use client'

import { Calendar, Clipboard, CheckCircle, FileCheck } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function HowItWorks() {
  const { t } = useLanguage()
  const steps = [
    { icon: Calendar, number: 1, titleKey: t.howItWorks.step1Title, descKey: t.howItWorks.step1Desc },
    { icon: Clipboard, number: 2, titleKey: t.howItWorks.step2Title, descKey: t.howItWorks.step2Desc },
    { icon: CheckCircle, number: 3, titleKey: t.howItWorks.step3Title, descKey: t.howItWorks.step3Desc },
    { icon: FileCheck, number: 4, titleKey: t.howItWorks.step4Title, descKey: t.howItWorks.step4Desc },
  ]
  const benefits = [
    { title: t.howItWorks.b1t, desc: t.howItWorks.b1d },
    { title: t.howItWorks.b2t, desc: t.howItWorks.b2d },
    { title: t.howItWorks.b3t, desc: t.howItWorks.b3d },
    { title: t.howItWorks.b4t, desc: t.howItWorks.b4d },
    { title: t.howItWorks.b5t, desc: t.howItWorks.b5d },
    { title: t.howItWorks.b6t, desc: t.howItWorks.b6d },
  ]
  return (
    <section id="how-it-works" className="py-20 bg-base-100">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title">{t.howItWorks.title}</h2>
          <p className="section-subtitle">{t.howItWorks.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-20 left-[60%] right-[-100%] h-0.5 bg-gradient-to-r from-primary to-transparent" />
                )}
                <div className="card bg-base-100 border border-base-300 shadow p-8 relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Icon className="w-8 h-8 text-primary-content" />
                  </div>
                  <h3 className="text-xl font-bold text-base-content text-center mb-3">{step.titleKey}</h3>
                  <p className="text-base-content/70 text-center text-sm leading-relaxed">{step.descKey}</p>
                  <div className="mt-6 text-center">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                      {t.howItWorks.step} {step.number}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-20 bg-base-200 rounded-2xl p-12">
          <h3 className="text-2xl font-bold text-base-content mb-8 text-center">{t.howItWorks.whyTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((b) => (
              <div key={b.title} className="text-center">
                <h4 className="font-bold text-base-content mb-2">{b.title}</h4>
                <p className="text-base-content/60 text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
