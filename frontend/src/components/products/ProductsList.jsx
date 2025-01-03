/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { currencyFormatter } from "../../util/formatting.js";
import Button from "../UI/Button.jsx";
import emptyIconImg from "../../assets/empty-icon.png";
import { filterActions } from "../../store/filter-slice.js";
import { useEffect } from "react";

export default function ProductsList({ products }) {
  const dispatch = useDispatch();

  let noProductsContent;

  const productsQuantity = products.length;

  useEffect(() => {
    dispatch(filterActions.updateQuantity(productsQuantity));
  }, [productsQuantity, dispatch]);

  if (productsQuantity === 0) {
    noProductsContent = (
      <div className="flex flex-col justify-center items-center mt-20">
        <div className="flex flex-row rounded-lg w-96 pt-5 justify-center text-4xl mb-10 gap-4">
          <img src={emptyIconImg} alt="Empty Icon" className="w-10 h-10" />
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
        {products.map((product) => (
          <li key={product.id} className="mb-14">
            <Link to={`/products/${product.slug}`}>
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
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
