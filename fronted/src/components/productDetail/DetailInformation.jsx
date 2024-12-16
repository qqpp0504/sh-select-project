/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";

import Modal from "../UI/Modal.jsx";
import { modalActions } from "../../store/modal-slice.js";
import { currencyFormatter } from "../../util/formatting.js";
import closeIcon from "../../assets/close-icon.png";

export default function DetailInformation({ product }) {
  const isShowing = useSelector((state) => state.modal.isProductShowing);
  const dispatch = useDispatch();

  function handleCloseDetail() {
    dispatch(modalActions.closeProductModal());
  }

  return (
    <Modal open={isShowing} onClose={handleCloseDetail}>
      <section className="max-w-full w-[44rem] lg:w-[40rem]">
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-wrap">
            <img
              src={`http://localhost:3000/${product.image}`}
              alt={product.alt}
              className="w-[4.5rem] mr-2"
            />
            <div>
              <h1>
                {product.brand} - {product.name}
              </h1>
              <div className="flex gap-2 font-500 flex-wrap">
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
            </div>
          </div>
          <div>
            <button
              onClick={handleCloseDetail}
              className="p-[0.3rem] bg-gray-100 rounded-full hover:bg-gray-300 w-9 h-9"
            >
              <img src={closeIcon} alt="Close icon" className="w-full h-full" />
            </button>
          </div>
        </div>

        <div>
          <div className="mt-6 flex flex-col gap-4">
            <p>{product.summary.productDescription}</p>
            {product.summary.features.map((feature) => (
              <div key={feature.title}>
                <span className="font-500 text-lg inline-block mb-1">
                  {feature.title}
                </span>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <span className="font-500 text-lg inline-block mb-1">
              產品詳細資料
            </span>
            <ul className="marker:text-lg pl-4 list-disc">
              {Object.entries(product.summary.details).map(([key, value]) => (
                <li key={key}>
                  <span>
                    {key}：{value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Modal>
  );
}
