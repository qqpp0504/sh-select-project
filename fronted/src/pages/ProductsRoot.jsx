import { Outlet } from "react-router-dom";

import SideBar from "../components/UI/SideBar.jsx";
import ProductFilter from "../components/products/ProductFilter.jsx";

export default function ProductsRoot() {
  return (
    <>
      <SideBar>
        <ProductFilter />
        <Outlet />
      </SideBar>
    </>
  );
}
