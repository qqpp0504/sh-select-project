import { Outlet } from "react-router-dom";

import BannerBar from "@/components/banner/BannerBar.jsx";

export default function BannerBarLayout() {
  return (
    <>
      <BannerBar />
      <Outlet />
    </>
  );
}
