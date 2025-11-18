import { ComponentProps } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ComponentProps<'button'> {
  label?: string
  isLoading?: boolean
  icon?: React.ReactNode
}

export const Button = ({
  type = 'button',
  label,
  className,
  disabled,
  isLoading = false,
  icon,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={clsx(
        'flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-colors duration-200 cursor-pointer',
        'bg-primary text-white hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          <span>Carregando...</span>
        </span>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {label || children}
        </>
      )}
    </button>
  )
}
