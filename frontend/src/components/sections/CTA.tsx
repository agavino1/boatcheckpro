'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

export default function CTA() {
  const { t } = useLanguage()
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-secondary text-primary-content overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t.cta.title}</h2>
          <p className="text-xl text-primary-content/80 mb-12 leading-relaxed">{t.cta.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/register" className="btn bg-white text-primary hover:bg-base-200 border-0 text-lg gap-2">
              {t.cta.cta1}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="#pricing" className="btn btn-outline border-white text-primary-content hover:bg-white/10 text-lg">
              {t.cta.cta2}
            </a>
          </div>
          <div className="grid grid-cols-3 gap-8 text-center">
            {([['50+', t.cta.stat1],['2000+', t.cta.stat2],['98%', t.cta.stat3]] as [string,string][]).map(([num, label], i) => (
              <div key={label} className={i === 1 ? 'border-l border-r border-primary-content/20' : ''}>
                <div className="text-4xl font-bold mb-2">{num}</div>
                <p className="text-primary-content/70 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
