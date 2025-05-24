
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterGroup } from "../components/FilterGroup";
import Section from "../components/Section";
import { ProductListing } from "../components/ProductListing";

const ProductListingPage = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("busca") || "Todos";
  const [products] = useState([
     {
    image: '/tenis.png',
    category: 'Tênis',
    name:"K-Swiss V8 - Masculino",
    price: 5.99,
    priceDiscount: 4.49,
  },
  {
    image: '/tenis.png',
    name:"K-Swiss V8 - Masculino",
    category: 'Tênis',
    price: 12.75,
  },
  {
    image: '/tenis.png',
    name:"K-Swiss V8 - Masculino",
    category: 'Tênis',
    price: 7.5,
    priceDiscount: 6.0,
  },
  {
    image: '/tenis.png',
    name:"K-Swiss V8 - Masculino",
    category: 'Tênis',
    price: 8.25,
  },
  {
    image: '/tenis.png',
    name:"K-Swiss V8 - Masculino",
    category: 'Tênis',
    price: 10.0,
    priceDiscount: 8.5,
  },
  {
    image: '/tenis.png',
    name:"K-Swiss V8 - Masculino",
    category: 'Tênis',
    price: 3.99,
  },
  {
    image: '/tenis.png',
    name:"K-Swiss V8 - Masculino",
    category: 'Tênis',
    price: 2.5,
  },
  {
    image: '/tenis.png',
    name:"K-Swiss V8 - Masculino",
    category: 'Tênis',
    price: 6.3,
    priceDiscount: 5.0,
  },
  ]);

  return (
   <div className="bg-[#f5f5f5] w-full relative pt-10">
      <Section title={`Resultados para “${searchTerm}” – ${products.length} produtos`} titleAlign="left">
        <div className="w-[332px] absolute right-28 top-8 rounded-sm">
          <label className="text-[16px] text-dark-gray-2 block mb-2">Ordenar por</label>
          <select
            className="w-full h-[60px] border border-gray-300 rounded p-4 text-dark-gray-2"
          >
            <option value="low">Menor preço</option>
            <option value="high">Maior preço</option>
          </select>
        </div>
        <div className="flex gap-8 px-8 py-10 max-w-7xl h-full mx-auto md:pt-20 flex-col-reverse md:flex-row relative">
            <aside className="w-[308px] flex-shrink-0 space-y-8 rounded-sm">
              {/* Filtros */}
              <div className="bg-white p-8 flex flex-col gap-2">
                <h2 className=" text-dark-gray-2 mb-2 font-bold text-base leading-6 tracking-[0.75px]">Filtrar por</h2>
                <hr className="border-light-gray-2 mb-4" />

                <FilterGroup
                  title="Marca"
                  inputType="checkbox"
                  options={[
                    { text: "Adidas" },
                    { text: "Balenciaga" },
                    { text: "K-Swiss" },
                    { text: "Nike" },
                    { text: "Puma" },
                  ]}
                />

                <FilterGroup
                  title="Categoria"
                  inputType="checkbox"
                  options={[
                    { text: "Esporte e lazer" },
                    { text: "Casual" },
                    { text: "Utilitário" },
                    { text: "Corrida" },
                  ]}
                />

                <FilterGroup
                  title="Gênero"
                  inputType="radio"
                  options={[
                    { text: "Masculino" },
                    { text: "Feminino" },
                    { text: "Unissex" },
                  ]}
                />

                <FilterGroup
                  title="Estado"
                  inputType="radio"
                  options={[
                    { text: "Novo" },
                    { text: "Usado" },
                  ]}
                />
              </div>
            </aside>
            {/* Lista de produtos */}
            <div className="flex-1">
              <ProductListing products={products} />
            </div>
        </div>
      </Section>
      
   </div>
  );
};

export default ProductListingPage;




