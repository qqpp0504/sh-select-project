import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";
import accountIcon from "../../assets/account-icon.png";
import messageIcon from "../../assets/message-icon.png";
import shoppingBagIcon from "../../assets/shoppingBag2-icon.png";

export default function CheckoutNav() {
  return (
    <nav className="padding-large py-4 flex justify-between items-center">
      <div>
        <Link to="/">
          <img src={logo} alt="SH-Select Logo" className="w-14" />
        </Link>
      </div>
      <div className="flex gap-9">
        <img src={messageIcon} alt="Message icon" className="w-6 h-6" />
        <img src={shoppingBagIcon} alt="ShoppingBag icon" className="w-6 h-6" />
        <img src={accountIcon} alt="Account icon" className="w-6 h-6" />
      </div>
    </nav>
  );
}
