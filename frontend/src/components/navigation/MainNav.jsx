import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiMenu } from "react-icons/fi";
import { LiaShoppingBagSolid, LiaHeart } from "react-icons/lia";
import { RiAccountCircleLine } from "react-icons/ri";

import logo from "@/assets/logo.png";
import SearchInput from "./SearchInput.jsx";
import { NAVITEMS } from "@/data.js";
import DropdownNav from "./DropdownNav.jsx";

export default function MainNav() {
  const { isShowingNotification, totalQuantity } = useSelector(
    (state) => state.cart
  );
  const { token } = useSelector((state) => state.account.userData);
  const [activeDropdown, setActiveDropdown] = useState();
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0); // 儲存上一次的滾動位置
  const [isOpenNav, setIsOpenNav] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        // 當往下滑動並且滾動超過100px時隱藏nav
        setIsSticky(false);
      } else if (window.scrollY < lastScrollY && window.scrollY > 100) {
        // 當往上滑動時顯示nav
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      // 更新上一次滾動的位置
      setLastScrollY(window.scrollY);
    };

    if (location.pathname === "/" || location.pathname === "/brands") {
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [lastScrollY, location.pathname]);

  function handlePreventDefault(event) {
    if (isShowingNotification) {
      event.preventDefault();
    }
  }

  return (
    <nav
      className={`padding-small lg:padding-large py-2 flex flex-row items-center text-base transition-transform duration-300 ${
        isSticky ? "fixed top-0 w-full bg-white z-50" : "relative"
      }`}
    >
      <div className="flex-1 flex justify-start">
        <Link to="/" onClick={handlePreventDefault}>
          <img src={logo} alt="SH-Select Logo" className="w-14 min-w-14" />
        </Link>
      </div>

      <DropdownNav isOpenNav={isOpenNav} setIsOpenNav={setIsOpenNav} />
      <div className="hidden lg:block">
        <ul className="flex-1 flex justify-center gap-6 font-400">
          {NAVITEMS.map((navItem) => (
            <li
              key={navItem.label}
              onMouseEnter={() => setActiveDropdown(navItem.label)}
              onMouseLeave={() => setActiveDropdown(null)}
              className="py-6 -my-6 px-3 -mx-3"
            >
              <NavLink
                to={navItem.link}
                onClick={() => setActiveDropdown(null)}
                className={({ isActive }) =>
                  `pb-1 hover:border-b-2 hover:border-black ${
                    isActive ? "pb-1 border-b-2 border-black" : undefined
                  }`
                }
              >
                {navItem.label}
              </NavLink>

              {activeDropdown === navItem.label && (
                <div className="absolute top-full left-0 w-full">
                  <ul
                    className="relative flex justify-center gap-32 pt-4 pb-9 bg-white z-20"
                    onMouseEnter={() => setActiveDropdown(navItem.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {Object.entries(navItem.items).map(([key, value]) => (
                      <li key={key} className="flex flex-col gap-[0.05rem]">
                        <span className="mb-2 text-[0.9rem]">{key}</span>
                        {value.map(({ item, link }) => (
                          <Link
                            key={item}
                            to={link}
                            onClick={() => setActiveDropdown(null)}
                            className="text-[0.8rem] text-gray hover:text-black"
                          >
                            {item}
                          </Link>
                        ))}
                      </li>
                    ))}
                  </ul>

                  {/* 背景遮罩 */}
                  <div
                    className="fixed top-[8rem] left-0 right-0 bottom-0 bg-black bg-opacity-30 z-10"
                    onClick={() => setActiveDropdown(null)}
                  ></div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 flex justify-end items-center lg:gap-1">
        <SearchInput />
        <Link
          to={`${token ? "/favorites" : "/accounts"}`}
          onClick={handlePreventDefault}
        >
          <div className="p-[0.375rem] rounded-full hover:bg-gray-200 hidden lg:block">
            <LiaHeart />
          </div>
        </Link>

        <Link
          to={`${token ? "/" : "/accounts"}`}
          onClick={handlePreventDefault}
        >
          <div className="p-[0.375rem] rounded-full hover:bg-gray-200 block lg:hidden">
            <RiAccountCircleLine />
          </div>
        </Link>

        <Link to="/cart" onClick={handlePreventDefault}>
          <div className="relative p-[0.375rem] rounded-full hover:bg-gray-200">
            <LiaShoppingBagSolid />
            {totalQuantity > 0 && (
              <span className="absolute bottom-[3px] text-[0.5rem] left-1/2 -translate-x-1/2">
                {`${totalQuantity > 9 ? "9+" : totalQuantity}`}
              </span>
            )}
          </div>
        </Link>
        <button
          onClick={() => setIsOpenNav(true)}
          className="lg:hidden p-[0.375rem] rounded-full hover:bg-gray-200"
        >
          <FiMenu />
        </button>
      </div>
    </nav>
  );
}
