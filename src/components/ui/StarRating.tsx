import React from 'react'

const StarFilled = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#FFA500"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path d="M12 2l2.9 6.95L22 10l-5.5 4.77L18 22l-6-3.6L6 22l1.5-7.23L2 10l7.1-1.05L12 2z" />
  </svg>
)

const StarOutline = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="#FFA500"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path d="M12 2l2.9 6.95L22 10l-5.5 4.77L18 22l-6-3.6L6 22l1.5-7.23L2 10l7.1-1.05L12 2z" />
  </svg>
)

type StarRatingProps = {
  rating: number // ex: 4.7 ou 3.2, etc.
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating)
  const emptyStars = 5 - fullStars

  return (
    <div className="flex space-x-1">
      {[...Array(fullStars)].map((_, i) => (
        <StarFilled key={`full-${i}`} />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <StarOutline key={`empty-${i}`} />
      ))}
    </div>
  )
}

export default StarRating
