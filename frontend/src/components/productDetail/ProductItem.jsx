import { useEffect, useState } from "react";

import ProductImages from "./ProductImages.jsx";
import ProductInformation from "./ProductInformation.jsx";

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
      <div className="padding-large my-12">
        <div className="flex flex-row justify-center px-28">
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
