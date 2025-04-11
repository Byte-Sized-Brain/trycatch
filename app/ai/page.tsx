import type React from "react"
import DashboardLayout from "@/components/dashboard-layout"
import Image from "next/image"
import Link from "next/link"
import { Brain, TreesIcon as Lungs, Heart, Bone, Eye, ArrowRight, FileText } from "lucide-react"

// AI model card component
interface AIModelCardProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  imageUrl: string
}

function AIModelCard({ title, description, icon, href, imageUrl }: AIModelCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      <div className="h-40 relative">
        <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="p-5">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mr-3">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <Link
          href={href}
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium text-sm"
        >
          Use Model
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

export default function AIAssistance() {
  const aiModels = [
    {
      title: "Pneumonia Detection",
      description: "Upload a chest X-ray to predict pneumonia with high accuracy.",
      icon: <Lungs className="h-5 w-5" />,
      href: "/ai/pneumonia-xray",
      imageUrl: "/placeholder.svg?height=200&width=400",
    },
    {
      title: "Cardiac Risk Assessment",
      description: "Analyze patient data to estimate cardiovascular risk factors.",
      icon: <Heart className="h-5 w-5" />,
      href: "/ai/cardiac-risk",
      imageUrl: "/placeholder.svg?height=200&width=400",
    },
    {
      title: "Bone Fracture Detection",
      description: "Identify fractures in X-ray images with AI-powered analysis.",
      icon: <Bone className="h-5 w-5" />,
      href: "/ai/fracture-detection",
      imageUrl: "/placeholder.svg?height=200&width=400",
    },
    {
      title: "Diabetic Retinopathy",
      description: "Screen retinal images for signs of diabetic retinopathy.",
      icon: <Eye className="h-5 w-5" />,
      href: "/ai/retinopathy",
      imageUrl: "/placeholder.svg?height=200&width=400",
    },
    {
      title: "Medical Text Analysis",
      description: "Extract key information from medical documents and notes.",
      icon: <FileText className="h-5 w-5" />,
      href: "/ai/text-analysis",
      imageUrl: "/placeholder.svg?height=200&width=400",
    },
    {
      title: "Treatment Recommendation",
      description: "Get AI-powered treatment suggestions based on patient data.",
      icon: <Brain className="h-5 w-5" />,
      href: "/ai/treatment-recommendation",
      imageUrl: "/placeholder.svg?height=200&width=400",
    },
  ]

  return (
    <DashboardLayout>
      <div className="pb-5 border-b border-gray-200">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">AI Assistance</h1>
        <p className="mt-2 text-gray-600">Use AI-powered tools to support diagnosis and clinical decisions</p>
      </div>

      <div className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiModels.map((model, index) => (
            <AIModelCard
              key={index}
              title={model.title}
              description={model.description}
              icon={model.icon}
              href={model.href}
              imageUrl={model.imageUrl}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
