import { useEffect } from "react";

import leftArrowIcon from "@/assets/left-arrow-icon.png";
import rightArrowIcon from "@/assets/right-arrow-icon.png";

export default function ProductImages({
  product,
  previewImage,
  setPreviewImage,
  currentIndex,
  setCurrentIndex,
}) {
  const allImages = Object.values(product.images).flat();
  useEffect(() => {
    setPreviewImage(allImages[currentIndex]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  function handleEnterNextImage() {
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  }

  function handleEnterPreviousImage() {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  }

  function handleMouseEnter(image, index) {
    setPreviewImage(image);
    setCurrentIndex(index);
  }

  return (
    <div className="flex flex-row w-[40rem] h-[43rem]">
      <div>
        <div className="w-26 h-full flex flex-col items-end mr-4">
          {allImages.map((image, index) => (
            <div
              key={image}
              className="w-[5rem] h-[5rem] mb-2 rounded-md overflow-hidden"
              onMouseEnter={() => handleMouseEnter(image, index)}
            >
              <img
                src={`http://localhost:3000/${image}`}
                alt={product.alt}
                className="w-full h-full object-cover bg-gray-100"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="relative flex justify-center items-center bg-gray-100 rounded-lg mr-8 overflow-hidden">
        <img
          src={`http://localhost:3000/${previewImage}`}
          alt={product.alt}
          className={`w-full object-cover ${
            product.images.noBg && product.images.noBg.includes(previewImage)
              ? undefined
              : "h-full"
          }`}
        />

        <div className="absolute flex gap-2 right-5 bottom-5">
          <button
            onClick={handleEnterPreviousImage}
            className="w-9 bg-white p-2 rounded-full active:bg-gray-300"
          >
            <img src={leftArrowIcon} alt="Left arrow icon" />
          </button>
          <button
            onClick={handleEnterNextImage}
            className="w-9 bg-white p-2 rounded-full active:bg-gray-300"
          >
            <img src={rightArrowIcon} alt="Right arrow icon" />
          </button>
        </div>
      </div>
    </div>
  );
}
