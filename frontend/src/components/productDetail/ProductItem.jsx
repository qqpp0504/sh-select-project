/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { currencyFormatter } from "../../util/formatting.js";
import Accordion from "../UI/Accordion.jsx";
import DeliveryInformation from "./DeliveryInformation.jsx";
import { modalActions } from "../../store/modal-slice.js";
import CartForm from "./CartForm.jsx";

export default function ProductItem({ product }) {
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState("");

  function handleShowProductDetail() {
    dispatch(modalActions.showProductModal());
  }

  function handleShowSizeDetail() {
    dispatch(modalActions.showSizeModal());
  }

  const allImages = Object.values(product.images).flat();
  useEffect(() => {
    setPreviewImage(allImages[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleMouseEnter(image) {
    setPreviewImage(image);
  }

  function handleSelectColor(colorImage) {
    setPreviewImage(colorImage);
  }

  return (
    <section>
      <div className="padding-large my-12">
        <div className="flex flex-row justify-center px-28">
          <div className="flex flex-row w-[40rem] h-[43rem]">
            <div>
              <div className="w-26 h-full flex flex-col items-end mr-4">
                {allImages.map((image) => (
                  <div
                    key={image}
                    className="w-[5rem] h-[5rem] mb-2 rounded-md overflow-hidden"
                    onMouseEnter={() => handleMouseEnter(image)}
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
            <div className="flex justify-center items-center bg-gray-100 rounded-lg mr-8 overflow-hidden">
              <img
                src={`http://localhost:3000/${previewImage}`}
                alt={product.alt}
                className={`w-full object-cover ${
                  product.images.noBg &&
                  product.images.noBg.includes(previewImage)
                    ? undefined
                    : "h-full"
                }`}
              />
            </div>
          </div>
          <div className="w-[24rem]">
            <div>
              <h1 className="text-xl font-500">
                {product.brand} - {product.name}
              </h1>
              <h2 className="text-gray">{product.categoryCh}</h2>
              <div className="my-2 flex gap-2 font-500">
                <span>NT{currencyFormatter.format(product.originalPrice)}</span>
                {product.originalPrice !== product.discountPrice && (
                  <>
                    <s className="text-gray">
                      NT{currencyFormatter.format(product.discountPrice)}
                    </s>
                    <span className="text-green-700">
                      {product.discountPercentage}% 折扣
                    </span>
                  </>
                )}
              </div>

              <div>
                <CartForm product={product} onSelect={handleSelectColor} />
              </div>

              <div className="mt-14">
                <p>{product.summary.productDescription}</p>
                {product.color.length === 1 && (
                  <ul className="marker:text-lg list-disc pl-4 mt-8">
                    <li>顏色：{product.color[0].name}</li>
                  </ul>
                )}
                <button
                  onClick={handleShowProductDetail}
                  className="mt-8 inline-block font-500 border-b-[1.5px] border-black hover:text-gray-500 hover:border-gray-500"
                >
                  檢視產品詳細資料
                </button>
              </div>

              <div>
                <Accordion
                  tag="尺寸與版型"
                  id="size"
                  fontSize="text-xl"
                  margin="my-3"
                >
                  {product.sizeDetail ? (
                    <ul
                      role="list"
                      className="marker:text-lg pl-8 list-disc space-y-[0.15rem]"
                    >
                      {product.sizeDetail.map((list) => (
                        <li key={list}>{list}</li>
                      ))}
                      <li className="font-500">
                        <button onClick={handleShowSizeDetail}>尺寸指南</button>
                      </li>
                    </ul>
                  ) : (
                    <ul>
                      <li className="font-500">
                        <button onClick={handleShowSizeDetail}>尺寸指南</button>
                      </li>
                    </ul>
                  )}
                </Accordion>

                <Accordion
                  tag="免費寄送及退貨"
                  id="deliveryInformation"
                  fontSize="text-xl"
                  margin="my-3"
                >
                  <DeliveryInformation />
                </Accordion>

                <Accordion
                  tag="評價"
                  id="feedback"
                  fontSize="text-xl"
                  margin="my-3"
                >
                  這裡還很空
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
