import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

import logo from "@/assets/logo.png";
import Button from "../UI/Button";

export default function SearchBlock({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  const HOTSEARCH = ["dunk", "襪子", "黑色", "運動", "背包"];

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const { search } = Object.fromEntries(fd.entries());

    if (!search) {
      return;
    }

    handleSearch(search);
  }

  function handleSearch(search) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("search", search);
    setSearchParams(newParams);
    navigate(`products?search=${search}`);
    onClose();
  }

  function handleChange(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className={`padding-small lg:padding-large py-3 w-full h-full lg:h-[18rem] z-50 bg-white fixed inset-0 transition-all duration-300 ease-out ${
          isOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 duration-0"
        }`}
      >
        <div className="flex justify-between items-center">
          <img
            src={logo}
            alt="SH SELECT Logo"
            className="w-16 hidden lg:block"
          />

          <div className="w-[78%] lg:w-[60%] relative group">
            <button
              type="submit"
              className="absolute top-1/2 -translate-y-1/2 rounded-3xl p-[0.35rem] bg-gray-100 hover:bg-white-hoverColor"
            >
              <IoIosSearch />
            </button>
            <input
              type="text"
              placeholder="搜尋"
              name="search"
              value={searchTerm}
              onChange={handleChange}
              autoFocus
              className="bg-gray-100 rounded-3xl placeholder-gray-500 px-10 py-2 w-[100%] h-9 outline-none group-hover:bg-gray-200"
            />
          </div>

          <button type="button" onClick={onClose} className="hover:text-gray">
            取消
          </button>
        </div>

        <div className="flex flex-1 flex-col justify-center items-center my-8 lg:ml-6">
          <div className="w-full lg:w-[60%]">
            <p className="text-gray text-[0.9rem]">熱門搜尋字詞</p>
            <div className="my-4 flex flex-wrap gap-4">
              {HOTSEARCH.map((item) => (
                <button
                  type="button"
                  onClick={() => handleSearch(item)}
                  key={item}
                >
                  <Button variant="gray" size="lg" className="font-500">
                    {item}
                  </Button>
                </button>
              ))}
            </div>
          </div>
        </div>
      </form>
      {isOpen && (
        <div
          onClick={onClose}
          className="bg-black opacity-30 fixed inset-0 z-40"
        ></div>
      )}
    </div>
  );
}
