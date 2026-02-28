'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight, CheckCircle, Loader2 } from 'lucide-react'
import { useRequireAuth } from '@/context/AuthContext'
import { inspections } from '@/lib/api'

export default function RequestInspectionPage() {
  useRequireAuth()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    boatName: '',
    boatType: 'sailboat',
    boatModel: '',
    boatYear: '',
    inspectionType: 'pre-compra',
    location: '',
    preferredDate: '',
    notes: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await inspections.create({
        boatName: formData.boatName,
        boatType: formData.boatType,
        boatModel: formData.boatModel,
        boatYear: formData.boatYear ? Number(formData.boatYear) : undefined,
        inspectionType: formData.inspectionType,
        location: formData.location,
        preferredDate: formData.preferredDate,
        notes: formData.notes,
      })
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50 pt-20 flex items-center justify-center">
        <div className="card max-w-md w-full p-10 text-center shadow-lg">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h2>
          <p className="text-gray-600 mb-6">
            We&apos;ll confirm your inspection within 24 hours. You&apos;ll receive an email with
            the details.
          </p>
          <button className="btn-primary w-full" onClick={() => router.push('/dashboard')}>
            Go to Dashboard
          </button>
        </div>
      </div>
    )
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
    { value: 'pre-compra', label: 'Pre-Purchase Inspection', desc: 'Before buying a boat' },
    { value: 'mantenimiento', label: 'Maintenance Check', desc: 'Annual maintenance survey' },
    { value: 'seguridad', label: 'Safety Inspection', desc: 'Safety systems review' },
    { value: 'anual', label: 'Annual Survey', desc: 'Full annual inspection' },
    { value: 'otro', label: 'Other', desc: 'Custom inspection request' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50 pt-20">
      <div className="container-custom py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="section-title">Request An Inspection</h1>
          <p className="section-subtitle">
            Tell us about your boat and we&apos;ll schedule a professional inspection
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <button
                  type="button"
                  onClick={() => s < step && setStep(s)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    step >= s ? 'bg-primary-600 text-white' : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {s}
                </button>
                {s < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all ${
                      step > s ? 'bg-primary-600' : 'bg-gray-300'
                    }`}
                  />
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
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Step 1: Boat */}
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
                    required
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
                      {boatTypes.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year Built</label>
                    <input
                      type="number"
                      name="boatYear"
                      value={formData.boatYear}
                      onChange={handleChange}
                      placeholder="e.g., 2018"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Model / Manufacturer
                  </label>
                  <input
                    type="text"
                    name="boatModel"
                    value={formData.boatModel}
                    onChange={handleChange}
                    placeholder="e.g., Beneteau Oceanis 35"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Inspection */}
            {step === 2 && (
              <div className="space-y-6 animate-fadeInUp">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What inspection do you need?</h2>

                <div className="space-y-3">
                  {inspectionTypes.map((t) => (
                    <label
                      key={t.value}
                      className="flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer hover:border-primary-600 transition-colors"
                      style={{
                        borderColor: formData.inspectionType === t.value ? '#0284c7' : '#e5e7eb',
                      }}
                    >
                      <input
                        type="radio"
                        name="inspectionType"
                        value={t.value}
                        checked={formData.inspectionType === t.value}
                        onChange={handleChange}
                        className="w-4 h-4 mt-1"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{t.label}</p>
                        <p className="text-sm text-gray-600">{t.desc}</p>
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
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Any specific concerns or areas to focus on?"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Confirm */}
            {step === 3 && (
              <div className="space-y-6 animate-fadeInUp">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Confirm Your Request</h2>

                <div className="bg-primary-50 rounded-lg p-6 space-y-3">
                  {[
                    ['Boat', formData.boatName || '—'],
                    ['Type', formData.boatType],
                    ['Year', formData.boatYear || '—'],
                    ['Inspection', inspectionTypes.find((t) => t.value === formData.inspectionType)?.label ?? formData.inspectionType],
                    ['Location', formData.location || '—'],
                    ['Preferred Date', formData.preferredDate || '—'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-gray-700 font-medium">{label}:</span>
                      <span className="font-semibold text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-gray-600">
                  By submitting this request, you agree to our terms of service. We&apos;ll confirm
                  your inspection within 24 hours.
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? 'Submitting…' : 'Submit Inspection Request'}
                </button>
              </div>
            )}

            {/* Navigation */}
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
