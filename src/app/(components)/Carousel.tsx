import React, { useState } from "react";
import Image from "next/image";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToLeft = () => {
    setCurrentIndex((oldIndex) =>
      oldIndex === 0 ? images.length - 1 : oldIndex - 1
    );
  };

  const goToRight = () => {
    setCurrentIndex((oldIndex) =>
      oldIndex === images.length - 1 ? 0 : oldIndex + 1
    );
  };

  return (
    <div className="relative w-full h-[500px] mt-2 mb-8">
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute w-full h-full transition-opacity duration-500 rounded-lg overflow-hidden ${
            currentIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image src={image} alt="" layout="fill" objectFit="cover" />
        </div>
      ))}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full text-black z-20 hover:bg-opacity-70 transition-colors duration-200"
        onClick={goToLeft}
      >
        Previous
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full text-black z-20 hover:bg-opacity-70 transition-colors duration-200"
        onClick={goToRight}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
