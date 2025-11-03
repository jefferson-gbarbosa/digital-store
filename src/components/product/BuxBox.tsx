import RatingBadge from '../ui/RatingBadge'
import StarRating from '../ui/StarRating'

type BuyBoxProps = {
  name: string
  reference: string
  stars: number
  rating: number
  price: number
  priceDiscount?: number
  description: string
  children?: React.ReactNode
}

export default function BuyBox({
  name,
  reference,
  stars,
  rating,
  price,
  priceDiscount,
  description,
  children,
}: BuyBoxProps) {
  return (
    <div className="flex flex-col gap-4 max-w-[400px]">
      <h1 className="text-dark-gray font-bold text-[32px] leading-[36px] tracking-[1px]">
        {name}
      </h1>
      <span className=" text-dark-gray-3 font-medium text-[12px] leading-[18px] tracking-[0.5px]">
        Casual | Nike |Ref: {reference}
      </span>

      <div className="flex items-center gap-2">
        <span className="text-[14px] px-2 py-1 rounded-[4px] flex items-center">
          <StarRating rating={stars} />
        </span>
        <span>
          <RatingBadge rating={rating} />
        </span>
        <span className="text-[14px] text-light-gray">(avaliações)</span>
      </div>

      <div className="flex items-baseline gap-2">
        <span className=" text-dark-gray-2">
          <small>R$</small>{' '}
          <strong className="text-[32px] leading-[36px] tracking-[1px]">
            {(priceDiscount ?? price).toFixed(2)}
          </strong>
        </span>
        {priceDiscount && (
          <span className="text-[16px] text-light-gray-2 line-through">
            R$ {price.toFixed(2)}
          </span>
        )}
      </div>

      <p className="font-bold text-[14px] leading-[22px] tracking-[0.75px] text-light-gray">
        Descrição do produto
      </p>
      <p className="font-medium text-[14px] leading-[22px] tracking-[0.25px] text-dark-gray-2">
        {description}
      </p>

      {children}

      <button className="bg-warning text-white text-[16px] py-2 rounded-[8px] md:max-w-[220px] h-[48px]">
        Comprar
      </button>
    </div>
  )
}
