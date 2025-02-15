import { useSelector } from "react-redux";

import classes from "./OrderSummary.module.css";
import { currencyFormatter } from "@/util/formatting.js";

export default function OrderProgress() {
  const { totalAmount } = useSelector((state) => state.cart);

  const remainingAmount = `NT${currencyFormatter.format(4500 - totalAmount)}`;

  let progressContent;

  if (totalAmount >= 4500) {
    progressContent = (
      <>
        <p className="text-sm">你已符合免運費資格！</p>
        <progress
          value={totalAmount}
          max="4500"
          className={`${classes.progress} w-full h-2`}
        ></progress>
      </>
    );
  } else {
    progressContent = (
      <>
        <p className="text-sm">{`再買 ${remainingAmount} 即可享免運費服務！`}</p>
        <div className="flex items-center justify-between">
          {" "}
          <progress
            value={totalAmount}
            max="4500"
            className={`${classes.progress} w-[85%] lg:w-[76%] h-2`}
          ></progress>
          <span className="text-sm inline-block">{`NT${currencyFormatter.format(
            4500
          )}`}</span>
        </div>
      </>
    );
  }
  return <div>{progressContent}</div>;
}
