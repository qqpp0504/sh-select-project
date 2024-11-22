import { useQuery } from "@tanstack/react-query";
import Banner from "../components/banner/Banner.jsx";
import { fetchBanner } from "../util/http.js";

export default function Home() {
  const {
    data: bannerImage,
    isPending,
    isError,
    error,
    refetch, // 添加重試功能
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
      <div className="text-center py-8">
        <p>載入中...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error.info?.message || "載入圖片失敗"}</p>

        <button
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          重試
        </button>
      </div>
    );
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
