/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import { currencyFormatter } from "../../util/formatting";
import Button from "../UI/Button.jsx";

export default function FavoritesProducts({ product }) {
  return (
    <li className="flex items-start gap-5 pb-8 w-1/2">
      <div>
        <Link
          to={`/products/${product.slug}`}
          className="min-w-40 h-40 w-40 bg-gray-100 flex justify-center items-center"
        >
          <img
            src={`http://localhost:3000/${product.color.image}`}
            alt={product.alt}
            className="w-[90%]"
          />
        </Link>
      </div>

      <div className="flex flex-col gap-1 w-full h-full">
        <div className="flex justify-between">
          <Link to={`/products/${product.slug}`} className="font-500">
            {product.brand} - {product.productName}
          </Link>

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

          <Button
            bgColor="favoriteWhite"
            className="w-fit"
            paddingStyle="px-6 py-2"
          >
            加入購物車
          </Button>
        </div>
      </div>
    </li>
  );
}
