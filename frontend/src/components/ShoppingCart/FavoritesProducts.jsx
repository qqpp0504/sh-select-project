import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { currencyFormatter } from "@/util/formatting.js";
import { cartActions } from "@/store/cart-slice.js";
import { modalActions } from "@/store/modal-slice.js";
import { favoritesActions } from "@/store/favorites-slice.js";
import FavoritesAddToCartButton from "../UI/FavoritesAddToCartButton.jsx";

export default function FavoritesProducts({ product }) {
  const dispatch = useDispatch();

  function handleOpenResizableModal() {
    dispatch(
      modalActions.showModal({
        modalType: "changeSizeModal",
        type: "favorite",
      })
    );
    dispatch(cartActions.checkItemStatus(product));
  }

  function handleProductAddToCart() {
    if (!product.size) {
      handleOpenResizableModal();
    } else {
      dispatch(cartActions.addToCart(product));
      dispatch(favoritesActions.favoriteAddSuccess(product));
      dispatch(favoritesActions.updatedIsSuccess(true));
    }
  }

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

        <div className="text-gray flex flex-col justify-between h-full">
          <div className="flex flex-col gap-1">
            <span>{product.category}</span>
            <span>{product.color.name}</span>
            {product.size && (
              <span>
                尺寸
                {product.allSizes.length > 1 ? (
                  <button
                    onClick={() => handleOpenResizableModal(product)}
                    className="ml-2 w-fit"
                  >
                    <span className="border-b-[1px] border-gray-500">
                      {product.size}
                    </span>
                  </button>
                ) : (
                  <span className="ml-2 border-gray-500">{product.size}</span>
                )}
              </span>
            )}
          </div>

          <FavoritesAddToCartButton
            addToCartFn={handleProductAddToCart}
            product={product}
          />
        </div>
      </div>
    </li>
  );
}
