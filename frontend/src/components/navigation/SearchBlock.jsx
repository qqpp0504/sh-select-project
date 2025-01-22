/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import logo from "@/assets/logo.png";
import searchIcon from "@/assets/search-icon.png";
import { filterActions } from "@/store/filter-slice.js";
import Button from "../UI/Button";

export default function SearchBlock({ onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const HOTSEARCH = ["dunk", "襪子", "黑色", "運動", "背包"];

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const { search } = Object.fromEntries(fd.entries());

    if (!search) {
      return;
    }

    dispatch(filterActions.updatedSearchTerm(search));
    navigate(`products?search=${search}`);
    onClose();
  }

  function handleSearch(search) {
    dispatch(filterActions.updatedSearchTerm(search));
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
        className="padding-large py-3 w-full h-[18rem] z-20 bg-white fixed inset-0"
      >
        <div className="flex justify-between items-center">
          <img src={logo} alt="SH SELECT Logo" className="w-16" />

          <div className="w-[60%] relative group">
            <button
              type="submit"
              className="absolute rounded-3xl p-[0.5rem] bg-gray-100 hover:bg-white-hoverColor"
            >
              <img src={searchIcon} alt="Search icon" className="w-5" />
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

        <div className="flex flex-col justify-center items-center my-8 pl-3">
          <div className="w-[50rem]">
            <p className="text-gray text-[0.9rem]">熱門搜尋字詞</p>
            <div className="my-4 flex gap-4">
              {HOTSEARCH.map((item) => (
                <button
                  type="button"
                  onClick={() => handleSearch(item)}
                  key={item}
                >
                  <Button bgColor="gray" paddingStyle="px-6 py-2">
                    {item}
                  </Button>
                </button>
              ))}
            </div>
          </div>
        </div>
      </form>
      <div
        onClick={onClose}
        className="bg-black opacity-30 fixed inset-0 z-10"
      ></div>
    </div>
  );
}
