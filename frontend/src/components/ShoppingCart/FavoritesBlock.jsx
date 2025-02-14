import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { fetchUserFavorites } from "@/util/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import FavoritesProducts from "./FavoritesProducts.jsx";

export default function FavoritesBlock() {
  const navigate = useNavigate();
  const [isShowMore, setIsShowMore] = useState(false);
  const { token, user } = useSelector((state) => state.account.userData);

  const {
    data: favoritesProducts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userFavorites", { userEmail: user.email }],
    queryFn: ({ queryKey, signal }) =>
      fetchUserFavorites({ ...queryKey[1], signal }),
    staleTime: 0,
    retry: 1,
    retryDelay: 1000,
    timeout: 5000,
    enabled: !!token,
  });

  function handleShowMoreProducts() {
    if (isShowMore === true || favoritesProducts.length <= 2) {
      navigate("/favorites");
      return;
    }

    setIsShowMore(true);
  }

  let favoritesItems;

  if (!token) {
    favoritesItems = (
      <p>
        想要檢視你的最愛嗎？{" "}
        <Link to="/accounts">
          <span className="text-gray underline">加入我們</span>
        </Link>{" "}
        或{" "}
        <Link to="/accounts">
          <span className="text-gray underline">登入</span>
        </Link>
      </p>
    );
  } else if (token && favoritesProducts && favoritesProducts.length > 0) {
    favoritesItems = (
      <>
        <ul className="flex flex-col justify-between">
          <div className="flex flex-col lg:flex-row gap-6 border-b-[1px] border-gray-200">
            {favoritesProducts.slice(0, 2).map((product) => (
              <FavoritesProducts key={product.id} product={product} />
            ))}
          </div>

          {isShowMore && (
            <div className="flex flex-col lg:flex-row gap-6 mt-8 border-b-[1px] border-gray-200">
              {favoritesProducts.slice(2, 4).map((product) => (
                <FavoritesProducts key={product.id} product={product} />
              ))}
            </div>
          )}
        </ul>

        <button
          onClick={handleShowMoreProducts}
          className="mt-5 text-gray text-sm border-b-[1px] border-gray-500 w-fit"
        >
          {`${
            isShowMore || favoritesProducts.length <= 2
              ? "前往最愛"
              : "檢視更多最愛"
          }`}
        </button>
      </>
    );
  } else if (token && favoritesProducts && favoritesProducts.length === 0) {
    favoritesItems = <p>你的最愛中未儲存任何品項</p>;
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <ErrorBlock message={error.info?.message || "商品資料加載失敗"} />;
  }

  return <div className="w-full">{favoritesItems}</div>;
}
