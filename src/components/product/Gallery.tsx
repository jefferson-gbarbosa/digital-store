import React, { useEffect, useState } from 'react'

type Image = {
  src: string
  alt?: string
}

type GalleryProps = {
  images: Image[]
  interval?: number
  showThumbs?: boolean
  showDots?: boolean
  width?: string // ex: "700px"
  height?: string // ex: "570px"
  radius?: string // ex: "8px"
  backgroundColor?: string
}

const Gallery: React.FC<GalleryProps> = ({
  images,
  interval = 3000,
  showThumbs,
  showDots = true,
  width = '95%',
  height = 'auto',
  radius = '8px',
}) => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }, interval)
    return () => clearInterval(timer)
  }, [images.length, interval])

  return (
    <div className="w-full max-w-[700px] mx-auto" style={{ width }}>
      {/* Carrossel principal */}
      <div
        className="relative overflow-hidden shadow-lg rounded-lg"
        style={{ borderRadius: radius }}
      >
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img.src}
              alt={img.alt || `Slide ${index + 1}`}
              className="w-full flex-shrink-0 object-cover aspect-[4/3] sm:aspect-[7/5]"
              style={{ borderRadius: radius, height }}
            />
          ))}
        </div>
      </div>

      {/* Dots */}
      {showDots && (
        <div className="w-full mt-4 flex justify-center gap-2 absolute top-190 right-1 md:top-150 md:right-18">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                current === index ? 'bg-[#C92071]' : 'bg-[#CCCCCC]'
              }`}
            />
          ))}
        </div>
      )}

      {/* Thumbnails */}
      {showThumbs && (
        <div className="flex flex-wrap justify-center mt-6 gap-4">
          {images.map((img, index) => (
            <img
              key={index}
              src={img.src}
              alt={img.alt}
              onClick={() => setCurrent(index)}
              className={`w-[90px] sm:w-[117px] h-[72px] sm:h-[95px] object-cover rounded-lg cursor-pointer transition-all border-2 ${
                current === index ? 'border-[#C92071]' : 'border-transparent'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Gallery
