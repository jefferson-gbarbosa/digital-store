import React from 'react'
import { Link } from 'react-router-dom'

type Image = {
  src: string
  alt?: string
}

interface LogoProps {
  img?: Image
}

const Logo: React.FC<LogoProps> = ({ img }) => {
  const imageSrc = img?.src || '/default-logo.svg'
  const altText = img?.alt || 'Company Logo'

  return (
    <Link to="/">
      <img
        src={imageSrc}
        alt={altText}
        className="w-[253px] h-[44px]"
        onError={(e) => {
          ;(e.target as HTMLImageElement).src = ''
        }}
      />
    </Link>
  )
}

export default Logo
