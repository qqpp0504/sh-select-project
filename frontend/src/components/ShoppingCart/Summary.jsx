import { currencyFormatter } from "@/util/formatting.js";

export default function Summary({ tag, price, className }) {
  let value = price;

  if (typeof price === "number") {
    value = `NT${currencyFormatter.format(price)}`;
  }

  return (
    <div className={`flex justify-between ${className}`}>
      <span>{tag}</span>
      <span>{value}</span>
    </div>
  );
}
