import { useEffect, useState } from 'react'
import clsx from 'clsx'

interface BadgeProps {
  value?: string | number
  color?: string
  textColor?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  dot?: boolean
  pulseKey?: number
}

const Badge = ({
  value,
  color = '#EE4266',
  textColor = '#FFFFFF',
  size = 'md',
  className,
  dot = false,
  pulseKey,
}: BadgeProps) => {
  const [animate, setAnimate] = useState(false)

  // ativa animação quando o valor muda ou quando `pulseKey` é alterado
  useEffect(() => {
    if ((value !== undefined && value !== null) || pulseKey) {
      setAnimate(true)
      const timeout = setTimeout(() => setAnimate(false), 350)
      return () => clearTimeout(timeout)
    }
  }, [value, pulseKey])

  const sizeClasses = {
    sm: 'w-[14px] h-[14px] text-[10px] leading-[14px]',
    md: 'w-[18px] h-[18px] text-[12px] leading-[18px]',
    lg: 'w-[22px] h-[22px] text-[14px] leading-[22px]',
  }

  if (dot) {
    return (
      <span
        className={clsx(
          'absolute -top-1.5 -right-2 rounded-full transition-transform duration-300',
          animate && 'scale-125',
          className,
        )}
        style={{
          backgroundColor: color,
          width: '10px',
          height: '10px',
        }}
      />
    )
  }

  return (
    <span
      className={clsx(
        'absolute -top-2 -right-3 rounded-full font-inter font-bold flex items-center justify-center tracking-[0.5px] transition-transform duration-300',
        sizeClasses[size],
        animate && 'scale-125',
        className,
      )}
      style={{
        backgroundColor: color,
        color: textColor,
      }}
    >
      {value}
    </span>
  )
}
export default Badge
