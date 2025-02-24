import { useSelector } from "react-redux";

import Summary from "./Summary.jsx";
import Button from "../UI/Button.jsx";
import Tooltip from "../UI/ToolTip.jsx";

export default function ShoppingSummary() {
  const { userData } = useSelector((state) => state.account);
  const { totalAmount, totalPrice, shippingFee } = useSelector(
    (state) => state.cart
  );

  const displayAmount = totalAmount === 0 ? <>&mdash;</> : totalAmount;
  const displayShippingFee = shippingFee === 0 ? "免費" : shippingFee;
  const displayTotalPrice = totalPrice === 0 ? <>&mdash;</> : totalPrice;

  return (
    <div className="w-full lg:w-[20rem]">
      <h2 className="text-2xl font-500 mb-6">摘要</h2>

      <div className="flex flex-col gap-1 lg:gap-4">
        <Summary
          tag={
            <Tooltip
              tag="小計"
              tipButtonStyle="text-[0.6rem] text-white"
              tipStyle="w-3 h-3 bg-black"
              tipContentStyle="w-60 text-sm top-9 left-7 lg:right-[-12px] lg:left-auto p-4 bg-gray-500 after:content-[''] after:absolute after:left-2 lg:after:left-auto lg:after:right-2 after:top-[-10px] after:border-l-[10px] after:border-r-[10px] after:border-b-[10px] after:border-gray-500 after:border-l-transparent after:border-r-transparent"
            >
              小計金額是訂單折扣前的總價，但不包含運費或其他手續費。
            </Tooltip>
          }
          price={displayAmount}
        />
        <Summary tag="預估運費與手續費" price={displayShippingFee} />
        <hr className="hidden lg:block" />
        <Summary
          tag="總計"
          price={displayTotalPrice}
          className="mt-2 font-500"
        />
        <hr className="hidden lg:block" />
        <div className="my-8 hidden lg:flex lg:flex-col lg:gap-3 text-center">
          {!userData.token && (
            <Button
              variant={`${totalPrice > 0 ? "black" : "disable"}`}
              size="xl"
              link="/checkout"
            >
              訪客結帳
            </Button>
          )}
          <Button
            variant={`${totalPrice > 0 ? "black" : "disable"}`}
            size="xl"
            link={`${
              userData.token
                ? "/checkout"
                : `/accounts?redirectTo=${encodeURIComponent("/checkout")}`
            }`}
          >
            會員結帳
          </Button>
        </div>
      </div>
    </div>
  );
}
