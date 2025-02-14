import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AccountBar from "./AccountBar.jsx";
import MainNav from "./MainNav.jsx";
import CartNotification from "../productDetail/CartNotification.jsx";
import { cartActions } from "@/store/cart-slice.js";

export default function MainNavigation() {
  const dispatch = useDispatch();
  const { showingNotification } = useSelector((state) => state.cart);

  useEffect(() => {
    if (showingNotification.isOpen) {
      document.body.style.overflow = "hidden"; // 禁止滾動
    } else {
      document.body.style.overflow = ""; // 恢復滾動
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showingNotification.isOpen]);

  function handleCloseNotification() {
    dispatch(cartActions.closeNotification());
  }

  return (
    <header className="relative bg-white">
      <AccountBar />
      <MainNav />
      {showingNotification.isOpen && (
        <>
          <CartNotification open={showingNotification.isOpen} />
          <div
            onClick={handleCloseNotification}
            className="bg-gray-900 bg-opacity-20 z-10 absolute top-full left-0 bottom-0 w-full h-screen"
          ></div>
        </>
      )}
    </header>
  );
}
