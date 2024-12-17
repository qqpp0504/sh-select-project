import { useSelector } from "react-redux";

import { currencyFormatter } from "../../util/formatting.js";

export default function ShoppingCart() {
  const productItems = useSelector((state) => state.cart.items);

  console.log(productItems);

  let cartContent;

  if (productItems.length === 0) {
    cartContent = <p className="my-1">你的購物車沒有任何商品</p>;
  } else {
    cartContent = (
      <div>
        <ul className="flex flex-col gap-6">
          {productItems.map((productItem) => (
            <li
              key={productItem.id}
              className="flex items-start gap-5 w-full border-b-[1px] border-gray-200 pb-14"
            >
              <div className="min-w-40 h-40 w-40 bg-gray-100 flex justify-center items-center">
                <img
                  src={`http://localhost:3000/${productItem.color.image}`}
                  alt={productItem.alt}
                  className="w-[90%]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between w-[35rem]">
                  <span className="font-500">
                    {productItem.brand} - {productItem.productName}
                  </span>

                  <div className="font-500">
                    {productItem.discountPrice !==
                      productItem.originalPrice && (
                      <s className="mr-3 text-gray">
                        NT{currencyFormatter.format(productItem.discountPrice)}
                      </s>
                    )}
                    <span>
                      NT{currencyFormatter.format(productItem.originalPrice)}
                    </span>
                  </div>
                </div>

                <div className="text-gray flex flex-col gap-1">
                  <span>{productItem.category}</span>
                  <span>{productItem.color.name}</span>
                  <span>
                    尺寸
                    <span className="ml-2 border-b-[1px] border-gray-500">
                      {productItem.size}
                    </span>
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="w-[70%]">
      <h1 className="text-2xl font-500 mb-6">購物車</h1>
      {cartContent}
    </div>
  );
}
