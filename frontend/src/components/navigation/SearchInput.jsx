import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

import SearchBlock from "./SearchBlock.jsx";

export default function SearchInput() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams] = useSearchParams();

  let searchValue = "";

  if (location.pathname.includes("products")) {
    searchValue = searchParams.get("search");
  }

  function handleOpenSearchBlock() {
    setIsOpen(true);
  }

  function handleCloseSearchBlock() {
    setIsOpen(false);
  }

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      {isOpen && <SearchBlock onClose={handleCloseSearchBlock} />}
      <div
        onClick={handleOpenSearchBlock}
        className="relative lg:w-[33%] group"
      >
        <button className="lg:absolute rounded-3xl lg:top-1/2 lg:-translate-y-1/2 p-[0.35rem] lg:bg-gray-100 hover:bg-white-hoverColor">
          <IoIosSearch />
        </button>
        <input
          type="text"
          placeholder="搜尋"
          defaultValue={searchValue}
          className="hidden lg:block bg-gray-100 rounded-3xl placeholder-gray-500 px-10 py-2 w-[100%] h-9 outline-none group-hover:bg-gray-200"
        />
      </div>
    </>
  );
}
