/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { PRODUCTSNAV, PRODUCTSNAVMEN } from "../../data.js";
import filterIcon from "../../assets/filter-icon.png";
import showIcon from "../../assets/show-icon.png";
import Accordion from "../../components/UI/Accordion.jsx";
import ShowMore from "../../components/UI/ShowMore.jsx";
import FilterButton from "./filterButton.jsx";
import { FILTERS } from "../../data.js";

export default function SideBar({ children }) {
  const filters = useSelector((state) => state.filter);
  const navigate = useNavigate();
  const { gender } = useParams();
  const [isShowing, setIsShowing] = useState(true); // 可以改成不要用狀態管理

  const navItems = gender === "men" ? PRODUCTSNAVMEN : PRODUCTSNAV;

  const genderText =
    gender === "men" ? "男子" : gender === "women" ? "女子" : "所有產品";

  // 自動同步 URL，根據所選擇的篩選條件狀態來更改 URL
  useEffect(() => {
    const { gender, onSale, brands, newProduct } = filters;
    let path = "/products";

    if (gender.length > 0) {
      if (gender.includes("men") && gender.includes("women")) {
        path += "/unisex";
      } else {
        path += "/" + gender.join("-");
      }
    }

    if (newProduct.length > 0) {
      path += "/" + newProduct;
    }

    if (onSale.length > 0) {
      path += "/" + onSale;
    }

    if (brands.length > 0) {
      const sortedBrands = [...brands].sort();
      path += "/" + sortedBrands.join("-");
    }

    navigate(path);
  }, [filters, navigate]);

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
                {navItems.map((tag) => (
                  <li key={tag} className="py-1">
                    <Link to="/products">
                      <span className="font-500">{tag}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <Accordion tag="性別" id="gender">
              <div>
                {FILTERS.gender.map((option) => (
                  <FilterButton
                    key={option.param}
                    filterType="gender"
                    filterName={option.param}
                  >
                    {option.filterName}
                  </FilterButton>
                ))}
              </div>
            </Accordion>

            <Accordion tag="新上架" id="newProduct">
              <div>
                {FILTERS.new.map((option) => (
                  <FilterButton
                    key={option.param}
                    filterType="newProduct"
                    filterName={option.param}
                  >
                    {option.filterName}
                  </FilterButton>
                ))}
              </div>
            </Accordion>

            <Accordion tag="促銷與折扣" id="discount">
              <div>
                {FILTERS.onSale.map((option) => (
                  <FilterButton
                    key={option.param}
                    filterType="onSale"
                    filterName={option.param}
                  >
                    {option.filterName}
                  </FilterButton>
                ))}
              </div>
            </Accordion>

            <Accordion tag="品牌" id="brands">
              <ShowMore
                content={
                  <div>
                    {FILTERS.brandsTop.map((option) => (
                      <FilterButton
                        key={option.param}
                        filterType="brands"
                        filterName={option.param}
                      >
                        {option.filterName}
                      </FilterButton>
                    ))}
                  </div>
                }
                more={
                  <div>
                    {FILTERS.brandsBottom.map((option) => (
                      <FilterButton
                        key={option.param}
                        filterType="brands"
                        filterName={option.param}
                      >
                        {option.filterName}
                      </FilterButton>
                    ))}
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
