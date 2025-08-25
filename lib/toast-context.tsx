'use client'

import React, { createContext, useContext } from 'react'
import toast, { Toaster } from 'react-hot-toast'

interface ToastContextType {
  showSuccess: (message: string) => void
  showError: (message: string) => void
  showInfo: (message: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const showSuccess = (message: string) => {
    toast.success(message, {
      duration: 4000,
      position: 'top-right',
      style: {
        background: '#10b981',
        color: '#fff',
      },
    })
  }

  const showError = (message: string) => {
    toast.error(message, {
      duration: 4000,
      position: 'top-right',
    })
  }

  const showInfo = (message: string) => {
    toast(message, {
      duration: 4000,
      position: 'top-right',
      style: {
        background: '#3b82f6',
        color: '#fff',
      },
    })
  }

  return (
    <ToastContext.Provider value={{ showSuccess, showError, showInfo }}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
