import { useSelector } from "react-redux";

import Summary from "../shoppingCart/Summary.jsx";
import Tooltip from "../UI/ToolTip.jsx";
import OrderProducts from "./OrderProducts.jsx";
import OrderProgress from "./OrderProgress.jsx";

export default function OrderSummary() {
  const { items, totalAmount, totalPrice, shippingFee } = useSelector(
    (state) => state.cart
  );

  const displayShippingFee = shippingFee === 0 ? "免費" : shippingFee;

  return (
    <aside className="w-full lg:w-[22rem] lg:px-0 max-w-[35rem]">
      <h3 className="text-[1.35rem] py-[0.4rem] font-500 hidden lg:block">
        訂單摘要
      </h3>

      <div className="lg:hidden">
        <OrderProducts items={items} />
      </div>

      <div className="flex flex-col gap-3 mt-5 lg:mt-2">
        <Summary
          tag={
            <Tooltip
              tag="小計"
              tipButtonStyle="text-xs text-white"
              tipStyle="w-4 h-4 bg-gray-300 p-[9px]"
              tipContentStyle="w-52 text-[0.75rem] top-8 right-[-95px] p-[0.4rem] rounded bg-gray-800 after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[-7px] after:border-l-[7px] after:border-r-[7px] after:border-b-[7px] after:border-gray-800 after:border-l-transparent after:border-r-transparent"
            >
              小計金額是訂單折扣前的總價格，不包含運費。
            </Tooltip>
          }
          price={totalAmount}
          className="lg:text-gray"
        />
        <Summary
          tag="出貨/寄送"
          price={displayShippingFee}
          className="lg:text-gray"
        />

        <div className="hidden lg:block">
          <OrderProgress />
        </div>

        <hr />
        <Summary tag="總計" price={totalPrice} className="font-500" />
        <hr />
      </div>

      <div className="hidden lg:block">
        <OrderProducts items={items} />
      </div>
    </aside>
  );
}
