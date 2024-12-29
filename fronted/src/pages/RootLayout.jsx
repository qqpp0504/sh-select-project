import { Outlet } from "react-router-dom";

import MainNavigation from "../components/navigation/MainNavigation.jsx";
import Footer from "../components/Footer.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";

export default function RootLayout() {
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
