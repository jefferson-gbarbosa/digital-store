import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RatingBadge from '../ui/RatingBadge'
import StarRating from '../ui/StarRating'
import { useCartStore } from '../../stores/cartStore'
import { Product, useProductStore } from '../../stores/productStore'

type BuyBoxProps = {
  product?: Partial<Product>
  name: string
  reference: string
  stars: number
  rating: number
  price: number
  priceDiscount?: number
  description: string
  children?: React.ReactNode
  onAddToCart?: () => void
}

export default function BuyBox({
  product,
  name,
  reference,
  stars,
  rating,
  price,
  priceDiscount,
  description,
  children,
  onAddToCart,
}: BuyBoxProps) {
  const navigate = useNavigate()
  const addItem = useCartStore((s) => s.addItem)
  const setSelectedProduct = useProductStore((s) => s.setSelectedProduct)
  const [quantity, setQuantity] = useState<number>(1)
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart()
      return
    }

    const idStr =
      product && product._id ? product._id : String(reference ?? Date.now())

    const resolvedPrice = priceDiscount ?? price

    const item = {
      id: idStr,
      name,
      price: resolvedPrice,
      quantity,
    }

    addItem(item)

    // feedback visual
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)

    if (product && '_id' in product) {
      const mapped: Product = {
        _id: idStr,
        title: name,
        description: description ?? '',
        price: { value: resolvedPrice, currency: 'BRL' },
        sizes: [],
        images: [],
        category: '',
        type: '',
      }

      setSelectedProduct(mapped)
    }
  }

  const handleBuyNow = () => {
    handleAddToCart()
    navigate('/cart')
  }

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
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-9 h-9 flex items-center justify-center border border-light-gray-2 rounded-md text-dark-gray hover:bg-gray-50"
            aria-label="Diminuir quantidade"
          >
            -
          </button>

          <div className="w-12 text-center font-medium">{quantity}</div>

          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-9 h-9 flex items-center justify-center border border-light-gray-2 rounded-md text-dark-gray hover:bg-gray-50"
            aria-label="Aumentar quantidade"
          >
            +
          </button>
        </div>

        <div className="flex-1">
          <button
            onClick={handleAddToCart}
            className="w-full bg-primary text-white text-[16px] py-2 rounded-[8px] md:max-w-[220px] h-[48px] cursor-pointer"
          >
            Adicionar ao carrinho
          </button>

          {added && (
            <div className="mt-2 text-sm text-success">
              Adicionado ao carrinho
            </div>
          )}
        </div>

        <button
          onClick={handleBuyNow}
          className="bg-warning text-white text-[16px] py-2 rounded-[8px] md:max-w-[220px] h-[48px] cursor-pointer"
        >
          Comprar
        </button>
      </div>
    </div>
  )
}
