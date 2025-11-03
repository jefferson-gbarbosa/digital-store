import { ComponentProps } from 'react'

interface InputRootProps extends ComponentProps<'div'> {
  label: string
  id: string
  error?: string
  children: React.ReactNode
}

export function InputRoot({ label, id, error, children }: InputRootProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-dark-gray-2 mb-1"
      >
        {label}
      </label>
      {children}
      {error && <p className="text-error text-sm mt-1">{error}</p>}
    </div>
  )
}

interface InputLabelProps extends ComponentProps<'label'> {
  label: string
  htmlFor: string
}

export function InputLabel({ label, htmlFor, ...props }: InputLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-dark-gray-2 mb-1"
      {...props}
    >
      {label}
    </label>
  )
}

interface InputFieldProps extends ComponentProps<'input'> {
  error?: boolean
}

export function InputField({ error = false, ...props }: InputFieldProps) {
  return (
    <input
      className={`w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-primary 
        ${error ? 'border-error' : 'border-light-gray-2'}`}
      {...props}
    />
  )
}
