import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import MainNavigation from "@/components/navigation/MainNavigation.jsx";
import Footer from "@/components/Footer.jsx";
import ScrollToTop from "@/components/ScrollToTop.jsx";
import { favoritesActions } from "@/store/favorites-slice.js";
import { modalActions } from "@/store/modal-slice.js";
import { cartActions } from "@/store/cart-slice.js";

export default function RootLayout() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    // 當路由改變時重置狀態
    dispatch(favoritesActions.resetState());
    dispatch(modalActions.resetModal());
    dispatch(cartActions.resetShowingNotification());
  }, [location.pathname, dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <MainNavigation />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
