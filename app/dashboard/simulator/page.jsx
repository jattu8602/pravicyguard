'use client'
import { BrowserInterface } from '@/components/browser-interface'

export default function ComputerScreen() {
  return (
    <div className="relative">
      {/* Computer Monitor Frame */}
      <div className="bg-slate-800 p-6 rounded-2xl shadow-2xl">
        {/* Monitor Bezel */}
        <div className="bg-black p-4 rounded-lg">
          {/* Screen */}
          <div className="bg-background rounded-md overflow-hidden shadow-inner">
            <BrowserInterface />
          </div>
        </div>

        {/* Monitor Stand */}
        <div className="flex justify-center mt-4">
          <div className="w-32 h-8 bg-slate-700 rounded-b-lg"></div>
        </div>
      </div>

      {/* Monitor Base */}
      <div className="flex justify-center mt-2">
        <div className="w-48 h-4 bg-slate-600 rounded-full"></div>
      </div>
    </div>
  )
}
