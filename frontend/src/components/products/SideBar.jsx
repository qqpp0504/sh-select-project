/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSelector } from "react-redux";

import { PRODUCTSNAV, PRODUCTSNAVMEN } from "../../data.js";
import filterIcon from "../../assets/filter-icon.png";
import showIcon from "../../assets/show-icon.png";
import Accordion from "../UI/Accordion.jsx";
import ShowMore from "../UI/ShowMore.jsx";
import FilterButton from "./FilterButton.jsx";
import { FILTERS } from "../../data.js";

export default function SideBar({ children }) {
  const filters = useSelector((state) => state.filter.allFilters);
  const search = useSelector((state) => state.filter.searchTerm);
  const productsQuantity = useSelector((state) => state.filter.quantity);
  const [isShowing, setIsShowing] = useState(true); // 可以改成不要用狀態管理

  const { category, gender, newProduct, onSale, brands } = filters;

  let navItems = PRODUCTSNAV;
  let filterText = "所有產品";

  if (gender.length === 1 && gender[0] === "men") {
    navItems = PRODUCTSNAVMEN;
  }

  const activeFilters = [
    category.length > 0 &&
      (category === "top"
        ? "上衣"
        : category === "jacket"
        ? "外套及背心"
        : category === "bottom"
        ? "下著"
        : category === "sportsbar"
        ? "運動內衣"
        : category === "socks"
        ? "襪子"
        : category === "shoes"
        ? "鞋款"
        : category === "other"
        ? "其他配件"
        : ""),
    gender.length === 1 &&
      (gender[0] === "men" ? "男子" : gender[0] === "women" ? "女子" : ""),
    newProduct.length > 0 && "新品",
    onSale.length > 0 && "特惠商品",
  ].filter(Boolean);

  function formatBrandName(brand) {
    const spacedBrand = brand.replace(/([A-Z])/g, " $1").trim();

    return spacedBrand.charAt(0).toUpperCase() + spacedBrand.slice(1);
  }

  // 如果有篩選條件，就將它們合併到 filterText
  if (activeFilters.length > 0) {
    filterText = activeFilters.join(" "); // 用空格連接條件文字
  }

  if (brands.length === 1) {
    filterText = activeFilters.join(" ");
    filterText += " " + formatBrandName(brands[0]);
  }

  if (search) {
    filterText = search;
  }

  function handleShowing() {
    setIsShowing((showing) => !showing);
  }

  // 若用戶先點選運動內衣，那就不能出現男子之篩選條件
  let genderFilters = (
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
  );

  if (category === "sportsbar") {
    genderFilters = (
      <div>
        {FILTERS.genderWomen.map((option) => (
          <FilterButton
            key={option.param}
            filterType="gender"
            filterName={option.param}
          >
            {option.filterName}
          </FilterButton>
        ))}
      </div>
    );
  }

  // 更多品牌篩選條件（最上面）
  let moreFilters;

  if (brands.length > 1) {
    moreFilters = (
      <div className="mt-3 mb-1">
        <ol className="flex flex-row">
          {brands.map((brand, index) => (
            <>
              <li key={brand}>{formatBrandName(brand)}</li>
              {index < brands.length - 1 && <span className="px-2">/</span>}
            </>
          ))}
        </ol>
      </div>
    );
  } else {
    moreFilters = <div className="py-3"></div>;
  }

  if (search) {
    moreFilters = <div className="mt-3 mb-1">搜尋結果：</div>;
  }

  return (
    <>
      <div className="padding-large">
        {moreFilters}
        <div className="flex flex-row items-center justify-between pb-6">
          <h1 className="text-2xl font-500">
            {filterText} ({productsQuantity})
          </h1>
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
                  {navItems.map((option) => (
                    <li key={option.param} className="py-1 font-500">
                      <FilterButton
                        filterType="category"
                        filterName={option.param}
                        disableStyle={true}
                      >
                        {option.filterName}
                      </FilterButton>
                    </li>
                  ))}
                </ul>
              </nav>

              <Accordion tag="性別" id="gender">
                {genderFilters}
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
    </>
  );
}
