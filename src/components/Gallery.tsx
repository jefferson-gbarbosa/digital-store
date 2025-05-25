import React, { useEffect, useState } from "react";

type Image = {
  src: string;
  alt?: string;
};

type GalleryProps = {
  images: Image[];
  interval?: number;
  showThumbs?: boolean;
  width?: string;  // ex: "700px"
  height?: string; // ex: "570px"
  radius?: string; // ex: "4px"
};

const Gallery: React.FC<GalleryProps> = ({
  images,
  interval = 3000,
  showThumbs,
  width = "700px",
  height = "570px",
  radius = "8px",
}) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative" style={{ width }}>
      <div
        className="overflow-hidden shadow-lg mx-auto"
        style={{
          width: "100%",
          height,
          borderRadius: radius,
        }}
      >
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img.src}
              alt={img.alt || `Slide ${index + 1}`}
              className="w-full flex-shrink-0 object-cover"
              style={{ height }}
            />
          ))}
        </div>
      </div>

      {/* ✅ Dots fixos, fora do carrossel */}
      <div className="w-full mt-4 flex justify-center gap-2">
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

      {/* ✅ Thumbnails */}
      {showThumbs && (
        <div className="flex justify-center mt-6 gap-4">
          {images.map((img, index) => (
            <img
              key={index}
              src={img.src}
              alt={img.alt}
              onClick={() => setCurrent(index)}
              className={`w-[117px] h-[95px] object-cover rounded-lg cursor-pointer transition-all border-2 ${
                current === index ? "border-[#C92071]" : "border-transparent"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
