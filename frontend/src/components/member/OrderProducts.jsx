import { Link } from "react-router-dom";

import { currencyFormatter } from "@/util/formatting.js";

export default function OrderProducts({ order }) {
  return (
    <div className="lg:hidden w-full mt-8">
      <ul className="flex flex-col gap-4">
        {order.products.map((item) => (
          <li
            key={item.idNumber}
            className="flex gap-3 sm:gap-4 border-b border-gray-200 pb-4"
          >
            <Link
              to={`/products/${item.slug}`}
              className="bg-gray-100 w-[15rem] lg:w-[13rem] aspect-square flex justify-center items-center"
            >
              <img
                src={`http://localhost:3000/${item.color.image}`}
                alt={item.alt}
                className="w-[90%]"
              />
            </Link>

            <div className="text-sm w-full lg:w-[8rem] flex flex-col">
              <span>
                {item.brand} - {item.productName}
              </span>
              <span className="text-gray">{item.category}</span>
              <span className="text-gray">{`數量 ${item.quantity}`}</span>
              <span className="text-gray">{`尺寸 ${item.size}`}</span>
              <span className="text-gray">{`NT${currencyFormatter.format(
                item.itemTotalPrice
              )}`}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
