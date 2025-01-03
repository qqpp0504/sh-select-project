import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import logo from "../../assets/logo.png";
import accountIcon from "../../assets/account-icon.png";
import messageIcon from "../../assets/message-icon.png";
import shoppingBagIcon from "../../assets/shoppingBag2-icon.png";

export default function CheckoutNav() {
  const { userData } = useSelector((state) => state.account);

  return (
    <nav className="padding-large py-4 flex justify-between items-center">
      <div>
        <Link to="/">
          <img src={logo} alt="SH-Select Logo" className="w-14" />
        </Link>
      </div>
      <div className="flex gap-9">
        <span>0961-542-566</span>
        <img src={messageIcon} alt="Message icon" className="w-6 h-6" />
        <img src={shoppingBagIcon} alt="ShoppingBag icon" className="w-6 h-6" />
        {!userData.token && (
          <img src={accountIcon} alt="Account icon" className="w-6 h-6" />
        )}
      </div>
    </nav>
  );
}
