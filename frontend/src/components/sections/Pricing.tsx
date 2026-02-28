'use client'

import { Check } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

const planFeatures = {
  plan1: ['Complete hull inspection','Engine & mechanical check','Safety equipment review','Digital PDF report','Photo documentation','Email support'],
  plan2: ['Everything in Basic','Detailed rigging inspection','Electrical systems audit','Plumbing systems check','Damage assessment','Priority scheduling','Phone support','Free follow-up consultation'],
  plan3: ['Everything in Premium','Underwater hull survey (with diver)','Expert structural analysis','Engine lab testing','Marine surveyor report','Insurance valuation letter','Dedicated inspector','Lifetime report access'],
}

export default function Pricing() {
  const { t } = useLanguage()
  const plans = [
    { nameKey: t.pricing.plan1Name, descKey: t.pricing.plan1Desc, price: 299, features: planFeatures.plan1, popular: false },
    { nameKey: t.pricing.plan2Name, descKey: t.pricing.plan2Desc, price: 499, features: planFeatures.plan2, popular: true },
    { nameKey: t.pricing.plan3Name, descKey: t.pricing.plan3Desc, price: 749, features: planFeatures.plan3, popular: false },
  ]
  return (
    <section id="pricing" className="py-20 bg-base-100">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title">{t.pricing.title}</h2>
          <p className="section-subtitle">{t.pricing.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.nameKey} className={`card bg-base-100 border border-base-300 relative transition-transform hover:scale-105 ${plan.popular ? 'md:scale-105 shadow-2xl ring-2 ring-primary' : 'shadow'}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="badge badge-primary px-4 py-3 font-bold text-xs">{t.pricing.mostPopular}</span>
                </div>
              )}
              <div className="card-body">
                <h3 className="card-title text-2xl">{plan.nameKey}</h3>
                <p className="text-base-content/60 text-sm mb-4">{plan.descKey}</p>
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-base-content">${plan.price}</span>
                    <span className="text-base-content/60">{t.pricing.perInspection}</span>
                  </div>
                  <p className="text-base-content/40 text-xs mt-2">{t.pricing.noRecurring}</p>
                </div>
                <Link href="/request-inspection" className={`btn w-full mb-6 ${plan.popular ? 'btn-primary' : 'btn-ghost border border-base-300'}`}>{t.pricing.bookNow}</Link>
                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-base-content/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-20 bg-base-200 rounded-2xl p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {([['24h', t.pricing.stat1],['100%', t.pricing.stat2],['0%', t.pricing.stat3]] as [string,string][]).map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{num}</div>
                <p className="text-base-content/70">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
