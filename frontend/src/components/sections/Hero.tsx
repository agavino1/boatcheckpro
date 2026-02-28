'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {t.hero.badge}
                </span>
              </div>
              <h1 className="section-title">
                {t.hero.title1}{" "}
                <span className="gradient-text">{t.hero.title2}</span>
              </h1>
              <p className="text-xl text-base-content/70 leading-relaxed">{t.hero.subtitle}</p>
            </div>
            <div className="space-y-3">
              {[t.hero.feature1, t.hero.feature2, t.hero.feature3].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-base-content/80">{feature}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/register" className="btn btn-primary flex items-center justify-center gap-2">
                {t.hero.cta1}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="#how-it-works" className="btn btn-outline btn-primary">
                {t.hero.cta2}
              </Link>
            </div>
            <p className="text-sm text-base-content/50">{t.hero.stats}</p>
          </div>
          <div className="relative">
            <div className="relative aspect-square bg-base-100 rounded-2xl shadow-xl border border-base-300 p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <span className="text-5xl">⛵</span>
                </div>
                <h3 className="text-2xl font-bold text-base-content mb-2">
                  {t.hero.cardTitle}<br />{t.hero.cardTitle2}
                </h3>
                <p className="text-base-content/60 text-sm">{t.hero.cardSubtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
