import { Outlet } from "react-router-dom";

import BannerBar from "../components/BannerBar.jsx";

export default function BannerBarLayout() {
  return (
    <>
      <BannerBar />
      <Outlet />
    </>
  );
}
