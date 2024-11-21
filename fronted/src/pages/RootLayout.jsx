import { Outlet } from "react-router-dom";

import MainNavigation from "../components/navigation/MainNavigation.jsx";
import BannerBar from "../components/BannerBar.jsx";

export default function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        <BannerBar />
        <Outlet />
      </main>
    </>
  );
}
