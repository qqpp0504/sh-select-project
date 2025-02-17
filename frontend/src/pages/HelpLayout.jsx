import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoSearch } from "react-icons/io5";

import Input from "@/components/UI/Input.jsx";
import { searchFAQ } from "@/util/searchFaq.js";
import { searchActions } from "@/store/searchFaq-slice.js";

export default function HelpLayout() {
  const { searchTerm } = useSelector((state) => state.searchFaq);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  function handleSearch() {
    const trimmedTerm = searchTerm.trim();
    if (!trimmedTerm) {
      return;
    }

    const searchResult = searchFAQ(searchTerm);
    dispatch(searchActions.updatedSearchResult(searchResult));

    navigate(`/help/search/${trimmedTerm}`);
  }

  function handleChange(event) {
    dispatch(searchActions.updatedSearchTerm(event.target.value));
  }

  useEffect(() => {
    if (!params.searchTerm) {
      dispatch(searchActions.clearSearchTerm());
    }
  }, [dispatch, params]);

  return (
    <div className="padding-small lg:padding-large flex justify-center">
      <div className="max-w-[79rem] w-full flex flex-col items-center mt-10">
        <div className="flex flex-col w-full max-w-[29rem] gap-4 mb-20">
          <h1 className="text-[2.1rem] font-500 text-center">取得協助</h1>
          <form className="relative">
            <Input
              placeholderText="我們能提供你什麼協助？"
              paddingStyle="p-[0.9rem]"
              value={searchTerm}
              onChange={handleChange}
            />
            <button
              onClick={handleSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 before:absolute before:inset-0 before:rounded-full before:hover:bg-gray-100 before:scale-0 hover:before:scale-100 before:transition-transform before:duration-300 before:-z-10"
            >
              <IoSearch size="1.3rem" color="gray" />
            </button>
          </form>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
