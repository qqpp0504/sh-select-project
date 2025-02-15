import DeliveryTime from "./DeliveryTime.jsx";
import { currencyFormatter } from "@/util/formatting.js";

export default function OrderProducts({ items }) {
  return (
    <div className="my-5 lg:my-7">
      <DeliveryTime className="font-500" />
      <div className="mt-3">
        <div>
          <ul className="flex flex-col gap-4">
            {items.map((item) => (
              <li key={item.idNumber} className="flex gap-3">
                <div className="bg-gray-100 w-[20rem] lg:w-[13rem] aspect-square flex justify-center items-center">
                  <img
                    src={`http://localhost:3000/${item.color.image}`}
                    alt={item.alt}
                    className="w-[90%]"
                  />
                </div>

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
      </div>
    </div>
  );
}
