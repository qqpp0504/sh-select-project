import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchUserFavorites } from "../util/http.js";
import LoadingIndicator from "../components/UI/LoadingIndicator.jsx";
import ErrorBlock from "../components/UI/ErrorBlock.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Button from "../components/UI/Button.jsx";
import blackHeartIcon from "../assets/heart-black-icon.png";

export default function FavoritesPage() {
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

  let favoritesItems;

  if (!token) {
    favoritesItems = (
      <p>
        想要檢視你的最愛嗎？{" "}
        <span className="text-gray underline">加入我們</span> 或{" "}
        <span className="text-gray underline">登入</span>
      </p>
    );
  } else if (token && favoritesProducts && favoritesProducts.length > 0) {
    favoritesItems = (
      <ul className="grid grid-cols-2 gap-9 lg:grid-cols-3 mt-9">
        {favoritesProducts.map((product) => (
          <li key={product.id} className="mb-1">
            <div className="relative mb-2 overflow-hidden">
              <Link
                to={`/products/${product.slug}`}
                className="flex justify-center items-center bg-gray-100 w-full h-[27rem]"
              >
                <img
                  src={`http://localhost:3000/${product.color.image}`}
                  alt={product.alt}
                  className="object-cover w-[90%] h-[90%]"
                />
              </Link>

              <button className="absolute top-4 right-4 bg-white p-2 rounded-full z-10">
                <img src={blackHeartIcon} alt="Heart icon" className="w-7" />
              </button>
            </div>

            <div className="flex justify-between">
              <div>
                <Link to={`/products/${product.slug}`}>
                  <h3 className="font-500">
                    {product.brand} - {product.productName}
                  </h3>
                </Link>
                <h3 className="text-gray">{product.category}</h3>
              </div>

              {product.discountPrice !== product.originalPrice ? (
                <>
                  <div className="py-2">
                    <s className="text-gray pr-3">
                      NT{currencyFormatter.format(product.originalPrice)}
                    </s>
                    <span>
                      NT{currencyFormatter.format(product.discountPrice)}
                    </span>
                  </div>
                </>
              ) : (
                <span className="py-2 block">
                  NT{currencyFormatter.format(product.originalPrice)}
                </span>
              )}
            </div>

            <Button
              bgColor="favoriteWhite"
              className="mt-5"
              paddingStyle="py-2 px-6"
            >
              選取尺寸
            </Button>
          </li>
        ))}
      </ul>
    );
  } else if (token && favoritesProducts && favoritesProducts.length === 0) {
    favoritesItems = (
      <p className="text-center mt-28">已加入最愛的商品將會儲存在這裡。</p>
    );
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <ErrorBlock message={error.info?.message || "商品資料加載失敗"} />;
  }

  return (
    <section className="padding-large py-10">
      <h2 className="text-2xl font-500">最愛</h2>
      <div className="w-full">{favoritesItems}</div>
    </section>
  );
}
