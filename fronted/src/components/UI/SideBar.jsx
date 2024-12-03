/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { PRODUCTSNAV } from "../../data.js";
import filterIcon from "../../assets/filter-icon.png";
import showIcon from "../../assets/show-icon.png";
import Accordion from "../../components/UI/Accordion.jsx";
import ShowMore from "../../components/UI/ShowMore.jsx";

export default function SideBar({ children }) {
  const { category } = useParams();
  const [isShowing, setIsShowing] = useState(true);
  const navigate = useNavigate();

  const genderText =
    category === "men" ? "男子" : category === "women" ? "女子" : "所有產品";

  function updateFilter(newGender) {
    const newPath = `/products/${newGender}`;
    navigate(newPath);
  }

  function handleShowing() {
    setIsShowing((showing) => !showing);
  }
  return (
    <div className="padding-large">
      <div className="flex flex-row items-center justify-between my-6">
        <h1 className="text-2xl font-500">{genderText}</h1>
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

      <div className="flex">
        <aside
          className={`h-[80vh] overflow-y-scroll scrollbar-thin transition-all duration-300 ease hidden lg:block ${
            isShowing
              ? "w-[16rem] translate-x-0"
              : "w-0 -translate-x-[calc(16rem+3rem)]"
          }`}
        >
          <div className="pr-5">
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
              <div className="unchecked">
                <button onClick={() => updateFilter("men")}>男子</button>

                <button onClick={() => updateFilter("women")}>女子</button>
              </div>
            </Accordion>

            <Accordion tag="促銷與折扣" id="discount">
              <div className="unchecked">
                <button>超值優惠商品</button>
              </div>
            </Accordion>

            <Accordion tag="品牌" id="brands">
              <ShowMore
                content={
                  <div className="unchecked">
                    <button>Asics</button>
                    <button>Adidas</button>
                    <button>Converse</button>
                    <button>Mizuno</button>
                  </div>
                }
                more={
                  <div className="unchecked">
                    <button>Nautica</button>
                    <button>Nike</button>
                    <button>Ordinary</button>
                    <button>The North Face</button>
                  </div>
                }
              />
            </Accordion>
          </div>
        </aside>
        <section className={`w-full ${isShowing ? "lg:pl-12" : undefined}`}>
          {children}
        </section>
      </div>
    </div>
  );
}
