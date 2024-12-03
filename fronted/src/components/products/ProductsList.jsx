/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import { currencyFormatter } from "../../util/formatting.js";

export default function ProductsList({ products }) {
  return (
    <div>
      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {products.map((product) => (
          <li key={product.id} className="mb-14">
            <Link to="/products">
              <div className="bg-gray-100 mb-4 flex justify-center items-center">
                <img
                  src={`http://localhost:3000/${product.image}`}
                  alt={product.alt}
                />
              </div>

              {product.isNew && <h3 className="text-new font-500">新品上市</h3>}
              <h3 className="font-500">
                {product.brand} - {product.name}
              </h3>
              <h3 className="text-gray">{product.category}</h3>

              {product.discountPrice !== product.originalPrice ? (
                <>
                  <div className="py-2">
                    <span className="pr-2 font-500">
                      NT{currencyFormatter.format(product.discountPrice)}
                    </span>
                    <s className="text-gray">
                      NT{currencyFormatter.format(product.originalPrice)}
                    </s>
                  </div>

                  <span className="block text-green-700 font-500">
                    {product.discountPercentage}% 折扣
                  </span>
                </>
              ) : (
                <span className="py-2 block font-500">
                  NT{currencyFormatter.format(product.originalPrice)}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
