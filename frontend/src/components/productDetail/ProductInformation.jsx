import { useDispatch } from "react-redux";

import CartForm from "./CartForm.jsx";
import { modalActions } from "@/store/modal-slice.js";
import Accordion from "../UI/Accordion.jsx";
import DeliveryInformation from "./DeliveryInformation";
import ProductHeader from "./ProductHeader.jsx";

export default function ProductInformation({
  product,
  setPreviewImage,
  setCurrentIndex,
}) {
  const dispatch = useDispatch();

  function handleSelectColor(colorImage, index) {
    setPreviewImage(colorImage);
    setCurrentIndex(index);
  }

  function handleShowProductDetail() {
    dispatch(modalActions.showModal({ modalType: "productModal" }));
  }

  function handleShowSizeDetail() {
    dispatch(modalActions.showModal({ modalType: "sizeModal" }));
  }

  return (
    <div className="padding-small w-full lg:w-[27rem] lg:min-w-[27rem] lg:pt-10">
      <div className="hidden lg:block">
        <ProductHeader product={product} />
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
          topHr={false}
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
          topHr={false}
        >
          <DeliveryInformation />
        </Accordion>

        <Accordion
          tag="評價"
          id="feedback"
          fontSize="text-xl"
          margin="my-3"
          topHr={false}
        >
          這裡還很空
        </Accordion>
      </div>
    </div>
  );
}
