import { cn } from './cn'

interface KpiCardProps {
  value: string
  label: string
  delta?: string
  deltaType?: 'up' | 'down'
  className?: string
}

export function KpiCard({ value, label, delta, deltaType, className }: KpiCardProps) {
  return (
    <div className={cn('rounded-xl border border-border-light bg-surface p-4', className)}>
      <p className="font-display text-2xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-[11px] font-light uppercase tracking-wider text-muted">{label}</p>
      {delta && (
        <p
          className={cn(
            'mt-2 text-xs font-light',
            deltaType === 'up' && 'text-green',
            deltaType === 'down' && 'text-red',
          )}
        >
          {delta}
        </p>
      )}
    </div>
  )
}
