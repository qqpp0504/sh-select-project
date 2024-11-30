import { useState } from "react";
import { Link } from "react-router-dom";

import filterIcon from "../assets/filter-icon.png";
import showIcon from "../assets/show-icon.png";
import { PRODUCTSNAV } from "../data.js";
import Accordion from "../components/UI/Accordion.jsx";
import ShowMore from "../components/UI/ShowMore.jsx";

export default function ProductsPage() {
  const [isShowing, setIsShowing] = useState(true);

  function handleShowing() {
    setIsShowing((showing) => !showing);
  }

  return (
    <div className="padding-large">
      <div className="flex flex-row items-center justify-between my-6">
        <h1 className="text-2xl font-500">所有產品</h1>
        <nav>
          <ul className="flex flex-row gap-8">
            <li>
              <button
                onClick={handleShowing}
                className="flex flex-row items-center gap-[0.625rem]"
              >
                {isShowing ? "隱藏篩選條件" : "顯示篩選條件"}
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

      <aside
        className={`w-[14%] transition-all duration-300 ease overflow-hidden ${
          isShowing ? "translate-x-0" : "-translate-x-[calc(14vw+3rem)]"
        }`}
      >
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

        <Accordion tag="性別" id="sex">
          <span>男子</span>
          <span>女子</span>
        </Accordion>

        <Accordion tag="優惠商品" id="discount">
          <span>7折以下商品</span>
          <span>8折以下商品</span>
        </Accordion>

        <Accordion tag="品牌" id="brands">
          <ShowMore
            content={
              <>
                <span>Asics</span>
                <span>Adidas</span>
                <span>Converse</span>
                <span>Mizuno</span>
              </>
            }
            more={
              <>
                <span>Nautica</span>
                <span>Nike</span>
                <span>Ordinary</span>
                <span>The North Face</span>
              </>
            }
          />
        </Accordion>

        <hr />
      </aside>
    </div>
  );
}
