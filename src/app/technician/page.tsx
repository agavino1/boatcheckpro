'use client'

import { Star, MapPin, Award, Clock, Users, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function TechnicianProfilePage() {
  const technician = {
    id: 1,
    name: 'Captain James Mitchell',
    title: 'Senior Marine Inspector',
    location: 'Marina Bay District',
    avatar: '⚓',
    rating: 4.9,
    reviews: 127,
    experience: '15+ years',
    inspections: 2034,
    responseTime: '2 hours',
    certifications: ['ABYC Certified', 'Marine Surveyor', 'Insurance Approved'],
    languages: ['English', 'Spanish'],
    bio: 'With over 15 years of experience inspecting sailing vessels and motor yachts, I pride myself on thorough, professional inspections. I use cutting-edge technology and industry best practices to ensure every vessel is evaluated to the highest standards.',
    specialties: ['Sailboats', 'Motor Yachts', 'Pre-purchase Inspections', 'Insurance Valuations'],
    availability: {
      monday: { available: true, slots: 3 },
      tuesday: { available: true, slots: 2 },
      wednesday: { available: true, slots: 4 },
      thursday: { available: true, slots: 2 },
      friday: { available: true, slots: 3 },
      saturday: { available: false, slots: 0 },
      sunday: { available: false, slots: 0 },
    },
  }

  const reviews = [
    {
      id: 1,
      author: 'Sarah Chen',
      rating: 5,
      date: '2 weeks ago',
      text: 'Captain Mitchell was extremely professional and thorough. His inspection report was detailed and helped me understand every aspect of my boat condition.',
    },
    {
      id: 2,
      author: 'Michael Rodriguez',
      rating: 5,
      date: '1 month ago',
      text: 'Outstanding service! Very knowledgeable and answered all my questions. Highly recommended for anyone looking for a serious marine inspection.',
    },
    {
      id: 3,
      author: 'Dr. Patricia Watson',
      rating: 4,
      date: '2 months ago',
      text: 'Professional and efficient. The report was very comprehensive and the photos were excellent quality.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-12">
        {/* Breadcrumb */}
        <div className="mb-8 flex gap-2 text-sm text-gray-600">
          <Link href="/technicians" className="hover:text-primary-600">Technicians</Link>
          <span>/</span>
          <span>{technician.name}</span>
        </div>

        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Profile */}
          <div className="lg:col-span-2">
            <div className="card p-8 mb-8">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center text-5xl shadow-lg">
                  {technician.avatar}
                </div>
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-gray-900">{technician.name}</h1>
                  <p className="text-xl text-gray-600 mt-1">{technician.title}</p>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-gray-900">{technician.rating}</span>
                    <span className="text-gray-600">({technician.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-b border-gray-200">
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Award className="w-4 h-4" />
                    <span className="text-sm">Experience</span>
                  </div>
                  <p className="font-bold text-gray-900">{technician.experience}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Inspections</span>
                  </div>
                  <p className="font-bold text-gray-900">{technician.inspections}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Response Time</span>
                  </div>
                  <p className="font-bold text-gray-900">{technician.responseTime}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Location</span>
                  </div>
                  <p className="font-bold text-gray-900">3 miles</p>
                </div>
              </div>

              {/* Bio */}
              <div className="py-6">
                <h3 className="font-bold text-gray-900 mb-3">About</h3>
                <p className="text-gray-700 leading-relaxed">{technician.bio}</p>
              </div>

              {/* Certifications */}
              <div className="py-6 border-t border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">Certifications & Qualifications</h3>
                <div className="space-y-2">
                  {technician.certifications.map((cert, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specialties */}
              <div className="py-6 border-t border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {technician.specialties.map((specialty, idx) => (
                    <span key={idx} className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="card p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Reviews ({technician.reviews})</h3>
              <div className="space-y-6">
                {reviews.map(review => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-gray-900">{review.author}</p>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="card p-6 sticky top-24">
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Starting from</p>
                <p className="text-3xl font-bold text-gray-900">$299</p>
                <p className="text-xs text-gray-500">per inspection</p>
              </div>

              <button className="btn-primary w-full mb-3">
                Book Inspection
              </button>
              <button className="btn-outline w-full">
                Contact Directly
              </button>

              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <p className="text-sm font-semibold text-gray-900">Available Times</p>
                {Object.entries(technician.availability).map(([day, info]) => {
                  if (!info.available) return null
                  return (
                    <div key={day} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700 capitalize">{day}</span>
                      <span className="font-semibold text-primary-600">{info.slots} slots</span>
                    </div>
                  )
                })}
                <Link href="/calendar" className="block w-full mt-4 py-2 border-2 border-primary-600 text-primary-600 text-center rounded-lg hover:bg-primary-50 transition-colors font-medium text-sm">
                  View Calendar
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="card p-6">
              <h4 className="font-bold text-gray-900 mb-4">Contact Information</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">james@boatcheckpro.com</p>
                </div>
                <div>
                  <p className="text-gray-600">Phone</p>
                  <p className="font-medium text-gray-900">(555) 123-4567</p>
                </div>
                <div>
                  <p className="text-gray-600">Service Area</p>
                  <p className="font-medium text-gray-900">Marina Bay District</p>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="card p-6">
              <h4 className="font-bold text-gray-900 mb-4">Languages</h4>
              <div className="flex flex-wrap gap-2">
                {technician.languages.map((lang, idx) => (
                  <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
