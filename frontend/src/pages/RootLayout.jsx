import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import MainNavigation from "../components/navigation/MainNavigation.jsx";
import Footer from "../components/Footer.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import { favoritesActions } from "../store/favorites-slice.js";

export default function RootLayout() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    // 當路由改變時重置狀態
    dispatch(favoritesActions.resetState());
  }, [location.pathname, dispatch]);

  return (
    <>
      <ScrollToTop />
      <MainNavigation />
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
