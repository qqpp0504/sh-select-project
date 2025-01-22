import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { fetchProductDetail } from "@/util/http.js";
import LoadingIndicator from "@/components/UI/LoadingIndicator.jsx";
import ErrorBlock from "@/components/UI/ErrorBlock.jsx";
import ProductItem from "@/components/productDetail/ProductItem.jsx";
import DetailInformationModal from "@/components/productDetail/DetailInformationModal.jsx";
import SizeDetailModal from "@/components/productDetail/SizeDetailModal.jsx";

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
      <DetailInformationModal product={productData} />
      <SizeDetailModal productSizeInfo={productData.sizeGuide} />
    </>
  );
}
