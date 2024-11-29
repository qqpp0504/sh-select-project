import { Link } from "react-router-dom";

import filterIcon from "../assets/filter-icon.png";
import showIcon from "../assets/show-icon.png";
import { PRODUCTSNAV } from "../data.js";

export default function Products() {
  return (
    <div className="padding-large">
      <div className="flex flex-row items-center justify-between my-6">
        <h1 className="text-2xl font-500">所有產品</h1>
        <nav>
          <ul className="flex flex-row gap-8">
            <li>
              <button className="flex flex-row items-center gap-[0.625rem]">
                隱藏篩選條件
                <img src={filterIcon} alt="Filter icon" className="w-5" />
              </button>
            </li>
            <li>
              <button className="flex flex-row items-center gap-[0.625rem]">
                排序依據
                <img src={showIcon} alt="Show more icon" className="w-5" />
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <aside className="w-[14%]">
        <nav className="pb-10">
          <ul>
            {PRODUCTSNAV.map((tag) => (
              <li key={tag} className="py-1">
                <Link to="/products">
                  <span className="font-500">{tag}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <hr />

        <label className="py-4 block cursor-pointer custom-checkbox">
          <div className="flex flex-row justify-between items-center">
            <span className="font-500">優惠商品</span>
            <input type="checkbox" className="hidden" />
            <img src={showIcon} alt="Filter icon" className="w-4 h-4" />
          </div>
        </label>

        <hr />
      </aside>
    </div>
  );
}
