"use client"

import type React from "react"

import { useState, Fragment, useEffect } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { useRouter } from "next/navigation"
import { X, Lock, ArrowRight } from "lucide-react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  patientId: string
}

export default function AuthModal({ isOpen, onClose, patientId }: AuthModalProps) {
  const [authCode, setAuthCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setAuthCode("")
      setError("")
      setShowSuccess(false)
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      if (authCode === "1234") {
        setShowSuccess(true)
        setTimeout(() => {
          onClose()
          router.push(`/patients/${patientId}`)
        }, 1000)
      } else {
        setError("Invalid authentication code. Please try again.")
      }
    }, 1000)
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-900 border border-emerald-500/20 p-6 text-left align-middle shadow-xl transition-all">
                {showSuccess ? (
                  <div className="py-8 flex flex-col items-center animated-fade-in">
                    <div className="h-16 w-16 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/50 mb-4">
                      <ArrowRight className="h-8 w-8 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">Authentication Successful</h3>
                    <p className="text-sm text-gray-400">Redirecting to patient profile...</p>
                    <div className="mt-4 w-full bg-gray-800 rounded-full h-1.5">
                      <div className="bg-emerald-500 h-1.5 rounded-full animate-pulse" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <Dialog.Title as="h3" className="text-lg font-medium text-white flex items-center">
                        <Lock className="mr-2 h-5 w-5 text-emerald-400" />
                        Authentication Required
                      </Dialog.Title>
                      <button type="button" className="text-gray-400 hover:text-white" onClick={onClose}>
                        <span className="sr-only">Close</span>
                        <X className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    <div>
                      <p className="text-sm text-gray-300 mb-4">
                        Please enter the authentication code to access patient information.
                      </p>

                      {error && (
                        <div className="mb-4 p-3 bg-red-900/50 text-red-300 text-sm rounded-md border border-red-500/30 animated-fade-in">
                          {error}
                        </div>
                      )}

                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label htmlFor="authCode" className="block text-sm font-medium text-gray-300 mb-2">
                            Authentication Code
                          </label>
                          <input
                            type="text"
                            id="authCode"
                            value={authCode}
                            onChange={(e) => setAuthCode(e.target.value)}
                            className="input-field text-lg tracking-wider text-center"
                            placeholder="Enter 4-digit code"
                            maxLength={4}
                            autoFocus
                            required
                          />
                          <p className="mt-2 text-xs text-gray-500">Use code "1234" for demo purposes</p>
                        </div>

                        <div className="mt-6">
                          <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden group"
                          >
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-500/0 via-emerald-500/30 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></span>
                            {isLoading ? (
                              <div className="flex items-center">
                                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                <span>Verifying...</span>
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <span>Submit</span>
                                <ArrowRight className="ml-2 h-5 w-5" />
                              </div>
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
