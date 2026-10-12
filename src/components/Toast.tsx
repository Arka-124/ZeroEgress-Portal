import React, { useState, useCallback } from 'react'
import { CheckCircle2, Info, X } from 'lucide-react'
import { ToastContext } from '../context/ToastContext'
import type { ToastMessage } from '../context/ToastContext'

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const showToast = useCallback((title: string, message?: string, type: 'success' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, title, message, type }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl bg-zinc-900 border border-zinc-700/80 shadow-2xl shadow-black/80 backdrop-blur-md text-zinc-100 transition-all animate-in slide-in-from-bottom-2 fade-in"
          >
            {toast.type === 'info' ? (
              <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-100">{toast.title}</p>
              {toast.message && (
                <p className="text-xs text-zinc-400 mt-0.5 break-all font-mono">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-zinc-500 hover:text-zinc-300 p-1 rounded-md transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
