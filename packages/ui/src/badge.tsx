import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from './cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider',
  {
    variants: {
      variant: {
        default: 'bg-white/5 text-muted border border-border-light',
        active: 'bg-green/10 text-green border border-green/20',
        risk: 'bg-amber/10 text-amber border border-amber/20',
        inactive: 'bg-red/10 text-red border border-red/20',
        info: 'bg-blue/10 text-blue border border-blue/20',
        purple: 'bg-purple/10 text-purple border border-purple/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />
}
