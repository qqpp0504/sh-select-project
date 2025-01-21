/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { currencyFormatter } from "../../util/formatting.js";
import Button from "../UI/Button.jsx";
import { cartActions } from "../../store/cart-slice.js";
import { modalActions } from "../../store/modal-slice.js";
import successIcon from "../../assets/success-icon.png";
import { favoritesActions } from "../../store/favorites-slice.js";

export default function FavoritesProducts({ product }) {
  const { successItems, isSuccessAddToCart } = useSelector(
    (state) => state.favorites
  );
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
      dispatch(cartActions.checkItemStatus(product));
      dispatch(favoritesActions.updatedIsSuccess(false));
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

          {isSuccessAddToCart && successItems.includes(product) ? (
            <Button
              bgColor="favoriteWhite"
              className="w-fit"
              paddingStyle="px-6 py-2"
            >
              <div className="flex gap-1 items-center">
                <img src={successIcon} alt="Success icon" className="w-6" />
                <span>已加入</span>
              </div>
            </Button>
          ) : (
            <Button
              onClick={handleProductAddToCart}
              bgColor="favoriteWhite"
              className="w-fit"
              paddingStyle="px-6 py-2"
            >
              <div>加入購物車</div>
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}
