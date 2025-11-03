import Breadcrumb from '../../../components/admin/Breadcrumb'
import Gallery from '../../../components/product/Gallery'
import ProductOptions from '../../../components/product/ProductOptions'
import Section from '../../../components/layout/Section'
import BuyBox from '../../../components/product/BuxBox'
import { ProductListing } from '../../../components/product/ProductListing'

const ProductViewPage = () => {
  // Dados simulados
  const product = {
    name: 'Tênis Esportivo',
    reference: 'COD123',
    stars: 4.5,
    rating: 123,
    price: 249.9,
    priceDiscount: 199.9,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
    images: [
      { src: '/home-slide-1.jpeg' },
      { src: '/home-slide-2.jpeg' },
      { src: '/home-slide-3.jpeg' },
      { src: '/home-slide-4.jpeg' },
      { src: '/home-slide-5.jpeg' },
    ],
    sizes: ['39', '40', '41', '42', '43'],
    colors: ['#6FEEFF', '#FF6969', '#5E5E5E', '#6D70B7'],
  }

  const recommended = [
    {
      image: '/tenis.png',
      category: 'Tênis',
      name: 'K-Swiss V8 - Masculino',
      price: 5.99,
      priceDiscount: 4.49,
    },
    {
      image: '/tenis.png',
      name: 'K-Swiss V8 - Masculino',
      category: 'Tênis',
      price: 12.75,
    },
    {
      image: '/tenis.png',
      name: 'K-Swiss V8 - Masculino',
      category: 'Tênis',
      price: 7.5,
      priceDiscount: 6.0,
    },
    {
      image: '/tenis.png',
      name: 'K-Swiss V8 - Masculino',
      category: 'Tênis',
      price: 10.0,
      priceDiscount: 8.5,
    },
  ]
  return (
    <div className="flex justify-center bg-[#F5F5F5] md:pb-0 p-4 flex-col gap-8">
      <div className="mx-auto md:mx-45 w-full max-w-7xl">
        <Breadcrumb />
      </div>
      <div className="flex flex-wrap gap-8 h-full mx-auto md:mx-24 relative">
        <Gallery
          images={product.images}
          showThumbs={true}
          showDots={false}
          width="100%"
          height="auto"
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
            title="Tamanho"
            options={product.sizes}
            type="text"
            shape="square"
          />
          <ProductOptions
            title="Cor"
            options={product.colors}
            type="color"
            shape="circle"
          />
        </BuyBox>
      </div>
      <Section
        title="Produtos recomendados"
        titleAlign="left"
        link={{ text: 'Ver todos', href: '/produtos' }}
        className="pt-4 pb-15"
      >
        <ProductListing
          className="md:grid-cols-4 pt-8 pb-3"
          products={recommended}
        />
      </Section>
    </div>
  )
}

export default ProductViewPage
