import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import Section from '../../components/layout/Section'
import { FilterGroup } from '../../components/shared/FilterGroup'
import { ProductListing } from '../../components/product/ProductListing'

const ProductListingPage = () => {
  const [searchParams] = useSearchParams()
  const searchTerm = searchParams.get('busca') || 'Todos'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [sortOption, setSortOption] = useState('relevance')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialProducts = [
    {
      _id: '1',
      image: '/tenis.png',
      category: 'Tênis',
      name: 'K-Swiss V8 - Masculino',
      price: 5.99,
      priceDiscount: 4.49,
    },
    {
      _id: '2',
      image: '/tenis.png',
      name: 'K-Swiss V8 - Masculino',
      category: 'Tênis',
      price: 12.75,
    },
    {
      _id: '3',
      image: '/tenis.png',
      name: 'K-Swiss V8 - Masculino',
      category: 'Tênis',
      price: 7.5,
      priceDiscount: 6.0,
    },
    {
      _id: '4',
      image: '/tenis.png',
      name: 'K-Swiss V8 - Masculino',
      category: 'Tênis',
      price: 8.25,
    },
    {
      _id: '5',
      image: '/tenis.png',
      name: 'K-Swiss V8 - Masculino',
      category: 'Tênis',
      price: 10.0,
      priceDiscount: 8.5,
    },
    {
      _id: '6',
      image: '/tenis.png',
      name: 'K-Swiss V8 - Masculino',
      category: 'Tênis',
      price: 3.99,
    },
    {
      _id: '7',
      image: '/tenis.png',
      name: 'K-Swiss V8 - Masculino',
      category: 'Tênis',
      price: 2.5,
    },
    {
      _id: '8',
      image: '/tenis.png',
      name: 'K-Swiss V8 - Masculino',
      category: 'Tênis',
      price: 6.3,
      priceDiscount: 5.0,
    },
  ]

  const sortedProducts = useMemo(() => {
    if (sortOption === 'low') {
      return [...initialProducts].sort((a, b) => {
        const priceA = a.priceDiscount ?? a.price
        const priceB = b.priceDiscount ?? b.price
        return priceA - priceB
      })
    }

    if (sortOption === 'high') {
      return [...initialProducts].sort((a, b) => {
        const priceA = a.priceDiscount ?? a.price
        const priceB = b.priceDiscount ?? b.price
        return priceB - priceA
      })
    }

    return initialProducts
  }, [initialProducts, sortOption])

  return (
    <div className="bg-[#f5f5f5] w-full relative pt-5 overflow-x-hidden">
      <Section titleAlign="left">
        {/* Filtros e ordenação */}
        <div className="max-w-7xl mx-auto px-4 mb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-2">
            <div className="flex flex-1 md:w-[332px] flex-row items-center gap-2">
              <select
                className="flex-1 md:w-[340px] md:flex-initial md:absolute top-10 sm:right-5 md:right-6 lg:right-35 h-[60px] border border-gray-300 rounded p-4 text-dark-gray-2"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="relevance">Mais relevantes</option>
                <option value="low">Menor preço</option>
                <option value="high">Maior preço</option>
              </select>

              <button
                className="md:hidden h-[60px] w-[60px] flex items-center justify-center bg-primary text-white rounded"
                onClick={() => setIsSidebarOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 019 17v-3.586L3.293 6.707A1 1 0 013 6V4z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold px-4 mb-4 md:ml-6">
          Resultados para “{searchTerm}”{' '}
          <span className="font-normal">
            – {sortedProducts.length} produtos
          </span>
        </h2>

        {/* Conteúdo principal */}
        <div className="flex gap-8 px-8 py-10 max-w-7xl h-full mx-auto flex-col-reverse md:flex-row relative">
          {/* Filtros desktop */}
          <aside className="hidden md:block w-[308px] flex-shrink-0 space-y-8 rounded-sm">
            <div className="bg-white p-8 flex flex-col gap-2">
              <h2 className="text-dark-gray-2 mb-2 font-bold text-base leading-6 tracking-[0.75px]">
                Filtrar por
              </h2>
              <hr className="border-light-gray-2 mb-4" />
              <FilterGroup
                title="Marca"
                inputType="checkbox"
                options={[
                  { text: 'Adidas' },
                  { text: 'Balenciaga' },
                  { text: 'K-Swiss' },
                  { text: 'Nike' },
                  { text: 'Puma' },
                ]}
              />
              <FilterGroup
                title="Categoria"
                inputType="checkbox"
                options={[
                  { text: 'Esporte e lazer' },
                  { text: 'Casual' },
                  { text: 'Utilitário' },
                  { text: 'Corrida' },
                ]}
              />
              <FilterGroup
                title="Gênero"
                inputType="radio"
                options={[
                  { text: 'Masculino' },
                  { text: 'Feminino' },
                  { text: 'Unissex' },
                ]}
              />
              <FilterGroup
                title="Estado"
                inputType="radio"
                options={[{ text: 'Novo' }, { text: 'Usado' }]}
              />
            </div>
          </aside>

          {/* Sidebar mobile com animação */}
          <aside
            className={`fixed top-14 inset-0 z-50 flex md:hidden ${isSidebarOpen ? '' : 'pointer-events-none'}`}
          >
            {/* Overlay */}
            <div
              className={`absolute inset-0 bg-dark-gray transition-opacity duration-500 ${isSidebarOpen ? 'opacity-50' : 'opacity-0'}`}
              onClick={() => setIsSidebarOpen(false)}
            />

            {/* Painel deslizante */}
            <div
              className={`relative z-50 bg-white w-72 max-w-full h-full p-8 space-y-6 transform transition-transform duration-300 ease-in-out ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              <button
                className="absolute top-12 right-10 text-gray-600"
                onClick={() => setIsSidebarOpen(false)}
                aria-label="Fechar filtro"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <h2 className="text-dark-gray-2 mt-4 mb-2 font-bold text-base leading-6 tracking-[0.75px]">
                Filtrar por
              </h2>
              <hr className="border-light-gray-2 mb-4" />
              <FilterGroup
                title="Marca"
                inputType="checkbox"
                options={[
                  { text: 'Adidas' },
                  { text: 'Balenciaga' },
                  { text: 'K-Swiss' },
                  { text: 'Nike' },
                  { text: 'Puma' },
                ]}
              />
              <FilterGroup
                title="Categoria"
                inputType="checkbox"
                options={[
                  { text: 'Esporte e lazer' },
                  { text: 'Casual' },
                  { text: 'Utilitário' },
                  { text: 'Corrida' },
                ]}
              />
              <FilterGroup
                title="Gênero"
                inputType="radio"
                options={[
                  { text: 'Masculino' },
                  { text: 'Feminino' },
                  { text: 'Unissex' },
                ]}
              />
              <FilterGroup
                title="Estado"
                inputType="radio"
                options={[{ text: 'Novo' }, { text: 'Usado' }]}
              />
            </div>
          </aside>

          {/* Lista de produtos */}
          <div className="flex-1">
            <ProductListing products={sortedProducts} />
          </div>
        </div>
      </Section>
    </div>
  )
}

export default ProductListingPage
