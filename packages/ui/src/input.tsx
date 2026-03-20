import { cn } from './cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ className, label, error, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-light tracking-wide text-muted">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          'h-10 rounded-lg border border-border-light bg-surface-3 px-3 text-sm text-white',
          'placeholder:text-muted transition-colors',
          'focus:border-amber/40 focus:outline-none focus:ring-1 focus:ring-amber/20',
          error && 'border-red/40',
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-red">{error}</p>}
    </div>
  )
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export function Textarea({ className, label, error, id, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-light tracking-wide text-muted">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cn(
          'min-h-[80px] rounded-lg border border-border-light bg-surface-3 px-3 py-2 text-sm text-white',
          'placeholder:text-muted transition-colors resize-y',
          'focus:border-amber/40 focus:outline-none focus:ring-1 focus:ring-amber/20',
          error && 'border-red/40',
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-red">{error}</p>}
    </div>
  )
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

export function Select({ className, label, error, id, options, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-light tracking-wide text-muted">
          {label}
        </label>
      )}
      <select
        id={id}
        className={cn(
          'h-10 rounded-lg border border-border-light bg-surface-3 px-3 text-sm text-white',
          'focus:border-amber/40 focus:outline-none focus:ring-1 focus:ring-amber/20',
          error && 'border-red/40',
          className,
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red">{error}</p>}
    </div>
  )
}
