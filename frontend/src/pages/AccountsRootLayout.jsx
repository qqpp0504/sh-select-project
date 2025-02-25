import { Outlet } from "react-router-dom";

import logo from "@/assets/logo.png";
import SEO from "@/components/SEO.jsx";

export default function AccountsRootLayout() {
  return (
    <>
      <SEO
        title="歡迎來到 SH SELECT：登入"
        description="歡迎來到 SH SELECT，請登入您的帳戶以獲取個人化購物體驗、查看訂單資訊與享受會員專屬優惠。"
      />
      <div className="px-8 sm:px-0 max-w-[30rem] mx-auto">
        <header className="my-10">
          <img src={logo} alt="SH-Select Logo" className="w-14" />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
