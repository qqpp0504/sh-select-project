import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { MdRadioButtonUnchecked, MdRadioButtonChecked } from "react-icons/md";

import { FILTERS } from "@/data.js";
import FilterButton from "./FilterButton.jsx";
import ShowMore from "./ShowMore.jsx";
import FilterBlock from "./FilterBlock.jsx";
import Button from "../UI/Button.jsx";

export default function FilterModal({
  isOpenFilterModal,
  setIsOpenFilterModal,
}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortby = searchParams.get("sortby");
  let gender = searchParams.get("gender");
  let brands = searchParams.get("brands");

  let filterQuantity;

  if (brands?.includes("-") && gender?.includes("-")) {
    brands = brands.split("-");
    gender = gender.split("-");
    filterQuantity = searchParams.size + brands.length + gender.length - 2;
  } else if (brands?.includes("-")) {
    brands = brands.split("-");
    filterQuantity = searchParams.size + brands.length - 1;
  } else if (gender?.includes("-")) {
    gender = gender.split("-");
    filterQuantity = searchParams.size + gender.length - 1;
  } else {
    filterQuantity = searchParams.size;
  }

  useEffect(() => {
    if (isOpenFilterModal) {
      document.body.style.overflow = "hidden"; // 禁止滾動
    } else {
      document.body.style.overflow = ""; // 恢復滾動
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpenFilterModal]);

  function handleCloseFilterModal() {
    setIsOpenFilterModal(false);
  }

  function handleToggleSort(sortType) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sortby", sortType);
    setSearchParams(newParams);
  }

  return (
    <>
      <div
        className={`
      fixed bottom-0 w-full h-screen z-50 bg-white flex flex-col
      transition-transform duration-300 ease-in-out lg:hidden
      ${isOpenFilterModal ? "translate-y-0" : "translate-y-full"}
    `}
      >
        <button
          onClick={handleCloseFilterModal}
          className="bg-black rounded-full p-[0.4rem] absolute right-6 top-6"
        >
          <IoCloseOutline color="white" size="1.7rem" />
        </button>

        <div className="pt-14 px-6 overflow-y-auto">
          <div>篩選</div>

          <FilterBlock filterClass="排序依據">
            <button
              onClick={() => handleToggleSort("newest")}
              className="flex gap-2"
            >
              {sortby === "newest" ? (
                <MdRadioButtonChecked />
              ) : (
                <MdRadioButtonUnchecked />
              )}
              <div>最新</div>
            </button>
            <button
              onClick={() => handleToggleSort("price-desc")}
              className="flex gap-2"
            >
              {sortby === "price-desc" ? (
                <MdRadioButtonChecked />
              ) : (
                <MdRadioButtonUnchecked />
              )}
              <div>價格：由高到低</div>
            </button>
            <button
              onClick={() => handleToggleSort("price-asc")}
              className="flex gap-2"
            >
              {sortby === "price-asc" ? (
                <MdRadioButtonChecked />
              ) : (
                <MdRadioButtonUnchecked />
              )}
              <div>價格：由低到高</div>
            </button>
          </FilterBlock>

          <FilterBlock filterClass="性別">
            {FILTERS.gender.map((option) => (
              <FilterButton
                key={option.filterName}
                filterType="gender"
                param={option.param}
              >
                {option.filterName}
              </FilterButton>
            ))}
          </FilterBlock>

          <FilterBlock filterClass="新上架">
            {FILTERS.new.map((option) => (
              <FilterButton
                key={option.filterName}
                filterType="newProduct"
                param={option.param}
              >
                {option.filterName}
              </FilterButton>
            ))}
          </FilterBlock>

          <FilterBlock filterClass="促銷與折扣">
            {FILTERS.onSale.map((option) => (
              <FilterButton
                key={option.filterName}
                filterType="onSale"
                param={option.param}
              >
                {option.filterName}
              </FilterButton>
            ))}
          </FilterBlock>

          <FilterBlock filterClass="品牌" hasBorder={false}>
            <ShowMore
              id="show-more"
              content={
                <div className="flex flex-col items-start gap-2">
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
                <div className="flex flex-col items-start gap-2 mt-2">
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
          </FilterBlock>
        </div>

        <div
          className={`padding-small sticky bottom-0 w-full bg-white border-t border-gray-200 transition-all ease-in-out ${
            searchParams.size >= 1
              ? "translate-y-0 h-auto opacity-100 py-4"
              : "translate-y-full h-0 opacity-0 py-0"
          }`}
        >
          <div className="flex gap-2">
            {filterQuantity >= 2 && (
              <Button
                onClick={() => navigate("/products")}
                variant="bordered"
                className="w-full"
              >{`重設 (${filterQuantity})`}</Button>
            )}
            <Button
              onClick={handleCloseFilterModal}
              size="custom"
              className="w-full py-2"
            >
              套用
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`fixed bottom-0 w-full h-screen z-20 bg-black lg:hidden duration-100 transition-all ease-in-out ${
          isOpenFilterModal
            ? "opacity-30 translate-y-0"
            : "opacity-0 translate-y-full"
        }`}
      ></div>
    </>
  );
}
