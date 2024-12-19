import { useSelector } from "react-redux";

import Summary from "./Summary.jsx";
import FeatureButton from "../UI/FeatureButton.jsx";
import Tooltip from "../UI/ToolTip.jsx";

export default function ShoppingSummary() {
  const { totalAmount } = useSelector((state) => state.cart);

  const amount = totalAmount > 0 ? totalAmount : <>&mdash;</>;
  const shippingFee = totalAmount >= 4500 || totalAmount === 0 ? "免費" : 120;
  let total = totalAmount + shippingFee;

  if (typeof shippingFee === "string") {
    total = totalAmount;
  }

  if (typeof amount !== "number") {
    total = <>&mdash;</>;
  }

  return (
    <div className="w-[30%]">
      <h2 className="text-2xl font-500 mb-6">摘要</h2>
      <Summary
        tag={
          <Tooltip tag="小計">
            小計金額是訂單折扣前的總價，但不包含運費或其他手續費。
          </Tooltip>
        }
        price={amount}
      />
      <Summary tag="預估運費與手續費" price={shippingFee} />
      <hr />
      <Summary tag="總計" price={total} />
      <hr />
      <div className="my-8 flex flex-col gap-3">
        <FeatureButton
          bgColor={`${
            typeof total === "number" && total > 0 ? "black" : "gray"
          }`}
          link="/checkout"
        >
          訪客結帳
        </FeatureButton>
        <FeatureButton
          bgColor={`${
            typeof total === "number" && total > 0 ? "black" : "gray"
          }`}
        >
          會員結帳
        </FeatureButton>
      </div>
    </div>
  );
}
