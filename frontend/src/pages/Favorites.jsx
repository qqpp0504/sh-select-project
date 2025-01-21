import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { fetchUserFavorites } from "../util/http.js";
import LoadingIndicator from "../components/UI/LoadingIndicator.jsx";
import ErrorBlock from "../components/UI/ErrorBlock.jsx";
import FavoritesProducts from "../components/favorites/FavoritesProducts.jsx";
import ResizableModal from "../components/ShoppingCart/ResizableModal.jsx";

export default function FavoritesPage() {
  const activeItem = useSelector((state) => state.cart.activeItem);
  const { token, user } = useSelector((state) => state.account.userData);

  const {
    data: favoritesProducts,
    isLoading: isQueryLoading,
    isError: isQueryError,
    error: queryError,
    refetch,
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

  if (token && favoritesProducts && favoritesProducts.length > 0) {
    favoritesItems = (
      <FavoritesProducts products={favoritesProducts} refetch={refetch} />
    );
  } else if (token && favoritesProducts && favoritesProducts.length === 0) {
    favoritesItems = (
      <p className="text-center mt-28">已加入最愛的商品將會儲存在這裡。</p>
    );
  }

  if (isQueryLoading) {
    return <LoadingIndicator />;
  }

  if (isQueryError) {
    return (
      <ErrorBlock message={queryError.info?.message || "商品資料加載失敗"} />
    );
  }

  return (
    <section className="padding-large py-10">
      {activeItem && <ResizableModal />}
      <h2 className="text-2xl font-500">最愛</h2>
      <div className="w-full">{favoritesItems}</div>
    </section>
  );
}
