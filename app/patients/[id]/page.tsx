"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Plus,
  Download,
  Upload,
  FileText,
  Pill,
  ImageIcon,
  ArrowLeft,
  Activity,
  AlertCircle,
  Check,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Mock patient data
const mockPatients = {
  P12345: {
    id: "P12345",
    name: "John Doe",
    gender: "Male",
    age: 45,
    photo: "/placeholder.svg?height=120&width=120",
    bloodType: "O+",
    height: "5'11\"",
    weight: "180 lbs",
    allergies: ["Penicillin", "Peanuts"],
    prescriptions: [
      { id: "RX1001", name: "Lisinopril", dosage: "10mg", frequency: "Once daily", date: "2023-10-15" },
      { id: "RX1002", name: "Metformin", dosage: "500mg", frequency: "Twice daily", date: "2023-11-02" },
    ],
    xrays: [
      { id: "XR501", name: "Chest X-ray", date: "2023-09-20", image: "/placeholder.svg?height=200&width=200" },
      { id: "XR502", name: "Left Knee X-ray", date: "2023-08-15", image: "/placeholder.svg?height=200&width=200" },
    ],
    reports: [
      { id: "RPT301", name: "Blood Test", date: "2023-10-10", status: "Normal", doctor: "Dr. Smith" },
      { id: "RPT302", name: "Lipid Panel", date: "2023-10-10", status: "Abnormal", doctor: "Dr. Smith" },
      { id: "RPT303", name: "Kidney Function", date: "2023-09-05", status: "Normal", doctor: "Dr. Johnson" },
    ],
  },
  P67890: {
    id: "P67890",
    name: "Jane Smith",
    gender: "Female",
    age: 32,
    photo: "/placeholder.svg?height=120&width=120",
    bloodType: "A+",
    height: "5'6\"",
    weight: "135 lbs",
    allergies: ["Sulfa drugs"],
    prescriptions: [
      { id: "RX2001", name: "Levothyroxine", dosage: "50mcg", frequency: "Once daily", date: "2023-11-10" },
    ],
    xrays: [{ id: "XR601", name: "Dental X-ray", date: "2023-10-05", image: "/placeholder.svg?height=200&width=200" }],
    reports: [
      { id: "RPT401", name: "Thyroid Panel", date: "2023-11-01", status: "Abnormal", doctor: "Dr. Williams" },
      { id: "RPT402", name: "CBC", date: "2023-11-01", status: "Normal", doctor: "Dr. Williams" },
    ],
  },
  P24680: {
    id: "P24680",
    name: "Robert Johnson",
    gender: "Male",
    age: 58,
    photo: "/placeholder.svg?height=120&width=120",
    bloodType: "B-",
    height: "6'0\"",
    weight: "210 lbs",
    allergies: ["Latex", "Shellfish"],
    prescriptions: [
      { id: "RX3001", name: "Atorvastatin", dosage: "20mg", frequency: "Once daily", date: "2023-09-22" },
      { id: "RX3002", name: "Amlodipine", dosage: "5mg", frequency: "Once daily", date: "2023-09-22" },
      { id: "RX3003", name: "Aspirin", dosage: "81mg", frequency: "Once daily", date: "2023-09-22" },
    ],
    xrays: [
      { id: "XR701", name: "Lumbar Spine X-ray", date: "2023-08-30", image: "/placeholder.svg?height=200&width=200" },
      { id: "XR702", name: "Hip X-ray", date: "2023-07-15", image: "/placeholder.svg?height=200&width=200" },
    ],
    reports: [
      { id: "RPT501", name: "Cardiac Stress Test", date: "2023-09-15", status: "Abnormal", doctor: "Dr. Brown" },
      { id: "RPT502", name: "Echocardiogram", date: "2023-09-15", status: "Normal", doctor: "Dr. Brown" },
      { id: "RPT503", name: "Lipid Panel", date: "2023-09-01", status: "Abnormal", doctor: "Dr. Brown" },
    ],
  },
}

