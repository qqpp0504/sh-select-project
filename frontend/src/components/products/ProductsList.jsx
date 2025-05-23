import { Link, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PiSmileySad } from "react-icons/pi";

import { currencyFormatter } from "@/util/formatting.js";
import Button from "../UI/Button.jsx";
import { filterActions } from "@/store/filter-slice.js";
import { useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProductsList({ products }) {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const sortedProducts = [...products].sort((a, b) => {
    const sortBy = searchParams.get("sortby");

    if (sortBy === "price-asc") {
      return a.discountPrice - b.discountPrice;
    } else if (sortBy === "price-desc") {
      return b.discountPrice - a.discountPrice;
    } else if (sortBy === "newest") {
      return b.isNew - a.isNew;
    }

    return 0; // 默認不進行排序
  });

  let noProductsContent;

  const productsQuantity = products.length;

  useEffect(() => {
    dispatch(filterActions.updateQuantity(productsQuantity));
  }, [productsQuantity, dispatch]);

  if (productsQuantity === 0) {
    noProductsContent = (
      <div className="flex flex-col justify-center items-center mt-20 padding-small md:px-0">
        <div className="flex flex-row items-center rounded-lg w-96 pt-5 justify-center text-4xl mb-10 gap-4">
          <PiSmileySad size="2.5rem" />
          <span>Nothing!</span>
        </div>
        <p>找不到符合條件的商品，試試修改篩選條件或探索其他分類吧！</p>
        <Link to="/products" className="my-6">
          <Button>重新篩選商品條件</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      {noProductsContent}
      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <li key={product.id} className="lg:mb-14">
            <Link to={`/products/${product.slug}`}>
              <div className="bg-gray-100 mb-4 flex justify-center items-center">
                <img src={`${API_URL}/${product.image}`} alt={product.alt} />
              </div>

              <div className="ml-3 text-sm lg:ml-0 lg:text-base">
                {product.isNew && (
                  <h3 className="text-new font-500">新品上市</h3>
                )}
                <h3 className="font-500">
                  {product.brand} - {product.name}
                </h3>
                <h3 className="text-gray">{product.categoryCh}</h3>

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
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
