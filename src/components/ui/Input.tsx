import { useId, type InputHTMLAttributes } from 'react'
import { cn } from '@/utils/cn.ts'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  hint?: string
  error?: string
}

export function Input({
  label,
  hint,
  error,
  className,
  id,
  ...props
}: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <label className="flex w-full flex-col gap-2 text-left" htmlFor={inputId}>
      {label ? (
        <span className="text-sm font-medium tracking-wide text-navy">{label}</span>
      ) : null}
      <input
        id={inputId}
        className={cn(
          'h-12 rounded-2xl border bg-white px-4 text-navy outline-none transition-shadow duration-200 placeholder:text-navy-muted/70',
          error
            ? 'border-red-300 focus:shadow-[0_0_0_4px_rgba(248,113,113,0.15)]'
            : 'border-line focus:border-gold focus:shadow-[0_0_0_4px_rgba(196,163,90,0.18)]',
          className,
        )}
        {...props}
      />
      {error ? <span className="text-sm text-red-600">{error}</span> : null}
      {!error && hint ? <span className="text-sm text-navy-muted">{hint}</span> : null}
    </label>
  )
}
