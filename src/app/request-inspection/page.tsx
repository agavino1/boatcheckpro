'use client'

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'

export default function RequestInspectionPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Boat Info
    boatName: '',
    boatType: 'sailboat',
    length: '',
    year: '',
    builder: '',
    // Owner Info
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    // Inspection Details
    inspectionType: 'full',
    location: '',
    preferredDate: '',
    notes: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Inspection Request:', formData)
  }

  const boatTypes = [
    { value: 'sailboat', label: 'Sailboat' },
    { value: 'motor-yacht', label: 'Motor Yacht' },
    { value: 'speedboat', label: 'Speedboat' },
    { value: 'fishing-boat', label: 'Fishing Boat' },
    { value: 'catamaran', label: 'Catamaran' },
    { value: 'other', label: 'Other' },
  ]

  const inspectionTypes = [
    { value: 'full', label: 'Full Inspection', desc: 'Complete marine survey' },
    { value: 'basic', label: 'Basic Inspection', desc: 'Essential systems check' },
    { value: 'pre-purchase', label: 'Pre-Purchase Inspection', desc: 'Before buying a boat' },
    { value: 'insurance', label: 'Insurance Valuation', desc: 'For insurance purposes' },
    { value: 'maintenance', label: 'Maintenance Check', desc: 'Annual maintenance' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50 pt-20">
      <div className="container-custom py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="section-title">Request An Inspection</h1>
          <p className="section-subtitle">
            Tell us about your boat and we'll schedule a professional inspection
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <button
                  onClick={() => setStep(s)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    step >= s
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {s}
                </button>
                {s < 3 && (
                  <div className={`flex-1 h-1 mx-2 transition-all ${
                    step > s ? 'bg-primary-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs font-semibold text-gray-600">
            <span>Boat Information</span>
            <span>Inspection Details</span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="card max-w-2xl mx-auto p-8 shadow-lg">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Boat Information */}
            {step === 1 && (
              <div className="space-y-6 animate-fadeInUp">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Tell us about your boat</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Boat Name</label>
                  <input
                    type="text"
                    name="boatName"
                    value={formData.boatName}
                    onChange={handleChange}
                    placeholder="e.g., Sea Breeze"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Boat Type</label>
                    <select
                      name="boatType"
                      value={formData.boatType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 bg-white"
                    >
                      {boatTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Length (ft)</label>
                    <input
                      type="number"
                      name="length"
                      value={formData.length}
                      onChange={handleChange}
                      placeholder="e.g., 35"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year Built</label>
                    <input
                      type="number"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      placeholder="e.g., 2018"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Builder/Manufacturer</label>
                    <input
                      type="text"
                      name="builder"
                      value={formData.builder}
                      onChange={handleChange}
                      placeholder="e.g., Beneteau"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Inspection Details */}
            {step === 2 && (
              <div className="space-y-6 animate-fadeInUp">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What inspection do you need?</h2>

                <div className="space-y-3">
                  {inspectionTypes.map(type => (
                    <label key={type.value} className="flex items-start gap-4 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-600 transition-colors" style={{
                      borderColor: formData.inspectionType === type.value ? '#0284c7' : '#e5e7eb'
                    }}>
                      <input
                        type="radio"
                        name="inspectionType"
                        value={type.value}
                        checked={formData.inspectionType === type.value}
                        onChange={handleChange}
                        className="w-4 h-4 mt-1"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{type.label}</p>
                        <p className="text-sm text-gray-600">{type.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location / Marina</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Marina Bay, Harbor View"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Inspection Date</label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Any specific concerns or areas you'd like us to focus on?"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="space-y-6 animate-fadeInUp">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Confirm Your Request</h2>

                <div className="bg-primary-50 rounded-lg p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">Boat:</span>
                    <span className="font-semibold text-gray-900">{formData.boatName || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">Type:</span>
                    <span className="font-semibold text-gray-900">{formData.boatType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">Inspection Type:</span>
                    <span className="font-semibold text-gray-900">{formData.inspectionType}</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-primary-200">
                    <span className="text-gray-700 font-medium">Estimated Price:</span>
                    <span className="font-bold text-primary-600 text-lg">$499</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600">
                  By submitting this request, you agree to our terms of service. We'll confirm your inspection within 24 hours.
                </p>

                <button type="submit" className="btn-primary w-full">
                  Submit Inspection Request
                </button>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="btn-outline flex-1"
                >
                  Back
                </button>
              )}
              {step < 3 && (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
