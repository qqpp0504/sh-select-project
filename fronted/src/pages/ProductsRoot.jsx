/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";

import SideBar from "../components/UI/SideBar.jsx";

export default function ProductsRoot() {
  return (
    <>
      <SideBar>
        <Outlet />
      </SideBar>
    </>
  );
}
