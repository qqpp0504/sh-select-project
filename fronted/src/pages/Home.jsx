import { useQuery } from "@tanstack/react-query";

import Banner from "../components/banner/Banner.jsx";
import { fetchBanner } from "../util/http.js";

export default function Home() {
  const {
    data: bannerImage,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["banners", { page: "homePage" }],
    queryFn: ({ queryKey, signal }) => fetchBanner({ ...queryKey[1], signal }),
    staleTime: 0,
  });

  if (isPending) return <div>載入中...</div>;

  if (isError) return <div>{error.info?.message ?? "載入圖片失敗"}</div>;

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
