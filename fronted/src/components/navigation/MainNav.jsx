import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import logo from "../../assets/logo.png";
import Icon from "../UI/Icon.jsx";
import SearchInput from "../UI/SearchInput.jsx";
import { NAVITEMS } from "../../data.js";

export default function MainNav() {
  const { isShowingNotification, totalQuantity } = useSelector(
    (state) => state.cart
  );
  const [activeDropdown, setActiveDropdown] = useState();

  function handlePreventDefault(event) {
    if (isShowingNotification) {
      event.preventDefault();
    }
  }

  return (
    <nav className="relative padding-large py-2 flex flex-row items-center text-base">
      <div className="flex-1 flex justify-start">
        <Link to="/" onClick={handlePreventDefault}>
          <img src={logo} alt="SH-Select Logo" className="w-14" />
        </Link>
      </div>

      <div>
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
                            className="text-[0.8rem] text-gray hover:text-black"
                          >
                            {item}
                          </Link>
                        ))}
                      </li>
                    ))}
                  </ul>
                  {activeDropdown && (
                    <div
                      className="fixed top-[8rem] left-0 right-0 bottom-0 bg-black bg-opacity-30 z-10"
                      onClick={() => setActiveDropdown(null)}
                    ></div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 flex justify-end items-center gap-4">
        <SearchInput />
        <Link to="/" onClick={handlePreventDefault}>
          <Icon type="heart" />
        </Link>
        <Link to="/cart" onClick={handlePreventDefault} className="relative">
          <Icon type="shopping-cart" />
          {totalQuantity > 0 && (
            <span
              className={`absolute bottom-[2.5px] text-[0.5rem] ${
                totalQuantity > 9 ? "left-[13px]" : "left-[15.5px]"
              }`}
            >
              {`${totalQuantity > 9 ? "9+" : totalQuantity}`}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
