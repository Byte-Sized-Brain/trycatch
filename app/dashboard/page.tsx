"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import PatientCard from "@/components/patient-card"
import AuthModal from "@/components/auth-modal"
import { Search, Activity, Calendar, FileText, TrendingUp, Users, AlertCircle } from "lucide-react"

// Mock patient data
const mockPatients = [
  {
    id: "P12345",
    name: "John Doe",
    gender: "Male",
    age: 45,
    photo: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "P67890",
    name: "Jane Smith",
    gender: "Female",
    age: 32,
    photo: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "P24680",
    name: "Robert Johnson",
    gender: "Male",
    age: 58,
    photo: "/placeholder.svg?height=60&width=60",
  },
]

export default function Dashboard() {
  const [patientId, setPatientId] = useState("")
  const [searchResults, setSearchResults] = useState<typeof mockPatients>([])
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [metrics, setMetrics] = useState({
    patients: 0,
    appointments: 0,
    reports: 0,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Animate metrics
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        patients: prev.patients < 248 ? prev.patients + 4 : 248,
        appointments: prev.appointments < 12 ? prev.appointments + 1 : 12,
        reports: prev.reports < 7 ? prev.reports + 1 : 7,
      }))
    }, 50)

    return () => clearInterval(interval)
  }, [])

  // Activity chart animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const generateRandomData = () => {
      return Array.from({ length: 24 }, () => Math.floor(Math.random() * 60) + 20)
    }

    const data = generateRandomData()
    const data2 = generateRandomData()

    const drawChart = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw grid lines
      ctx.strokeStyle = "rgba(16, 185, 129, 0.1)"
      ctx.lineWidth = 1

      // Horizontal grid lines
      for (let i = 0; i < 5; i++) {
        const y = (canvas.height / 5) * i
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw data line 1
      ctx.strokeStyle = "rgba(16, 185, 129, 0.8)"
      ctx.lineWidth = 2
      ctx.beginPath()

      data.forEach((value, index) => {
        const x = (canvas.width / (data.length - 1)) * index
        const y = canvas.height - (value / 100) * canvas.height

        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.stroke()

      // Add gradient under the line
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "rgba(16, 185, 129, 0.3)")
      gradient.addColorStop(1, "rgba(16, 185, 129, 0)")

      ctx.fillStyle = gradient
      ctx.beginPath()

      data.forEach((value, index) => {
        const x = (canvas.width / (data.length - 1)) * index
        const y = canvas.height - (value / 100) * canvas.height

        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.lineTo(canvas.width, canvas.height)
      ctx.lineTo(0, canvas.height)
      ctx.closePath()
      ctx.fill()

      // Draw data line 2
      ctx.strokeStyle = "rgba(79, 209, 197, 0.8)"
      ctx.lineWidth = 2
      ctx.beginPath()

      data2.forEach((value, index) => {
        const x = (canvas.width / (data2.length - 1)) * index
        const y = canvas.height - (value / 100) * canvas.height

        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.stroke()
    }

    drawChart()

    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      drawChart()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!patientId.trim()) {
      setSearchResults([])
      setIsLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      // Filter mock patients based on ID
      const results = mockPatients.filter((patient) => patient.id.toLowerCase().includes(patientId.toLowerCase()))
      setSearchResults(results)
      setIsLoading(false)
    }, 800)
  }

  const handlePatientClick = (id: string) => {
    setSelectedPatient(id)
    setIsAuthModalOpen(true)
  }

  return (
    <DashboardLayout>
      <div className="pb-5 border-b border-emerald-500/20">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-gray-400">Welcome back, Dr. Smith</p>
      </div>

      <div className="mt-6 animated-fade-in">
        <div className="futuristic-card p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Search className="mr-2 h-5 w-5 text-emerald-400" />
            Patient Lookup
          </h2>

          <form onSubmit={handleSearch} className="mb-6">
            <label htmlFor="patientId" className="block text-sm font-medium text-gray-300 mb-1">
              Enter Patient ID
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                name="patientId"
                id="patientId"
                className="input-field pl-10"
                placeholder="e.g. P12345"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute inset-y-0 right-0 px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-emerald-600 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span>Searching...</span>
                  </div>
                ) : (
                  "Search"
                )}
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">Try searching for "P12345" or "P67890"</p>
          </form>

          {searchResults.length > 0 ? (
            <div className="space-y-4 animated-slide-up">
              <h3 className="text-lg font-medium text-white">Search Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((patient) => (
                  <PatientCard key={patient.id} patient={patient} onClick={() => handlePatientClick(patient.id)} />
                ))}
              </div>
            </div>
          ) : patientId && !isLoading ? (
            <div className="text-center py-4 animated-fade-in">
              <p className="text-gray-400">No patients found with that ID.</p>
            </div>
          ) : null}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="futuristic-card animated-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-12 w-12 rounded-md bg-emerald-500/20 flex items-center justify-center border border-emerald-500/50">
                  <Users className="h-6 w-6 text-emerald-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-400 truncate">Total Patients</dt>
                    <dd>
                      <div className="text-2xl font-medium text-white">{metrics.patients}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="futuristic-card animated-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-12 w-12 rounded-md bg-blue-500/20 flex items-center justify-center border border-blue-500/50">
                  <Calendar className="h-6 w-6 text-blue-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-400 truncate">Appointments Today</dt>
                    <dd>
                      <div className="text-2xl font-medium text-white">{metrics.appointments}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="futuristic-card animated-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-12 w-12 rounded-md bg-purple-500/20 flex items-center justify-center border border-purple-500/50">
                  <FileText className="h-6 w-6 text-purple-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-400 truncate">Pending Reports</dt>
                    <dd>
                      <div className="text-2xl font-medium text-white">{metrics.reports}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 futuristic-card p-6 animated-slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <Activity className="mr-2 h-5 w-5 text-emerald-400" />
              Patient Activity
            </h2>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-emerald-500 mr-1"></div>
                <span className="text-xs text-gray-400">Consultations</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-cyan-500 mr-1"></div>
                <span className="text-xs text-gray-400">Admissions</span>
              </div>
            </div>
          </div>
          <div className="h-64 w-full">
            <canvas ref={canvasRef} className="w-full h-full"></canvas>
          </div>
        </div>

        <div className="mt-8 futuristic-card p-6 animated-slide-up" style={{ animationDelay: "0.5s" }}>
          <h2 className="text-xl font-semibold text-white flex items-center mb-6">
            <AlertCircle className="mr-2 h-5 w-5 text-amber-400" />
            Recent Alerts
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-amber-500/10 rounded-md border border-amber-500/20">
              <div className="mt-0.5 p-1 rounded-full bg-amber-500/20 border border-amber-500/30">
                <AlertCircle className="h-4 w-4 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center">
                  <div className="text-sm font-medium text-white">Medication Alert</div>
                  <div className="ml-2 text-xs text-gray-400">10:45 AM</div>
                </div>
                <div className="text-xs text-gray-300 mt-1">
                  Patient John Doe (P12345) has a potential medication interaction.
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-emerald-500/10 rounded-md border border-emerald-500/20">
              <div className="mt-0.5 p-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center">
                  <div className="text-sm font-medium text-white">Lab Results Available</div>
                  <div className="ml-2 text-xs text-gray-400">09:30 AM</div>
                </div>
                <div className="text-xs text-gray-300 mt-1">
                  New lab results for patient Jane Smith (P67890) are ready for review.
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-blue-500/10 rounded-md border border-blue-500/20">
              <div className="mt-0.5 p-1 rounded-full bg-blue-500/20 border border-blue-500/30">
                <Calendar className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <div className="flex items-center">
                  <div className="text-sm font-medium text-white">Appointment Reminder</div>
                  <div className="ml-2 text-xs text-gray-400">08:15 AM</div>
                </div>
                <div className="text-xs text-gray-300 mt-1">
                  You have a follow-up appointment with Robert Johnson (P24680) at 2:00 PM today.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {selectedPatient && (
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} patientId={selectedPatient} />
      )}
    </DashboardLayout>
  )
}
