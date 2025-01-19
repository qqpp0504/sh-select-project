/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSelector } from "react-redux";

import { PRODUCTSNAV, PRODUCTSNAVMEN } from "../../data.js";

import Accordion from "../UI/Accordion.jsx";
import ShowMore from "../UI/ShowMore.jsx";
import FilterButton from "./FilterButton.jsx";
import { FILTERS } from "../../data.js";
import ProductsHeader from "./ProductsHeader.jsx";

export default function SideBar({ children }) {
  const { category, gender } = useSelector((state) => state.filter.allFilters);

  const [isShowing, setIsShowing] = useState(true); // 可以改成不要用狀態管理

  let navItems = PRODUCTSNAV;

  if (gender.length === 1 && gender[0] === "men") {
    navItems = PRODUCTSNAVMEN;
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

  return (
    <>
      <div className="padding-large">
        <ProductsHeader isShowing={isShowing} setIsShowing={setIsShowing} />

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
