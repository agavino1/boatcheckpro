'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function Gallery() {
  const { t } = useLanguage()
  const inspections = [
    { id: 1, title: "Sailboat - Full Inspection", type: "Sailing Vessel", length: "35ft", year: "2018", condition: "Excellent", image: "🛥️" },
    { id: 2, title: "Motor Yacht - Pre-Purchase", type: "Motor Yacht", length: "45ft", year: "2015", condition: "Good", image: "⛵" },
    { id: 3, title: "Fishing Boat - Maintenance", type: "Commercial Vessel", length: "28ft", year: "2012", condition: "Fair", image: "🎣" },
    { id: 4, title: "Cruiser - Insurance Report", type: "Cruising Yacht", length: "42ft", year: "2019", condition: "Excellent", image: "⚓" },
  ]
  const [activeIndex, setActiveIndex] = useState(0)
  const current = inspections[activeIndex]
  const reportItems = [t.gallery.r1, t.gallery.r2, t.gallery.r3, t.gallery.r4, t.gallery.r5]
  return (
    <section id="gallery" className="py-20 bg-base-200">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title">{t.gallery.title}</h2>
          <p className="section-subtitle">{t.gallery.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-primary/30 to-secondary/30 rounded-2xl shadow-xl flex items-center justify-center overflow-hidden">
              <div className="text-center">
                <div className="text-8xl mb-6">{current.image}</div>
                <p className="text-base-content font-medium">{current.title}</p>
              </div>
            </div>
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-4">
              <button onClick={() => setActiveIndex((p) => (p - 1 + inspections.length) % inspections.length)} className="btn btn-circle btn-sm btn-ghost border border-base-300 shadow-lg">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={() => setActiveIndex((p) => (p + 1) % inspections.length)} className="btn btn-circle btn-sm btn-ghost border border-base-300 shadow-lg">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            <div className="flex justify-center gap-2 mt-20">
              {inspections.map((_, i) => (
                <button key={i} onClick={() => setActiveIndex(i)} className={"w-3 h-3 rounded-full transition-all " + (i === activeIndex ? "bg-primary w-8" : "bg-base-300 hover:bg-base-content/40")} />
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-semibold mb-4">{current.type}</span>
              <h3 className="text-4xl font-bold text-base-content mb-4">{current.title}</h3>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {([[t.gallery.length, current.length], [t.gallery.year, current.year], [t.gallery.condition, current.condition]] as [string,string][]).map(([label, val]) => (
                <div key={label} className="card bg-base-100 border border-base-300 p-6">
                  <p className="text-base-content/60 text-sm mb-1">{label}</p>
                  <p className={"text-2xl font-bold " + (label === t.gallery.condition ? "text-success" : "text-base-content")}>{val}</p>
                </div>
              ))}
            </div>
            <div className="bg-primary/10 rounded-xl p-6 space-y-3">
              <h4 className="font-bold text-base-content">{t.gallery.reportTitle}</h4>
              <ul className="space-y-2 text-sm text-base-content/80">
                {reportItems.map((item) => (
                  <li key={item}>✓ {item}</li>
                ))}
              </ul>
            </div>
            <button className="btn btn-primary w-full">{t.gallery.cta}</button>
          </div>
        </div>
      </div>
    </section>
  )
}
