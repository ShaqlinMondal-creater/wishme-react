import type { ButtonHTMLAttributes } from 'react'
import {
  getButtonClasses,
  type ButtonSize,
  type ButtonVariant,
} from '@/shared/components/ui/buttonStyles.ts'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  isLoading?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  className,
  disabled,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={getButtonClasses({ variant, size, fullWidth, className })}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Please wait…' : children}
    </button>
  )
}
