'use client'

import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { cn } from './cn'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
}

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [open])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 m-0 h-full w-full bg-transparent p-0 backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={cn(
            'w-full max-w-md rounded-2xl border border-border-light bg-surface p-6',
            'shadow-[0_12px_40px_rgba(0,0,0,0.7)] animate-slide-up',
            className,
          )}
        >
          {title && (
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold uppercase tracking-wider">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-muted transition-colors hover:bg-white/5 hover:text-white"
                aria-label="Закрыть"
                type="button"
              >
                <X size={18} />
              </button>
            </div>
          )}
          {children}
        </div>
      </div>
    </dialog>
  )
}
