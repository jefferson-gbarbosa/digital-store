import React from "react";

type ProductCardProps = {
  image: string;
  name: string;
  category: string;
  price: number;
  priceDiscount?: number;
};

export const ProductCard: React.FC<ProductCardProps> = ({
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
    <div className="rounded-xl  w-[292px]">
      <div className="relative h-[321px] rounded-[4px] bg-white flex items-center justify-center shadow hover:shadow-md transition">
        {hasDiscount && (
          <span className="absolute top-4 left-2 bg-[#E7FF86] font-bold text-sm leading-[22px] tracking-[0.75px] pt-[5px] pr-[15px] pb-[5px] pl-[15px] rounded-full">
            {discountPercentage}% OFF
          </span>
        )}
        <img
          src={image}
          alt={name}
          className="w-full h-[134px] object-contain -rotate-[30deg]"
        />
      </div>

      <div className="mt-4">
        <p className="font-bold text-xs leading-6 text-light-gray tracking-[0.75px]">{category}</p>
        <h2 className="font-normal text-2xl leading-custom leading-[38px] text-light-gray-2">{name}</h2>

        <div className="flex items-center gap-2 mt-1">
          {hasDiscount ? (
            <>
              <span className="text-light-gray line-through font-normal text-2xl leading-[38px] tracking-[0.75px]">
                R$ {price.toFixed(2)}
              </span>
              <span className="text-black font-bold text-2xl leading-[38px] tracking-[0.75px]">
                R$ {priceDiscount!.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-dark-gray font-bold text-2xl leading-[38px] tracking-[0.75px]">
              R$ {price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
