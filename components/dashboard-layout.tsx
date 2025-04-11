"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Home, Users, Calendar, FileText, Settings, LogOut, Menu, X, Brain, Activity, Bell, Search } from "lucide-react"
import ParticleBackground from "@/components/particle-background"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Patients", href: "/dashboard/patients", icon: Users },
    { name: "Appointments", href: "/dashboard/appointments", icon: Calendar },
    { name: "Reports", href: "/dashboard/reports", icon: FileText },
    { name: "AI Assistance", href: "/ai", icon: Brain },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

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
          <div className="mt-4 text-emerald-500 font-mono text-sm tracking-wider">INITIALIZING DASHBOARD</div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gradient-to-br from-gray-900 to-black">
      <ParticleBackground color="#10b981" particleCount={50} opacity={0.1} />

      {/* Mobile sidebar */}
      <div className={`${sidebarOpen ? "block" : "hidden"} fixed inset-0 flex z-40 md:hidden`}>
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-900 border-r border-emerald-500/20">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/50 animated-pulse">
                <Activity className="h-6 w-6 text-emerald-400" />
              </div>
              <span className="ml-2 text-xl font-semibold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                MediNex
              </span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    pathname === item.href
                      ? "bg-emerald-900/50 text-emerald-400 border-l-2 border-emerald-500"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  } group flex items-center px-2 py-2 text-base font-medium rounded-md transition-all duration-200`}
                >
                  <item.icon
                    className={`${
                      pathname === item.href ? "text-emerald-400" : "text-gray-400 group-hover:text-gray-300"
                    } mr-4 flex-shrink-0 h-6 w-6`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-emerald-500/20 p-4">
            <Link href="/" className="flex-shrink-0 group block">
              <div className="flex items-center">
                <div>
                  <Image
                    className="inline-block h-10 w-10 rounded-full border border-emerald-500/30"
                    src="/placeholder.svg?height=40&width=40"
                    alt="Profile"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="ml-3">
                  <p className="text-base font-medium text-white group-hover:text-emerald-400">Dr. Jane Smith</p>
                  <div className="flex items-center text-sm font-medium text-gray-400 group-hover:text-emerald-300">
                    <LogOut className="mr-1 h-4 w-4" />
                    Logout
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 border-r border-emerald-500/20 bg-gray-900/50 backdrop-blur-sm">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/50 animated-pulse">
                  <Activity className="h-6 w-6 text-emerald-400" />
                </div>
                <span className="ml-2 text-xl font-semibold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  MediNex
                </span>
              </div>
              <nav className="mt-8 flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${
                      pathname === item.href
                        ? "bg-emerald-900/50 text-emerald-400 border-l-2 border-emerald-500"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200`}
                  >
                    <item.icon
                      className={`${
                        pathname === item.href ? "text-emerald-400" : "text-gray-400 group-hover:text-gray-300"
                      } mr-3 flex-shrink-0 h-5 w-5`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-emerald-500/20 p-4">
              <Link href="/" className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <div>
                    <Image
                      className="inline-block h-9 w-9 rounded-full border border-emerald-500/30"
                      src="/placeholder.svg?height=40&width=40"
                      alt="Profile"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white group-hover:text-emerald-400">Dr. Jane Smith</p>
                    <div className="flex items-center text-xs font-medium text-gray-400 group-hover:text-emerald-300">
                      <LogOut className="mr-1 h-3 w-3" />
                      Logout
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-gray-900/50 backdrop-blur-sm border-b border-emerald-500/20">
          <button
            type="button"
            className="md:hidden px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-200">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <Search className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input
                    id="search-field"
                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent bg-transparent text-gray-300 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder="Search"
                    type="search"
                    name="search"
                  />
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Profile dropdown */}
              <div className="ml-3 relative">
                <div>
                  <button
                    type="button"
                    className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    id="user-menu-button"
                  >
                    <span className="sr-only">Open user menu</span>
                    <Image
                      className="h-8 w-8 rounded-full border border-emerald-500/30"
                      src="/placeholder.svg?height=32&width=32"
                      alt=""
                      width={32}
                      height={32}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6 px-4 sm:px-6 md:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
