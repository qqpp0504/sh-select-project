/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import heartIcon from "../../assets/heart-icon.png";
import blackHeartIcon from "../../assets/heart-black-icon.png";
import { currencyFormatter } from "../../util/formatting.js";
import Button from "../UI/Button.jsx";
import { deleteFavoriteProduct } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function FavoritesProducts({ products, refetch }) {
  const timer = useRef();
  const [favoriteProductId, setFavoriteProductId] = useState([]);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: deleteFavoriteProduct,
    onSuccess: () => {
      refetch();
    },
  });

  function handleStartDeleteFavorite(favoritesProductId) {
    if (favoriteProductId.includes(favoritesProductId)) {
      return;
    }

    setFavoriteProductId((prev) => [...prev, favoritesProductId]);

    timer.current = setTimeout(() => {
      mutate(favoritesProductId);
      setFavoriteProductId((prev) =>
        prev.filter((id) => id !== favoritesProductId)
      );
    }, 2000);
  }

  function handleCancelDeleteFavorite(favoritesProductId) {
    if (timer.current) {
      clearTimeout(timer.current);
      setFavoriteProductId((prev) =>
        prev.filter((id) => id !== favoritesProductId)
      );

      delete timer.current;
    }
  }

  if (isError) {
    return <ErrorBlock message={error.info?.message || "無法刪除商品"} />;
  }

  return (
    <ul className="grid grid-cols-2 gap-9 lg:grid-cols-3 mt-9">
      {products.map((product) => (
        <li key={product.favoriteId} className="mb-1">
          <div className="relative mb-2 overflow-hidden">
            {favoriteProductId.includes(product.favoriteId) && (
              <>
                <div className="bg-white opacity-30 absolute w-full h-full"></div>
                <div className="absolute bottom-0 bg-black w-[95%] m-3 text-white text-center py-6 rounded-[0.25rem]">
                  <span className="text-sm mr-3">已從最愛中移除</span>
                  <button
                    onClick={() =>
                      handleCancelDeleteFavorite(product.favoriteId)
                    }
                    className="text-sm font-500 underline"
                  >
                    復原
                  </button>
                </div>
              </>
            )}

            <Link
              to={`/products/${product.slug}`}
              className="flex justify-center items-center bg-gray-100 w-full h-[27rem]"
            >
              <img
                src={`http://localhost:3000/${product.color.image}`}
                alt={product.alt}
                className="object-cover w-[90%] h-[90%]"
              />
            </Link>

            <button
              onClick={() =>
                !isPending && handleStartDeleteFavorite(product.favoriteId)
              }
              className="absolute top-4 right-4 bg-white p-2 rounded-full"
            >
              {favoriteProductId.includes(product.favoriteId) ? (
                <img src={heartIcon} alt="Heart icon" className="w-6" />
              ) : (
                <img
                  src={blackHeartIcon}
                  alt="Black heart icon"
                  className="w-6"
                />
              )}
            </button>
          </div>

          <div className="flex justify-between">
            <div>
              <Link to={`/products/${product.slug}`}>
                <h3 className="font-500">
                  {product.brand} - {product.productName}
                </h3>
              </Link>
              <h3 className="text-gray">{product.category}</h3>
            </div>

            {product.discountPrice !== product.originalPrice ? (
              <>
                <div className="py-2">
                  <s className="text-gray pr-3">
                    NT{currencyFormatter.format(product.originalPrice)}
                  </s>
                  <span>
                    NT{currencyFormatter.format(product.discountPrice)}
                  </span>
                </div>
              </>
            ) : (
              <span className="py-2 block">
                NT{currencyFormatter.format(product.originalPrice)}
              </span>
            )}
          </div>

          <Button
            bgColor="favoriteWhite"
            className="mt-5"
            paddingStyle="py-2 px-6"
          >
            選取尺寸
          </Button>
        </li>
      ))}
    </ul>
  );
}
