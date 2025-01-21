import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { currencyFormatter } from "../../util/formatting.js";
import { cartActions } from "../../store/cart-slice.js";
import trashCanIcon from "../../assets/trash-icon.png";
import addIcon from "../../assets/add-icon.png";
import subtractIcon from "../../assets/subtract-icon.png";
import heartIcon from "../../assets/heart-icon.png";
import { modalActions } from "../../store/modal-slice.js";

export default function ShoppingCart() {
  const productItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

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
              className="flex items-start gap-5 w-full border-b-[1px] border-gray-200 pb-14"
            >
              <div>
                <Link
                  to={`/products/${productItem.slug}`}
                  className="min-w-40 h-40 w-40 bg-gray-100 flex justify-center items-center"
                >
                  <img
                    src={`http://localhost:3000/${productItem.color.image}`}
                    alt={productItem.alt}
                    className="w-[90%]"
                  />
                </Link>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center justify-between border-[1px] border-gray-200 rounded-full w-[70%]">
                    <button
                      onClick={() =>
                        handleRemoveFromCart({
                          id: productItem.id,
                          color: productItem.color.name,
                          size: productItem.size,
                          idNumber: productItem.idNumber,
                        })
                      }
                      className="p-[0.625rem] hover:bg-gray-200 rounded-full"
                    >
                      <img
                        src={`${
                          productItem.quantity > 1 ? subtractIcon : trashCanIcon
                        }`}
                        alt="Trash can icon"
                        className="w-5"
                      />
                    </button>
                    <span>{productItem.quantity}</span>
                    <button
                      onClick={() => handleAddToCart(productItem)}
                      className="p-2 hover:bg-gray-200 rounded-full"
                    >
                      <img src={addIcon} alt="Add icon" className="w-6" />
                    </button>
                  </div>

                  <button className="p-[0.6rem] hover:bg-gray-200 rounded-full border-[1px] border-gray-200">
                    <img src={heartIcon} alt="Heart icon" className="w-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between w-[35rem]">
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
    <section className="w-[70%]">
      <h1 className="text-2xl font-500 mb-6">購物車</h1>
      {cartContent}
    </section>
  );
}
