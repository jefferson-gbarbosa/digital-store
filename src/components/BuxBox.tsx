import starIcon from "../assets/star-icon.svg"

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
  children
}: BuyBoxProps) {
  return (
    <div className="flex flex-col gap-4 max-w-[400px]">
      <h1 className="text-[32px] text-dark-gray">{name}</h1>
      <span className="text-[12px] text-dark-gray-3">Ref: {reference}</span>

      <div className="flex items-center gap-2">
        <span className="text-[14px] bg-warning text-white px-2 py-1 rounded-[4px] flex items-center gap-1">
          {stars} <img src={starIcon} alt="star" />
        </span>
        <span className="text-[14px] text-light-gray">{rating} avaliações</span>
      </div>

      <div className="flex items-baseline gap-2">
        {priceDiscount && (
          <span className="text-[16px] text-light-gray-2 line-through">
            R$ {price.toFixed(2)}
          </span>
        )}
        <span className="text-[32px] text-dark-gray-2">
          R$ {(priceDiscount ?? price).toFixed(2)}
        </span>
      </div>

      <p className="text-[14px] text-dark-gray-2">{description}</p>

      {children}

      <button className="bg-warning text-white text-[16px] py-2 rounded">
        Comprar
      </button>
    </div>
  )
}
