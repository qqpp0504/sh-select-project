import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";

import { currencyFormatter } from "@/util/formatting.js";
import Button from "../UI/Button.jsx";
import { cartActions } from "@/store/cart-slice.js";

const API_URL = import.meta.env.VITE_API_URL;

export default function CartNotification() {
  const { activeItem, totalQuantity, scrollPosition, showingNotification } =
    useSelector((state) => state.cart);
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

  function handleNavigateToFavorites() {
    navigate("/favorites");
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
    <div className="fixed left-0 bottom-0 lg:absolute lg:right-12 lg:top-[6.7rem] lg:left-auto lg:bottom-auto bg-white w-full lg:w-[25rem] h-[17rem] rounded-t-3xl lg:rounded-b-3xl lg:rounded-t-none z-50 p-5 text-[0.95rem]">
      <div className="flex flex-col justify-between h-full">
        <div className="flex items-center gap-2">
          <FaCircleCheck size="1.2rem" color="green" />
          <span className="font-500">{`${
            showingNotification.type === "addToCart"
              ? "已加入購物車"
              : "已加入最愛"
          } `}</span>
        </div>
        <button
          onClick={handleCloseNotification}
          className="bg-gray-100 rounded-full p-1 absolute right-7 hover:bg-gray-200"
        >
          <IoCloseOutline size="1.7rem" />
        </button>

        <div className="h-28 flex items-center gap-3">
          <div className="w-28 h-full bg-slate-100 flex justify-center items-center">
            <img
              src={`${API_URL}/${activeItem.color.image}`}
              alt={activeItem.alt}
              className="w-[90%]"
            />
          </div>
          <div className="w-[14rem] h-full flex flex-col">
            <h2 className="font-500">
              {activeItem.brand} - {activeItem.productName}
            </h2>
            <span className="text-gray">{activeItem.category}</span>
            {activeItem.size && (
              <span className="text-gray">{`尺寸 ${activeItem.size}`}</span>
            )}
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

        <div className="flex gap-2 text-center">
          {showingNotification.type === "addToCart" && (
            <>
              <Button
                variant="bordered"
                onClick={handleNavigateToCart}
                size="custom"
                className="w-full py-4 rounded-full"
              >
                查看購物車 ({totalQuantity})
              </Button>
              <Button
                link="/checkout"
                size="custom"
                className="w-full py-4 rounded-full"
              >
                結帳
              </Button>
            </>
          )}
          {showingNotification.type === "addToFavorites" && (
            <Button
              onClick={handleNavigateToFavorites}
              size="custom"
              className="w-full py-4 rounded-full"
            >
              檢視最愛
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
