import { cn } from './cn'

interface ProgressBarProps {
  value: number // 0-100
  color?: string
  className?: string
}

export function ProgressBar({ value, className }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value))

  return (
    <div className={cn('h-1.5 w-full overflow-hidden rounded-full bg-white/5', className)}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-amber to-yellow-400 transition-all duration-500"
        style={{ '--progress': `${clamped}%` } as React.CSSProperties}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="h-full w-[var(--progress)]" />
      </div>
    </div>
  )
}
