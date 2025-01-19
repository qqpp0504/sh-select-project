import { useDispatch } from "react-redux";

import logo from "../../assets/logo.png";
import accountIcon from "../../assets/account-icon.png";
import messageIcon from "../../assets/message-icon.png";
import shoppingBagIcon from "../../assets/shoppingBag2-icon.png";
import { modalActions } from "../../store/modal-slice.js";

export default function CheckoutNav() {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  function handleOpenShippingModal(link) {
    dispatch(
      modalActions.showModal({ modalType: "shippingModal", link: link })
    );
  }

  return (
    <nav className="padding-large py-4 flex justify-between items-center">
      <button onClick={() => handleOpenShippingModal("/")}>
        <img src={logo} alt="SH-Select Logo" className="w-14" />
      </button>

      <div className="flex gap-9">
        <span>0961-542-566</span>

        <a href="/help" target="_blank" className="w-6 h-6">
          <img src={messageIcon} alt="Message icon" />
        </a>

        <button
          onClick={() => handleOpenShippingModal("/cart")}
          className="w-6 h-6"
        >
          <img src={shoppingBagIcon} alt="ShoppingBag icon" />
        </button>

        {!token && (
          <button
            onClick={() => handleOpenShippingModal("/accounts")}
            className="w-6 h-6"
          >
            <img src={accountIcon} alt="Account icon" />
          </button>
        )}
      </div>
    </nav>
  );
}
