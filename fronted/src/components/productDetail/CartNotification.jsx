import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import successIcon from "../../assets/success-icon.png";
import { currencyFormatter } from "../../util/formatting.js";
import FeatureButton from "../UI/FeatureButton.jsx";
import closeIcom from "../../assets/close-icon.png";
import { cartActions } from "../../store/cart-slice.js";

export default function CartNotification() {
  const { activeItem, totalQuantity, scrollPosition } = useSelector(
    (state) => state.cart
  );
  const timeout = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleCloseNotification() {
    window.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });
    dispatch(cartActions.closeNotification());
  }

  function handleNavigateToCart() {
    navigate("/cart");
    dispatch(cartActions.closeNotification());
  }

  useEffect(() => {
    function handleKeyDown(event) {
      // 阻止 Enter 鍵觸發預設行為
      if (event.key === "Enter") {
        event.preventDefault();
      }
      handleCloseNotification();
    }

    // 註冊事件監聽器
    window.addEventListener("keydown", handleKeyDown);

    // 清理事件監聽器
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    timeout.current = setTimeout(() => {
      handleCloseNotification();
    }, 5000);

    return () => {
      clearTimeout(timeout.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute right-12 top-full bg-white w-[25rem] h-[17rem] rounded-b-3xl z-10 p-5 text-[0.95rem]">
      <div className="flex flex-col justify-between h-full">
        <div className="flex gap-2">
          <img src={successIcon} alt="Success icon" className="w-7" />
          <span className="font-500">已加入購物車</span>
        </div>
        <button
          onClick={handleCloseNotification}
          className="bg-gray-100 rounded-full p-1 absolute right-7 hover:bg-gray-200"
        >
          <img src={closeIcom} alt="Close Icon" className="w-7" />
        </button>

        <div className="flex gap-3">
          <div className="w-24 h-24 bg-slate-100 flex justify-center items-center">
            <img
              src={`http://localhost:3000/${activeItem.color.image}`}
              alt={activeItem.alt}
              className="w-[90%] "
            />
          </div>
          <div className="flex flex-col justify-between">
            <h2 className="font-500">
              {activeItem.brand} - {activeItem.productName}
            </h2>
            <span className="text-gray">{activeItem.category}</span>
            <span className="text-gray">尺寸 {activeItem.size}</span>
            <div className="flex gap-2">
              <span>
                NT{currencyFormatter.format(activeItem.discountPrice)}
              </span>
              {activeItem.discountPrice !== activeItem.originalPrice && (
                <s className="text-gray">
                  NT{currencyFormatter.format(activeItem.originalPrice)}
                </s>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-1">
          <FeatureButton
            bgColor="white"
            paddingStyle="py-4"
            onClick={handleNavigateToCart}
          >
            查看購物車 ({totalQuantity})
          </FeatureButton>
          <FeatureButton paddingStyle="py-4" link="/checkout">
            結帳
          </FeatureButton>
        </div>
      </div>
    </div>
  );
}
