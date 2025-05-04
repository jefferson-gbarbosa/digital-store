import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import Ornament from "./Ornament";

type Image = {
  src: string;
  alt?: string;
};

type GalleryProps = {
  images: Image[];
  interval?: number;
};

const Gallery: React.FC<GalleryProps> = ({ images, interval = 3000 }) => {
  const [current, setCurrent] = useState(0);

  // Autoplay effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, interval);

    return () => clearInterval(timer); 
  }, [images.length, interval]);

  return (
    <div className="flex justify-center bg-[#F5F5F5] h-[875px] ">
        <div className="max-w-7xl h-full mx-auto px-4 pt-40 flex flex-col md:flex-row gap-8 relative">
            <div className="max-w-[510px]">
                <span className="text-[#F6AA1C] font-bold text-base leading-6 tracking-[0.75px]">
                Melhores ofertas personalizadas
                </span>
                <h1 className="text-[#1F1F1F] font-extrabold text-[64px] leading-[66px] tracking-[1px]">
                Queima de stoque Nike 🔥
                </h1>
                <p className="text-[#474747] font-normal text-[18px] leading-[34px] tracking-[0.75px]">
                Consequat culpa exercitation mollit nisi excepteur do do tempor laboris eiusmod irure consectetur.
                </p>
                <Button
                label="Ver Ofertas"
                className="w-28 h-10 bg-[#C92071] text-[#F5F5F5] text-sm leading-5 font-bold rounded-lg p-button-sm cursor-pointer"
                />
            </div>
            <div>
                <div className="w-full max-w-2xl mx-auto overflow-hidden rounded-2xl shadow-lg">
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {images.map((img, index) => (
                    <img
                        key={index}
                        src={img.src}
                        alt={img.alt || `Slide ${index + 1}`}
                        className="w-full flex-shrink-0 object-cover h-64 md:h-96"
                    />
                    ))}
                </div>
                </div>
            </div>
    
            <div className="absolute top-8 -right-30">
                <Ornament />
            </div>
    
            {/* Dots centralizados dentro do max-w-7xl */}
            <div className="w-full mt-4 flex justify-center gap-2 absolute bottom-30 left-1/2 -translate-x-1/2">
                {images.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                    current === index ? "bg-[#C92071]" : "bg-white/50"
                    }`}
                />
                ))}
            </div>
        </div>
  </div>
  
  );
};

export default Gallery;

