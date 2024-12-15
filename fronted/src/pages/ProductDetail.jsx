import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { fetchProductDetail } from "../util/http.js";
import LoadingIndicator from "../components/UI/LoadingIndicator.jsx";
import ErrorBlock from "../components/UI/ErrorBlock.jsx";
import ProductItem from "../components/productDetail/productItem.jsx";
import DetailInformation from "../components/productDetail/DetailInformation.jsx";
import SizeDetail from "../components/productDetail/SizeDetail.jsx";

export default function ProductDetailPage() {
  const { slug } = useParams();

  const {
    data: productData,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["productsDetail", { slug }],
    queryFn: ({ queryKey, signal }) =>
      fetchProductDetail({ ...queryKey[1], signal }),
    staleTime: 0,
    retry: 1,
    retryDelay: 1000,
    timeout: 5000,
  });

  if (isPending) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <ErrorBlock message={error.info?.message || "商品資料加載失敗"} />;
  }

  return (
    <>
      <ProductItem product={productData} />
      <DetailInformation product={productData} />
      <SizeDetail productSizeInfo={productData.sizeGuide} />
    </>
  );
}
