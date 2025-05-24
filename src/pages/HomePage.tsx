import { Button } from "primereact/button";
import Gallery from "../components/Gallery";
import Section from "../components/Section";
import { ProductCard } from "../components/ProductCard";

const images = [
  { src: '/home-slide-1.jpeg' },
  { src: '/home-slide-2.jpeg' },
  { src: '/home-slide-3.jpeg' },
  { src: '/home-slide-4.jpeg' },
];

const products = [
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
];

const HomePage: React.FC = () => {
  return (
   <main className="bg-[#F9F8FE] max-w-full">
      <Gallery images={images} interval={5000} />
      <Section
        title="Coleções em destaque"
        titleAlign="left"
        // link={{ text: "Ver todas", href: "/colecoes" }}
        className="mb-20"
        >
        <div className=" flex flex-col md:flex-row gap-4 pt-6">
          <div className="relative w-[338px] h-[212px] md:w-[405px] md:h-[251px] p-6 flex items-center justify-between max-w-3xl mx-auto">
            <div className="absolute inset-0 bg-[url('/collection-1.png')] bg-cover bg-bottom-right rounded-xl w-full"></div>
            <div className="relative">
              <span className="w-[96px] h-[32px] flex gap-2.5 bg-[#E7FF86] text-[#474747] font-semibold text-sm py-1.5 px-4 rounded-3xl absolute -top-18 left-0">
                30% OFF
              </span>
              <Button label="Comprar" className="w-[153px] h-[48px] px-6 py-2 bg-[#F5F5F5] text-[#C92071] font-bold text-base leading-6 tracking-[0.75px] rounded-lg text-center align-middle  absolute top-18 left-0 shadow hover:bg-pink-50 transition cursor-pointer" />
            </div>
          </div> 
          <div className="relative w-[338px] h-[212px] md:w-[405px] md:h-[251px]  p-6 flex items-center justify-between max-w-3xl mx-auto">
            <div className="absolute inset-0 bg-[url('/collection-2.png')] bg-cover bg-bottom-right rounded-xl  w-full"></div>
            <div className="flex flex-col gap-36 relative">
              <span className="w-[96px] h-[32px]  flex gap-2.5 bg-[#E7FF86] text-[#474747] font-semibold text-sm py-1.5 px-4 rounded-3xl absolute -top-18 left-0">
                30% OFF
              </span>
              <Button label="Comprar" className="w-[153px] h-[48px] px-6 py-2 bg-[#F5F5F5] text-[#C92071] font-bold text-base leading-6 tracking-[0.75px] rounded-lg text-center align-middle  absolute top-18 left-0 shadow hover:bg-pink-50 transition cursor-pointer" />
            </div>
          </div> 
          <div className="relative w-[338px] h-[212px] md:w-[405px] md:h-[251px]  p-6 flex items-center justify-between max-w-3xl mx-auto">
            <div className="absolute inset-0 bg-[url('/collection-3.png')] bg-cover bg-bottom-right rounded-xl  w-full"></div>
            <div className="flex flex-col gap-36 relative">
              <span className="w-[96px] h-[32px] flex gap-2.5 bg-[#E7FF86] text-[#474747] font-semibold text-sm py-1.5 px-4 rounded-3xl absolute -top-18 left-0">
                30% OFF
              </span>
              <Button label="Comprar" className="w-[153px] h-[48px] px-6 py-2 bg-[#F5F5F5] text-[#C92071] font-bold text-base leading-6 tracking-[0.75px] rounded-lg text-center align-middle  absolute top-18 left-0 shadow hover:bg-pink-50 transition cursor-pointer" />
            </div>
          </div> 
        </div>
      </Section>
      <Section
        title="Coleções em destaque"
        titleAlign="center"
        >
       <div className="flex justify-center pt-12 ">
          <div className="flex justify-between w-[712px] h-[138px] mb-20">
              <div className="flex flex-col items-center gap-3 w-[104px] h-[138px] ">
                <div className="flex justify-center items-center w-[104px] h-[104px] rounded-[150px] bg-[#FFFFFF] shadow-[0px_4px_25px_rgba(0,0,0,0.05)]">
                  <img src='/tshirt.png' alt="Camiseta" />
                </div>
                <p className="font-bold text-[14px] leading-[22px] text-center tracking-[0.75px] text-[#474747]">Camisetas</p>
              </div>
              <div className="flex flex-col items-center gap-3 w-[104px] h-[138px] ">
                <div className="flex justify-center items-center w-[104px] h-[104px] rounded-[150px] bg-[#FFFFFF] shadow-[0px_4px_25px_rgba(0,0,0,0.05)]">
                  <img src='/pants.png' alt="Calças" />
                </div>
                <p className="font-bold text-[14px] leading-[22px] text-center tracking-[0.75px] text-[#474747]">Calças</p>
              </div>
              <div className="flex flex-col items-center gap-3 w-[104px] h-[138px] ">
                <div className="flex justify-center items-center w-[104px] h-[104px] rounded-[150px] bg-[#FFFFFF] shadow-[0px_4px_25px_rgba(0,0,0,0.05)]">
                  <img src='/headphones.png' alt="Headphones" />
                </div>
                <p className="font-bold text-[14px] leading-[22px] text-center tracking-[0.75px] text-[#474747]">Headphones</p>
              </div>
              <div className="flex flex-col items-center gap-3 w-[104px] h-[138px] ">
                <div className="flex justify-center items-center w-[104px] h-[104px] rounded-[150px] bg-[#FFFFFF] shadow-[0px_4px_25px_rgba(0,0,0,0.05)]">
                  <img src='/sneakers.png' alt="Tênis" />
                </div>
                <p className="font-bold text-[14px] leading-[22px] text-center tracking-[0.75px] text-[#474747]">Tênis</p>
              </div>
          </div>
       </div>
      </Section>
      <Section
        title="Produtos em alta"
        titleAlign="left"
        link={{ text: "Ver todas", href: "/colecoes" }} 
        className="mb-20"
        >
        <div className="w-full pt-6 px-4"> 
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                image={product.image}
                name={product.name}
                category ={product.category}
                price={product.price}
                priceDiscount={product.priceDiscount}
              />
            ))}
          </div>
        </div>
      </Section>
      <Section className=" bg-white max-w-full mb-40">
        <div className="max-w-7xl w-full mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-10 pt-10 items-center">
            {/* Imagem com fundo decorativo */}
            <div className="relative w-full max-w-md md:max-w-[573px] flex-shrink-0">
              <div
                className="w-64 h-64 md:w-[400px] md:h-[400px] rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(66, 0, 255, 0.25) -40.67%, rgba(255, 255, 255, 0) 100%)",
                }}
              ></div>
              <img
                src="/tenis-1.png"
                alt="Air Jordan"
                className="w-full h-auto md:w-[573px] md:h-[330px] absolute top-10 -left-10 md:-left-24"
              />
            </div>

            {/* Texto e botão */}
            <div className="w-full max-w-xl text-center md:text-left">
              <span className="text-primary font-bold text-sm md:text-base leading-6 tracking-[0.75px] block mb-3 md:mb-5">
                Oferta especial
              </span>
              <h1 className="text-[#1F1F1F] font-extrabold text-3xl sm:text-4xl md:text-[64px] leading-tight tracking-[1px] mb-4 md:mb-6">
                Air Jordan edição de colecionador
              </h1>
              <p className="text-dark-gray-2 font-normal text-sm md:text-base leading-6 md:leading-7 tracking-[0.75px] mb-6 md:mb-10">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
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
};

export default HomePage;













