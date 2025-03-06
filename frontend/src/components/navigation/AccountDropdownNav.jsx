import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GoChevronLeft } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";

import { accountActions } from "@/store/account-slice.js";

export default function AccountDropdownNav({
  isOpenAccountDropdownNav,
  setIsOpenAccountDropdownNav,
  onClose,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleGoBackNav() {
    setIsOpenAccountDropdownNav(false);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(accountActions.logout());
    navigate("/");
    onClose();
  }

  return (
    <div
      className={`absolute w-full p-5 transition-all duration-300 ${
        isOpenAccountDropdownNav ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center mb-10">
        <button onClick={handleGoBackNav} className="flex items-center gap-3">
          <GoChevronLeft />
          <div>全部</div>
        </button>
        <button
          onClick={onClose}
          className="hover:bg-gray-200 p-1 rounded-full"
        >
          <IoCloseOutline size="1.7rem" />
        </button>
      </div>

      <div className="px-3">
        <h2 className="text-2xl font-500 mb-8">我的帳號</h2>

        <ul className="flex flex-col gap-4 text-gray">
          <li>
            <Link to="/member" onClick={onClose}>
              個人檔案
            </Link>
          </li>
          <li>
            <Link to="/member/orders" onClick={onClose}>
              訂單
            </Link>
          </li>
          <li>
            <Link to="/favorites" onClick={onClose}>
              最愛
            </Link>
          </li>
          <li>
            <button onClick={handleLogout}>登出</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
