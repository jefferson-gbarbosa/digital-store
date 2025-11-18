import Section from '../../components/layout/Section'
import Ornament from '../../components/layout/Ornament'
import Gallery from '../../components/product/Gallery'
import { ProductCard } from '../../components/product/ProductCard'
import { Button } from '../../components/ui/Button'

const images = [
  { src: '/home-slide-1.jpeg' },
  { src: '/home-slide-2.jpeg' },
  { src: '/home-slide-3.jpeg' },
  { src: '/home-slide-4.jpeg' },
]

const products = [
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

const HomePage = () => {
  return (
    <main className="bg-[#F9F8FE] max-w-full">
      <Section className="xl:max-w-none">
        <div className="flex justify-center bg-[#F5F5F5] overflow-x-hidden overflow-y-hidden mb-10 py-10 sm:py-20 md:min-h-[775px] md:pb-0">
          <div className="h-full mx-auto pt-10 flex flex-col-reverse md:flex-row gap-8 relative">
            <div className="max-w-[510px] text-center md:text-start">
              <span className="text-[#F6AA1C] font-bold text-base leading-6 tracking-[0.75px] block mb-5">
                Melhores ofertas personalizadas
              </span>
              <h1 className="text-[#1F1F1F] font-extrabold text-4xl leading-tight sm:text-5xl md:text-[64px] md:leading-[66px] tracking-[1px] mb-6">
                Queima de estoque Nike 🔥
              </h1>
              <p className="text-[#474747] font-normal text-[18px] leading-[34px] tracking-[0.75px] mb-10">
                Consequat culpa exercitation mollit nisi excepteur do do tempor
                laboris eiusmod irure consectetur.
              </p>
              <Button
                label="Ver Ofertas"
                className="w-56 h-12 bg-[#C92071] text-[#F5F5F5] font-bold text-[16px] leading-[24px] tracking-[0.75px] rounded-lg cursor-pointer"
              />
            </div>
            <div className="absolute -top-9 -right-10 z-0">
              <Ornament />
            </div>
            <Gallery images={images} interval={5000} />
          </div>
        </div>
      </Section>
      <Section
        title="Coleções em destaque"
        titleAlign="left"
        // link={{ text: "Ver todas", href: "/colecoes" }}
        className="mb-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          {/* Collection 1 */}
          <div className="relative w-full aspect-[405/251] p-6 flex flex-col justify-between">
            <div className="absolute inset-0 bg-[url('/collection-1.png')] bg-cover bg-center rounded-xl"></div>
            <div className="relative z-10">
              <span className="w-fit h-[32px] flex gap-2.5 bg-[#E7FF86] text-[#474747] font-semibold text-sm py-1.5 px-4 rounded-3xl">
                30% OFF
              </span>
            </div>
            <div className="relative z-10">
              <Button
                label="Comprar"
                className="w-[153px] h-[48px] px-6 py-2 bg-[#F5F5F5] text-[#C92071] font-bold text-base leading-6 tracking-[0.75px] rounded-lg shadow hover:bg-pink-50 transition cursor-pointer"
              />
            </div>
          </div>
          {/* Collection 2 */}
          <div className="relative w-full aspect-[405/251] p-6 flex flex-col justify-between">
            <div className="absolute inset-0 bg-[url('/collection-2.png')] bg-cover bg-center rounded-xl"></div>
            <div className="relative z-10">
              <span className="w-fit h-[32px] flex gap-2.5 bg-[#E7FF86] text-[#474747] font-semibold text-sm py-1.5 px-4 rounded-3xl">
                30% OFF
              </span>
            </div>
            <div className="relative z-10">
              <Button
                label="Comprar"
                className="w-[153px] h-[48px] px-6 py-2 bg-[#F5F5F5] text-[#C92071] font-bold text-base leading-6 tracking-[0.75px] rounded-lg shadow hover:bg-pink-50 transition cursor-pointer"
              />
            </div>
          </div>
          {/* Collection 3 */}
          <div className="relative w-full aspect-[405/251] p-6 flex flex-col justify-between">
            <div className="absolute inset-0 bg-[url('/collection-3.png')] bg-cover bg-center rounded-xl"></div>
            <div className="relative z-10">
              <span className="w-fit h-[32px] flex gap-2.5 bg-[#E7FF86] text-[#474747] font-semibold text-sm py-1.5 px-4 rounded-3xl">
                30% OFF
              </span>
            </div>
            <div className="relative z-10">
              <Button
                label="Comprar"
                className="w-[153px] h-[48px] px-6 py-2 bg-[#F5F5F5] text-[#C92071] font-bold text-base leading-6 tracking-[0.75px] rounded-lg shadow hover:bg-pink-50 transition cursor-pointer"
              />
            </div>
          </div>
        </div>
      </Section>
      <Section title="Coleções em destaque" titleAlign="center">
        <div className="pt-12 mb-20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8 justify-items-center">
            <div className="flex flex-col items-center gap-3">
              <div className="flex justify-center items-center w-24 h-24 sm:w-[104px] sm:h-[104px] rounded-full bg-[#FFFFFF] shadow-[0px_4px_25px_rgba(0,0,0,0.05)]">
                <img src="/tshirt.png" alt="Camiseta" />
              </div>
              <p className="font-bold text-[14px] leading-[22px] text-center tracking-[0.75px] text-[#474747]">
                Camisetas
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="flex justify-center items-center w-24 h-24 sm:w-[104px] sm:h-[104px] rounded-full bg-[#FFFFFF] shadow-[0px_4px_25px_rgba(0,0,0,0.05)]">
                <img src="/pants.png" alt="Calças" />
              </div>
              <p className="font-bold text-[14px] leading-[22px] text-center tracking-[0.75px] text-[#474747]">
                Calças
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="flex justify-center items-center w-24 h-24 sm:w-[104px] sm:h-[104px] rounded-full bg-[#FFFFFF] shadow-[0px_4px_25px_rgba(0,0,0,0.05)]">
                <img src="/headphones.png" alt="Headphones" />
              </div>
              <p className="font-bold text-[14px] leading-[22px] text-center tracking-[0.75px] text-[#474747]">
                Headphones
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="flex justify-center items-center w-24 h-24 sm:w-[104px] sm:h-[104px] rounded-full bg-[#FFFFFF] shadow-[0px_4px_25px_rgba(0,0,0,0.05)]">
                <img src="/sneakers.png" alt="Tênis" />
              </div>
              <p className="font-bold text-[14px] leading-[22px] text-center tracking-[0.75px] text-[#474747]">
                Tênis
              </p>
            </div>
          </div>
        </div>
      </Section>
      <Section
        title="Produtos em alta"
        titleAlign="left"
        link={{ text: 'Ver todas', href: '/collection' }}
        className="mb-20"
      >
        <div className="w-full pt-6 px-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                _id={product._id}
                image={product.image}
                name={product.name}
                category={product.category}
                price={product.price}
                priceDiscount={product.priceDiscount}
              />
            ))}
          </div>
        </div>
      </Section>
      <Section className=" bg-white max-w-full mb-40">
        <div className="max-w-7xl w-full mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-10 pt-10 items-center overflow-hidden">
            {/* Imagem com fundo decorativo */}
            <div className="relative w-full max-w-md md:max-w-[573px] flex-shrink-0 h-[350px] md:h-[500px]">
              <div
                className="w-full h-full max-w-[400px] max-h-[400px] mx-auto rounded-full flex items-center justify-center"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(66, 0, 255, 0.25) -40.67%, rgba(255, 255, 255, 0) 100%)',
                }}
              >
                <img
                  src="/tenis-1.png"
                  alt="Air Jordan"
                  className="w-full h-auto max-w-[573px] transform -rotate-[30deg] group-hover:rotate-0 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Texto e botão */}
            <div className="w-full max-w-xl text-center md:text-left z-10">
              <span className="text-primary font-bold text-sm md:text-base leading-6 tracking-[0.75px] block mb-3 md:mb-5">
                Oferta especial
              </span>
              <h1 className="text-[#1F1F1F] font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[64px] leading-tight tracking-[1px] mb-4 md:mb-6">
                Air Jordan edição de colecionador
              </h1>
              <p className="text-dark-gray-2 font-normal text-sm md:text-base leading-6 md:leading-7 tracking-[0.75px] mb-6 md:mb-10">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip.
              </p>
              <Button
                label="Ver Ofertas"
                className="w-full sm:w-56 h-12 bg-[#C92071] text-[#F5F5F5] font-bold text-[16px] leading-[24px] tracking-[0.75px] rounded-lg"
              />
            </div>
          </div>
        </div>
      </Section>
    </main>
  )
}

export default HomePage
