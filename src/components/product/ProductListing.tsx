import React from 'react'
import clsx from 'clsx'
import { ProductCard } from './ProductCard'

type Product = {
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
        <ProductCard key={product.name} {...product} />
      ))}
    </div>
  )
}
