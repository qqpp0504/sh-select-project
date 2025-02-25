import { useQuery } from "@tanstack/react-query";

import { fetchBanner } from "@/util/http.js";
import LoadingIndicator from "@/components/UI/LoadingIndicator.jsx";
import ErrorBlock from "@/components/UI/ErrorBlock.jsx";
import Banner from "@/components/banner/Banner";
import GenderClassNavigation from "@/components/banner/GenderClassNavigation.jsx";
import NewSelectedProducts from "@/components/banner/NewSelectProducts.jsx";
import RecommendationProducts from "@/components/banner/RecommendationProducts.jsx";
import BrandsProducts from "@/components/banner/BrandsProducts.jsx";
import MembershipBlock from "@/components/banner/MembershipBlock.jsx";
import membershipBannerImage from "@/assets/membership-women.jpg";
import SEO from "@/components/SEO.jsx";

export default function WomenPage() {
  const {
    data: bannerData,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["womenBanners", { page: "womenPage" }],
    queryFn: ({ queryKey, signal }) => fetchBanner({ ...queryKey[1], signal }),
    staleTime: 0,
    retry: 1,
    retryDelay: 1000,
    timeout: 5000,
  });

  if (isPending) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <ErrorBlock message={error.info?.message || "資料加載失敗"} />;
  }

  return (
    <>
      <SEO
        title="SH SELECT 女用服裝、鞋款與配件。"
        description="女款服飾新選擇，無論是休閒還是正式服裝，我們提供最新的女士時尚，讓你展現獨特的個人魅力！"
      />
      <GenderClassNavigation gender="women" />
      <Banner {...bannerData.banner} />
      <NewSelectedProducts products={bannerData.selectedProducts} />
      <RecommendationProducts products={bannerData.recommendationProducts} />
      <BrandsProducts />
      <MembershipBlock image={membershipBannerImage} alt="Membership image" />
    </>
  );
}
