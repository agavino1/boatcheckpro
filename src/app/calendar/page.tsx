'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Clock, MapPin, User } from 'lucide-react'

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 1, 1))
  const [selectedDate, setSelectedDate] = useState<number | null>(null)

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const bookedDates = [5, 8, 15, 18, 25] // Example booked dates
  const availableDates = [3, 6, 10, 12, 16, 20, 22, 26, 28]

  const timeSlots = ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM']

  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })

  const appointments = [
    {
      id: 1,
      boatName: 'Ocean Spirit',
      date: '2026-02-20',
      time: '10:00 AM',
      location: 'Marina Bay',
      technician: 'Captain James Mitchell',
      status: 'Scheduled',
    },
    {
      id: 2,
      boatName: 'Wave Rider',
      date: '2026-02-25',
      time: '02:00 PM',
      location: 'Harbor View',
      technician: 'Dr. Patricia Watson',
      status: 'Confirmed',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="section-title">Schedule Your Inspection</h1>
          <p className="section-subtitle">
            Choose your preferred date and time
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <div className="card p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Select a Date</h2>
                <p className="text-gray-600 text-sm mt-1">Green dates are available, dark dates are booked</p>
              </div>

              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h3 className="text-xl font-bold text-gray-900">{monthName}</h3>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="space-y-4">
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center font-semibold text-gray-700 text-sm py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square" />
                  ))}

                  {daysArray.map(day => {
                    const isBooked = bookedDates.includes(day)
                    const isAvailable = availableDates.includes(day)
                    const isSelected = selectedDate === day

                    return (
                      <button
                        key={day}
                        onClick={() => !isBooked && setSelectedDate(day)}
                        disabled={isBooked}
                        className={`aspect-square rounded-lg font-semibold transition-all text-sm ${
                          isSelected
                            ? 'bg-primary-600 text-white ring-2 ring-primary-400'
                            : isBooked
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : isAvailable
                            ? 'bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer'
                        }`}
                      >
                        {day}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4">Select Time</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map(slot => (
                      <button
                        key={slot}
                        className="p-3 border-2 border-primary-200 rounded-lg hover:bg-primary-50 transition-colors font-medium text-primary-600"
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Scheduled Appointments */}
            <div className="card p-6">
              <h3 className="font-bold text-gray-900 mb-4">Your Appointments</h3>
              <div className="space-y-4">
                {appointments.map(apt => (
                  <div key={apt.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <p className="font-semibold text-gray-900">{apt.boatName}</p>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        apt.status === 'Confirmed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {apt.status}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {apt.date} at {apt.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {apt.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {apt.technician}
                      </div>
                    </div>

                    <button className="w-full mt-3 py-2 text-primary-600 hover:bg-primary-50 rounded transition-colors text-sm font-medium">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="card p-6">
              <h3 className="font-bold text-gray-900 mb-4">Legend</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded" />
                  <span className="text-gray-700">Available</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gray-300 rounded" />
                  <span className="text-gray-700">Booked</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary-600 rounded" />
                  <span className="text-gray-700">Selected</span>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="card p-6 bg-primary-50 border-primary-200">
              <h4 className="font-bold text-gray-900 mb-2">Inspection Info</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✓ 3-6 hours depending on boat size</li>
                <li>✓ Certified technician</li>
                <li>✓ Report within 24 hours</li>
                <li>✓ Professional documentation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
