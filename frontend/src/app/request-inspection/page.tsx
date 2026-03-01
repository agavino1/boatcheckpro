'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight, CheckCircle, Loader2, Link as LinkIcon } from 'lucide-react'
import { useRequireAuth } from '@/context/AuthContext'
import { useLanguage } from '@/context/LanguageContext'
import { inspections } from '@/lib/api'

export default function RequestInspectionPage() {
  useRequireAuth()
  const router = useRouter()
  const { t } = useLanguage()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    listingUrl: '',
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
        boatName: formData.boatName || formData.listingUrl || '—',
        boatType: formData.boatType,
        boatModel: formData.boatModel,
        boatYear: formData.boatYear ? Number(formData.boatYear) : undefined,
        inspectionType: formData.inspectionType,
        location: formData.location,
        preferredDate: formData.preferredDate,
        notes: [
          formData.listingUrl ? `Anuncio: ${formData.listingUrl}` : '',
          formData.notes,
        ].filter(Boolean).join('\n'),
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
      <div className="min-h-screen bg-base-200 pt-20 flex items-center justify-center px-4">
        <div className="card bg-base-100 shadow-lg max-w-md w-full">
          <div className="card-body text-center">
            <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
            <h2 className="card-title justify-center text-2xl">{t.request.successTitle}</h2>
            <p className="text-base-content/60">{t.request.successDesc}</p>
            <div className="card-actions justify-center mt-4">
              <button className="btn btn-primary" onClick={() => router.push('/dashboard')}>
                {t.request.goDashboard}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const boatTypeKeys = ['sailboat', 'motor-yacht', 'speedboat', 'fishing-boat', 'catamaran', 'other'] as const
  const inspTypeKeys = ['pre-compra', 'mantenimiento', 'seguridad', 'anual', 'otro'] as const
  const steps = [t.request.step1Label, t.request.step2Label, t.request.step3Label]

  return (
    <div className="min-h-screen bg-base-200 pt-20">
      <div className="container-custom py-12">

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-base-content">{t.request.title}</h1>
          <p className="text-base-content/60 mt-2">{t.request.subtitle}</p>
        </div>

        {/* Progress steps */}
        <div className="max-w-2xl mx-auto mb-8">
          <ul className="steps w-full">
            {steps.map((label, i) => (
              <li key={label} className={`step ${step > i ? 'step-primary' : ''}`}>{label}</li>
            ))}
          </ul>
        </div>

        <div className="card bg-base-100 shadow-sm border border-base-300 max-w-2xl mx-auto">
          <div className="card-body">
            {error && (
              <div className="alert alert-error mb-4">
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Step 1: Boat info */}
              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold">{t.request.step1Title}</h2>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">{t.request.listingUrl}</span>
                    </label>
                    <div className="input input-bordered flex items-center gap-2">
                      <LinkIcon className="w-4 h-4 text-base-content/40 shrink-0" />
                      <input
                        type="url"
                        name="listingUrl"
                        value={formData.listingUrl}
                        onChange={handleChange}
                        placeholder={t.request.listingUrlPlaceholder}
                        className="grow bg-transparent outline-none text-sm"
                      />
                    </div>
                    <label className="label">
                      <span className="label-text-alt text-base-content/50">{t.request.listingUrlHint}</span>
                    </label>
                  </div>

                  <div className="divider text-xs text-base-content/40">o rellena manualmente</div>

                  <div className="form-control">
                    <label className="label"><span className="label-text">{t.request.boatName}</span></label>
                    <input
                      type="text"
                      name="boatName"
                      value={formData.boatName}
                      onChange={handleChange}
                      placeholder={t.request.boatNamePlaceholder}
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label"><span className="label-text">{t.request.boatType}</span></label>
                      <select name="boatType" value={formData.boatType} onChange={handleChange} className="select select-bordered w-full">
                        {boatTypeKeys.map((k) => (
                          <option key={k} value={k}>{t.request.boatTypes[k]}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-control">
                      <label className="label"><span className="label-text">{t.request.boatYear}</span></label>
                      <input
                        type="number"
                        name="boatYear"
                        value={formData.boatYear}
                        onChange={handleChange}
                        placeholder={t.request.boatYearPlaceholder}
                        className="input input-bordered w-full"
                      />
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label"><span className="label-text">{t.request.boatModel}</span></label>
                    <input
                      type="text"
                      name="boatModel"
                      value={formData.boatModel}
                      onChange={handleChange}
                      placeholder={t.request.boatModelPlaceholder}
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Inspection details */}
              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold">{t.request.step2Title}</h2>

                  <div className="space-y-2">
                    {inspTypeKeys.map((k) => {
                      const item = t.request.inspTypes[k]
                      return (
                        <label
                          key={k}
                          className={`flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                            formData.inspectionType === k ? 'border-primary bg-primary/5' : 'border-base-300 hover:border-primary/50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="inspectionType"
                            value={k}
                            checked={formData.inspectionType === k}
                            onChange={handleChange}
                            className="radio radio-primary mt-0.5"
                          />
                          <div>
                            <p className="font-semibold text-base-content">{item.label}</p>
                            <p className="text-sm text-base-content/60">{item.desc}</p>
                          </div>
                        </label>
                      )
                    })}
                  </div>

                  <div className="form-control">
                    <label className="label"><span className="label-text">{t.request.location}</span></label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder={t.request.locationPlaceholder}
                      required
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label"><span className="label-text">{t.request.preferredDate}</span></label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      required
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label"><span className="label-text">{t.request.notes}</span></label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder={t.request.notesPlaceholder}
                      rows={3}
                      className="textarea textarea-bordered w-full"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Confirm */}
              {step === 3 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold">{t.request.step3Title}</h2>

                  <div className="bg-base-200 rounded-xl p-5 space-y-3">
                    {([
                      [t.request.labelBoat, formData.boatName || '—'],
                      [t.request.labelType, t.request.boatTypes[formData.boatType as keyof typeof t.request.boatTypes] ?? formData.boatType],
                      [t.request.labelYear, formData.boatYear || '—'],
                      [t.request.labelInspection, t.request.inspTypes[formData.inspectionType as keyof typeof t.request.inspTypes]?.label ?? formData.inspectionType],
                      [t.request.labelLocation, formData.location || '—'],
                      [t.request.labelDate, formData.preferredDate || '—'],
                      ...(formData.listingUrl ? [[t.request.labelListing, formData.listingUrl]] : []),
                    ] as [string, string][]).map(([label, value]) => (
                      <div key={label} className="flex justify-between gap-4 text-sm">
                        <span className="text-base-content/60 font-medium shrink-0">{label}:</span>
                        <span className="font-semibold text-base-content text-right break-all">{value}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-base-content/50">{t.request.terms}</p>

                  <button type="submit" disabled={loading} className="btn btn-primary w-full gap-2">
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {loading ? t.request.submitting : t.request.submit}
                  </button>
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-3 mt-6">
                {step > 1 && (
                  <button type="button" onClick={() => setStep(step - 1)} className="btn btn-outline flex-1">
                    {t.request.back}
                  </button>
                )}
                {step < 3 && (
                  <button type="button" onClick={() => setStep(step + 1)} className="btn btn-primary flex-1 gap-2">
                    {t.request.next} <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
