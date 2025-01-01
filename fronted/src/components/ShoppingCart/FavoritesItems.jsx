import { useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { fetchUserFavorites } from "../../util/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import FavoritesProducts from "./FavoritesProducts.jsx";

export default function FavoritesItems() {
  const [isShowMore, setIsShowMore] = useState(false);
  const { token, user } = useSelector((state) => state.account.userData);
  const {
    data: favoritesProducts,
    isPending,
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
  });

  function handleShowMoreProducts() {
    setIsShowMore(true);
  }

  let favoritesItems;

  if (isPending) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <ErrorBlock message={error.info?.message || "商品資料加載失敗"} />;
  }

  if (!token) {
    favoritesItems = (
      <p>
        想要檢視你的最愛嗎？{" "}
        <span className="text-gray underline">加入我們</span> 或{" "}
        <span className="text-gray underline">登入</span>
      </p>
    );
  } else if (token && favoritesProducts) {
    favoritesItems = (
      <>
        <ul className="flex flex-col justify-between">
          <div className="flex gap-6 border-b-[1px] border-gray-200">
            {favoritesProducts.slice(0, 2).map((product) => (
              <FavoritesProducts key={product.id} product={product} />
            ))}
          </div>

          {isShowMore && (
            <div className="flex gap-6 mt-8 border-b-[1px] border-gray-200">
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
          {`${isShowMore ? "前往最愛" : "檢視更多最愛"}`}
        </button>
      </>
    );
  } else {
    favoritesItems = <p>你的最愛中未儲存任何品項</p>;
  }

  return <div className="w-full">{favoritesItems}</div>;
}
