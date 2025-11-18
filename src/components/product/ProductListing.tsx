import React from 'react'
import clsx from 'clsx'
import { ProductCard } from './ProductCard'
import { useNavigate } from 'react-router-dom'

type Product = {
  _id: string
  image: string
  name: string
  category: string
  price: number
  priceDiscount?: number
}

type ProductListingProps = {
  products: Product[]
  className?: string
}

export const ProductListing: React.FC<ProductListingProps> = ({
  products,
  className,
}) => {
  const navigate = useNavigate()

  if (products.length === 0) {
    return (
      <div className="text-center text-dark-gray-2 text-lg py-10">
        Nenhum produto encontrado com os filtros selecionados.
      </div>
    )
  }

  return (
    <div
      className={clsx(
        'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8',
        className,
      )}
    >
      {products.map((product) => (
        <ProductCard
          key={product._id}
          {...product}
          onClick={() => navigate(`/collection/${product._id}`)}
        />
      ))}
    </div>
  )
}
