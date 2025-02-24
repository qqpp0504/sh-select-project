import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GoChevronRight } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineHelpOutline, MdAccountCircle } from "react-icons/md";
import { LiaShoppingBagSolid, LiaBoxSolid, LiaHeart } from "react-icons/lia";

import { NAVITEMS } from "@/data.js";
import Button from "../UI/Button.jsx";
import DetailDropdownNav from "./DetailDropdownNav.jsx";
import AccountDropdownNav from "./AccountDropdownNav.jsx";

export default function DropdownNav({ isOpenNav, setIsOpenNav }) {
  const [selectedOption, setSelectedOption] = useState();
  const [isOpenAccountDropdownNav, setIsOpenAccountDropdownNav] =
    useState(false);
  const { userData } = useSelector((state) => state.account);

  function handleCloseNav() {
    setIsOpenNav(false);
    setIsOpenAccountDropdownNav(false);
    setSelectedOption(null);
  }

  function handleOpenAccountDropdownNav() {
    setIsOpenAccountDropdownNav(true);
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
        className={`fixed bg-white right-0 top-0 w-[20rem] h-screen z-50 overflow-hidden overflow-y-auto transition-all duration-300 lg:hidden ${
          isOpenNav ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* 主要 Nav */}
        <div
          className={`absolute w-full p-5 transition-all duration-300 ${
            selectedOption || isOpenAccountDropdownNav
              ? "-translate-x-[150%] pointer-events-none"
              : "translate-x-0"
          }`}
        >
          <div className="flex justify-end mb-6">
            <button
              onClick={handleCloseNav}
              className="hover:bg-gray-200 p-1 rounded-full"
            >
              <IoCloseOutline size="1.7rem" />
            </button>
          </div>

          {userData.token && (
            <button
              onClick={handleOpenAccountDropdownNav}
              className="px-3 mb-10 flex justify-between items-center w-full font-500"
            >
              <div className="flex items-center gap-3">
                <MdAccountCircle size="1.8rem" />
                <span>{`${userData.user.lastName}${userData.user.firstName}，你好`}</span>
              </div>
              <GoChevronRight />
            </button>
          )}

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

            {!userData.token && (
              <div className="text-gray text-xl font-400 mt-16">
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
            )}

            <div className="flex flex-col gap-5 mt-16 mb-20">
              {userData.token && (
                <Link
                  onClick={handleCloseNav}
                  to="/favorites"
                  className="flex gap-2"
                >
                  <LiaHeart />
                  最愛
                </Link>
              )}

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

        {/* 帳戶 Nav */}
        <AccountDropdownNav
          isOpenAccountDropdownNav={isOpenAccountDropdownNav}
          setIsOpenAccountDropdownNav={setIsOpenAccountDropdownNav}
          onClose={handleCloseNav}
        />

        {/* 詳細 Nav */}
        <DetailDropdownNav
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          onClose={handleCloseNav}
        />
      </div>

      <div
        onClick={handleCloseNav}
        className={`absolute top-0 left-0 bg-black opacity-30 w-full h-screen z-40 lg:hidden transition-all duration-300 ${
          isOpenNav ? "block" : "hidden"
        }`}
      ></div>
    </>
  );
}
