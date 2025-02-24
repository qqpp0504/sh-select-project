import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductImages from "./ProductImages.jsx";
import ProductInformation from "./ProductInformation.jsx";
import ProductHeader from "./ProductHeader.jsx";
import CartNotification from "./CartNotification.jsx";
import { cartActions } from "@/store/cart-slice.js";

export default function ProductItem({ product }) {
  const dispatch = useDispatch();
  const { showingNotification } = useSelector((state) => state.cart);
  const [previewImage, setPreviewImage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const allImages = Object.values(product.images).flat();
  useEffect(() => {
    setPreviewImage(allImages[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (showingNotification.isOpen) {
      document.body.style.overflow = "hidden"; // 禁止滾動
    } else {
      document.body.style.overflow = ""; // 恢復滾動
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showingNotification.isOpen]);

  function handleCloseNotification() {
    dispatch(cartActions.closeNotification());
  }

  return (
    <section>
      <div className="lg:padding-large my-5 lg:my-0">
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

      {showingNotification.isOpen && (
        <>
          <CartNotification />
          <div
            onClick={handleCloseNotification}
            className="bg-gray-900 bg-opacity-30 z-30 fixed lg:absolute left-0 top-0 lg:top-[6.7rem] w-full h-screen"
          ></div>
        </>
      )}
    </section>
  );
}
