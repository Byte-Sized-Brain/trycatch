"use client"

import Image from "next/image"
import { forwardRef } from "react"
import { motion } from "framer-motion"

interface PatientCardProps {
  patient: {
    id: string
    name: string
    gender: string
    age: number
    photo: string
  }
  onClick: () => void
}

const PatientCard = forwardRef<HTMLDivElement, PatientCardProps>(({ patient, onClick }, ref) => {
  return (
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="futuristic-card overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      <div className="p-4 flex items-center space-x-4">
        <div className="flex-shrink-0 relative">
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"></div>
          <Image
            src={patient.photo || "/placeholder.svg?height=60&width=60"}
            alt={patient.name}
            width={60}
            height={60}
            className="h-12 w-12 rounded-full object-cover relative border border-emerald-500/30 group-hover:border-emerald-500/60 transition-colors duration-300"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate group-hover:text-emerald-400 transition-colors duration-300">
            {patient.name}
          </p>
          <p className="text-sm text-gray-400 truncate">
            {patient.gender}, {patient.age} years
          </p>
        </div>
        <div className="inline-flex items-center text-xs font-medium text-emerald-400 bg-emerald-900/50 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
          ID: {patient.id}
        </div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:via-emerald-500 transition-all duration-300"></div>
    </motion.div>
  )
})

PatientCard.displayName = "PatientCard"

export default PatientCard
