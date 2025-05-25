import React from "react";

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
    viewBox="0 0 24 24"
    width="18"
    height="18"
    className="ml-1"
  >
    <path d="M12 2l2.9 6.95L22 10l-5.5 4.77L18 22l-6-3.6L6 22l1.5-7.23L2 10l7.1-1.05L12 2z" />
  </svg>
);

type RatingBadgeProps = {
  rating: number;
};

const RatingBadge: React.FC<RatingBadgeProps> = ({ rating }) => {
  return (
    <div 
    className="inline-flex items-center px-2 py-1 rounded-md bg-orange-400 text-white font-bold text-sm"
    style={{ backgroundColor: "#FFA500", color: "white" }}
    >
      {rating.toFixed(1)}
      <StarIcon />
    </div>
  );
};

export default RatingBadge;
