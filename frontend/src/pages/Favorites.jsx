import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

import { fetchUserFavorites } from "@/util/http.js";
import LoadingIndicator from "@/components/UI/LoadingIndicator.jsx";
import ErrorBlock from "@/components/UI/ErrorBlock.jsx";
import FavoritesProducts from "@/components/favorites/FavoritesProducts.jsx";
import ResizableModal from "@/components/shoppingCart/ResizableModal.jsx";
import CartNotification from "@/components/productDetail/CartNotification.jsx";
import { cartActions } from "@/store/cart-slice.js";

export default function FavoritesPage() {
  const activeItem = useSelector((state) => state.cart.activeItem);
  const { token, user } = useSelector((state) => state.account.userData);
  const [isSticky, setIsSticky] = useState(false);
  const dispatch = useDispatch();
  const { showingNotification } = useSelector((state) => state.cart);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  function handleCloseNotification() {
    dispatch(cartActions.closeNotification());
  }

  return (
    <section className="px-4 lg:padding-large py-10">
      {activeItem && <ResizableModal />}
      <h2
        className={`sticky top-0 z-20 bg-white font-500 py-4 ${
          isSticky ? "text-base lg:text-xl" : "text-xl lg:text-2xl"
        }`}
      >
        最愛
      </h2>
      <div className="w-full">{favoritesItems}</div>

      {showingNotification.isOpen && (
        <>
          <CartNotification open={showingNotification.isOpen} />
          <div
            onClick={handleCloseNotification}
            className="bg-gray-900 bg-opacity-30 z-30 fixed lg:absolute left-0 top-0 lg:top-[6.7rem] w-full h-screen"
          ></div>
        </>
      )}
    </section>
  );
}
