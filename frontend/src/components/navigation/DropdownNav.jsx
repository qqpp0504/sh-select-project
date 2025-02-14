import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineHelpOutline } from "react-icons/md";
import { LiaShoppingBagSolid, LiaBoxSolid } from "react-icons/lia";

import { NAVITEMS } from "@/data.js";
import Button from "../UI/Button.jsx";

export default function DropdownNav({ isOpenNav, setIsOpenNav }) {
  const [selectedOption, setSelectedOption] = useState();

  function handleCloseNav() {
    setIsOpenNav(false);
    setSelectedOption(null);
  }

  function handleSelectOption(item) {
    setSelectedOption(item);
  }

  useEffect(() => {
    if (isOpenNav) {
      document.body.style.overflow = "hidden"; // 禁止滾動
    } else {
      document.body.style.overflow = ""; // 恢復滾動
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpenNav]);

  return (
    <>
      <div
        className={`fixed bg-white right-0 top-0 w-[20rem] h-screen z-50 overflow-hidden overflow-y-auto transition-all duration-300 ${
          isOpenNav ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* 主要 Nav */}
        <div
          className={`absolute w-full p-5 transition-all duration-300 ${
            selectedOption
              ? "-translate-x-[150%] pointer-events-none"
              : "translate-x-0"
          }`}
        >
          <div className="flex justify-end mb-10">
            <button
              onClick={handleCloseNav}
              className="hover:bg-gray-200 p-1 rounded-full"
            >
              <IoCloseOutline size="1.7rem" />
            </button>
          </div>

          <nav className="px-3">
            <ul className="text-2xl flex flex-col gap-5 font-500">
              {NAVITEMS.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleSelectOption(item)}
                    className="w-full flex justify-between items-center"
                  >
                    <div>{item.label}</div>
                    <GoChevronRight />
                  </button>
                </li>
              ))}
            </ul>

            <div className="text-gray text-xl font-400 my-16">
              成為 SH SELECT 會員，體驗優質產品、享受會員福利！
              <Link
                onClick={handleCloseNav}
                to="/membership"
                className="text-black"
              >
                瞭解更多資訊
              </Link>
              <div className="flex gap-2 mt-6">
                <Button link="/accounts">加入</Button>
                <Button link="/accounts" variant="bordered">
                  登入
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <Link onClick={handleCloseNav} to="help" className="flex gap-2">
                <MdOutlineHelpOutline />
                協助
              </Link>
              <Link onClick={handleCloseNav} to="cart" className="flex gap-2">
                <LiaShoppingBagSolid />
                購物車
              </Link>
              <Link
                onClick={handleCloseNav}
                to="/orders"
                className="flex gap-2"
              >
                <LiaBoxSolid />
                訂單
              </Link>
            </div>
          </nav>
        </div>

        {/* 詳細 Nav */}
        <div
          className={`absolute w-full p-5 transition-all duration-300 ${
            selectedOption ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-10">
            <button
              onClick={() => setSelectedOption(null)}
              className="flex items-center gap-3"
            >
              <GoChevronLeft />
              <div>全部</div>
            </button>
            <button
              onClick={handleCloseNav}
              className="hover:bg-gray-200 p-1 rounded-full"
            >
              <IoCloseOutline size="1.7rem" />
            </button>
          </div>

          <div className="px-3">
            {selectedOption && (
              <>
                <Link to={selectedOption.link} onClick={handleCloseNav}>
                  <h2 className="text-2xl font-500 mb-5">
                    {selectedOption.label}
                  </h2>
                </Link>

                <ul>
                  {Object.entries(selectedOption.items).map(([key, value]) => (
                    <li key={key} className="flex flex-col gap-3">
                      <div className="font-500 text-lg mt-3">{key}</div>
                      {value.map(({ item, link }) => (
                        <Link
                          key={item}
                          to={link}
                          onClick={handleCloseNav}
                          className="text-gray hover:text-black"
                        >
                          {item}
                        </Link>
                      ))}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>

      {isOpenNav && (
        <div
          onClick={handleCloseNav}
          className="absolute top-0 left-0 bg-black opacity-30 w-full h-screen z-20"
        ></div>
      )}
    </>
  );
}
