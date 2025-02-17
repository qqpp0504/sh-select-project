import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

import { currencyFormatter } from "@/util/formatting.js";
import { deleteFavoriteProduct } from "@/util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { cartActions } from "@/store/cart-slice.js";
import { modalActions } from "@/store/modal-slice.js";
import { useAddNotification } from "../hooks/useAddNotification.js";
import FavoritesAddToCartButton from "../UI/FavoritesAddToCartButton.jsx";
import { favoritesActions } from "@/store/favorites-slice.js";

export default function FavoritesProducts({ products, refetch }) {
  const dispatch = useDispatch();
  const timer = useRef();
  const [favoriteProductId, setFavoriteProductId] = useState([]);
  const addNotification = useAddNotification();

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

  function handleOpenResizableModal(product) {
    dispatch(
      modalActions.showModal({
        modalType: "changeSizeModal",
        type: "favorite",
        page: "favorites",
      })
    );
    dispatch(cartActions.checkItemStatus(product));
  }

  function handleAddToCart(product) {
    if (!product.size) {
      handleOpenResizableModal(product);
    } else {
      dispatch(cartActions.addToCart(product));
      addNotification(product, "addToCart");
      dispatch(favoritesActions.favoriteAddSuccess(product));
      dispatch(favoritesActions.updatedIsSuccess(true));
    }
  }

  if (isError) {
    return <ErrorBlock message={error.info?.message || "無法刪除商品"} />;
  }

  return (
    <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:mt-6">
      {products.map((product) => (
        <li key={product.favoriteId} className="mb-8">
          <div className="relative mb-2 overflow-hidden">
            {favoriteProductId.includes(product.favoriteId) && (
              <>
                <div className="bg-white opacity-30 absolute w-full h-full"></div>
                <div className="fixed z-50 left-0 lg:absolute bottom-0 bg-black w-[95%] m-3 text-white text-center py-6 rounded-[0.25rem]">
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
              className="flex justify-center items-center bg-gray-100 w-full aspect-square"
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
              className="absolute top-4 right-4 bg-white p-2 lg:p-[0.6rem] rounded-full"
            >
              {favoriteProductId.includes(product.favoriteId) ? (
                <FaRegHeart size="1.3rem" />
              ) : (
                <FaHeart size="1.3rem" />
              )}
            </button>
          </div>

          <div className="flex flex-col lg:flex-row lg:justify-between mb-5 text-sm lg:text-base">
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
                <div className="pt-1 lg:py-2">
                  <s className="text-gray pr-2">
                    {currencyFormatter.format(product.originalPrice)}
                  </s>
                  <span>{currencyFormatter.format(product.discountPrice)}</span>
                </div>
              </>
            ) : (
              <span className="pt-1 lg:py-2 block">
                {currencyFormatter.format(product.originalPrice)}
              </span>
            )}
          </div>

          <FavoritesAddToCartButton
            addToCartFn={() => handleAddToCart(product)}
            product={product}
          />
        </li>
      ))}
    </ul>
  );
}
