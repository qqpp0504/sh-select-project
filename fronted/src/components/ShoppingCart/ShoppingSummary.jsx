import { useSelector } from "react-redux";

import Summary from "./Summary.jsx";
import FeatureButton from "../UI/FeatureButton.jsx";
import Tooltip from "../UI/ToolTip.jsx";

export default function ShoppingSummary() {
  const { totalAmount, totalPrice, shippingFee } = useSelector(
    (state) => state.cart
  );

  const displayAmount = totalAmount === 0 ? <>&mdash;</> : totalAmount;
  const displayShippingFee = shippingFee === 0 ? "免費" : shippingFee;
  const displayTotalPrice = totalPrice === 0 ? <>&mdash;</> : totalPrice;

  return (
    <aside className="w-[30%]">
      <h2 className="text-2xl font-500 mb-6">摘要</h2>
      <Summary
        tag={
          <Tooltip
            tag="小計"
            tipButtonStyle="text-[0.6rem] text-white"
            tipStyle="w-3 h-3 bg-black"
            tipContentStyle="w-60 text-sm top-9 right-[-12px] p-4 bg-gray-500 after:content-[''] after:absolute after:right-2 after:top-[-10px] after:border-l-[10px] after:border-r-[10px] after:border-b-[10px] after:border-gray-500 after:border-l-transparent after:border-r-transparent"
          >
            小計金額是訂單折扣前的總價，但不包含運費或其他手續費。
          </Tooltip>
        }
        price={displayAmount}
      />
      <Summary tag="預估運費與手續費" price={displayShippingFee} />
      <hr />
      <Summary tag="總計" price={displayTotalPrice} />
      <hr />
      <div className="my-8 flex flex-col gap-3">
        <FeatureButton
          bgColor={`${totalPrice > 0 ? "black" : "gray"}`}
          link="/checkout"
        >
          訪客結帳
        </FeatureButton>
        <FeatureButton bgColor={`${totalPrice > 0 ? "black" : "gray"}`}>
          會員結帳
        </FeatureButton>
      </div>
    </aside>
  );
}
