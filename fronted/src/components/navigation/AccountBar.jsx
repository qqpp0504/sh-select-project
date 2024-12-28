import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { accountActions } from "../../store/account-slice.js";
import accountIcon from "../../assets/account-icon.png";

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
        <li className="group border-solid border-r-1 border-black px-3 hover:text-gray">
          <div className="flex items-center gap-2 cursor-pointer">
            <span>{`${userData.user.lastName}${userData.user.firstName}，你好`}</span>
            <img src={accountIcon} alt="Account icon" className="w-5" />
          </div>

          <div className="absolute right-14 top-full hidden w-[15rem] pt-5 -mt-5 z-10 text-black hover:block group-hover:block">
            <div className="bg-white rounded-b-lg px-6 py-4">
              <span className="text-lg mb-2 inline-block">帳號</span>
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
                  <Link to="/" className="hover:text-black">
                    最愛
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="hover:text-black">
                    登出
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </>
    );
  }

  return (
    <div className="relative flex justify-between text-[0.8rem] bg-gray-100 px-12 py-2">
      <h2 className="uppercase">SH Select</h2>
      <nav>
        <ul className="flex flex-row items-center">
          <li className="border-solid border-r-1 border-black px-3 hover:text-gray">
            <Link to="/" onClick={handlePreventDefault}>
              協助
            </Link>
          </li>
          <div>|</div>
          {userMenu}
        </ul>
      </nav>
    </div>
  );
}