export default function PatientProfile() {
  const params = useParams()
  const router = useRouter()
  const patientId = params.id as string
  const patient = mockPatients[patientId as keyof typeof mockPatients]

  const [activeTab, setActiveTab] = useState("prescriptions")
  const [isLoading, setIsLoading] = useState(true)
  const [vitals, setVitals] = useState({
    heartRate: 0,
    bloodPressure: "0/0",
    temperature: 0,
    oxygenSaturation: 0,
  })

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      // Animate vitals
      setVitals({
        heartRate: 72,
        bloodPressure: "120/80",
        temperature: 98.6,
        oxygenSaturation: 98,
      })
    }
  }, [isLoading])

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-emerald-500/30 rounded-full animate-ping"></div>
              <div className="absolute inset-2 border-4 border-t-emerald-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            </div>
            <div className="mt-4 text-emerald-500 font-mono text-sm tracking-wider">LOADING PATIENT DATA</div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!patient) {
    return (
      <DashboardLayout>
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold text-white">Patient not found</h2>
          <p className="mt-2 text-gray-400">The patient you're looking for doesn't exist or you don't have access.</p>
          <Button className="mt-6" onClick={() => router.push("/dashboard")}>
            Return to Dashboard
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="pb-5 border-b border-emerald-500/20 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center">
          <Button variant="outline" size="icon" className="mr-4 h-8 w-8" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold text-white">Patient Profile</h1>
        </div>
        <div className="mt-3 flex sm:mt-0 sm:ml-4">
          <Button variant="outline" className="mr-2">
            <FileText className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Note
          </Button>
        </div>
      </div>

      <div className="mt-6">
        {/* Patient Info Card - Enhance the header card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="futuristic-card"
        >
          <div className="p-6">
            <div className="flex flex-col md:flex-row">
              <div className="flex-shrink-0 flex justify-center md:justify-start">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full blur opacity-30 animate-pulse"></div>
                  <Image
                    src={patient.photo || "/placeholder.svg"}
                    alt={patient.name}
                    width={120}
                    height={120}
                    className="h-32 w-32 rounded-full object-cover border-4 border-emerald-900 relative z-10"
                  />
                </div>
              </div>
              <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{patient.name}</h2>
                    <p className="text-sm text-gray-400">Patient ID: {patient.id}</p>
                  </div>
                  <div className="mt-2 md:mt-0 flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-900/50 text-blue-300 border border-blue-500/30">
                      {patient.gender}
                    </span>
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-purple-900/50 text-purple-300 border border-purple-500/30">
                      {patient.age} years
                    </span>
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-900/50 text-red-300 border border-red-500/30">
                      Blood: {patient.bloodType}
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                    <div className="text-xs text-gray-400 mb-1">Heart Rate</div>
                    <div className="flex items-center">
                      <Activity className="h-4 w-4 text-emerald-400 mr-1" />
                      <div className="text-lg font-medium text-white">
                        {vitals.heartRate} <span className="text-xs text-gray-400">bpm</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                    <div className="text-xs text-gray-400 mb-1">Blood Pressure</div>
                    <div className="text-lg font-medium text-white">
                      {vitals.bloodPressure} <span className="text-xs text-gray-400">mmHg</span>
                    </div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                    <div className="text-xs text-gray-400 mb-1">Temperature</div>
                    <div className="text-lg font-medium text-white">
                      {vitals.temperature}°<span className="text-xs text-gray-400">F</span>
                    </div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                    <div className="text-xs text-gray-400 mb-1">O₂ Saturation</div>
                    <div className="text-lg font-medium text-white">
                      {vitals.oxygenSaturation}
                      <span className="text-xs text-gray-400">%</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Height</h3>
                    <p className="mt-1 text-sm text-white">{patient.height}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Weight</h3>
                    <p className="mt-1 text-sm text-white">{patient.weight}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Allergies</h3>
                    <p className="mt-1 text-sm text-white">{patient.allergies.join(", ")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs - Improve the tab styling and content */}
        <div className="mt-6">
          <Tabs defaultValue="prescriptions" onValueChange={setActiveTab} value={activeTab}>
            <TabsList className="grid w-full grid-cols-3 bg-gray-800/50 p-1 rounded-md">
              <TabsTrigger
                value="prescriptions"
                className="data-[state=active]:bg-emerald-900/50 data-[state=active]:text-emerald-400 data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 rounded-none"
              >
                <Pill className="mr-2 h-4 w-4" />
                Prescriptions
              </TabsTrigger>
              <TabsTrigger
                value="xrays"
                className="data-[state=active]:bg-emerald-900/50 data-[state=active]:text-emerald-400 data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 rounded-none"
              >
                <ImageIcon className="mr-2 h-4 w-4" />
                X-rays
              </TabsTrigger>
              <TabsTrigger
                value="reports"
                className="data-[state=active]:bg-emerald-900/50 data-[state=active]:text-emerald-400 data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 rounded-none"
              >
                <FileText className="mr-2 h-4 w-4" />
                Test Reports
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="prescriptions" className="mt-6">
                  <div className="futuristic-card overflow-hidden">
                    <div className="p-4 sm:px-6 flex justify-between items-center border-b border-emerald-500/20">
                      <h3 className="text-lg font-medium text-white flex items-center">
                        <Pill className="mr-2 h-5 w-5 text-emerald-400" />
                        Current Prescriptions
                      </h3>
                      <Button className="bg-emerald-600 hover:bg-emerald-500">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Prescription
                      </Button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-800">
                        <thead className="bg-gray-800/50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                              Medication
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                              Dosage
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                              Frequency
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                              Prescribed Date
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                          {patient.prescriptions.map((prescription, index) => (
                            <motion.tr
                              key={prescription.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="hover:bg-emerald-900/20 transition-colors duration-150"
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                {prescription.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                {prescription.dosage}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                {prescription.frequency}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{prescription.date}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                <button className="text-emerald-400 hover:text-emerald-300 mr-3 transition-colors">
                                  Edit
                                </button>
                                <button className="text-red-400 hover:text-red-300 transition-colors">Delete</button>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="xrays" className="mt-6">
                  <div className="futuristic-card overflow-hidden">
                    <div className="p-4 sm:px-6 flex justify-between items-center border-b border-emerald-500/20">
                      <h3 className="text-lg font-medium text-white flex items-center">
                        <ImageIcon className="mr-2 h-5 w-5 text-emerald-400" />
                        X-ray Images
                      </h3>
                      <Button className="bg-emerald-600 hover:bg-emerald-500">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload X-ray
                      </Button>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {patient.xrays.map((xray, index) => (
                          <motion.div
                            key={xray.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="futuristic-card overflow-hidden group"
                          >
                            <div className="relative h-48">
                              <Image
                                src={xray.image || "/placeholder.svg"}
                                alt={xray.name}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            </div>
                            <div className="p-4">
                              <h4 className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">
                                {xray.name}
                              </h4>
                              <p className="text-xs text-gray-400 mt-1">Date: {xray.date}</p>
                              <div className="mt-3 flex justify-between">
                                <button className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
                                  View Full
                                </button>
                                <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center transition-colors">
                                  <Download className="h-4 w-4 mr-1" />
                                  Download
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reports" className="mt-6">
                  <div className="futuristic-card overflow-hidden">
                    <div className="p-4 sm:px-6 flex justify-between items-center border-b border-emerald-500/20">
                      <h3 className="text-lg font-medium text-white flex items-center">
                        <FileText className="mr-2 h-5 w-5 text-emerald-400" />
                        Test Reports
                      </h3>
                      <Button className="bg-emerald-600 hover:bg-emerald-500">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Report
                      </Button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-800">
                        <thead className="bg-gray-800/50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                              Report Name
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                              Date
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                              Status
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                              Doctor
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                          {patient.reports.map((report, index) => (
                            <motion.tr
                              key={report.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="hover:bg-emerald-900/20 transition-colors duration-150"
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                {report.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{report.date}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    report.status === "Normal"
                                      ? "bg-green-900/50 text-green-300 border border-green-500/30"
                                      : "bg-yellow-900/50 text-yellow-300 border border-yellow-500/30"
                                  }`}
                                >
                                  {report.status === "Normal" ? (
                                    <Check className="mr-1 h-3 w-3" />
                                  ) : (
                                    <AlertCircle className="mr-1 h-3 w-3" />
                                  )}
                                  {report.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{report.doctor}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                <button className="text-emerald-400 hover:text-emerald-300 mr-3 transition-colors">
                                  View
                                </button>
                                <button className="text-blue-400 hover:text-blue-300 mr-3 transition-colors">
                                  <Download className="h-4 w-4 inline" />
                                </button>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}
