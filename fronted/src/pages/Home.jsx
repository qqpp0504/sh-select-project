import { useQuery } from "@tanstack/react-query";

import Banner from "../components/banner/Banner.jsx";
import { fetchBanner } from "../util/http.js";
import ErrorBlock from "../components/UI/ErrorBlock.jsx";
import LoadingIndicator from "../components/UI/LoadingIndicator.jsx";

export default function HomePage() {
  const {
    data: bannerImage,
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

  // 成功狀態
  return (
    <Banner
      bannerImage={`http://localhost:3000/${bannerImage.banner.image}`}
      title="精挑細選，只為你獻上理想之選"
      description="我們篩選全球優質單品，結合實用與風格，讓每件商品都成為生活中的必備精品。"
      buttonText="探索我們的推薦單品"
      link="/"
    />
  );
}
