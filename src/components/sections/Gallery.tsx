'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0)

  const inspections = [
    {
      id: 1,
      title: 'Sailboat - Full Inspection',
      type: 'Sailing Vessel',
      length: '35ft',
      year: '2018',
      condition: 'Excellent',
      image: '🛥️',
      details: 'Comprehensive hull, rigging, and systems inspection'
    },
    {
      id: 2,
      title: 'Motor Yacht - Pre-Purchase',
      type: 'Motor Yacht',
      length: '45ft',
      year: '2015',
      condition: 'Good',
      image: '⛵',
      details: 'Pre-purchase inspection with detailed engine report'
    },
    {
      id: 3,
      title: 'Fishing Boat - Maintenance',
      type: 'Commercial Vessel',
      length: '28ft',
      year: '2012',
      condition: 'Fair',
      image: '🎣',
      details: 'Annual maintenance inspection and recommendations'
    },
    {
      id: 4,
      title: 'Cruiser - Insurance Report',
      type: 'Cruising Yacht',
      length: '42ft',
      year: '2019',
      condition: 'Excellent',
      image: '⚓',
      details: 'Insurance valuation and condition assessment'
    },
  ]

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % inspections.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + inspections.length) % inspections.length)
  }

  const currentInspection = inspections[activeIndex]

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title">Sample Inspections</h2>
          <p className="section-subtitle">
            Real examples of boats we've inspected
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image & Navigation */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-primary-200 to-secondary-200 rounded-2xl shadow-xl flex items-center justify-center overflow-hidden">
              <div className="text-center">
                <div className="text-8xl mb-6">{currentInspection.image}</div>
                <p className="text-gray-700 font-medium">{currentInspection.title}</p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-4">
              <button
                onClick={prevSlide}
                className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
              >
                <ChevronLeft className="w-6 h-6 text-primary-600" />
              </button>
              <button
                onClick={nextSlide}
                className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
              >
                <ChevronRight className="w-6 h-6 text-primary-600" />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-20">
              {inspections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeIndex
                      ? 'bg-primary-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div>
              <span className="inline-block px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs font-semibold mb-4">
                {currentInspection.type}
              </span>
              <h3 className="text-4xl font-bold text-gray-900 mb-4">
                {currentInspection.title}
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                {currentInspection.details}
              </p>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-3 gap-6">
              <div className="card p-6">
                <p className="text-gray-600 text-sm mb-1">Length</p>
                <p className="text-2xl font-bold text-gray-900">{currentInspection.length}</p>
              </div>
              <div className="card p-6">
                <p className="text-gray-600 text-sm mb-1">Year</p>
                <p className="text-2xl font-bold text-gray-900">{currentInspection.year}</p>
              </div>
              <div className="card p-6">
                <p className="text-gray-600 text-sm mb-1">Condition</p>
                <p className="text-2xl font-bold text-green-600">{currentInspection.condition}</p>
              </div>
            </div>

            {/* Report Highlights */}
            <div className="bg-primary-50 rounded-xl p-6 space-y-3">
              <h4 className="font-bold text-gray-900">Report Included:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Hull condition & structural integrity</li>
                <li>✓ Engine & mechanical systems</li>
                <li>✓ Electrical & plumbing systems</li>
                <li>✓ Safety equipment verification</li>
                <li>✓ Maintenance recommendations</li>
              </ul>
            </div>

            <button className="btn-primary w-full">
              Request Similar Inspection
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
