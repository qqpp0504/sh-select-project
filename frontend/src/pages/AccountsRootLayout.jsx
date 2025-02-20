import { Outlet } from "react-router-dom";

import logo from "@/assets/logo.png";

export default function AccountsRootLayout() {
  return (
    <div className="px-8 sm:px-0 max-w-[30rem] mx-auto">
      <header className="my-10">
        <img src={logo} alt="SH-Select Logo" className="w-14" />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
