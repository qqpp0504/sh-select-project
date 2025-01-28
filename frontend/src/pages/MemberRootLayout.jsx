import { Outlet } from "react-router-dom";

export default function MemberRootLayout() {
  return (
    <div className="w-[90%] mt-10 mx-auto">
      <div className="w-full border-b-[1px] border-gray-300 pb-3 flex items-center justify-between mb-10">
        <h2 className="font-500 flex-1 text-2xl">訂單</h2>

        <nav>
          <ul className="flex flex-1 gap-8">
            <li>個人檔案</li>
            <li>訂單</li>
            <li>最愛</li>
            <li>設定</li>
          </ul>
        </nav>

        <div className="flex-1"></div>
      </div>
      <Outlet />
    </div>
  );
}
