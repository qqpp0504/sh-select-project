import { useQuery } from "@tanstack/react-query";

import Banner from "@/components/banner/Banner.jsx";
import { fetchBanner } from "@/util/http.js";
import ErrorBlock from "@/components/UI/ErrorBlock.jsx";
import LoadingIndicator from "@/components/UI/LoadingIndicator.jsx";
import SelectedProducts from "@/components/banner/SelectProducts.jsx";
import NewProducts from "@/components/banner/NewProducts.jsx";
import BrandsProducts from "@/components/banner/BrandsProducts.jsx";
import MembershipBlock from "@/components/banner/MembershipBlock.jsx";
import membershipBannerImage from "@/assets/membership-banner.jpg";
import brandsBannerImg from "@/assets/brands-banner.jpg";

export default function HomePage() {
  const {
    data: bannerData,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["homeBanners", { page: "homePage" }],
    queryFn: ({ queryKey, signal }) => fetchBanner({ ...queryKey[1], signal }),
    staleTime: 0,
    retry: 1, // 設定重試次數
    retryDelay: 1000, // 重試間隔時間
    // 設定超時時間
    timeout: 5000,
  });

  if (isPending) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <ErrorBlock message={error.info?.message || "資料加載失敗"} />;
  }

  const BRANDSBANNER = {
    image: brandsBannerImg,
    alt: "各種品牌圖片",
    title: "探索頂尖品牌，展現非凡選擇",
    description: "匯聚全球知名品牌，為你帶來更豐富的生活選擇。",
    buttonText: "探索各種品牌",
    link: "/brands",
    type: "frontend",
  };

  return (
    <>
      <Banner {...bannerData.firstBanner} />
      <SelectedProducts
        sectionTitle="精選"
        products={bannerData.selectedProducts}
      />
      <Banner sectionTitle="流行趨勢" {...bannerData.secondBanner} />
      <NewProducts products={bannerData.newProducts} />
      <Banner sectionTitle="頂尖潮流品牌" {...BRANDSBANNER} />
      <BrandsProducts />
      <MembershipBlock image={membershipBannerImage} alt="Membership image" />
    </>
  );
}
