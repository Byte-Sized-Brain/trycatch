"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Upload, X, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PneumoniaXrayUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<{
    prediction: "Pneumonia" | "Normal" | null
    confidence: number | null
  }>({ prediction: null, confidence: null })

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)

      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreview(e.target.result as string)
        }
      }
      reader.readAsDataURL(selectedFile)

      // Reset result
      setResult({ prediction: null, confidence: null })
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      setFile(droppedFile)

      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreview(e.target.result as string)
        }
      }
      reader.readAsDataURL(droppedFile)

      // Reset result
      setResult({ prediction: null, confidence: null })
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    setPreview(null)
    setResult({ prediction: null, confidence: null })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleAnalyze = () => {
    if (!file) return

    setIsAnalyzing(true)

    // Simulate API call to AI model
    setTimeout(() => {
      // Mock result - in a real app, this would come from the AI model
      const mockPrediction = Math.random() > 0.5 ? "Pneumonia" : "Normal"
      const mockConfidence = Math.random() * 20 + 80 // Random confidence between 80-100%

      setResult({
        prediction: mockPrediction as "Pneumonia" | "Normal",
        confidence: Number.parseFloat(mockConfidence.toFixed(2)),
      })

      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <DashboardLayout>
      <div className="pb-5 border-b border-gray-200 flex items-center">
        <Link href="/ai" className="mr-4">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold leading-tight text-gray-900">Pneumonia Detection</h1>
          <p className="mt-1 text-gray-600">Upload a chest X-ray image to detect pneumonia using AI</p>
        </div>
      </div>

      <div className="mt-8 max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Upload X-ray Image</h2>

            <div
              className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center ${
                preview ? "border-emerald-300 bg-emerald-50" : "border-gray-300 hover:border-emerald-300"
              }`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {!preview ? (
                <>
                  <Upload className="h-12 w-12 text-gray-400 mb-3" />
                  <p className="text-sm text-gray-600 mb-2">Drag and drop your X-ray image here, or click to browse</p>
                  <p className="text-xs text-gray-500">Supported formats: JPEG, PNG</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={handleFileChange}
                    className="hidden"
                    id="xray-upload"
                  />
                  <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="mt-4">
                    Browse Files
                  </Button>
                </>
              ) : (
                <div className="relative w-full">
                  <div className="absolute top-0 right-0 m-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-white rounded-full"
                      onClick={handleRemoveFile}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-1/2 relative h-64 md:h-80">
                      <Image src={preview || "/placeholder.svg"} alt="X-ray preview" fill className="object-contain" />
                    </div>
                    <div className="w-full md:w-1/2 p-4">
                      <h3 className="font-medium text-gray-900">File Details</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {file?.name} ({Math.round(file?.size ? file.size / 1024 : 0)} KB)
                      </p>

                      <div className="mt-6">
                        <Button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full">
                          {isAnalyzing ? "Analyzing..." : "Analyze X-ray"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Results Section */}
            {result.prediction && (
              <div
                className={`mt-8 p-6 rounded-lg ${
                  result.prediction === "Pneumonia"
                    ? "bg-red-50 border border-red-200"
                    : "bg-green-50 border border-green-200"
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {result.prediction === "Pneumonia" ? (
                      <AlertCircle className="h-6 w-6 text-red-600" />
                    ) : (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      {result.prediction === "Pneumonia" ? "Pneumonia Detected" : "No Pneumonia Detected"}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        Confidence: <span className="font-medium">{result.confidence}%</span>
                      </p>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">
                        {result.prediction === "Pneumonia"
                          ? "The AI model has detected patterns consistent with pneumonia in this X-ray. Please review the results and consult with a specialist for confirmation."
                          : "The AI model did not detect patterns consistent with pneumonia in this X-ray. However, please review the results and consult with a specialist for confirmation."}
                      </p>
                    </div>
                    <div className="mt-4">
                      <p className="text-xs text-gray-500 italic">
                        Note: This is an AI-assisted analysis and should not replace professional medical diagnosis.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
