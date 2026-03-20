'use client'

import { useEffect, useState } from 'react'
import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react'
import { cn } from './cn'

type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: string
  message: string
  type: ToastType
}

let addToast: (message: string, type?: ToastType) => void

const icons = {
  success: CheckCircle,
  error: AlertTriangle,
  info: Info,
}

const colors = {
  success: 'border-green/20 text-green',
  error: 'border-red/20 text-red',
  info: 'border-blue/20 text-blue',
}

export function toast(message: string, type: ToastType = 'success') {
  addToast?.(message, type)
}

export function ToastProvider() {
  const [toasts, setToasts] = useState<Toast[]>([])

  addToast = (message: string, type: ToastType = 'success') => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2" aria-live="polite">
      {toasts.map((t) => {
        const Icon = icons[t.type]
        return (
          <div
            key={t.id}
            className={cn(
              'flex items-center gap-3 rounded-xl border border-border-light bg-surface px-4 py-3 shadow-lg animate-slide-up',
              colors[t.type],
            )}
          >
            <Icon size={16} />
            <span className="text-sm text-white">{t.message}</span>
            <button
              onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
              className="ml-2 text-muted hover:text-white"
              type="button"
              aria-label="Закрыть"
            >
              <X size={14} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
