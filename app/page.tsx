"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronRight, Heart, Brain, Shield, Activity } from "lucide-react"
import ParticleBackground from "@/components/particle-background"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-4 border-emerald-500/30 rounded-full animate-ping"></div>
            <div className="absolute inset-2 border-4 border-t-emerald-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-4 border-4 border-r-emerald-400 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
            <div className="absolute inset-6 border-4 border-b-emerald-300 border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin-slower"></div>
            <div className="absolute inset-8 border-4 border-l-emerald-200 border-t-transparent border-r-transparent border-b-transparent rounded-full animate-spin"></div>
          </div>
          <div className="mt-4 text-emerald-500 font-mono text-sm tracking-wider">INITIALIZING MEDINEX</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
      <ParticleBackground color="#10b981" particleCount={100} opacity={0.3} />

      {/* Navigation */}
      <nav className="border-b border-emerald-500/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/50 animated-pulse">
                  <Activity className="h-6 w-6 text-emerald-400" />
                </div>
                <span className="ml-2 text-xl font-semibold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  MediNex
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="btn-primary flex items-center space-x-2 animated-scale">
                <span>Login</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animated-slide-in">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
                <span className="block">Smarter Healthcare</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mt-2">
                  for Doctors
                </span>
              </h1>
              <p className="mt-6 text-lg text-gray-300 max-w-xl">
                Streamline your practice with our intelligent healthcare platform. Access patient records, analyze
                medical data, and leverage AI-powered diagnostic tools all in one place.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/login"
                  className="btn-primary flex items-center justify-center space-x-2 py-3 px-8 text-lg"
                >
                  <span>Get Started</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="#features"
                  className="btn-secondary flex items-center justify-center space-x-2 py-3 px-8 text-lg"
                >
                  <span>Learn More</span>
                </Link>
              </div>
            </div>
            <div className="relative animated-float">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg blur opacity-30 animate-pulse"></div>
              <div className="relative bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden border border-emerald-500/20">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Doctor using dashboard"
                  width={800}
                  height={600}
                  className="w-full h-auto opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/50">
                      <Activity className="h-6 w-6 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Patient Vitals</div>
                      <div className="text-lg font-semibold text-white">Real-time Monitoring</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="py-24 relative">
          <div className="absolute inset-0 bg-emerald-900/10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16 animated-slide-up">
              <h2 className="text-base text-emerald-400 font-semibold tracking-wide uppercase">Features</h2>
              <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">A better way to manage patient care</p>
              <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
                Our platform provides tools designed specifically for healthcare professionals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Patient Management",
                  description: "Easily access and manage patient records, medical history, and treatment plans.",
                  icon: <Heart className="h-6 w-6" />,
                  delay: "0s",
                },
                {
                  title: "AI-Powered Diagnostics",
                  description:
                    "Leverage cutting-edge AI models to assist with diagnoses and treatment recommendations.",
                  icon: <Brain className="h-6 w-6" />,
                  delay: "0.2s",
                },
                {
                  title: "Secure Communication",
                  description: "Communicate securely with patients and other healthcare providers.",
                  icon: <Shield className="h-6 w-6" />,
                  delay: "0.4s",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="futuristic-card p-6 animated-slide-up"
                  style={{ animationDelay: feature.delay }}
                >
                  <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/50 mb-5">
                    <div className="text-emerald-400">{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-emerald-500/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav className="flex flex-wrap justify-center" aria-label="Footer">
            {["About", "Contact", "Privacy"].map((item) => (
              <div key={item} className="px-5 py-2">
                <a href="#" className="text-base text-gray-400 hover:text-emerald-400 transition-colors">
                  {item}
                </a>
              </div>
            ))}
          </nav>
          <p className="mt-8 text-center text-base text-gray-400">&copy; 2025 MediNex, Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
