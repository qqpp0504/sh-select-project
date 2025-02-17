import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (isOpenSummary) {
      document.body.style.overflow = "hidden"; // 禁止滾動
    } else {
      document.body.style.overflow = ""; // 恢復滾動
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpenSummary]);

  return (
    <div className="sticky top-0 z-50 lg:hidden">
      <div className="padding-small mx-auto w-full max-w-[38rem] bg-white z-50 py-[0.6rem] font-500 flex justify-between items-center">
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

      {!isOpenSummary && <hr className="w-screen" />}
      {isOpenSummary && (
        <div className="relative w-screen">
          <div className="padding-small absolute w-full z-50 bg-white top-0 flex justify-center overflow-y-auto max-h-[87vh]">
            <OrderSummary />
          </div>
          <div
            onClick={handleOpenOrderSummary}
            className={`absolute top-full right-0 bg-black opacity-30 w-full h-screen z-20 lg:hidden ${
              !isOpenSummary && "hidden"
            }`}
          ></div>
        </div>
      )}
    </div>
  );
}
