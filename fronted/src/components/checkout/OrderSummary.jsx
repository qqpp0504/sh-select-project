import { useSelector } from "react-redux";

import Summary from "../ShoppingCart/Summary.jsx";
import Tooltip from "../UI/ToolTip.jsx";
import { currencyFormatter } from "../../util/formatting.js";
import DeliveryTime from "./DeliveryTime.jsx";

export default function OrderSummary() {
  const { items, totalAmount, totalPrice, shippingFee } = useSelector(
    (state) => state.cart
  );

  const displayShippingFee = shippingFee === 0 ? "免費" : shippingFee;
  const remainingAmount = `NT${currencyFormatter.format(4500 - totalAmount)}`;

  let progressContent;

  if (totalAmount >= 4500) {
    progressContent = (
      <div className="mb-5">
        <p className="text-sm">你已符合免運費資格！</p>
        <progress
          value={totalAmount}
          max="4500"
          className="w-full h-2"
        ></progress>
      </div>
    );
  } else {
    progressContent = (
      <div>
        <p className="text-sm">{`再買 ${remainingAmount} 即可享免運費服務！`}</p>
        <div className="mb-5 flex items-center justify-between">
          {" "}
          <progress
            value={totalAmount}
            max="4500"
            className="w-[76%] h-2"
          ></progress>
          <span className="text-sm inline-block">{`NT${currencyFormatter.format(
            4500
          )}`}</span>
        </div>
      </div>
    );
  }

  return (
    <aside className="w-[22rem]">
      <h3 className="text-[1.35rem] py-[0.4rem] font-500">訂單摘要</h3>

      <div>
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
          className="text-gray"
        />
        <Summary
          tag="出貨/寄送"
          price={displayShippingFee}
          className="text-gray"
        />
        {progressContent}
        <hr />
        <Summary tag="總計" price={totalPrice} className="font-500" />
        <hr />
      </div>

      <div className="my-7">
        <DeliveryTime className="font-500" />
        <div className="mt-3">
          <div>
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <div className="bg-gray-100 w-[13rem] h-[13rem] flex justify-center items-center">
                    <img
                      src={`http://localhost:3000/${item.color.image}`}
                      alt={item.alt}
                      className="w-[90%]"
                    />
                  </div>

                  <div className="text-sm w-[8rem] flex flex-col">
                    <span>
                      {item.brand} - {item.productName}
                    </span>
                    <span className="text-gray">{item.category}</span>
                    <span className="text-gray">{`數量 ${item.quantity}`}</span>
                    <span className="text-gray">{`尺寸 ${item.size}`}</span>
                    <span className="text-gray">{`NT${currencyFormatter.format(
                      item.discountPrice
                    )}`}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}
