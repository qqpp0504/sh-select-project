import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";
import Icon from "../UI/Icon.jsx";
import Input from "../UI/Input.jsx";

export default function MainNav() {
  const TAGS = ["新品和精選", "品牌", "男款", "女款", "特惠商品"];

  return (
    <div className="padding-large py-2 flex flex-row items-center text-base">
      <div className="flex-1 flex justify-start">
        <img src={logo} alt="SH-Select Logo" className="w-14" />
      </div>

      <nav>
        <ul className="flex-1 flex justify-center gap-6 font-400">
          {TAGS.map((tag) => (
            <li key={tag}>
              <Link to="/" className="pb-1 hover:border-b-2 hover:border-black">
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex-1 flex justify-end items-center gap-4">
        <Input />
        <Icon type="heart" />
        <Icon type="shopping-cart" />
      </div>
    </div>
  );
}
