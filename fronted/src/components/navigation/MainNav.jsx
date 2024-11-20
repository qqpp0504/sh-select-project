import logo from "../../assets/logo.png";
import Icon from "../UI/Icon.jsx";
import Input from "../UI/Input.jsx";

export default function MainNav() {
  return (
    <div className="padding-large flex justify-between items-center text-base">
      <div className="flex-1 flex justify-start">
        <img src={logo} alt="SH-Select Logo" className="w-16" />
      </div>

      <nav>
        <ul className="flex-1 flex justify-center gap-6 font-400">
          <li>新品和精選</li>
          <li>品牌</li>
          <li>男款</li>
          <li>女款</li>
          <li>特惠商品</li>
        </ul>
      </nav>

      <div className="flex-1 flex justify-end items-center gap-4">
        <div className="relative w-[33%]">
          <div className="absolute bottom-2 left-2">
            <Icon type="search" />
          </div>
          <Input />
        </div>
        <Icon type="heart" />
        <Icon type="shopping-cart" />
      </div>
    </div>
  );
}
