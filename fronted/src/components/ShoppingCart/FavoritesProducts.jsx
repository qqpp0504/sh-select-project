/* eslint-disable react/prop-types */
import { currencyFormatter } from "../../util/formatting";

export default function FavoritesProducts({ product }) {
  return (
    <li className="flex items-start gap-5 pb-8 w-1/2">
      <div>
        <div className="min-w-40 h-40 w-40 bg-gray-100 flex justify-center items-center">
          <img
            src={`http://localhost:3000/${product.color.image}`}
            alt={product.alt}
            className="w-[90%]"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1 w-full h-full">
        <div className="flex justify-between">
          <span className="font-500">
            {product.brand} - {product.productName}
          </span>

          <div className="font-500">
            {product.discountPrice !== product.originalPrice && (
              <s className="text-gray mr-3">
                NT
                {currencyFormatter.format(product.originalPrice)}
              </s>
            )}
            <span>
              NT
              {currencyFormatter.format(product.discountPrice)}
            </span>
          </div>
        </div>

        <div className="text-gray flex flex-col justify-between gap-1 h-full">
          <div className="flex flex-col">
            <span>{product.category}</span>
            <span>{product.color.name}</span>
          </div>

          <button className="bg-white w-fit px-6 py-2 rounded-[1.2rem] text-black border-[1px] border-gray-300 hover:border-gray-400 transition-all duration-150">
            加入購物車
          </button>
        </div>
      </div>
    </li>
  );
}
