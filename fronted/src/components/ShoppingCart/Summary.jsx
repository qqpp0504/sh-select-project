/* eslint-disable react/prop-types */
import { currencyFormatter } from "../../util/formatting.js";

export default function Summary({ tag, price }) {
  let value = price;

  if (typeof price === "number") {
    value = `NT${currencyFormatter.format(price)}`;
  }

  return (
    <div className="flex justify-between my-4">
      <span>{tag}</span>
      <span>{value}</span>
    </div>
  );
}
