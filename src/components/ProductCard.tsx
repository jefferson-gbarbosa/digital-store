import React from "react";

type ProductCardProps = {
  image: string;
  name: string;
  category: string;
  price: number;
  priceDiscount?: number;
};

export  const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  category,
  price,
  priceDiscount,
}) => {
  const hasDiscount = typeof priceDiscount === "number";
  const discountPercentage = hasDiscount
    ? Math.round(((price - priceDiscount!) / price) * 100)
    : 0;

  return (
    <div className="w-full max-w-[163px] sm:max-w-[200px] md:max-w-[292px] rounded-xl">
      <div className="relative w-full aspect-[3/4] bg-white flex items-center justify-center rounded-[4px] shadow hover:shadow-md transition">
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-[#E7FF86] font-bold text-xs sm:text-sm leading-[22px] tracking-[0.75px] py-1 px-3 rounded-full">
            {discountPercentage}% OFF
          </span>
        )}
        <img
          src={image}
          alt={name}
          className="w-[90%] h-auto max-h-[134px] object-contain -rotate-[30deg] transition-transform duration-300"
        />
      </div>

      <div className="mt-3 sm:mt-4">
        <p className="font-bold text-[10px] sm:text-xs text-light-gray tracking-[0.75px] leading-5">
          {category}
        </p>
        <h2 className="font-normal text-sm sm:text-lg md:text-2xl text-light-gray-2 leading-snug">
          {name}
        </h2>

        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {hasDiscount ? (
            <>
              <span className="text-light-gray line-through font-normal text-sm sm:text-base md:text-2xl tracking-[0.75px]">
                R$ {price.toFixed(2)}
              </span>
              <span className="text-black font-bold text-sm sm:text-base md:text-2xl tracking-[0.75px]">
                R$ {priceDiscount!.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-dark-gray font-bold text-sm sm:text-base md:text-2xl tracking-[0.75px]">
              R$ {price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
