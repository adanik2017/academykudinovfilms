import { cn } from './cn'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
}

export function Card({ className, hoverable, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'relative rounded-2xl border border-border-light bg-surface p-4',
        'shadow-[0_2px_4px_rgba(0,0,0,0.4),0_8px_28px_rgba(0,0,0,0.5)]',
        hoverable && 'cursor-pointer transition-transform duration-300 hover:scale-[1.01] hover:border-amber/20',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
