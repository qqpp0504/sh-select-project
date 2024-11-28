import { useQuery } from "@tanstack/react-query";

import { fetchBanner } from "../util/http.js";
import LoadingIndicator from "../components/UI/LoadingIndicator.jsx";
import ErrorBlock from "../components/UI/ErrorBlock.jsx";
import Banner from "../components/banner/Banner";
import SexClassNavigation from "../components/navigation/SexClassNavigation.jsx";
import NewSelectedProducts from "../components/banner/NewSelectProducts.jsx";

export default function FemalePage() {
  const {
    data: bannerData,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["femaleBanners", { page: "femalePage" }],
    queryFn: ({ queryKey, signal }) => fetchBanner({ ...queryKey[1], signal }),
    staleTime: 0,
    retry: 1,
    retryDelay: 1000,
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
      <SexClassNavigation sex="female" />
      <Banner {...bannerData.banner} />
      <NewSelectedProducts products={bannerData.selectedProducts} />
    </>
  );
}
