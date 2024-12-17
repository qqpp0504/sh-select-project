import { Link, NavLink } from "react-router-dom";

import logo from "../../assets/logo.png";
import Icon from "../UI/Icon.jsx";
import SearchInput from "../UI/SearchInput.jsx";

export default function MainNav() {
  const TAGS = [
    { name: "新品和精選", link: "/" },
    { name: "男款", link: "men" },
    { name: "女款", link: "female" },
    { name: "品牌", link: "brands" },
    { name: "特惠商品", link: "promotion" },
  ];

  return (
    <nav className="padding-large py-2 flex flex-row items-center text-base">
      <div className="flex-1 flex justify-start">
        <Link to="/">
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
              >
                {tag.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 flex justify-end items-center gap-4">
        <SearchInput />
        <Link to="/">
          <Icon type="heart" />
        </Link>
        <Link to="/cart">
          <Icon type="shopping-cart" />
        </Link>
      </div>
    </nav>
  );
}
