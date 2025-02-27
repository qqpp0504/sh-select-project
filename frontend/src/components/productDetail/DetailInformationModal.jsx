import { useSelector, useDispatch } from "react-redux";
import { IoCloseOutline } from "react-icons/io5";

import Modal from "../UI/Modal.jsx";
import { modalActions } from "@/store/modal-slice.js";
import { currencyFormatter } from "@/util/formatting.js";

const API_URL = import.meta.env.VITE_API_URL;

export default function DetailInformationModal({ product }) {
  const { isShowing } = useSelector((state) => state.modal.productModal);
  const dispatch = useDispatch();

  function handleCloseDetail() {
    dispatch(modalActions.closeModal({ modalType: "productModal" }));
  }

  return (
    <Modal open={isShowing} onClose={handleCloseDetail}>
      <section className="px-6 py-8 lg:p-12 max-w-full w-[44rem] lg:w-[40rem]">
        <div className="flex items-center justify-between">
          <div className="flex items-center mr-2">
            <img
              src={`${API_URL}/${product.image}`}
              alt={product.alt}
              className="w-[4rem] mr-2"
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
              className="p-[0.3rem] bg-gray-100 rounded-full outline-none hover:bg-gray-300"
            >
              <IoCloseOutline size="1.7rem" />
            </button>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex flex-col gap-4">
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
