import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import "./ProductsHeader.css";
import filterIcon from "@/assets/filter-icon.png";
import showIcon from "@/assets/show-icon.png";

export default function ProductsHeader({ isShowing, setIsShowing }) {
  const [isShowingSortBlock, setIsShowingSortBlock] = useState(false);
  const sortBlock = useRef();
  const productsQuantity = useSelector((state) => state.filter.quantity);
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category");
  const gender = searchParams.get("gender");
  const newProduct = searchParams.get("newProduct");
  const onSale = searchParams.get("onSale");
  const search = searchParams.get("search");
  const sortby = searchParams.get("sortby");
  let brands = searchParams.get("brands");

  if (brands?.includes("-")) {
    brands = brands.split("-");
  }

  let filterText = "所有產品";

  const activeFilters = [
    category &&
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
    gender && (gender === "men" ? "男子" : gender === "women" ? "女子" : ""),
    newProduct && "新品",
    onSale && "特惠商品",
    brands && !Array.isArray(brands) && formatBrandName(brands),
  ].filter(Boolean);

  function formatBrandName(brand) {
    const spacedBrand = brand.replace(/([A-Z])/g, " $1").trim();

    return spacedBrand.charAt(0).toUpperCase() + spacedBrand.slice(1);
  }

  // 如果有篩選條件，就將它們合併到 filterText
  if (activeFilters.length > 0) {
    filterText = activeFilters.join(" "); // 用空格連接條件文字
  }

  if (search) {
    filterText = search;
  }

  function handleShowing() {
    setIsShowing((showing) => !showing);
  }

  // 更多品牌篩選條件（最上面）
  let moreFilters;

  if (Array.isArray(brands) && brands.length > 1) {
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

  function handleClickOutside(event) {
    // 如果點擊的是排序區塊外部，則隱藏排序區塊
    if (sortBlock.current && !sortBlock.current.contains(event.target)) {
      setIsShowingSortBlock(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleOpenSortBlock() {
    setIsShowingSortBlock((prev) => !prev);
  }

  function handleToggleSort(sortType) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sortby", sortType);
    setSearchParams(newParams);

    setIsShowingSortBlock(false);
  }

  let sortedFilterText = "";
  if (sortby === "newest") {
    sortedFilterText += "：最新";
  } else if (sortby === "price-desc") {
    sortedFilterText += "：價格：由高到低";
  } else if (sortby === "price-asc") {
    sortedFilterText += "：價格：由低到高";
  }

  return (
    <>
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
            <li ref={sortBlock} className="relative">
              <button
                onClick={handleOpenSortBlock}
                className="flex flex-row items-center gap-[0.625rem]"
              >
                <div>
                  排序依據<span className="text-gray">{sortedFilterText}</span>
                </div>
                <img
                  src={showIcon}
                  alt="Show more icon"
                  className={`w-5 icon ${
                    isShowingSortBlock ? "toggle-icon" : undefined
                  }`}
                />
              </button>

              {isShowingSortBlock && (
                <div className="absolute right-0 top-full w-[10rem] h-[8rem] bg-white rounded-2xl px-5 py-4">
                  <ul className="flex flex-col justify-between w-full h-full items-end">
                    <li className="hover:text-gray">
                      <button onClick={() => handleToggleSort("newest")}>
                        最新
                      </button>
                    </li>
                    <li className="hover:text-gray">
                      <button onClick={() => handleToggleSort("price-desc")}>
                        價格：由高到低
                      </button>
                    </li>
                    <li className="hover:text-gray">
                      <button onClick={() => handleToggleSort("price-asc")}>
                        價格：由低到高
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
