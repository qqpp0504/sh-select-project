import { useQuery } from "@tanstack/react-query";

import Banner from "../components/banner/Banner.jsx";
import { fetchBanner } from "../util/http.js";
import ErrorBlock from "../components/UI/ErrorBlock.jsx";
import LoadingIndicator from "../components/UI/LoadingIndicator.jsx";
import Products from "../components/banner/Products.jsx";

export default function HomePage() {
  const {
    data: bannerData,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["banners", { page: "homePage" }],
    queryFn: ({ queryKey, signal }) => fetchBanner({ ...queryKey[1], signal }),
    staleTime: 0,
    retry: 1, // 設定重試次數
    retryDelay: 1000, // 重試間隔時間
    // 設定超時時間
    timeout: 5000,
  });

  if (isPending) {
    return (
      <div className="my-20 flex justify-center">
        <LoadingIndicator />
      </div>
    );
  }

  if (isError) {
    return <ErrorBlock message={error.info?.message || "資料加載失敗"} />;
  }

  return (
    <>
      <Banner {...bannerData.banner} />
      <Products products={bannerData.products} />
    </>
  );
}
