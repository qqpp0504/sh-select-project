import { Outlet, NavLink, useLocation } from "react-router-dom";

export default function MemberRootLayout() {
  const location = useLocation();

  return (
    <div className="padding-small lg:padding-large mt-10">
      <div className="w-full border-b-[1px] border-gray-300 pb-3 flex flex-col lg:flex-row lg:items-center justify-between mb-10">
        <h2 className="font-500 flex-1 text-2xl">
          {location.pathname.includes("/orders") ? "訂單" : "個人檔案"}
        </h2>

        <nav>
          <ul className="flex flex-1 font-500 mt-10 lg:mt-0 gap-5 lg:gap-8">
            <li>
              <NavLink
                to="/member"
                className={({ isActive }) =>
                  isActive ? "text-gray" : undefined
                }
                end
              >
                個人檔案
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/member/orders"
                className={({ isActive }) =>
                  isActive ? "text-gray" : undefined
                }
                end
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

        <div className="flex-1 hidden lg:block"></div>
      </div>
      <Outlet />
    </div>
  );
}
