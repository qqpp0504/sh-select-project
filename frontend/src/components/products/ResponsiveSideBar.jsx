import { useSelector } from "react-redux";
import { PiSlidersHorizontal } from "react-icons/pi";

import classes from "./SideBar.module.css";
import FilterButton from "./FilterButton.jsx";
import Button from "../UI/Button.jsx";

export default function ResponsiveSideBar({ navItems }) {
  const { quantity } = useSelector((state) => state.filter);

  return (
    <nav className="mt-2 block lg:hidden">
      <ul
        className={`flex gap-8 padding-small pb-3 border-b border-gray-200 overflow-x-auto ${classes["hide-scrollbar"]}`}
      >
        {navItems.map((option) => (
          <li
            key={option.param}
            className="py-1 font-500 flex-shrink-0 hover:text-gray"
          >
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

      <div className="padding-small flex items-center justify-between py-3">
        <div className="text-gray">{`${quantity} 項結果`}</div>
        <Button
          variant="bordered"
          size="sm"
          className="flex gap-2 border border-gray-200 items-center"
        >
          <div>篩選</div>
          <PiSlidersHorizontal size="1.4rem" />
        </Button>
      </div>
    </nav>
  );
}
