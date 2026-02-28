'use client'

import { Star } from 'lucide-react'

const testimonials = [
  { id: 1, name: 'Captain James Mitchell', role: 'Sailboat Owner, 15 years', text: 'BoatCheckPro gave me complete peace of mind. The detailed report was incredibly thorough and helped me schedule preventative maintenance before issues became problems.', rating: 5, initials: 'JM', color: 'bg-blue-500' },
  { id: 2, name: 'Sarah Chen', role: 'Yacht Buyer, First-time', text: 'I was nervous about my first boat purchase. The inspection report was so detailed and professional - it caught issues I would have missed. Worth every penny.', rating: 5, initials: 'SC', color: 'bg-purple-500' },
  { id: 3, name: 'Michael Rodriguez', role: 'Insurance Agent', text: 'My clients love that BoatCheckPro reports are accepted by all major insurers. It streamlines the valuation process significantly.', rating: 5, initials: 'MR', color: 'bg-green-500' },
  { id: 4, name: 'Dr. Patricia Watson', role: 'Marina Manager', text: 'We recommend BoatCheckPro to all our boat owners. The technicians are professional, punctual, and thorough. Always excellent service.', rating: 5, initials: 'PW', color: 'bg-pink-500' },
  { id: 5, name: 'David Thompson', role: 'Fishing Boat Operator', text: "Fast service, accurate reports, and great support. I've used them multiple times for my commercial vessel maintenance checks.", rating: 5, initials: 'DT', color: 'bg-indigo-500' },
  { id: 6, name: 'Elena Rossi', role: 'Yacht Club Director', text: 'The premium inspection package is excellent for our club members. Professional, comprehensive, and the reports look fantastic.', rating: 5, initials: 'ER', color: 'bg-orange-500' },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title">Trusted by Boat Owners</h2>
          <p className="section-subtitle">Real reviews from real customers who trust us with their vessels</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((t) => (
            <div key={t.id} className="card p-8 h-full flex flex-col">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 flex-grow mb-6 leading-relaxed">&quot;{t.text}&quot;</p>
              <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                <div className={`${t.color} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg`}>{t.initials}</div>
                <div>
                  <p className="font-bold text-gray-900">{t.name}</p>
                  <p className="text-gray-600 text-sm">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[['2,000+', 'Boats Inspected'], ['98%', 'Customer Satisfaction'], ['24h', 'Avg Report Time'], ['50+', 'Certified Technicians']].map(([num, label]) => (
              <div key={label}>
                <div className="text-5xl font-bold mb-2">{num}</div>
                <p className="text-white/80">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
