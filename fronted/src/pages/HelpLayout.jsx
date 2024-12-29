import { useState } from "react";
import { Outlet } from "react-router-dom";

import Input from "../components/UI/Input.jsx";
import searchIcon from "../assets/search-icon-gray.png";

export default function HelpLayout() {
  const [searchValue, setSearchValue] = useState();

  function handleChange(event) {
    setSearchValue(event.target.value);
  }

  return (
    <div className="flex justify-center">
      <div className="max-w-[78rem] w-full flex flex-col items-center mt-10">
        <div className="flex flex-col w-[29rem] gap-4">
          <h1 className="text-[2.1rem] font-500 text-center">取得協助</h1>
          <div className="relative">
            <Input
              placeholderText="我們能提供你什麼協助？"
              paddingStyle="p-[0.9rem]"
              value={searchValue}
              onChange={handleChange}
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 before:absolute before:inset-0 before:rounded-full before:hover:bg-gray-100 before:scale-0 hover:before:scale-100 before:transition-transform before:duration-300 before:-z-10">
              <img src={searchIcon} alt="Search icon" className="w-6" />
            </button>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
