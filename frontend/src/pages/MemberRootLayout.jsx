import { Outlet, NavLink } from "react-router-dom";

export default function MemberRootLayout() {
  return (
    <div className="padding-small lg:padding-large mt-10">
      <div className="w-full border-b-[1px] border-gray-300 pb-3 flex items-center justify-between mb-10">
        <h2 className="font-500 flex-1 text-2xl">訂單</h2>

        <nav>
          <ul className="flex flex-1 gap-8">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-gray" : undefined
                }
              >
                個人檔案
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  isActive ? "text-gray" : undefined
                }
              >
                訂單
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  isActive ? "text-gray" : undefined
                }
              >
                最愛
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-gray" : undefined
                }
              >
                設定
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="flex-1"></div>
      </div>
      <Outlet />
    </div>
  );
}
