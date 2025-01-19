/* eslint-disable react/prop-types */
import { useSearchParams } from "react-router-dom";

import "./FilterButton.css";

export default function FilterButton({
  filterType,
  param,
  type = "filter",
  children,
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  // 獲取當前的性別過濾器值（可能是多個）
  const getGenderFilters = () => {
    const genderParam = searchParams.get(filterType);
    return genderParam ? genderParam.split("-") : [];
  };

  function handleClickFilter() {
    const currentFilters = getGenderFilters();
    const newParams = new URLSearchParams(searchParams);

    if (currentFilters.includes(param)) {
      // 如果已經選中，則移除
      const updatedFilters = currentFilters.filter(
        (filter) => filter !== param
      );
      if (updatedFilters.length === 0) {
        newParams.delete(filterType);
      } else {
        newParams.set(filterType, updatedFilters.sort().join("-"));
      }
    } else {
      // 如果未選中，則添加
      const updatedFilters = [...currentFilters, param];

      newParams.set(filterType, updatedFilters.sort().join("-"));
    }

    setSearchParams(newParams);
  }

  function handleClickCategory() {
    const newParams = new URLSearchParams(searchParams);

    newParams.set(filterType, param);

    setSearchParams(newParams);
  }

  const isChecked = getGenderFilters().includes(param);

  return (
    <>
      {type === "filter" && (
        <button
          onClick={handleClickFilter}
          className={`${isChecked ? "checked" : "unchecked"}`}
        >
          {children}
        </button>
      )}
      {type === "category" && (
        <button onClick={handleClickCategory}>{children}</button>
      )}
    </>
  );
}
