import { useQuery } from "@tanstack/react-query";

import { fetchBanner } from "@/util/http.js";
import Banner from "@/components/banner/Banner.jsx";
import LoadingIndicator from "@/components/UI/LoadingIndicator.jsx";
import ErrorBlock from "@/components/UI/ErrorBlock.jsx";
import NewSelectedProducts from "@/components/banner/NewSelectProducts.jsx";
import RecommendationProducts from "@/components/banner/RecommendationProducts.jsx";
import BrandsProducts from "@/components/banner/BrandsProducts.jsx";
import MembershipBlock from "@/components/banner/MembershipBlock.jsx";
import GenderClassNavigation from "@/components/banner/GenderClassNavigation.jsx";
import membershipBannerImage from "@/assets/membership-men.jpg";

export default function MenPage() {
  const {
    data: bannerData,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["menBanners", { page: "menPage" }],
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
      <GenderClassNavigation gender="men" />
      <Banner {...bannerData.banner} />
      <NewSelectedProducts products={bannerData.selectedProducts} />
      <RecommendationProducts products={bannerData.recommendationProducts} />
      <BrandsProducts />
      <MembershipBlock image={membershipBannerImage} alt="Membership image" />
    </>
  );
}
