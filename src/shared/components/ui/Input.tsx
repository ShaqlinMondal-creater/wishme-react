import { useId, useState, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/shared/lib/cn.ts'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  hint?: string
  error?: string
  inputSize?: 'sm' | 'md'
}

function EyeIcon({ crossed }: { crossed: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.6" />
      {crossed ? (
        <path d="M4 20 20 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      ) : null}
    </svg>
  )
}

export function Input({
  label,
  hint,
  error,
  className,
  id,
  inputSize = 'md',
  type,
  ...props
}: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (isPasswordVisible ? 'text' : 'password') : type

  let field: ReactNode = (
    <input
      id={inputId}
      type={inputType}
      className={cn(
        'w-full rounded-2xl border bg-ivory px-4 text-base text-navy outline-none transition-shadow duration-200 placeholder:text-navy-muted/70',
        inputSize === 'sm' ? 'h-11 sm:h-10 sm:text-sm' : 'h-12',
        isPassword && 'pr-11',
        error
          ? 'border-red-300 focus:shadow-[0_0_0_4px_rgba(248,113,113,0.15)]'
          : 'border-line focus:border-gold focus:shadow-[0_0_0_4px_rgba(196,163,90,0.18)]',
        className,
      )}
      {...props}
    />
  )

  if (isPassword) {
    field = (
      <div className="relative">
        {field}
        <button
          type="button"
          className="absolute top-1/2 right-3 -translate-y-1/2 text-navy-muted hover:text-navy"
          aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
          onClick={() => setIsPasswordVisible((visible) => !visible)}
        >
          <EyeIcon crossed={isPasswordVisible} />
        </button>
      </div>
    )
  }

  return (
    <div className={cn('flex w-full flex-col text-left', inputSize === 'sm' ? 'gap-1.5' : 'gap-2')}>
      {label ? (
        <label
          htmlFor={inputId}
          className={cn(
            'font-medium tracking-wide text-navy',
            inputSize === 'sm' ? 'text-xs' : 'text-sm',
          )}
        >
          {label}
        </label>
      ) : null}
      {field}
      {error ? <span className="text-sm text-red-600">{error}</span> : null}
      {!error && hint ? <span className="text-sm text-navy-muted">{hint}</span> : null}
    </div>
  )
}
