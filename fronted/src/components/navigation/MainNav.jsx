import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import logo from "../../assets/logo.png";
import Icon from "../UI/Icon.jsx";
import SearchInput from "../UI/SearchInput.jsx";

export default function MainNav() {
  const { isShowingNotification, totalQuantity } = useSelector(
    (state) => state.cart
  );

  const TAGS = [
    { name: "新品和精選", link: "/" },
    { name: "男款", link: "men" },
    { name: "女款", link: "female" },
    { name: "品牌", link: "brands" },
  ];

  function handlePreventDefault(event) {
    if (isShowingNotification) {
      event.preventDefault();
    }
  }

  return (
    <nav className="padding-large py-2 flex flex-row items-center text-base">
      <div className="flex-1 flex justify-start">
        <Link to="/" onClick={handlePreventDefault}>
          <img src={logo} alt="SH-Select Logo" className="w-14" />
        </Link>
      </div>

      <div>
        <ul className="flex-1 flex justify-center gap-6 font-400">
          {TAGS.map((tag) => (
            <li key={tag.name}>
              <NavLink
                to={tag.link}
                className={({ isActive }) =>
                  `hover:active ${isActive ? "active" : undefined}`
                }
                onClick={handlePreventDefault}
              >
                {tag.name}
              </NavLink>
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
