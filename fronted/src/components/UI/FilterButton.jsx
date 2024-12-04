/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";

import { filterActions } from "../../store/filter-slice.js";

export default function FilterButton({ filterType, filterName, children }) {
  const filters = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  function handleToggleFilter(filterType, value) {
    dispatch(filterActions.toggleFilter({ filterType, value }));
  }

  return (
    <>
      <button
        onClick={() => handleToggleFilter(filterType, filterName)}
        className={
          filters[filterType].includes(filterName) ? "checked" : "unchecked"
        }
      >
        {children}
      </button>
    </>
  );
}
