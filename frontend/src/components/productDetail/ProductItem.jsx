import { useEffect, useState } from "react";

import ProductImages from "./ProductImages.jsx";
import ProductInformation from "./ProductInformation.jsx";
import ProductHeader from "./ProductHeader.jsx";

export default function ProductItem({ product }) {
  const [previewImage, setPreviewImage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const allImages = Object.values(product.images).flat();
  useEffect(() => {
    setPreviewImage(allImages[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <div className="lg:padding-large my-5 lg:my-12">
        <div className="block padding-small lg:hidden pb-3">
          <ProductHeader product={product} />
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-center lg:px-28">
          <ProductImages
            product={product}
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
          <ProductInformation
            product={product}
            setPreviewImage={setPreviewImage}
            setCurrentIndex={setCurrentIndex}
          />
        </div>
      </div>
    </section>
  );
}
