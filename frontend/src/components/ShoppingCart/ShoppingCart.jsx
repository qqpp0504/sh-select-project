import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { FaRegHeart } from "react-icons/fa6";
import { FiTrash2 } from "react-icons/fi";
import { HiPlus, HiMinus } from "react-icons/hi";

import { currencyFormatter } from "@/util/formatting.js";
import { cartActions } from "@/store/cart-slice.js";
import { modalActions } from "@/store/modal-slice.js";
import { addFavorites } from "@/util/http.js";
import ErrorModal from "../UI/ErrorModal.jsx";

export default function ShoppingCart() {
  const queryClient = useQueryClient();
  const { token } = useSelector((state) => state.account.userData);
  const { totalQuantity, totalAmount } = useSelector((state) => state.cart);
  const productItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate, isError, error } = useMutation({
    mutationFn: addFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries(["userFavorites"]);
      dispatch(modalActions.showModal({ modalType: "favoriteAddedModal" }));
    },
  });

  function handleRemoveFromCart({ id, color, size, idNumber }) {
    dispatch(cartActions.removeFromCart({ id, color, size, idNumber }));
  }

  function handleAddToCart(productItem) {
    dispatch(cartActions.addToCart(productItem));
  }

  function handleOpenResizableModal(productItem) {
    dispatch(
      modalActions.showModal({ modalType: "changeSizeModal", type: "default" })
    );
    dispatch(cartActions.checkItemStatus(productItem));
  }

  function handleAddToFavorites(product) {
    if (token) {
      mutate(product);
    } else {
      navigate("/accounts");
    }
  }

  const displayAmount =
    totalAmount === 0 ? <>&mdash;</> : currencyFormatter.format(totalAmount);

  let cartContent;

  if (productItems.length === 0) {
    cartContent = <p className="my-1">你的購物車沒有任何商品</p>;
  } else {
    cartContent = (
      <div>
        <ul className="flex flex-col gap-6">
          {productItems.map((productItem) => (
            <li
              key={productItem.idNumber}
              className="flex items-start gap-3 lg:gap-5 w-full border-b-[1px] border-gray-200 pb-14"
            >
              <div>
                <Link
                  to={`/products/${productItem.slug}`}
                  className="w-40 aspect-square bg-gray-100 flex justify-center items-center"
                >
                  <img
                    src={`http://localhost:3000/${productItem.color.image}`}
                    alt={productItem.alt}
                    className="w-[90%]"
                  />
                </Link>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center justify-between border-[1px] border-gray-200 rounded-full w-[65%]">
                    <button
                      onClick={() =>
                        handleRemoveFromCart({
                          id: productItem.id,
                          color: productItem.color.name,
                          size: productItem.size,
                          idNumber: productItem.idNumber,
                        })
                      }
                      className="p-3 hover:bg-gray-200 rounded-full"
                    >
                      {productItem.quantity > 1 ? (
                        <HiMinus size="1.1rem" />
                      ) : (
                        <FiTrash2 size="1.1rem" />
                      )}
                    </button>
                    <span>{productItem.quantity}</span>
                    <button
                      onClick={() => handleAddToCart(productItem)}
                      className="p-3 hover:bg-gray-200 rounded-full"
                    >
                      <HiPlus size="1.1rem" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleAddToFavorites(productItem)}
                    className="p-3 hover:bg-gray-200 rounded-full border-[1px] border-gray-200"
                  >
                    <FaRegHeart size="1.1rem" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1 w-full">
                <div className="flex flex-col sm:flex-row justify-between w-full lg:max-w-[35rem]">
                  <Link
                    to={`/products/${productItem.slug}`}
                    className="font-500"
                  >
                    {productItem.brand} - {productItem.productName}
                  </Link>

                  <div className="font-500">
                    {productItem.discountPrice !==
                      productItem.originalPrice && (
                      <s className="text-gray mr-3">
                        NT
                        {currencyFormatter.format(productItem.originalPrice)}
                      </s>
                    )}
                    <span>
                      NT
                      {currencyFormatter.format(productItem.discountPrice)}
                    </span>
                  </div>
                </div>

                <div className="text-gray flex flex-col gap-1">
                  <span>{productItem.category}</span>
                  <span>{productItem.color.name}</span>
                  <span>
                    尺寸
                    {productItem.allSizes.length > 1 ? (
                      <button
                        onClick={() => handleOpenResizableModal(productItem)}
                        className="ml-2"
                      >
                        <span className="border-b-[1px] border-gray-500">
                          {productItem.size}
                        </span>
                      </button>
                    ) : (
                      <span className="ml-2 border-gray-500">
                        {productItem.size}
                      </span>
                    )}
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
    <section className="w-full lg:w-[45rem]">
      <div className="border-b-[1px] border-gray-200 mb-6 pb-6 lg:border-none lg:m-0 lg:pb-0">
        <h1 className="text-2xl font-500 text-center mb-1 lg:mb-6 lg:text-left">
          購物車
        </h1>
        <div className="flex gap-2 justify-center lg:hidden">
          <div
            className={totalQuantity === 0 && "text-gray"}
          >{`${totalQuantity} 品項`}</div>
          <div className={totalQuantity === 0 && "text-gray"}>|</div>
          <div>{displayAmount}</div>
        </div>
      </div>

      {cartContent}

      {isError && (
        <ErrorModal
          message={error.info?.message || "產品已加入願望清單。"}
          buttonText="我知道了"
        />
      )}
    </section>
  );
}
