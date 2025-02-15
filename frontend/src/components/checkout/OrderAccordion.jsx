import { useState } from "react";
import { useSelector } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";

import { currencyFormatter } from "@/util/formatting.js";
import OrderSummary from "./OrderSummary.jsx";

export default function OrderAccordion() {
  const [isOpenSummary, setIsOpenSummary] = useState(false);
  const { totalQuantity, totalPrice } = useSelector((state) => state.cart);

  function handleOpenOrderSummary() {
    setIsOpenSummary((prev) => !prev);
  }

  return (
    <>
      <div className="py-[0.6rem] font-500 flex justify-between items-center w-full lg:hidden">
        <div className="text-xl">摘要</div>

        <button
          onClick={handleOpenOrderSummary}
          className="flex items-center gap-3"
        >
          <div className="font-700">
            {`${currencyFormatter.format(
              totalPrice
            )} (${totalQuantity} 項商品)`}
          </div>

          <IoIosArrowDown
            size="1.35rem"
            className={`transition-all duration-200 ${
              isOpenSummary && "rotate-180"
            }`}
          />
        </button>
      </div>

      {!isOpenSummary && <hr className="w-screen lg:hidden" />}
      {isOpenSummary && (
        <div className="relative">
          <div className="lg:hidden">
            <OrderSummary />
          </div>
          <div
            onClick={handleOpenOrderSummary}
            className="absolute top-0 left-0 bg-black opacity-30 w-full h-screen z-20 lg:hidden"
          >
            sss
          </div>
        </div>
      )}
    </>
  );
}
