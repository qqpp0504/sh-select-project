import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { accountActions } from "../../store/account-slice.js";
import accountIcon from "../../assets/account-icon.png";
import DropdownMenu from "./DropdownMenu.jsx";

export default function AccountBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isShowingNotification } = useSelector((state) => state.cart);
  const { userData } = useSelector((state) => state.account);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      dispatch(accountActions.login({ token, user }));
    }
  }, [dispatch]);

  function handlePreventDefault(event) {
    if (isShowingNotification) {
      event.preventDefault();
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(accountActions.logout());
    navigate("/");
  }

  let userMenu = (
    <>
      <li className="border-solid border-r-1 border-black px-3 hover:text-gray">
        <Link to="/membership" onClick={handlePreventDefault}>
          加入
        </Link>
      </li>
      <div>|</div>
      <li className="pl-3 hover:text-gray-500">
        <Link to="/accounts" onClick={handlePreventDefault}>
          登入
        </Link>
      </li>
    </>
  );

  if (userData.token) {
    userMenu = (
      <>
        <li className="group border-solid border-r-1 border-black px-3 hover:text-gray py-2 -my-2">
          <Link to="/" className="flex items-center gap-2">
            <span>{`${userData.user.lastName}${userData.user.firstName}，你好`}</span>
            <img src={accountIcon} alt="Account icon" className="w-5" />
          </Link>

          <DropdownMenu title="帳號">
            <ul className="text-gray flex flex-col gap-2">
              <li>
                <Link to="/" className="hover:text-black">
                  個人檔案
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-black">
                  訂單
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-black">
                  最愛
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="hover:text-black">
                  登出
                </button>
              </li>
            </ul>
          </DropdownMenu>
        </li>
      </>
    );
  }

  return (
    <div className="relative flex justify-between text-[0.8rem] bg-gray-100 px-12 py-2">
      <h2 className="uppercase">SH Select</h2>
      <nav>
        <ul className="flex flex-row items-center list-none">
          <li className="group border-solid border-r-1 border-black px-3 hover:text-gray py-2 -my-2">
            <Link to="/help" onClick={handlePreventDefault}>
              協助
            </Link>

            <DropdownMenu title="協助">
              <ul className="text-gray flex flex-col gap-2">
                <li>
                  <Link to="/help/refund-policy" className="hover:text-black">
                    退貨
                  </Link>
                </li>
                <li>
                  <Link
                    to="/help/shipping-delivery"
                    className="hover:text-black"
                  >
                    出貨與寄送
                  </Link>
                </li>
                <li>
                  <Link to="/help/order-tracking" className="hover:text-black">
                    訂單與付款
                  </Link>
                </li>
              </ul>
            </DropdownMenu>
          </li>
          <div>|</div>
          {userMenu}
        </ul>
      </nav>
    </div>
  );
}
