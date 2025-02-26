import { useEffect, useRef } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import classes from "./ProductImages.module.css";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const API_URL = import.meta.env.VITE_API_URL;

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
  const swiperRef = useRef(null);

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

  // 當 currentIndex 變化時，自動切換 Swiper 到對應的 slide
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(currentIndex);
    }
  }, [currentIndex]);

  return (
    <div className="lg:sticky lg:top-0 lg:pt-10 lg:flex lg:flex-row w-full lg:w-[40rem] lg:h-[43rem]">
      <div className="lg:flex gap-4 hidden">
        <div className="w-16 min-w-16">
          <div className="w-full h-full flex flex-col items-end">
            {allImages.map((image, index) => (
              <div
                key={image}
                className="w-full h-16 mb-2 rounded-md overflow-hidden"
                onMouseEnter={() => handleMouseEnter(image, index)}
              >
                <img
                  src={`${API_URL}/${image}`}
                  alt={product.alt}
                  className="w-full h-full object-cover bg-gray-100"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-full mr-3">
          <div className="relative flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden aspect-[3/4]">
            <img
              src={`${API_URL}/${previewImage}`}
              alt={product.alt}
              className={`w-full object-cover ${
                product.images.noBg &&
                product.images.noBg.includes(previewImage)
                  ? undefined
                  : "h-full"
              }`}
            />

            <div className="absolute flex gap-2 right-5 bottom-5">
              <button
                onClick={handleEnterPreviousImage}
                className="bg-white p-2 rounded-full active:bg-gray-300"
              >
                <GoChevronLeft />
              </button>
              <button
                onClick={handleEnterNextImage}
                className="bg-white p-2 rounded-full active:bg-gray-300"
              >
                <GoChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="block lg:hidden w-full">
        <Swiper
          loop
          pagination={true}
          modules={[Pagination]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className={`mySwiper w-full aspect-[3/4] bg-gray-100 ${classes.swiper}`}
        >
          {allImages.map((image) => (
            <SwiperSlide key={image} className="mb-2 relative">
              <img
                src={`${API_URL}/${image}`}
                alt={product.alt}
                className={`w-full object-cover absolute top-1/2 -translate-y-1/2 ${
                  product.images.noBg && product.images.noBg.includes(image)
                    ? undefined
                    : "h-full"
                }`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
