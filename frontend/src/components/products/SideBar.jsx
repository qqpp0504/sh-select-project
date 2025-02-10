import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { PRODUCTSNAV, PRODUCTSNAVMEN } from "../../data.js";
import Accordion from "../UI/Accordion.jsx";
import ShowMore from "../UI/ShowMore.jsx";
import FilterButton from "./FilterButton.jsx";
import { FILTERS } from "@/data.js";
import ProductsHeader from "./ProductsHeader.jsx";

export default function SideBar({ children }) {
  const [isShowing, setIsShowing] = useState(true);
  const [searchParams] = useSearchParams();

  let navItems = PRODUCTSNAV;

  const gender = searchParams.get("gender");

  if (gender === "men") {
    navItems = PRODUCTSNAVMEN;
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
                        type="category"
                        filterType="category"
                        param={option.param}
                      >
                        {option.filterName}
                      </FilterButton>
                    </li>
                  ))}
                </ul>
              </nav>

              <Accordion tag="性別" id="gender">
                <div className="flex flex-col items-start">
                  {FILTERS.gender.map((option) => (
                    <FilterButton
                      key={option.filterName}
                      filterType="gender"
                      param={option.param}
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
                      key={option.filterName}
                      filterType="newProduct"
                      param={option.param}
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
                      key={option.filterName}
                      filterType="onSale"
                      param={option.param}
                    >
                      {option.filterName}
                    </FilterButton>
                  ))}
                </div>
              </Accordion>

              <Accordion tag="品牌" id="brands">
                <ShowMore
                  content={
                    <div className="flex flex-col items-start">
                      {FILTERS.brandsTop.map((option) => (
                        <FilterButton
                          key={option.filterName}
                          filterType="brands"
                          param={option.param}
                        >
                          {option.filterName}
                        </FilterButton>
                      ))}
                    </div>
                  }
                  more={
                    <div className="flex flex-col items-start">
                      {FILTERS.brandsBottom.map((option) => (
                        <FilterButton
                          key={option.filterName}
                          filterType="brands"
                          param={option.param}
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
