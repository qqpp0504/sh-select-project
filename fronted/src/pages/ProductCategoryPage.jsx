import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useLocation } from "react-router-dom";

import { fetchProducts } from "../util/http.js";

import LoadingIndicator from "../components/UI/LoadingIndicator.jsx";
import ErrorBlock from "../components/UI/ErrorBlock.jsx";
import ProductsList from "../components/products/ProductsList.jsx";

export default function ProductCategoryPage() {
  const categoryObject = useParams();
  const location = useLocation(); // 監聽路由變化
  const queryClient = useQueryClient(); // 使用 queryClient 進行數據管理

  const category = categoryObject.category;

  // 清除緩存，確保重新加載
  useEffect(() => {
    queryClient.removeQueries(["products", category]);
  }, [location, queryClient, category]); // 當路由變化時清除緩存

  const {
    data: products,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", { filters: { gender: category } }],
    queryFn: ({ signal, queryKey }) =>
      fetchProducts({ signal, ...queryKey[1] }),
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
      <ProductsList products={products} />
    </>
  );
}
