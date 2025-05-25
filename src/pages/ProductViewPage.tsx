// import { useParams } from "react-router-dom"
import Gallery from "../components/Gallery"
import ProductOptions from "../components/ProductOptions"
import Section from "../components/Section"
import BuyBox from "../components/BuxBox"
import { ProductListing } from "../components/ProductListing"

const ProductViewPage = () => {
//   const { id } = useParams()
  // Dados simulados
  const product = {
    name: "Tênis Esportivo",    
    reference: "COD123",
    stars: 4.5,
    rating: 123,
    price: 249.9,
    priceDiscount: 199.9,
    description: "Um tênis ideal para corridas leves e uso casual.",
    images: [
      { src: '/home-slide-1.jpeg' },
      { src: '/home-slide-2.jpeg' },
      { src: '/home-slide-3.jpeg' },
      { src: '/home-slide-4.jpeg' },
    ],
    sizes: ["39", "40", "41"],
    colors: ["#000000", "#FFFFFF", "#FF5733"]
  }

 const recommended = [
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
];
  return (
    <div 
     className="flex justify-center bg-[#F5F5F5] mb-10 py-20 md:pb-0 p-8 flex-col gap-16">   
      <div className="flex flex-wrap gap-8 h-full mx-auto md:mx-24 relative">
        <Gallery
          images={product.images}
          showThumbs={true}
          width="700px"
          height="570px"
          radius="4px"
        />
        <BuyBox
          name={product.name}
          reference={product.reference}
          stars={product.stars}
          rating={product.rating}
          price={product.price}
          priceDiscount={product.priceDiscount}
          description={product.description}
        >
          <ProductOptions
            options={product.sizes}
            type="text"
            shape="square"
            radius="8px"
          />
          <ProductOptions
            options={product.colors}
            type="color"
            shape="circle"
            radius="8px"
          />
        </BuyBox>
      </div>

      <Section
        title="Produtos recomendados"
        titleAlign="left"
        link={{ text: "Ver todos", href: "/produtos" }}
      >
        <ProductListing products={recommended} />
      </Section>
    </div>
  )
}

export default ProductViewPage
